import type { PageServerLoad } from './$types'

import { getIsRecoveryPeriod, getWeeklyActivitySummary } from '$lib/server'

export const load: PageServerLoad = async () => {
  const [recoveryResult, statsResult] = await Promise.all([
    getIsRecoveryPeriod(),
    getWeeklyActivitySummary()
  ])

  return {
    isRecoveryPeriod: recoveryResult.isOk() ? recoveryResult.value : false,
    stats: statsResult.isOk() ? statsResult.value : null
  }
}
