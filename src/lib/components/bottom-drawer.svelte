<script lang="ts">
    import type { Snippet } from 'svelte';

    import { XIcon } from '@lucide/svelte';
    import { sineInOut } from 'svelte/easing';
    import { Spring } from 'svelte/motion';
    import { fade } from 'svelte/transition';
    import { twMerge } from 'tailwind-merge';

    import { useClickAway } from '$lib/actions';

    type Props = {
        children: Snippet<[{ onClose: () => void; onShow: () => void }]>;
        title: string;
        trigger: Snippet<[{ onclick: () => void }]>;
        class?: string;
    };
    const { children, title, trigger, ...restProps }: Props = $props();

    let show = $state(false);
    const transformY = new Spring(0);

    const onShow = () => {
        show = true;
        transformY.set(100);
    };

    const onClose = () => {
        show = false;
        transformY.set(0);
    };
</script>

{@render trigger({ onclick: show ? onClose : onShow })}

{#if show}
    <div
        class="fixed inset-0 z-30 bg-base/75 backdrop-blur-[2px] lg:hidden"
        transition:fade={{ duration: 200, easing: sineInOut }}
    ></div>
{/if}
<div
    class={twMerge('fixed top-full right-0 left-0 z-30 rounded-2xl bg-mantle p-4', restProps.class)}
    use:useClickAway={onClose}
    style="transform: translateY(-{transformY.current}%); --tw-shadow-alpha: {transformY.current}%"
>
    <div class="flex w-full items-center justify-between">
        <span class="font-semibold">{title}</span>
        <XIcon
            class="size-5 cursor-pointer"
            role="button"
            onclick={onClose}
            aria-label="Close"
        />
    </div>
    {@render children({ onClose, onShow })}
</div>

