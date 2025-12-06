import type { Action } from '@sveltejs/kit'

import { json } from '@sveltejs/kit'
import * as v from 'valibot'

import { THEME_COOKIE, ThemeSchema } from '$lib/utils/theme'

export const POST: Action = async ({ cookies, request }) => {
  const maybeTheme = v.safeParse(v.object({ theme: ThemeSchema }), await request.json())
  if (maybeTheme.issues) {
    return json({ message: 'Invalid theme provided' }, { status: 400 })
  }

  cookies.set(THEME_COOKIE, maybeTheme.output.theme, { path: '/' })
  return json(null, { status: 200 })
}
