import { browser } from '$app/environment'

export const prefersReducedMotion = (): boolean => {
  if (!browser) {
    return false
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
