import type { Action } from 'svelte/action';

import { Keys } from '$lib/keyboards';

// Credit:
//  - https://stackoverflow.com/a/30753870
const focusableSelector = [
  '[contentEditable=true]',
  '[tabindex]',
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'iframe',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])'
]
  .map((selector) => `${selector}:not([tabindex='-1'])`)
  .join(',');

export const getFocusableElements = (
  container: HTMLElement | null = document.body
) =>
  container == null
    ? []
    : Array.from(container.querySelectorAll<HTMLElement>(focusableSelector));

export const useTrapFocus: Action = (node) => {
  const onKeydown = (e: KeyboardEvent) => {
    const focusableElements = getFocusableElements(node);
    const iof = focusableElements.indexOf(document.activeElement as HTMLElement);

    if (e.key === Keys.ArrowDown || (e.key === Keys.Tab && !e.shiftKey)) {
      e.preventDefault();
      const nextIndex = (iof + 1) % focusableElements.length;
      focusableElements[nextIndex].focus();
    } else if (e.key === Keys.ArrowUp || (e.key === Keys.Tab && e.shiftKey)) {
      e.preventDefault();
      const prevIndex = (iof - 1 + focusableElements.length) % focusableElements.length;
      focusableElements[prevIndex].focus();
    }
  };

  node.addEventListener('keydown', onKeydown);
};
