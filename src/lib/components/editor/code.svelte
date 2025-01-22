<script lang="ts">
    import { parseContent } from '$lib/content';

    type Props = { code: string[] };

    const { code }: Props = $props();
</script>

<div class="w-editor-code shrink-0 py-1">
    {#each code as c, i}
        <div class="whitespace-nowrap">
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            {@html parseContent(c)}
            {#if i !== code.length - 1}
                <span class="text-surface1">↴</span>
            {/if}
        </div>
    {/each}
</div>
