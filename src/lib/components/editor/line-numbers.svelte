<script lang="ts">
    import { twMerge } from 'tailwind-merge';

    type Props = {
        active: null | number;
        lineHeight: number;
        count: number;
        class?: string;
        relative?: boolean;
    };
    const { active, count, lineHeight, relative, ...restProps }: Props = $props();
</script>

<div
    class={twMerge('sticky left-0 flex h-fit w-editor-line-numbers shrink-0 flex-col bg-base px-2', restProps.class)}
>
    {#each { length: count } as _, i}
        <span
            class="text-right text-overlay1"
            aria-hidden={true}
            style="height: {lineHeight}px;"
            class:text-text={i === active}
        >
            {relative && active ? Math.max(i === active ? i : Math.abs(i - active), 1) : i + 1}
        </span>
    {/each}
</div>
