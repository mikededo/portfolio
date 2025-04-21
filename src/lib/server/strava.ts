import type { Result } from 'neverthrow';

import type { ActivitySummary } from './strava.types';

import { err, ok, ResultAsync } from 'neverthrow';
import * as v from 'valibot';

import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';

import { ActivityDataArraySchema } from './strava.types';

let cachedSummary: ActivitySummary | null = null;

// TODO: Mock when in dev
export const getWeeklyActivitySummary = async (): Promise<Result<ActivitySummary, Error>> => {
  if (dev) {
    return ok({ distance: 650.50, elevation: 8750, lastFetched: new Date(), time: 23.86 });
  }

  const now = new Date();
  if (cachedSummary && (now.getTime() - cachedSummary.lastFetched.getTime() < 6 * 60 * 60 * 1000)) {
    return ok(cachedSummary);
  }

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 5);
  const params = new URLSearchParams({
    start: oneWeekAgo.toISOString().split('T')[0]
  }).toString();

  const url = `https://intervals.icu/api/v1/athlete/${env.INTERVALS_ID}/athlete-summary?${params}`;

  const fetchResult = await ResultAsync.fromPromise(
    fetch(url, {
      headers: {
        Accept: '*/*',
        Authorization: `Basic ${btoa(`API_KEY:${env.INTERVALS_API_KEY}`)}`
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

  const parsed = v.safeParse(ActivityDataArraySchema, json.value);
  if (!parsed.success) {
    return err(new Error('Validation failed for activity data'));
  }

  const athletes = parsed.output;
  const summary: ActivitySummary = athletes
    .filter(({ athlete_id }) => athlete_id === env.INTERVALS_ID)
    .reduce<ActivitySummary>((acc, { byCategory: categories }) => {
      categories.forEach((activity) => {
        const { category, distance, moving_time, total_elevation_gain: elevation } = activity;
        if (category !== 'Ride') {
          return;
        }

        acc.distance += distance / 1000;
        acc.elevation += elevation;
        acc.time += moving_time / 3600;
      });

      return acc;
    }, { distance: 0, elevation: 0, lastFetched: now, time: 0 });

  cachedSummary = summary;

  return ok(summary);
};
