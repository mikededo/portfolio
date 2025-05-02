declare module '*.md' {
  import type { SvelteComponent as _SvelteComponent } from 'svelte';

  export default class SvelteComponent extends _SvelteComponent {}

  // TODO: Add metadata typesafetiness
  export const metadata: Record<string, unknown>;
}
