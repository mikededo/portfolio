import type { LayoutServerLoad } from './$types';

import { getIsRecoveryPeriod, getWeeklyActivitySummary } from '$lib/server';

export const prerender = true;

export const load: LayoutServerLoad = async () => {
  const [stats, isRecoveryPeriod] = await Promise.all([
    getWeeklyActivitySummary(),
    getIsRecoveryPeriod()
  ]);

  return {
    isRecoveryPeriod: isRecoveryPeriod.unwrapOr(null),
    stats: stats.unwrapOr(null)
  };
};
