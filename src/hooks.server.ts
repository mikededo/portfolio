import type { Handle } from '@sveltejs/kit';

import { getThemeCookie, THEME_COOKIE } from '$lib/utils/theme';

const theme: Handle = ({ event, resolve }) => {
  const cookie = getThemeCookie(event.cookies);
  event.cookies.set(THEME_COOKIE, cookie, {
    path: '/'
  });

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%theme%', cookie)
  });
};

export const handle: Handle = theme;
