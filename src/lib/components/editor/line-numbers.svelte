<script lang="ts">
    type Props = { active: number; count: number };
    const { active, count }: Props = $props();
</script>

<div class="w-editor-line-numbers bg-base sticky left-0 flex h-fit shrink-0 flex-col px-2">
    {#each { length: count } as _, i}
        <span
            class:text-text={i === active}
            class="text-overlay1 text-right"
        >
            {Math.max(i === active ? i : Math.abs(i - active), 1)}
        </span>
    {/each}
</div>
