<script lang="ts">
    import { parseContent } from '$lib/content';

    type Props = { active: number; code: string[] };
    const { active, code }: Props = $props();
</script>

<div class="max-h-editor-bottom-pane shrink-0">
    <div class="min-w-(--width-editor-code) w-fit">
        {#each code as c, i}
            <div
                class="whitespace-nowrap"
                class:active={i === active}
            >
                <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                {@html parseContent(c)}
                <span class="text-surface1">↴</span>
            </div>
        {/each}
    </div>
</div>

<style>
.active {
   background-color: var(--color-surface0);
}
</style>
