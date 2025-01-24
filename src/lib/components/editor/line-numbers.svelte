<script lang="ts">
    type Props = { count: number };
    const { count }: Props = $props();
</script>

<div class="w-editor-line-numbers bg-base sticky left-0 flex h-fit shrink-0 flex-col px-2 py-1">
    {#each { length: count } as _, i}
        <span class="text-overlay1 text-right">{i + 1}</span>
    {/each}
</div>
