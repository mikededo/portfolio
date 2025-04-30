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
    class={twMerge('sticky left-0 flex h-fit w-editor-line-numbers shrink-0 flex-col bg-base px-2', restProps.class)}
>
    {#each { length: count } as _, i}
        <span
            class="text-right text-overlay1"
            style="height: {lineHeight}px;"
            class:text-text={i === active}
        >
            {Math.max(i === active ? i : Math.abs(i - active), 1)}
        </span>
    {/each}
</div>
