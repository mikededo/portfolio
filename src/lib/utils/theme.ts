import type { Cookies } from '@sveltejs/kit';

import * as v from 'valibot';

export const THEME_COOKIE = 'mikededo_theme';
export enum Theme {
  Dark = 'dark',
  Light = 'light'
}

export const ThemeSchema = v.enum(Theme);

export const getThemeCookie = (cookies: Cookies) => {
  const cookie = cookies.get(THEME_COOKIE);
  const parsed = v.safeParse(ThemeSchema, cookie);

  return parsed.success ? parsed.output : Theme.Light;
};
