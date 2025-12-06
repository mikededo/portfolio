import type { ClassValue } from 'svelte/elements'

declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

declare module 'tailwind-merge' {
  type ClassNameValue = ClassValue
}

export {}
