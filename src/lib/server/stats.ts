import type { Result } from 'neverthrow';

import { err, ok, ResultAsync } from 'neverthrow';
import * as v from 'valibot';

import { dev } from '$app/environment';
import { INTERVALS_API_KEY, INTERVALS_ID } from '$env/static/private';

const BASE_URL = 'https://intervals.icu/api/v1';

const getDateRangeSchema = (min: Date, max: Date) => v.pipe(
  v.date(),
  v.minValue(min),
  v.maxValue(max)
);

/**
 * Type definition from schema in:
 * https://intervals.icu/api-docs.html#get-/api/v1/athlete/-id-/athlete-summary-ext-
 */
const ByCategoryItemSchema = v.object({
  calories: v.nullable(v.number()),
  category: v.nullable(v.string()),
  count: v.nullable(v.number()),
  distance: v.nullable(v.number(), 0),
  eftp: v.nullable(v.number()),
  eftpPerKg: v.nullable(v.number()),
  elapsed_time: v.nullable(v.number()),
  moving_time: v.nullable(v.number(), 0),
  srpe: v.nullable(v.number()),
  time: v.nullable(v.number()),
  total_elevation_gain: v.nullable(v.number(), 0),
  training_load: v.nullable(v.number())
});
// Partial definition of the response
const ActivityDataSchema = v.object({
  athlete_id: v.string(),
  byCategory: v.array(ByCategoryItemSchema)
});
const ActivityDataArraySchema = v.array(ActivityDataSchema);

type ActivitySummary = {
  distance: number;
  lastFetched: Date;
  time: number;
  elevation: number;
};

const EventSchema = v.object({
  end_date_local: v.pipe(v.string(), v.transform((s) => new Date(s)), v.date()),
  name: v.string(),
  start_date_local: v.pipe(v.string(), v.transform((s) => new Date(s)), v.date())
});
const EventDataArraySchema = v.array(EventSchema);

// Home-made cache so that we do not fetch the data on every request
let cachedSummary: ActivitySummary | null = null;
let cachedRecoveryPeriod: { lastFetched: Date; value: boolean } | null = null;

const getOneWeekAgoDate = () => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);
  return oneWeekAgo.toISOString().split('T')[0];
};

const parseResponse = async <T extends v.GenericSchema>(
  schema: T,
  url: string
): Promise<Result<v.InferOutput<T>, Error>> => {
  const fetchResult = await ResultAsync.fromPromise(
    fetch(url, {
      headers: {
        Accept: '*/*',
        Authorization: `Basic ${btoa(`API_KEY:${INTERVALS_API_KEY}`)}`
      }
    }),
    () => new Error('Failed to fetch activities')
  );
  if (!fetchResult.isOk()) {
    return err(fetchResult.error);
  }

  const response = fetchResult.value;
  if (!response.ok) {
    return err(new Error(`Fetch failed: ${response.statusText}`));
  }

  const json = await ResultAsync.fromPromise(
    response.json(),
    () => new Error('Invalid JSON response')
  );
  if (json.isErr()) {
    return err(json.error);
  }

  const parsed = v.safeParse(schema, json.value);
  if (!parsed.success) {
    return err(new Error('Validation failed for activity data'));
  }

  return ok(parsed.output);
};

const fetchAthletesSummary = async () => {
  const params = new URLSearchParams({
    start: getOneWeekAgoDate()
  }).toString();
  const url = `${BASE_URL}/athlete/${INTERVALS_ID}/athlete-summary?${params}`;

  return parseResponse(ActivityDataArraySchema, url);
};

const fetchEvents = () => {
  const params = new URLSearchParams({
    category: 'NOTE',
    oldest: getOneWeekAgoDate()
  }).toString();
  const url = `${BASE_URL}/athlete/${INTERVALS_ID}/events?${params}`;

  return parseResponse(EventDataArraySchema, url);
};

const withDevDefaultValue = <T>(cb: () => Promise<Result<T, Error>>, value: T) => () => {
  if (dev) {
    return ok(value);
  }

  return cb();
};

const getFromCache = <T extends { lastFetched: Date }>(cache: null | T): null | T => {
  const now = new Date();
  if (cache && (now.getTime() - cache.lastFetched.getTime() < 60 * 60 * 1000)) {
    return cache;
  }

  return null;
};

export const getIsRecoveryPeriod = withDevDefaultValue(
  async (): Promise<Result<boolean, Error>> => {
    const cached = getFromCache(cachedRecoveryPeriod);
    if (cached !== null) {
      return ok(cached.value);
    }

    const maybeEvents = await fetchEvents();
    if (maybeEvents.isErr()) {
      console.error(maybeEvents.error);
      return err(maybeEvents.error);
    }

    const now = new Date();
    const isRecoveryPeriod = maybeEvents.value
      .some((event) => {
        if (!event.name.toLowerCase().includes('recovery')) {
          return false;
        }

        return v.safeParse(
          getDateRangeSchema(event.start_date_local, event.end_date_local),
          now
        ).success;
      });

    cachedRecoveryPeriod = { lastFetched: now, value: isRecoveryPeriod };
    return ok(isRecoveryPeriod);
  },
  false
);

export const getWeeklyActivitySummary = withDevDefaultValue(
  async (): Promise<Result<ActivitySummary, Error>> => {
    const cached = getFromCache(cachedSummary);
    if (cached) {
      return ok(cached);
    }

    const maybeAthletes = await fetchAthletesSummary();
    if (maybeAthletes.isErr()) {
      console.error(maybeAthletes.error);
      return err(maybeAthletes.error);
    }

    const summary: ActivitySummary = maybeAthletes.value
      .reduce<ActivitySummary>((acc, { athlete_id: athleteId, byCategory: categories }) => {
        if (athleteId !== INTERVALS_ID) {
          return acc;
        }

        categories.forEach((activity) => {
          const {
            category,
            distance,
            moving_time,
            total_elevation_gain: elevation
          } = activity;
          if (category !== 'Ride') {
            return;
          }

          acc.distance += distance / 1000;
          acc.elevation += elevation;
          acc.time += moving_time / 3600;
        });

        return acc;
      }, { distance: 0, elevation: 0, lastFetched: new Date(), time: 0 });

    cachedSummary = summary;
    return ok(summary);
  },
  { distance: 650.50, elevation: 8750, lastFetched: new Date(), time: 23.86 }
);
