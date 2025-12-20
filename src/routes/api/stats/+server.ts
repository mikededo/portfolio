import type { Action } from '@sveltejs/kit'

import { json } from '@sveltejs/kit'

import { getWeeklyActivitySummary } from '$lib/server'

export const GET: Action = async () => json(
  (await getWeeklyActivitySummary()).unwrapOr(null)
)
