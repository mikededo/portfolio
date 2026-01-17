<script lang="ts">
    import type { Snippet } from 'svelte'

    import { page } from '$app/state'
    import ThemeSwitcher from '$lib/components/theme-switcher.svelte'

    type Props = { children: Snippet }
    const { children }: Props = $props()

    const isNested = $derived(Object.keys(page.params).length > 0)
</script>

<main class="mx-auto w-full md:w-3/4" id="main-content">
    <nav aria-label="Breadcrumbs">
        <ol class="mb-4 flex gap-1 text-sm md:text-sm ">
            <li class="flex gap-1">
                <a class="group relative flex items-center gap-0.5 text-muted-foreground/75 transition-colors hover:text-foreground" href="/">
                    ~
                </a>
                <span class="text-muted-foreground/75" aria-hidden="true">/</span>
            </li>

            {#if isNested}
                <li class="flex gap-1">
                    <a class="text-muted-foreground transition-colors hover:text-foreground" href="/blog">blog</a>
                    <span class="text-muted-foreground/75" aria-hidden="true">/</span>
                </li>
                <li>
                    <span class="line-clamp-1 text-foreground">{page.params.slug}</span>
                </li>
            {:else}
                <li>
                    <span class="text-foreground">blog</span>
                </li>
            {/if}

            <ThemeSwitcher class="ml-auto" />
        </ol>
    </nav>

    {@render children()}
</main>
