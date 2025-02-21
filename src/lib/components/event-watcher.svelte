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

<div class={`font-lg fixed flex right-2 flex-col gap-0.5 items-end ${containerClasses}`}>
    <div class="flex gap-0.5">
        {#each eventWatcher.keys as key (key)}
            <span
                class="bg-mantle rounded-md px-2 py-1 text-sm md:text-md"
                transition:fade={{ duration: 100 }}
            >
                {key}
            </span>
        {/each}
    </div>

    {#each eventWatcher.events.keys() as event (event)}
        <span
            class="text-peach bg-mantle rounded-md px-2 py-1 text-sm md:text-md"
            transition:fade={{ duration: 100 }}
        >
            {event}
        </span>
    {/each}
</div>
