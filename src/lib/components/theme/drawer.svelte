<script lang="ts">
    import type { Theme } from '$lib/cookies';

    import { fade } from 'svelte/transition';

    import { changeTheme, getAppContext } from '$lib/context';

    const THEMES: Theme[] = ['latte', 'frappe', 'macchiato', 'mocha'];

    const appState = getAppContext();

    const onSelect = (value: Theme) => () => {
        changeTheme(value);
    };
</script>

<div class="flex flex-col gap-[1px]">
    {#each THEMES as themeKey}
        <button
            class="cursor-pointer py-0.5 text-left text-sm hover:bg-base"
            onclick={onSelect(themeKey)}
        >
            {themeKey}
            {#if themeKey === appState.theme}
                <span class="text-overlay0" transition:fade={{ duration: 100 }}>
                    (current)
                </span>
            {/if}
        </button>
    {/each}
</div>
