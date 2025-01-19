<script lang="ts">
    import { About } from '$lib/content';

    const content = About.AboutInfoContent;
</script>

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

