<script lang="ts">
    import { sineInOut } from 'svelte/easing';
    import { fade } from 'svelte/transition';

    import { useClickAway } from '$lib/actions';
    import { changeTheme, getThemeContext } from '$lib/context';
    import { type Theme } from '$lib/cookies';

    const THEMES: Theme[] = ['latte', 'frappe', 'macchiato', 'mocha'];

    let show = $state(false);
    const themeState = getThemeContext();

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
    class="fixed bottom-10 left-0 right-0 lg:bottom-[var(--footer)] lg:left-0 lg:right-auto"
    use:useClickAway={onHide}
>
    {#if show}
        <div
            transition:fade={{ duration: 125, easing: sineInOut }}
            class="flex flex-col gap-[1px] border-y-2 border-crust bg-mantle py-1.5 text-sm lg:gap-1 lg:py-2.5"
        >
            {#each THEMES as themeKey}
                <button
                    class="py-0.5 outline-none hover:bg-base lg:px-4 lg:py-1 lg:text-left"
                    class:bg-base={themeKey === themeState.theme}
                    onclick={onSelect(themeKey)}
                >
                    {themeKey}
                </button>
            {/each}
        </div>
    {/if}
    <button
        class="w-full bg-crust px-6 py-1 hover:bg-mantle lg:w-editor-sidebar lg:py-0.5"
        onclick={onClick}
    >
        <p class="text-sm">{themeState.theme}</p>
    </button>
</div>
