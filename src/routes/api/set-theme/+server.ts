import type { Action } from '@sveltejs/kit'

import { json } from '@sveltejs/kit'
import * as z from 'zod'

import { THEME_COOKIE, ThemeSchema } from '$lib/utils/theme'

export const POST: Action = async ({ cookies, request }) => {
  const maybeTheme = z.object({ theme: ThemeSchema }).safeParse(await request.json())
  if (maybeTheme.error) {
    return json({ message: 'Invalid theme provided' }, { status: 400 })
  }

  cookies.set(THEME_COOKIE, maybeTheme.data.theme, { path: '/' })
  return json(null, { status: 200 })
}
