import { goto } from '$app/navigation';

import { clearKeyWatcher, registerKeyWatcherEvents, unregisterKeyWatcherEvents } from './context';
import { EventManager } from './event-manager';

const getCtrlAndKey = (key: string, cb: () => void) => (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === key) {
    event.preventDefault();
    cb();
  }
};

const KEYDOWN_EVENTS = [
  ...[
    ['h', '/'],
    ['a', '/about'],
    ['p', '/projects']
  ].map(([key, href]) =>
    getCtrlAndKey(key, () => {
      goto(href);
    })
  ),
  ...[
    ['g', 'https://github.com/mikededo'],
    ['i', 'https://github.com/mikededo/portfolio'],
    ['d', 'https://www.figma.com/community/file/1473722594978911600']
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
