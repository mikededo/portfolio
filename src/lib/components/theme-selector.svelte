<script lang="ts">
    import { getContext } from 'svelte';
    import { sineInOut } from 'svelte/easing';
    import { fade } from 'svelte/transition';

    import { useClickAway } from '$lib/actions';
    import { type Theme, THEME_COOKIE } from '$lib/cookies';

    const THEMES: Theme[] = ['latte', 'frappe', 'macchiato', 'mocha'];

    const themeState = getContext<{ theme: Theme }>(THEME_COOKIE);
    let show = $state(false);

    const onClick = () => {
        show = !show;
    };

    const onHide = () => {
        if (show) {
            show = false;
        }
    };

    const onSelect = (value: Theme) => () => {
        document.documentElement.className = value;
        themeState.theme = value;

        fetch('/api/set-cookie', {
            body: JSON.stringify({ name: THEME_COOKIE, value }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        });
    };
</script>

<div
    class="fixed bottom-10 left-0 right-0 md:bottom-12 md:left-2 md:right-auto"
    use:useClickAway={onHide}
>
    {#if show}
        <div
            transition:fade={{ duration: 125, easing: sineInOut }}
            class="mb-1 flex flex-col gap-[1px] bg-mantle py-2.5 text-sm md:rounded-lg md:px-2"
        >
            {#each THEMES as themeKey}
                <button
                    class="py-0.5 outline-none hover:bg-base md:rounded-full md:px-4 md:text-left"
                    class:bg-base={themeKey === themeState.theme}
                    onclick={onSelect(themeKey)}
                >
                    {themeKey}
                </button>
            {/each}
        </div>
    {/if}
    <button
        class="w-full bg-mantle px-6 py-1 hover:bg-crust md:w-[148px] md:rounded-full"
        onclick={onClick}
    >
        <p class="text-sm">{themeState.theme}</p>
    </button>
</div>
