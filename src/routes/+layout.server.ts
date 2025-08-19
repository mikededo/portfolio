import type { LayoutServerLoad } from './$types';

import { getWeeklyActivitySummary } from '$lib/server';

export const prerender = true;

export const load: LayoutServerLoad = async () => ({
  stats: (await getWeeklyActivitySummary()).unwrapOr(null)
});
