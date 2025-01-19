<script lang="ts">
    import type { LayoutServerData } from './$types';

    import { Timer } from '$lib/components';
    import { About } from '$lib/content';

    const content = About.AboutInfoContent;

    type Props = { data: LayoutServerData };
    const { data }: Props = $props();
</script>

<div class="flex h-full">
    <aside class="hidden h-full w-60 bg-mantle md:flex">
    </aside>

    <div class="flex h-full w-full flex-col">
        <!-- TODO: Add breadcrumbs -->
        <div class="flex h-6 items-center bg-mantle px-10 text-xs">
            <span>~/home{data.pathname}</span>
        </div>

        <div class="flex flex-1 text-sm md:text-md">
            <div class="flex flex-col px-2 py-1">
                {#each { length: content.length } as _, i}
                    <span class="text-right text-overlay1">{i + 1}</span>
                {/each}
            </div>
            <div class="flex w-full flex-col py-1">
                {#each content as l, i}
                    <span>
                        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                        {@html l}
                        {#if i !== content.length - 1}
                            <span class="text-surface1">↴</span>
                        {/if}
                    </span>
                {/each}
            </div>
        </div>

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

