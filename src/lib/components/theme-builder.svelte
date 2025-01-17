<script lang="ts">
    import { sineInOut } from 'svelte/easing';
    import { fade } from 'svelte/transition';

    type Theme = 'frappe' | 'latte' | 'macchiato' | 'mocha';
    const THEMES: Theme[] = ['latte', 'frappe', 'macchiato', 'mocha'];

    let show = $state(false);

    const onClick = () => {
        show = !show;
    };

    const onSelect = (theme: Theme) => () => {
        document.documentElement.className = theme;
    // TODO: Add cookie to the theme and also check in the hooks
    };
</script>

<div class="fixed bottom-12 left-2">
    {#if show}
        <div
            transition:fade={{ duration: 125, easing: sineInOut }}
            class="bg-mantle text-sm p-2 rounded-lg mb-1 flex flex-col gap-[1px]"
        >
            {#each THEMES as theme}
                <button
                    class="px-4 py-0.5 rounded-full hover:bg-base outline-none text-left"
                    onclick={onSelect(theme)}
                >
                    {theme}
                </button>
            {/each}
        </div>
    {/if}
    <button
        class="px-6 py-1 bg-mantle rounded-full hover:bg-crust w-[148px]"
        onclick={onClick}
    >
        <p class="text-sm">macchiato</p>
    </button>
</div>
