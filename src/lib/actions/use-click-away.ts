import type { Action } from 'svelte/action';

type ClickAwayHandler = (event: MouseEvent) => void;

export const useClickAway: Action<HTMLElement, ClickAwayHandler> = (
  node,
  handler
) => {
  const isClickAway = (event: MouseEvent) =>
    !node.contains(event.target as HTMLElement) && !event.defaultPrevented;

  const executeHandler = (
    event: MouseEvent,
    handler: ClickAwayHandler
  ) => {
    if (isClickAway(event)) {
      handler(event);
    }
  };

  const onClick = (event: MouseEvent) => {
    executeHandler(event, handler as ClickAwayHandler);
  };

  document.addEventListener('mousedown', onClick, true);

  return {
    destroy() {
      document.removeEventListener('mousedown', onClick, true);
    }
  };
};
