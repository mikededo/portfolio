<script lang="ts">
    import '../app.css';

    import type { Snippet } from 'svelte';

    import type { LayoutServerData } from './$types';

    import { onMount } from 'svelte';

    import { page } from '$app/state';
    import {
        Command,
        CookieConsent,
        EventWatcher,
        UnderConstruction
    } from '$lib/components';
    import { cleanupEvents, initAppContext } from '$lib/context';
    import { GlobalEvents } from '$lib/global-events';

    type Props = {
        children: Snippet;
        data: LayoutServerData;
    };
    const { children, data }: Props = $props();

    initAppContext(data.theme);

    const isCurrentPage = (href: string) => {
        if (href === '/') {
            return href === page.url.pathname;
        }

        return page.url.pathname.startsWith(href);
    };

    onMount(() => {
        GlobalEvents.register();

        return () => {
            cleanupEvents();
            GlobalEvents.unregister();
        };
    });
</script>

<svelte:head>
    <title>Miquel de Domingo</title>
    <meta content="Miquel de Domingo's portfolio" name="description" />
</svelte:head>

{#snippet link(href: string, value: string)}
    <li>
        <a
            class="hover:not:aria-current-page:text-mauve text-sm aria-current-page:text-mauve"
            {href}
            aria-current={isCurrentPage(href) ? 'page' : undefined}
        >
            {value}
        </a>
    </li>
{/snippet}

<div class="flex h-screen flex-col">
    <header class="height-header w-header z-20 flex h-header w-full shrink-0 justify-between bg-crust px-4 py-3">
        <p class="text-xl font-semibold">
            @mikededo
        </p>
        <nav>
            <ul class="flex items-center gap-6">
                {@render link('/', 'home')}
                {@render link('/about', 'about')}
                {@render link('/blog', 'blog 🚧')}
            </ul>
        </nav>
    </header>

    <UnderConstruction />

    {@render children()}

    <footer class="z-10 hidden h-footer justify-end bg-crust p-3 lg:flex">
        <p class="text-sm leading-4 text-mauve">@mikededo</p>
    </footer>
</div>

<Command />
<EventWatcher />
<CookieConsent />

