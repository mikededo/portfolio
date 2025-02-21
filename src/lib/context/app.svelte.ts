import type { Theme } from '$lib/cookies';

import { getContext, setContext } from 'svelte';
import { SvelteMap, SvelteSet } from 'svelte/reactivity';

import { THEME_COOKIE } from '$lib/cookies';
import { Keys } from '$lib/keyboards';

import { EventManager } from '../event-manager';

const EVENT_TIMEOUT = 2000;

type AppState = {
  theme: Theme;
  command: {
    show: boolean;
  };
  eventWatcher: {
    events: SvelteMap<string, number>;
    keys: SvelteSet<string>;
  };
};
const state = $state<AppState>({
  command: {
    show: false
  },
  eventWatcher: {
    events: new SvelteMap<string, number>(),
    keys: new SvelteSet<string>()
  },
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

/* Event Watcher */
const registerKey = (e: KeyboardEvent) => {
  if (e.key === Keys.Colon) {
    // Avoid registering the color which opens the command
    return;
  }

  state.eventWatcher.keys.add(e.key);
};

const unregisterKey = (e: KeyboardEvent) => {
  state.eventWatcher.keys.delete(e.key);
};

export const clearKeyWatcher = () => {
  state.eventWatcher.keys.clear();
};

export const registerKeyWatcherEvents = () => {
  EventManager.register('keydown', registerKey);
  EventManager.register('keyup', unregisterKey);
};

export const unregisterKeyWatcherEvents = () => {
  // Clear any key
  state.eventWatcher.keys.clear();

  EventManager.unregister('keydown', registerKey);
  EventManager.unregister('keyup', unregisterKey);
};

/* Events */
export const registerEvent = (event: string) => {
  const timeout = setTimeout(() => {
    state.eventWatcher.events.delete(event);
  }, EVENT_TIMEOUT);

  const previous = state.eventWatcher.events.get(event);
  if (previous) {
    clearTimeout(previous);
  }

  state.eventWatcher.events.set(event, timeout);
};

export const cleanupEvents = () => {
  state.eventWatcher.events.values().forEach((timeoutId) => {
    clearTimeout(timeoutId);
  });
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

