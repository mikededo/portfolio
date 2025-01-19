<script lang="ts">
    import type { Snippet } from 'svelte';

    import type { LayoutServerData } from './$types';

    import { Timer } from '$lib/components';

    type Props = { children: Snippet; data: LayoutServerData };
    const { children, data }: Props = $props();
</script>

<div class="flex h-full">
    <aside class="hidden h-full w-60 bg-mantle md:flex">
    </aside>

    <div class="flex h-full w-full flex-col">
        <!-- TODO: Add breadcrumbs -->
        <div class="flex h-6 items-center bg-mantle px-10 text-xs">
            <span>~/home{data.pathname}</span>
        </div>

        {@render children()}

        <div class="flex h-6 items-center gap-4 overflow-hidden bg-mantle">
            <div class="h-full bg-blue px-3 text-base">NORMAL</div>
            <p>&middot;</p>
            <p class="text-sm text-peach">main</p>
            <p>&middot;</p>
            <p class="text-sm">~/home{data.pathname}/file.md</p>
            <div class="ml-auto box-content flex h-full items-center rounded-l-full bg-crust px-4 text-sm">
                <Timer />
            </div>
        </div>
    </div>
</div>

