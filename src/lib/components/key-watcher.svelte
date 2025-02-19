<script lang="ts">
    import { fade } from 'svelte/transition';

    import { page } from '$app/state';
    import { getKeyWatcherContext } from '$lib/context';

    const containerClasses = $derived(
        page.url.pathname === '/'
            ? 'bottom-8 lg:bottom-12'
            : 'bottom-8 lg:bottom-18'
    );
    const keys = getKeyWatcherContext();
</script>

<div class={`font-lg fixed right-2 flex gap-0.5 ${containerClasses}`}>
    {#each keys as k (k)}
        <span
            class="text-rosewater bg-mantle rounded-md px-2 py-1 text-sm md:text-md"
            transition:fade={{ duration: 100 }}
        >
            {k}
        </span>
    {/each}
</div>
