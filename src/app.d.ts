import type { Pathname } from '$app/types'
import type { ClassValue } from 'svelte/elements'

declare global {
  type NonApiRoutes = Exclude<Pathname, `/api${string}`>

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
