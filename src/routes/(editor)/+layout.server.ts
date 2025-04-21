import type { LayoutServerLoad } from './$types';

import { getWeeklyActivitySummary } from '$lib/server';

export const load: LayoutServerLoad = async ({ url }) => {
  const stravaData = await getWeeklyActivitySummary();

  return {
    pathname: url.pathname,
    strava: stravaData.unwrapOr(null)
  };
};
