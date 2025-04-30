<script lang="ts">
    import { twMerge } from 'tailwind-merge';

    type Props = {
        active: number;
        lineHeight: number;
        count: number;
        class?: string;
    };
    const { active, count, lineHeight, ...restProps }: Props = $props();
</script>

<div
    class={twMerge('w-editor-line-numbers px-2 bg-base sticky left-0 flex h-fit shrink-0 flex-col', restProps.class)}
>
    {#each { length: count } as _, i}
        <span
            class="text-overlay1 text-right"
            style="height: {lineHeight}px;"
            class:text-text={i === active}
        >
            {Math.max(i === active ? i : Math.abs(i - active), 1)}
        </span>
    {/each}
</div>
