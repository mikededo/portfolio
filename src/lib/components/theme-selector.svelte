<script lang="ts">
    import type { Theme } from '$lib/cookies';

    import { PaletteIcon } from '@lucide/svelte';
    import { sineInOut } from 'svelte/easing';
    import { fade } from 'svelte/transition';
    import { twMerge } from 'tailwind-merge';

    import { useClickAway } from '$lib/actions';
    import { changeTheme, getAppContext } from '$lib/context';

    const THEMES: Theme[] = ['latte', 'frappe', 'macchiato', 'mocha'];

    type Props = { sidebar?: boolean };
    const { sidebar }: Props = $props();

    let show = $state(false);
    const appState = getAppContext();

    const containerClasses = $derived(twMerge(
        'fixed right-0 bottom-0 left-0 z-30 lg:right-auto',
        !sidebar && 'lg:bottom-12 lg:left-2',
        sidebar && 'lg:bottom-(--height-footer) lg:left-0'
    ));
    const buttonClasses = $derived(twMerge(
        'flex w-full items-center justify-center gap-2 bg-crust px-6 py-1 hover:bg-mantle lg:py-0.5',
        !sidebar && 'lg:w-40 lg:rounded-full lg:py-1',
        sidebar && 'h-theme lg:w-editor-sidebar'
    ));
    const optionContainerClasses = $derived(twMerge(
        'flex flex-col gap-[1px] border-t-2 border-crust bg-mantle text-sm',
        !sidebar && 'py-1 lg:mb-1 lg:gap-1 lg:rounded-2xl lg:border-t-0 lg:px-1.5 lg:py-1.5',
        sidebar && 'py-1.5 lg:gap-1 lg:py-2.5'
    ));
    const optionClasses = $derived(twMerge(
        'cursor-pointer py-0.5 outline-hidden hover:bg-base lg:px-4 lg:py-1 lg:text-left',
        !sidebar && 'lg:rounded-full'
    ));

    const onClick = () => {
        show = !show;
    };

    const onHide = () => {
        if (show) {
            show = false;
        }
    };

    const onSelect = (value: Theme) => () => {
        changeTheme(value);
    };
</script>

{#if show}
    <div
        class="fixed inset-0 z-30 bg-base/75 lg:hidden"
        transition:fade={{ duration: 100, easing: sineInOut }}
    ></div>
{/if}
<div
    class={containerClasses}
    use:useClickAway={onHide}
>
    {#if show}
        <div
            class={optionContainerClasses}
            transition:fade={{ duration: 150, easing: sineInOut }}
        >
            {#each THEMES as themeKey}
                <button
                    class={optionClasses}
                    class:bg-base={themeKey === appState.theme}
                    onclick={onSelect(themeKey)}
                >
                    {themeKey}
                </button>
            {/each}
        </div>
    {/if}
    <button
        class={buttonClasses}
        onclick={onClick}
    >
        <PaletteIcon class="size-4" />
        <p class="text-sm">{appState.theme}</p>
    </button>
</div>
