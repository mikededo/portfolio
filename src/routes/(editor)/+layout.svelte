<script lang="ts">
    import type { LayoutServerData } from './$types';

    const content: Record<number, string> = {
        12: '┌────────────────────────┐',
        13: '│ Still working on this! │',
        14: '└────────────────────────┘',
        15: '             \\   ^__^',
        16: '              \\  (oo)\\_______',
        17: '                 (__)\\       )\\/\\',
        18: '                     ||----w |',
        19: '                     ||     ||'
    };

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

        <div class="flex">
            <div class="flex flex-col gap-0 px-2 py-1">
                {#each { length: 30 } as _, i}
                    <span class="text-right text-overlay1">{i + 1}</span>
                {/each}
            </div>
            <div class="flex w-full flex-col gap-0 whitespace-normal">
                {#each { length: 30 } as _, i}
                    <span>
                        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                        {@html content[i]?.replaceAll(' ', '<span class="text-surface1">·</span>')}
                        {#if i !== 29}
                            <span class="text-surface1">↴</span>
                        {/if}
                    </span>
                {/each}
            </div>
        </div>
    </div>
</div>

