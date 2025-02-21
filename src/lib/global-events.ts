import { goto } from '$app/navigation';

import {
  clearKeyWatcher,
  registerEvent,
  registerKeyWatcherEvents,
  unregisterKeyWatcherEvents
} from './context';
import { EventManager } from './event-manager';

const getCtrlAndKey = (key: string, cb: () => void) => (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === key) {
    event.preventDefault();
    cb();
  }
};

const KEYDOWN_EVENTS = [
  ...[
    ['h', '/', 'Go home'],
    ['a', '/about', 'Go /about'],
    ['p', '/projects', 'Go /projects']
  ].map(([key, href, event]) =>
    getCtrlAndKey(key, () => {
      goto(href);
      registerEvent(event);
    })
  ),
  ...[
    ['g', 'https://github.com/mikededo', 'Open GitHub'],
    ['i', 'https://github.com/mikededo/portfolio', 'Open repository'],
    ['d', 'https://www.figma.com/community/file/1473722594978911600', 'Open figma designs']
  ]
    .map(([key, href]) => getCtrlAndKey(key, () => {
      clearKeyWatcher();
      const w = window.open(href, '_blank');
      if (w) {
        w.opener = null;
      }
    }))
];

const register = () => {
  registerKeyWatcherEvents();
  KEYDOWN_EVENTS.forEach((event) => {
    EventManager.register('keydown', event);
  });
};

const unregister = () => {
  unregisterKeyWatcherEvents();
  KEYDOWN_EVENTS.forEach((event) => {
    EventManager.unregister('keydown', event);
  });
};

export const GlobalEvents = { register, unregister };
