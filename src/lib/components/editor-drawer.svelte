<script lang="ts">
    import type { ActivitySummary } from '$lib/server';

    import type { FileTreeNode } from './editor';

    import { MenuIcon } from '@lucide/svelte';

    import BottomDrawer from './bottom-drawer.svelte';
    import { FileTree } from './editor';
    import StravaStats from './strava-stats.svelte';

    type Props = {
        filetree: FileTreeNode[];
        strava: ActivitySummary | null;
    };
    const { filetree, strava }: Props = $props();
</script>

<BottomDrawer class="flex flex-col gap-2 lg:hidden" title="Menu">
    {#snippet trigger(props)}
        <button
            class="fixed right-0 bottom-0 left-0 z-30 flex w-full cursor-pointer items-center justify-center gap-2 bg-crust px-6 py-1 text-sm hover:bg-mantle lg:hidden"
            {...props}
        >
            <MenuIcon class="size-4" />
            <span>Menu</span>
        </button>
    {/snippet}

    {#snippet children({ onClose: onItemClick })}
        <div class="flex flex-col gap-6">
            <div>
                <p class="mb-1 text-sm">Project</p>
                <FileTree drawer {filetree} {onItemClick} />
            </div>

            {#if strava}
                <StravaStats class="mb-0" data={strava} />
            {/if}
        </div>
    {/snippet}
</BottomDrawer>
