import type { LayoutServerLoad } from './$types'

import { getThemeCookie } from '$lib/utils/theme'

export const load: LayoutServerLoad = async ({ cookies }) => ({
  theme: getThemeCookie(cookies)
})
