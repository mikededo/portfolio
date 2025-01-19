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
    class="fixed bottom-10 right-0 md:right-auto md:bottom-12 left-0 md:left-2"
    use:useClickAway={onHide}
>
    {#if show}
        <div
            transition:fade={{ duration: 125, easing: sineInOut }}
            class="bg-mantle text-sm md:px-2 py-2.5 md:rounded-lg mb-1 flex flex-col gap-[1px]"
        >
            {#each THEMES as themeKey}
                <button
                    class="md:px-4 py-0.5 md:rounded-full hover:bg-base outline-none md:text-left"
                    class:bg-base={themeKey === themeState.theme}
                    onclick={onSelect(themeKey)}
                >
                    {themeKey}
                </button>
            {/each}
        </div>
    {/if}
    <button
        class="px-6 py-1 bg-mantle w-full md:rounded-full hover:bg-crust md:w-[148px]"
        onclick={onClick}
    >
        <p class="text-sm">{themeState.theme}</p>
    </button>
</div>
