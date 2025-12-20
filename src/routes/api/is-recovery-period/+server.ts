import type { Action } from '@sveltejs/kit'

import { json } from '@sveltejs/kit'

import { getIsRecoveryPeriod } from '$lib/server'

export const GET: Action = async () => json((await getIsRecoveryPeriod()).unwrapOr(null))
