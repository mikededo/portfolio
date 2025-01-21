<script lang="ts">
    import { Editor } from '$lib/components';
    import { About } from '$lib/content';

    const content = About.AboutInfoContent;
</script>

<Editor.LineNumbers count={content.length} />
<div class="w-editor-code shrink-0 py-1">
    {#each content as l, i}
        <div class="whitespace-nowrap">
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            {@html l}
            {#if i !== content.length - 1}
                <span class="text-surface1">↴</span>
            {/if}
        </div>
    {/each}
</div>

