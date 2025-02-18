import { goto } from '$app/navigation';

import { EventManager } from './event-manager';

const getCMDAndKey = (key: string, cb: () => void) => (event: KeyboardEvent) => {
  if ((event.metaKey || event.ctrlKey) && event.key === key) {
    event.preventDefault();
    cb();
  }
};

const EVENTS = [
  ...[['a', '/about'], ['p', '/projects']].map(([key, href]) =>
    getCMDAndKey(key, () => {
      goto(href);
    })
  ),
  ...[
    ['g', 'https://github.com/mikededo'],
    ['i', 'https://github.com/mikededo/portfolio'],
    ['d', 'https://www.figma.com/community/file/1473722594978911600']
  ]
    .map(([key, href]) => getCMDAndKey(key, () => {
      const w = window.open(href, '_blank');
      if (w) {
        w.opener = null;
      }
    }))
];

const register = () => {
  EVENTS.forEach((event) => {
    EventManager.register('keydown', event);
  });
};

const unregister = () => {
  EVENTS.forEach((event) => {
    EventManager.unregister('keydown', event);
  });
};

export const GlobalEvents = { register, unregister };
