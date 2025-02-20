import type { Theme } from '$lib/cookies';

import { getContext, setContext } from 'svelte';
import { SvelteSet } from 'svelte/reactivity';

import { THEME_COOKIE } from '$lib/cookies';
import { Keys } from '$lib/keyboards';

import { EventManager } from '../event-manager';

type AppState = {
  keyWatcher: SvelteSet<string>;
  theme: Theme;
  command: {
    show: boolean;
  };
};
const state = $state<AppState>({
  command: {
    show: false
  },
  keyWatcher: new SvelteSet<string>(),
  theme: 'macchiato'
});

// Function that's added for type safety
export const getAppContext = () => getContext<AppState>(THEME_COOKIE);
export const initAppContext = (theme: Theme) => {
  state.theme = theme;
  setContext<AppState>(THEME_COOKIE, state);
};

/* Theme */
export const changeTheme = (value: Theme) => {
  if (document) {
    document.documentElement.className = value;
  }

  state.theme = value;

  // Cookies can only be updated on the server
  fetch('/api/set-cookie', {
    body: JSON.stringify({ name: THEME_COOKIE, value }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST'
  });
};

/* Key Watcher */
const registerKey = (e: KeyboardEvent) => {
  if (e.key === Keys.Colon) {
    // Avoid registering the color which opens the command
    return;
  }

  state.keyWatcher.add(e.key);
};

const unregisterKey = (e: KeyboardEvent) => {
  state.keyWatcher.delete(e.key);
};

export const clearKeyWatcher = () => {
  state.keyWatcher.clear();
};

export const registerKeyWatcherEvents = () => {
  EventManager.register('keydown', registerKey);
  EventManager.register('keyup', unregisterKey);
};

export const unregisterKeyWatcherEvents = () => {
  // Clear any key
  state.keyWatcher.clear();

  EventManager.unregister('keydown', registerKey);
  EventManager.unregister('keyup', unregisterKey);
};

/* Command */
export const showCommand = () => {
  state.command.show = true;

  // When the command is shown, we do not want to register the keys
  unregisterKeyWatcherEvents();
};

export const hideCommand = () => {
  state.command.show = false;

  // Once the command is hidden, we want to register the keys again
  registerKeyWatcherEvents();
};

