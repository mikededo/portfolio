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

export const setTheme = (theme: Theme) => {
  fetch('/api/set-theme', {
    body: JSON.stringify({ theme }),
    method: 'POST'
  });
};

export const themeChangeAnimation = async (theme: Theme) => {
  const root = document.documentElement;

  if (!document.startViewTransition) {
    root.classList = theme;
    return;
  }

  const transition = document.startViewTransition(() => {
    root.classList = theme;
  });
  await transition.ready;

  document.documentElement.animate(
    {
      clipPath: [
        'inset(0 0 100% 0)',
        'inset(0 0 0% 0)'
      ]
    },
    {
      duration: 450,
      easing: 'cubic-bezier(0.2, 0, 0, 1)',
      pseudoElement: '::view-transition-new(root)'
    }
  );
};
