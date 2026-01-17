<script lang="ts">
    import type { Snippet } from 'svelte'

    import { page } from '$app/state'
    import { CenterMarker, CornerMarkers } from '$lib/components'
    import ThemeSwitcher from '$lib/components/theme-switcher.svelte'

    type Props = { children: Snippet }
    const { children }: Props = $props()

    const isNested = $derived(Object.keys(page.params).length > 0)
</script>

<main
    class="relative mx-auto flex min-h-dvh w-full flex-col overflow-hidden bg-background/75 px-6 md:min-h-[calc(100dvh-var(--spacing)*8)] md:w-3/4 md:px-8"
    id="main-content"
>
    <CornerMarkers showCoordinates />
    <CenterMarker />

    <div class="absolute inset-y-6 left-0 w-px bg-muted" aria-hidden="true"></div>
    <div class="absolute inset-y-6 right-0 w-px bg-muted" aria-hidden="true"></div>
    <div class="absolute inset-x-6 top-0 h-px bg-muted" aria-hidden="true"></div>
    <div class="absolute inset-x-6 bottom-0 h-px bg-muted" aria-hidden="true"></div>

    <nav class="pt-6" aria-label="Breadcrumbs">
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
