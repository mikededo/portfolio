import type { Cookies } from '@sveltejs/kit'

import * as z from 'zod'

export const THEME_COOKIE = 'mikededo_theme'
export const ThemeSchema = z.enum(['dark', 'light'])
export const Theme = ThemeSchema.enum
export type ThemeType = z.infer<typeof ThemeSchema>

export const getThemeCookie = (cookies: Cookies) => {
  const cookie = cookies.get(THEME_COOKIE)
  const parsed = ThemeSchema.safeParse(cookie)

  return parsed.success ? parsed.data : Theme.light
}
