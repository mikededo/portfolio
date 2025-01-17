import type { Cookies } from '@sveltejs/kit';

export type Theme = 'frappe' | 'latte' | 'macchiato' | 'mocha';
export const THEME_COOKIE = 'theme';

const isTheme = (theme: string): theme is Theme => ['frappe', 'latte', 'macchiato', 'mocha'].includes(theme);

export const getThemeCookie = (cookies: Cookies) => {
  const cookie = cookies.get(THEME_COOKIE);
  return cookie && isTheme(cookie) ? cookie : 'macchiato';
};
