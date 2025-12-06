import type { LayoutServerLoad } from './$types'

import { getIsRecoveryPeriod, getWeeklyActivitySummary } from '$lib/server'
import { getThemeCookie } from '$lib/utils/theme'

export const load: LayoutServerLoad = async ({ cookies }) => {
  const [stats, isRecoveryPeriod] = await Promise.all([
    getWeeklyActivitySummary(),
    getIsRecoveryPeriod()
  ])

  return {
    isRecoveryPeriod: isRecoveryPeriod.unwrapOr(null),
    stats: stats.unwrapOr(null),
    theme: getThemeCookie(cookies)
  }
}
