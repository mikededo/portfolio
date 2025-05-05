<script lang="ts">
    import type { Theme } from '$lib/cookies';

    import { PaletteIcon } from '@lucide/svelte';
    import { sineInOut } from 'svelte/easing';
    import { fade } from 'svelte/transition';
    import { twMerge } from 'tailwind-merge';

    import { useClickAway } from '$lib/actions';
    import { changeTheme, getAppContext } from '$lib/context';

    const THEMES: Theme[] = ['latte', 'frappe', 'macchiato', 'mocha'];

    type Props = { editor?: boolean };
    const { editor }: Props = $props();

    let show = $state(false);
    const appState = getAppContext();

    const containerClasses = $derived(twMerge(
        'fixed right-auto z-30 hidden lg:block',
        editor ? 'bottom-(--height-footer) left-0' : 'bottom-12 left-2'
    ));
    const buttonClasses = $derived(twMerge(
        'flex cursor-pointer items-center justify-center gap-2 bg-crust px-6 py-0.5 hover:bg-mantle',
        editor ? 'h-theme w-editor-sidebar' : 'w-40 rounded-full py-1'
    ));
    const optionContainerClasses = $derived(twMerge(
        'flex flex-col gap-1 border-crust bg-mantle py-2.5 text-sm',
        editor ? 'border-t-2' : 'mb-1 rounded-2xl border-t-0 px-1.5 py-1.5'
    ));
    const optionClasses = $derived(twMerge(
        'cursor-pointer px-4 py-1 text-left outline-hidden hover:bg-base',
        !editor && 'rounded-full'
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
