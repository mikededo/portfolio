<script lang="ts">
    import { fade } from 'svelte/transition';

    import { page } from '$app/state';
    import { getAppContext } from '$lib/context';

    const containerClasses = $derived(
        page.url.pathname === '/'
            ? 'bottom-8 lg:bottom-12'
            : 'bottom-8 lg:bottom-18'
    );
    const { eventWatcher } = getAppContext();
</script>

<div class={`font-lg fixed right-2 flex flex-col items-end gap-0.5 ${containerClasses}`}>
    <div class="flex gap-0.5">
        {#each eventWatcher.keys as key (key)}
            <span
                class="rounded-md bg-mantle px-2 py-1 text-sm md:text-md"
                transition:fade={{ duration: 100 }}
            >
                {key}
            </span>
        {/each}
    </div>

    {#each eventWatcher.events.keys() as event (event)}
        <span
            class="rounded-md bg-mantle px-2 py-1 text-sm text-peach md:text-md"
            transition:fade={{ duration: 100 }}
        >
            {event}
        </span>
    {/each}
</div>
