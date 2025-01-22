<script lang="ts">
    type Props = { count: number };
    const { count }: Props = $props();
</script>

<div class="sticky left-0 flex h-fit w-editor-line-numbers shrink-0 flex-col bg-base px-2 py-1">
    {#each { length: count } as _, i}
        <span class="text-right text-overlay1">{i + 1}</span>
    {/each}
</div>
