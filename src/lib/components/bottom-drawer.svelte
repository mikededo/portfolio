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
        title: Snippet;
        trigger: Snippet<[{ onclick: () => void }]>;
        /**
         * Forwarded to the parent container
         */
        class?: string;
        /**
         * Height value without including the padding nor the title height.
         * This values are provided by the drawer, as padding and header height
         * are contained in this component.
         */
        height?: number;
        /**
         * Called when the close button is pressed
         */
        onClose?: () => void;
    };
    const { children, title, trigger, ...restProps }: Props = $props();

    let show = $state(false);
    const transformY = new Spring(0);
    const height = new Spring(0);

    $effect(() => {
        if (restProps.height === undefined || restProps.height === height.target) {
            return;
        }

        height.set(restProps.height + 64);
    });

    const onShow = () => {
        show = true;
        transformY.set(100);
    };

    const onClose = () => {
        show = false;
        transformY.set(0);

        restProps.onClose?.();
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
    style="transform: translateY(-{transformY.current}%); --tw-shadow-alpha: {transformY.current}%; height: {height.current}px"
>
    <div class="flex w-full items-center justify-between">
        {@render title()}
        <XIcon
            class="size-5 cursor-pointer"
            role="button"
            onclick={onClose}
            aria-label="Close"
        />
    </div>
    {@render children({ onClose, onShow })}
</div>

