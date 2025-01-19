import type { Theme } from '$lib/cookies';

import { getContext, setContext } from 'svelte';

import { THEME_COOKIE } from '$lib/cookies';

type ThemeState = {
  theme: Theme;
};
// Proxying the object for reactivity
const themeState = $state<ThemeState>({ theme: 'macchiato' });

export const initThemeContext = (theme: Theme) => {
  themeState.theme = theme;
  setContext<ThemeState>(THEME_COOKIE, themeState);
};

export const changeTheme = (value: Theme) => {
  if (document) {
    document.documentElement.className = value;
  }

  themeState.theme = value;

  // Cookies can only be updated on the server
  fetch('/api/set-cookie', {
    body: JSON.stringify({ name: THEME_COOKIE, value }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST'
  });
};

export const getThemeContext = () => getContext<ThemeState>(THEME_COOKIE);
