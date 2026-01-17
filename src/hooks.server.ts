import type { Handle } from '@sveltejs/kit'

import { getThemeCookie, THEME_COOKIE } from '$lib/utils/theme'

const theme: Handle = ({ event, resolve }) => {
  const cookie = getThemeCookie(event.cookies)
  event.cookies.set(THEME_COOKIE, cookie, { path: '/' })

  const isDark = cookie === 'dark'
  const colorScheme = isDark ? 'dark' : 'light'
  const themeColor = isDark ? '#0a0a0a' : '#fdfdfd'

  return resolve(event, {
    transformPageChunk: ({ html }) =>
      html
        .replace('%theme%', cookie)
        .replace('%colorScheme%', colorScheme)
        .replace('%themeColor%', themeColor)
  })
}

export const handle: Handle = theme
