import type { Handle } from '@sveltejs/kit';

import { getThemeCookie, THEME_COOKIE } from '$lib/cookies';

export const handle: Handle = async ({ event, resolve }) => {
  const cookie = getThemeCookie(event.cookies);
  event.cookies.set(THEME_COOKIE, cookie, {
    path: '/'
  });

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%theme%', cookie)
  });
};
