<script lang="ts">
    import type { LayoutProps } from './$types'

    import { MoveLeftIcon, MoveRightIcon } from '@lucide/svelte'

    import { TableOfContents } from '$lib/components'
    import Link from '$lib/components/link.svelte'

    const { children, data }: LayoutProps = $props()
</script>

<TableOfContents />

{@render children()}

<hr class="mt-10 mb-4 text-muted" />

<footer class="mx-auto flex w-full flex-col items-center justify-between gap-2 text-sm lg:h-24">
    <div class="flex w-full items-center justify-between">
        {#if data.prev}
            <a
                class="group flex items-start gap-2 px-2 py-1 no-underline transition-colors duration-150 hover:bg-muted/75"
                href={data.prev.relativeURL}
                aria-label="Previous post: {data.prev.title}"
            >
                <MoveLeftIcon
                    class="mt-1 size-3 translate-x-0.5 text-foreground opacity-0 transition-all duration-150 ease-in-out group-hover:translate-x-0 group-hover:opacity-100"
                    aria-hidden="true"
                />
                <span class="flex flex-col items-start">
                    <span class="text-foreground">Prev post</span>
                    <span class="line-clamp-1 max-w-32 text-xs text-foreground sm:max-w-48">{data.prev.title}</span>
                </span>
            </a>
        {:else}
            <span class="flex items-center gap-2 px-2 py-1 text-muted-foreground/50">
                <MoveLeftIcon class="size-3" aria-hidden="true" />
                <span>Prev post</span>
            </span>
        {/if}

        {#if data.next}
            <a
                class="group flex items-start gap-2 px-2 py-1 no-underline transition-colors duration-150 hover:bg-muted/75"
                href={data.next.relativeURL}
                aria-label="Next post: {data.next.title}"
            >
                <span class="flex flex-col items-end">
                    <span class="text-foreground">Next post</span>
                    <span class="line-clamp-1 max-w-32 truncate text-right text-xs text-foreground sm:max-w-48" style="scrollbar-gutter: auto">{data.next.title}</span>
                </span>
                <MoveRightIcon
                    class="mt-1 size-3 -translate-x-0.5 text-foreground opacity-0 transition-all duration-150 ease-in-out group-hover:translate-x-0 group-hover:opacity-100"
                    aria-hidden="true"
                />
            </a>
        {:else}
            <span class="flex items-center gap-2 px-2 py-1 text-muted-foreground/50">
                <span>Next post</span>
                <MoveRightIcon class="size-3" aria-hidden="true" />
            </span>
        {/if}
    </div>
    <p class="mb-4 text-center text-xs text-muted-foreground">
        Created by
        <Link href="https://github.com/mikdededo">@mikededo</Link>
    </p>
</footer>
