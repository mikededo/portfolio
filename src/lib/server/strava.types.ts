/**
 * Type definition from schema in:
 * https://intervals.icu/api-docs.html#get-/api/v1/athlete/-id-/athlete-summary-ext-
 */

import type { InferOutput } from 'valibot';

import {
  array,
  nullable,
  number,
  object,
  string
} from 'valibot';

const v = { array, nullable, number, object, string };

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

export const ActivityDataArraySchema = array(ActivityDataSchema);
export type ActivityData = InferOutput<typeof ActivityDataSchema>;
export type ActivityDataArray = InferOutput<typeof ActivityDataArraySchema>;
export type ActivitySummary = {
  distance: number;
  lastFetched: Date;
  time: number;
  elevation: number;
};
