<script lang="ts">
    import type { Snippet } from 'svelte';

    import { page } from '$app/state';
    import ThemeSwitcher from '$lib/components/theme-switcher.svelte';

    type Props = { children: Snippet };
    const { children }: Props = $props();

    const isNested = $derived(Object.keys(page.params).length > 0);
</script>

<main
    class="mx-auto w-full lg:w-3/4"
>
    <nav class="mb-4 flex gap-1 text-xs md:text-sm " role="list">
        <a class="group relative flex items-center gap-0.5 text-muted-foreground/75 transition-colors hover:text-foreground" href="/">
            ~
        </a>
        <span class="text-muted-foreground/75">/</span>

        {#if isNested}
            <a class="text-muted-foreground/75 transition-colors hover:text-foreground" href="/blog">blog</a>
            <span class="text-muted-foreground/75">/</span>
            <span class="line-clamp-1 text-foreground">{page.params.slug}</span>
        {:else}
            <span class="text-foreground">blog</span>
        {/if}

        <ThemeSwitcher class="ml-auto" />
    </nav>

    {@render children()}
</main>
