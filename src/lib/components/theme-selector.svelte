<script lang="ts">
    import { PaletteIcon } from 'lucide-svelte';
    import { sineInOut } from 'svelte/easing';
    import { fade } from 'svelte/transition';
    import { twMerge } from 'tailwind-merge';

    import { useClickAway } from '$lib/actions';
    import { changeTheme, getThemeContext } from '$lib/context';
    import { type Theme } from '$lib/cookies';

    const THEMES: Theme[] = ['latte', 'frappe', 'macchiato', 'mocha'];

    type Props = { sidebar?: boolean };
    const { sidebar }: Props = $props();

    let show = $state(false);
    const themeState = getThemeContext();

    const containerClasses = $derived(twMerge(
        'fixed bottom-0 left-0 right-0 lg:right-auto z-30',
        !sidebar && 'lg:left-2 lg:bottom-12',
        sidebar && 'lg:bottom-[var(--footer)] lg:left-0'
    ));
    const buttonClasses = $derived(twMerge(
        'flex w-full items-center justify-center gap-2 bg-crust px-6 py-1 hover:bg-mantle lg:py-0.5',
        !sidebar && 'lg:rounded-full lg:py-1 lg:w-40',
        sidebar && 'lg:w-editor-sidebar'
    ));
    const optionContainerClasses = $derived(twMerge(
        'flex flex-col gap-[1px] bg-mantle text-sm border-t-2 border-crust',
        !sidebar && 'lg:rounded-2xl lg:mb-1 lg:px-1.5 py-1 lg:py-1.5 lg:gap-1 lg:border-t-0',
        sidebar && 'py-1.5 lg:gap-1 lg:py-2.5'
    ));
    const optionClasses = $derived(twMerge(
        'py-0.5 outline-none hover:bg-base lg:px-4 lg:py-1 lg:text-left',
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
        transition:fade={{ duration: 100, easing: sineInOut }}
        class="fixed inset-0 z-30 bg-base/75 lg:hidden"
    ></div>
{/if}
<div
    class={containerClasses}
    use:useClickAway={onHide}
>
    {#if show}
        <div
            transition:fade={{ duration: 150, easing: sineInOut }}
            class={optionContainerClasses}
        >
            {#each THEMES as themeKey}
                <button
                    class={optionClasses}
                    class:bg-base={themeKey === themeState.theme}
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
        <p class="text-sm">{themeState.theme}</p>
    </button>
</div>
