<script lang="ts">
    import '../app.css';

    import type { LayoutServerData } from './$types';

    import { XIcon } from 'lucide-svelte';
    import { setContext, type Snippet } from 'svelte';
    import { fly } from 'svelte/transition';

    import { Command, ThemeSelector } from '$lib/components';
    import { THEME_COOKIE } from '$lib/cookies';

    type Props = {
        children: Snippet;
        data: LayoutServerData;
    };
    const { children, data }: Props = $props();

    // Proxying the objet for reactivity
    const themeState = $state({ theme: data.theme });
    setContext(THEME_COOKIE, themeState);

    let showBanner = $state(true);

    const onHideBanner = () => {
        showBanner = false;
    };
</script>

<div class="flex h-screen flex-col">
    <header class="z-10 flex h-14 w-full shrink-0 justify-between bg-crust px-4 py-3">
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
            out:fly={{ opacity: 1, y: -36 }}
            class="under-construction fixed left-0 right-0 top-14 z-0 flex h-9 items-center bg-mantle px-4"
        >
            <p class="flex-1 text-center text-sm text-yellow">
                The site is still under construction!
            </p>
            <button class="outline-none" onclick={onHideBanner}>
                <XIcon class="size-5 transition-transform active:scale-[0.9]" />
            </button>
        </div>
    {/if}
    <main class="h-full flex-1 bg-base">
        {@render children()}
    </main>
    <footer class="z-10 flex justify-end bg-crust/75 p-3">
        <p class="text-sm leading-4 text-mauve">@mikededo</p>
    </footer>
</div>

<ThemeSelector />
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
