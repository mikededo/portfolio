import type { PageLoad } from './$types'

export const load: PageLoad = ({ fetch }) => ({
  recoveryPeriodPromise: fetch('/api/is-recovery-period').then((res) => res.json()),
  statsPromise: fetch('/api/stats').then((res) => res.json())
})
