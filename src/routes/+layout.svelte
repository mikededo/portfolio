<script lang="ts">
    import '../app.css';

    import type { LayoutServerData } from './$types';

    import { setContext, type Snippet } from 'svelte';

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
</script>

<div class="flex shrink-0 flex-col h-screen">
    <header class="w-full h-header bg-crust/75 flex justify-between px-4 py-3 z-10">
        <p class="font-semibold text-xl">
            @mikededo
        </p>
        <nav class="flex gap-6 items-center">
            <a href="/" class="text-sm text-mauve">home</a>
            <a href="/projects" class="text-sm hover:text-mauve">projects</a>
            <a href="/about" class="text-sm hover:text-mauve">about</a>
        </nav>
    </header>
    <main class="bg-base h-full flex-1">
        <div class="px-4 md:px-8 lg:px-12 xl:px-0 container h-full w-full">
            {@render children()}
        </div>
    </main>
    <footer class="bg-crust/75 z-10 flex p-3 justify-end">
        <p class="text-sm text-mauve leading-4">@mikededo</p>
    </footer>
</div>

<ThemeSelector />
<Command />
