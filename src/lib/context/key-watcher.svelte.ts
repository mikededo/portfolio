import { getContext, setContext } from 'svelte';
import { SvelteSet } from 'svelte/reactivity';

import { EventManager } from '../event-manager';

const CONTEXT_KEY = 'key-watcher';
const keyWatcherState = $state(new SvelteSet<string>());

export const initKeyWatcherContext = () => {
  setContext(CONTEXT_KEY, keyWatcherState);
};

export const getKeyWatcherContext = () => getContext<Set<string>>(CONTEXT_KEY);

const registerKey = (e: KeyboardEvent) => {
  keyWatcherState.add(e.key);
};

const unregisterKey = (e: KeyboardEvent) => {
  keyWatcherState.delete(e.key);
};

export const clearKeyWatcher = () => {
  keyWatcherState.clear();
};

export const registerKeyWatcherEvents = () => {
  EventManager.register('keydown', registerKey);
  EventManager.register('keyup', unregisterKey);
};

export const unregisterKeyWatcherEvents = () => {
  EventManager.unregister('keydown', registerKey);
  EventManager.unregister('keyup', unregisterKey);
};

