import type { LayoutServerLoad } from './$types';

import { getThemeCookie } from '$lib/cookies';

export const load: LayoutServerLoad = async ({ cookies }) => ({
  theme: getThemeCookie(cookies)
});
