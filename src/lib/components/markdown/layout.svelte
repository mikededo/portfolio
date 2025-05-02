<script lang="ts" module>
    /* eslint-disable no-import-assign */
    // TODO: Create all markdown components

    import a from './a.svelte';
    import h1 from './h1.svelte';
    import h2 from './h2.svelte';
    import p from './p.svelte';
    import ul from './ul.svelte';

    export { a, h1, h2, p, ul };
</script>

<script lang="ts">
    import type { Snippet } from 'svelte';

    type Props = { children: Snippet<[{}]>; title?: string; description?: string };
    const { children, description, title }: Props = $props();
</script>

{@render children({ description, title })}

