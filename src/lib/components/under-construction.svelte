<script lang="ts">
    import { XIcon } from '@lucide/svelte';
    import { fly } from 'svelte/transition';

    let showBanner = $state(true);

    const onHideBanner = () => {
        showBanner = false;
    };
</script>

{#if showBanner}
    <div
        class="under-construction fixed top-14 right-0 left-0 z-10 flex h-9 items-center bg-mantle px-4"
        out:fly={{ opacity: 1, y: -36 }}
    >
        <p class="flex-1 text-center text-xs text-yellow md:text-sm">
            The site is still under construction!
        </p>
        <button class="cursor-pointer outline-hidden" onclick={onHideBanner}>
            <XIcon class="size-4 transition-transform active:scale-[0.9] md:size-5" />
        </button>
    </div>
{/if}

<style>
.under-construction {
    --timer: 240s;
    background: repeating-linear-gradient(
        -45deg,
        hsl(var(--mantle)),
        hsl(var(--mantle)) 40px,
        hsl(var(--crust)) 40px,
        hsl(var(--crust)) 80px
    );
    animation: stripe-animation var(--timer) linear infinite;
    background-size: 200% 200%;

    @media (prefers-reduced-motion) {
        --timer: 0s;
    }
}

@keyframes stripe-animation {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: 200% 0;
    }
}
</style>
