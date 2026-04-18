import type { Result } from 'neverthrow'

import dayjs from 'dayjs'
import { err, ok, ResultAsync } from 'neverthrow'
import * as z from 'zod'

import { dev } from '$app/environment'
import { INTERVALS_API_KEY, INTERVALS_ID } from '$env/static/private'

const BASE_URL = 'https://intervals.icu/api/v1'
const RECOVERY_NOTE_NAME = 'Time off bike'

const IntervalsDateSchema = z.coerce.date()

const NullableNumberWithZeroDefaultSchema = z.nullable(z.number())
  .transform((value) => value ?? 0)

const getDateRangeSchema = (min: Date, max: Date) => z.date().min(min).max(max)

const isWithinDateRange = (date: Date, min: Date, max: Date) =>
  getDateRangeSchema(min, max).safeParse(date).success

/**
 * Type definition from schema in:
 * https://intervals.icu/api-docs.html#get-/api/v1/athlete/-id-/athlete-summary-ext-
 */
const ByCategoryItemSchema = z.object({
  calories: z.nullable(z.number()),
  category: z.nullable(z.string()),
  count: z.nullable(z.number()),
  distance: NullableNumberWithZeroDefaultSchema,
  eftp: z.nullable(z.number()),
  eftpPerKg: z.nullable(z.number()),
  elapsed_time: z.nullable(z.number()),
  moving_time: NullableNumberWithZeroDefaultSchema,
  srpe: z.nullable(z.number()),
  time: z.nullable(z.number()),
  total_elevation_gain: NullableNumberWithZeroDefaultSchema,
  training_load: z.nullable(z.number())
})
// Partial definition of the response
const ActivityDataSchema = z.object({
  athlete_id: z.string(),
  byCategory: z.array(ByCategoryItemSchema)
})
const ActivityDataArraySchema = z.array(ActivityDataSchema)

export type ActivitySummary = {
  distance: number
  lastFetched: Date
  time: number
  elevation: number
}

const EventSchema = z.object({
  end_date_local: IntervalsDateSchema,
  name: z.string(),
  start_date_local: IntervalsDateSchema
})
const EventDataArraySchema = z.array(EventSchema)

// Home-made cache so that we do not fetch the data on every request
let cachedSummary: ActivitySummary | null = null
let cachedRecoveryPeriod: { lastFetched: Date, value: boolean } | null = null

const CACHE_FRESH_MS = 60 * 60 * 1000
const CACHE_STALE_MS = 24 * 60 * 60 * 1000

type CacheStatus = 'expired' | 'fresh' | 'stale'

const getCacheStatus = <T extends { lastFetched: Date }>(cache: null | T): CacheStatus => {
  if (!cache) {
    return 'expired'
  }

  const age = Date.now() - cache.lastFetched.getTime()
  if (age < CACHE_FRESH_MS) {
    return 'fresh'
  }
  if (age < CACHE_STALE_MS) {
    return 'stale'
  }

  return 'expired'
}

const parseResponse = async <T extends z.ZodType>(
  schema: T,
  url: string
): Promise<Result<z.infer<T>, Error>> => {
  const fetchResult = await ResultAsync.fromPromise(
    fetch(url, {
      headers: {
        Accept: '*/*',
        Authorization: `Basic ${btoa(`API_KEY:${INTERVALS_API_KEY}`)}`
      }
    }),
    () => new Error('Failed to fetch activities')
  )
  if (!fetchResult.isOk()) {
    return err(fetchResult.error)
  }

  const response = fetchResult.value
  if (!response.ok) {
    return err(new Error(`Fetch failed: ${response.statusText}`))
  }

  const json = await ResultAsync.fromPromise(
    response.json(),
    () => new Error('Invalid JSON response')
  )
  if (json.isErr()) {
    return err(json.error)
  }

  const parsed = schema.safeParse(json.value)
  if (!parsed.success) {
    return err(new Error('Validation failed for activity data'))
  }

  return ok(parsed.data)
}

const fetchAthletesSummary = async () => {
  const params = new URLSearchParams({
    start: dayjs().subtract(7, 'day').format('YYYY-MM-DD')
  }).toString()
  const url = `${BASE_URL}/athlete/${INTERVALS_ID}/athlete-summary?${params}`

  return parseResponse(ActivityDataArraySchema, url)
}

const fetchEvents = () => {
  const params = new URLSearchParams({
    category: 'NOTE',
    newest: dayjs().format('YYYY-MM-DD'),
    oldest: dayjs().subtract(2, 'month').format('YYYY-MM-DD')
  }).toString()
  const url = `${BASE_URL}/athlete/${INTERVALS_ID}/events?${params}`

  return parseResponse(EventDataArraySchema, url)
}

const withDevDefaultValue = <T>(cb: () => Promise<Result<T, Error>>, value: T) => () => {
  if (dev) {
    return ok(value)
  }

  return cb()
}

const revalidateSummary = () => {
  fetchAthletesSummary().then((result) => {
    if (result.isOk()) {
      const summary = result.value.reduce<ActivitySummary>(
        (acc, { athlete_id: athleteId, byCategory: categories }) => {
          if (athleteId !== INTERVALS_ID) {
            return acc
          }
          categories.forEach((activity) => {
            const { category, distance, moving_time, total_elevation_gain: elevation } = activity
            if (category !== 'Ride') {
              return
            }
            acc.distance += distance / 1000
            acc.elevation += elevation
            acc.time += moving_time / 3600
          })
          return acc
        },
        { distance: 0, elevation: 0, lastFetched: new Date(), time: 0 }
      )
      cachedSummary = summary
    }
  })
}

const revalidateRecoveryPeriod = () => {
  fetchEvents().then((result) => {
    if (result.isOk()) {
      const now = new Date()
      const isRecoveryPeriod = result.value.some((event) => {
        if (!event.name.toLowerCase().includes(RECOVERY_NOTE_NAME)) {
          return false
        }
        return isWithinDateRange(now, event.start_date_local, event.end_date_local)
      })
      cachedRecoveryPeriod = { lastFetched: now, value: isRecoveryPeriod }
    }
  })
}

export const getIsRecoveryPeriod = withDevDefaultValue(
  async (): Promise<Result<boolean, Error>> => {
    const status = getCacheStatus(cachedRecoveryPeriod)
    if (status === 'fresh' && cachedRecoveryPeriod) {
      return ok(cachedRecoveryPeriod.value)
    }
    if (status === 'stale' && cachedRecoveryPeriod) {
      revalidateRecoveryPeriod()
      return ok(cachedRecoveryPeriod.value)
    }

    const maybeEvents = await fetchEvents()
    if (maybeEvents.isErr()) {
      console.error(maybeEvents.error)
      return err(maybeEvents.error)
    }

    const now = new Date()
    const isRecoveryPeriod = maybeEvents.value
      .some((event) => {
        if (!event.name.toLowerCase().includes(RECOVERY_NOTE_NAME)) {
          return false
        }

        return isWithinDateRange(now, event.start_date_local, event.end_date_local)
      })

    cachedRecoveryPeriod = { lastFetched: now, value: isRecoveryPeriod }
    return ok(isRecoveryPeriod)
  },
  false
)

export const getWeeklyActivitySummary = withDevDefaultValue(
  async (): Promise<Result<ActivitySummary, Error>> => {
    const status = getCacheStatus(cachedSummary)
    if (status === 'fresh' && cachedSummary) {
      return ok(cachedSummary)
    }
    if (status === 'stale' && cachedSummary) {
      revalidateSummary()
      return ok(cachedSummary)
    }

    const maybeAthletes = await fetchAthletesSummary()
    if (maybeAthletes.isErr()) {
      console.error(maybeAthletes.error)
      return err(maybeAthletes.error)
    }

    const summary: ActivitySummary = maybeAthletes.value
      .reduce<ActivitySummary>((acc, { athlete_id: athleteId, byCategory: categories }) => {
        if (athleteId !== INTERVALS_ID) {
          return acc
        }

        categories.forEach((activity) => {
          const {
            category,
            distance,
            moving_time,
            total_elevation_gain: elevation
          } = activity
          if (category !== 'Ride') {
            return
          }

          acc.distance += distance / 1000
          acc.elevation += elevation
          acc.time += moving_time / 3600
        })

        return acc
      }, { distance: 0, elevation: 0, lastFetched: new Date(), time: 0 })

    cachedSummary = summary
    return ok(summary)
  },
  { distance: 650.50, elevation: 8750, lastFetched: new Date(), time: 23.86 }
)
