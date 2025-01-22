<script lang="ts">
    import '../app.css';

    import type { Snippet } from 'svelte';

    import type { LayoutServerData } from './$types';

    import { XIcon } from 'lucide-svelte';
    import { fly } from 'svelte/transition';

    import { Command } from '$lib/components';
    import { initThemeContext } from '$lib/context';

    type Props = {
        children: Snippet;
        data: LayoutServerData;
    };
    const { children, data }: Props = $props();

    initThemeContext(data.theme);

    let showBanner = $state(true);

    const onHideBanner = () => {
        showBanner = false;
    };
</script>

<div class="flex h-screen flex-col">
    <header class="z-20 flex h-header w-full shrink-0 justify-between bg-crust px-4 py-3">
        <p class="text-xl font-semibold">
            @mikededo
        </p>
        <nav class="flex items-center gap-6">
            <a href="/" class="text-sm text-mauve">home</a>
            <a href="/projects" class="text-sm hover:text-mauve">projects</a>
            <a href="/about" class="text-sm hover:text-mauve">about</a>
        </nav>
    </header>

    {#if showBanner}
        <div
            class="under-construction fixed left-0 right-0 top-14 z-10 flex h-9 items-center bg-mantle px-4"
            out:fly={{ opacity: 1, y: -36 }}
        >
            <p class="flex-1 text-center text-xs text-yellow md:text-sm">
                The site is still under construction!
            </p>
            <button class="outline-none" onclick={onHideBanner}>
                <XIcon class="size-4 transition-transform active:scale-[0.9] md:size-5" />
            </button>
        </div>
    {/if}

    {@render children()}

    <footer class="z-10 hidden h-footer justify-end bg-crust p-3 lg:flex">
        <p class="text-sm leading-4 text-mauve">@mikededo</p>
    </footer>
</div>

<Command />

<style>
.under-construction {
    --timer: 480s;
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
