<script lang="ts">
    import type { LayoutProps } from './$types';

    import { MoveLeftIcon, MoveRightIcon } from '@lucide/svelte';

    import { TableOfContents } from '$lib/components';
    import Link from '$lib/components/link.svelte';

    const { children }: LayoutProps = $props();
</script>

<TableOfContents />

{@render children()}

<hr class="mt-10 mb-4 text-muted" />

<footer class="mx-auto flex flex-col items-center justify-between text-xs md:max-w-3/4 lg:h-16">
    <div class="flex w-full justify-between">
        <button class="group flex items-center gap-2 px-2 py-1 transition-colors duration-150 hover:bg-muted/75">
            <MoveLeftIcon
                class="size-3 translate-x-0.5 opacity-0 transition-all duration-150 ease-in-out group-hover:translate-x-0 group-hover:opacity-100"
            />
            <span>next post</span>
        </button>
        <button class="group flex items-center gap-2 px-2 py-1 transition-colors duration-150 hover:bg-muted/75">
            <span>prev post</span>
            <MoveRightIcon class="size-3 -translate-x-0.5 opacity-0 transition-all duration-150 ease-in-out group-hover:translate-x-0 group-hover:opacity-100" />
        </button>
    </div>
    <p class="text-center text-muted-foreground">
        created by
        <Link href="https://github.com/mikdededo">@mikededo</Link>
    </p>
</footer>
