<script lang="ts">
    import { getContext } from 'svelte';
    import { sineInOut } from 'svelte/easing';
    import { fade } from 'svelte/transition';

    import { useClickAway } from '$lib/actions/use-click-away';
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
    class="fixed bottom-12 left-2"
    use:useClickAway={onHide}
>
    {#if show}
        <div
            transition:fade={{ duration: 125, easing: sineInOut }}
            class="bg-mantle text-sm px-2 py-2.5 rounded-lg mb-1 flex flex-col gap-[1px]"
        >
            {#each THEMES as themeKey}
                <button
                    class="px-4 py-0.5 rounded-full hover:bg-base outline-none text-left"
                    class:bg-base={themeKey === themeState.theme}
                    onclick={onSelect(themeKey)}
                >
                    {themeKey}
                </button>
            {/each}
        </div>
    {/if}
    <button
        class="px-6 py-1 bg-mantle rounded-full hover:bg-crust w-[148px]"
        onclick={onClick}
    >
        <p class="text-sm">{themeState.theme}</p>
    </button>
</div>
