<script lang="ts">
    import type { Snippet } from 'svelte';

    import type { LayoutServerData } from './$types';

    import { ThemeSelector, Timer } from '$lib/components';

    type Props = { children: Snippet; data: LayoutServerData };
    const { children, data }: Props = $props();
</script>

<div class="flex h-full">
    <aside class="hidden h-full w-editor-sidebar shrink-0 bg-mantle lg:flex">
    </aside>

    <div class="flex h-full w-full flex-col">
        <!-- TODO: Add breadcrumbs -->
        <div class="flex h-editor-subheader shrink-0 items-center bg-mantle px-10 text-xs md:px-10">
            <span>~/home{data.pathname}</span>
        </div>

        <main class="flex h-editor-content w-editor-content overflow-auto text-sm md:text-md">
            {@render children()}
        </main>

        <div class="flex h-editor-bottom-pane shrink-0 items-center gap-4 overflow-hidden bg-mantle text-sm md:flex md:text-md">
            <div class="flex h-full items-center bg-blue px-3 text-base">NORMAL</div>
            <p class="hidden md:block">&middot;</p>
            <p class="hidden text-sm text-peach md:block">main</p>
            <p class="hidden md:block">&middot;</p>
            <p class="ml-auto mr-2 text-sm md:ml-0 lg:mr-0">~/home{data.pathname}/file.md</p>
            <div class="ml-auto box-content hidden h-full items-center rounded-l-full bg-crust px-4 text-sm md:flex">
                <Timer />
            </div>
        </div>
    </div>
</div>

<ThemeSelector sidebar />
