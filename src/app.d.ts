import type { ClassValue } from 'svelte/elements'

import type { Pathname } from '$app/types'

type NonApiRoutes = Exclude<Pathname, `/api${string}`>

declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  namespace svelteHTML {
    // This adds typed urls for anchor elements
    interface IntrinsicElements {
      a: {
        href?: ({} & string) | NonApiRoutes | null
      } & Omit<HTMLAnchorElements, 'href'>
    }
  }
}

declare module 'tailwind-merge' {
  type ClassNameValue = ClassValue
}

export {}
