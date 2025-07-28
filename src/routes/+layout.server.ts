import type { LayoutServerLoad } from './$types';

import { getWeeklyActivitySummary } from '$lib/server';

export const load: LayoutServerLoad = async () => ({
  stats: (await getWeeklyActivitySummary()).unwrapOr(null)
});
