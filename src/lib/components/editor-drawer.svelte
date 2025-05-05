<script lang="ts">
    import type { ActivitySummary } from '$lib/server';

    import type { FileTreeNode } from './editor';

    import { ArrowLeftIcon, MenuIcon, MoveLeftIcon, PaletteIcon } from '@lucide/svelte';
    import { slide } from 'svelte/transition';

    import { getAppContext } from '$lib/context';

    import BottomDrawer from './bottom-drawer.svelte';
    import { FileTree } from './editor';
    import StravaStats from './strava-stats.svelte';
    import { DrawerThemeSelector } from './theme';

    type Props = {
        filetree: FileTreeNode[];
        strava: ActivitySummary | null;
    };
    const { filetree, strava }: Props = $props();

    let theme = $state(false);
    let themeView = $state<HTMLElement | null>();
    let defaultView = $state<HTMLElement | null>();
    let height = $state(0);

    const appState = getAppContext();

    $effect(() => {
        if (theme) {
            height = themeView?.getBoundingClientRect().height ?? 0;
            return;
        }

        height = defaultView?.getBoundingClientRect().height ?? 0;
    });

    const onToggleTheme = (force?: boolean) => () => {
        theme = force === undefined ? !theme : force;
    };
</script>

<BottomDrawer
    class="flex flex-col gap-2 lg:hidden"
    {height}
    onClose={onToggleTheme(false)}
>
    {#snippet title()}
        <div class="flex items-center">
            {#if theme}
                <button
                    class="mr-4 flex cursor-pointer items-center gap-2 text-xs"
                    transition:slide={{ axis: 'x', duration: 250 }}
                    onclick={onToggleTheme()}
                >
                    <MoveLeftIcon class="size-4" />
                    <span>Back</span>
                </button>
            {/if}

            <span class="font-semibold">Menu</span>
        </div>
    {/snippet}

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
        {#if theme}
            <div bind:this={themeView}>
                <DrawerThemeSelector />
            </div>
        {:else}
            <div
                class="flex flex-col gap-4"
                bind:this={defaultView}
            >
                <div>
                    <p class="mb-1 text-sm">Project</p>
                    <FileTree drawer {filetree} {onItemClick} />
                </div>

                <button
                    class="flex cursor-pointer items-center justify-between"
                    onclick={onToggleTheme()}
                >
                    <p class="text-sm">Theme <span class="text-overlay0">({appState.theme})</span></p>
                    <PaletteIcon class="size-4" />
                </button>

                {#if strava}
                    <StravaStats class="mb-0" data={strava} />
                {/if}
            </div>
        {/if}
    {/snippet}
</BottomDrawer>
