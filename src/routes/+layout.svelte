<script lang="ts">
    import '../app.css';

    import type { Snippet } from 'svelte';

    import type { LayoutServerData } from './$types';

    import { onMount } from 'svelte';

    import { page } from '$app/state';
    import { Command, KeyWatcher, UnderConstruction } from '$lib/components';
    import { initAppContext } from '$lib/context';
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

        return GlobalEvents.unregister;
    });
</script>

<svelte:head>
    <title>Miquel de Domingo</title>
    <meta name="description" content="Miquel de Domingo's portfolio" />
</svelte:head>

{#snippet link(href: string, value: string)}
    <li>
        <a
            class="hover:not:aria-current-page:text-mauve aria-current-page:text-mauve text-sm"
            aria-current={isCurrentPage(href) ? 'page' : undefined}
            {href}
        >
            {value}
        </a>
    </li>
{/snippet}

<div class="flex h-screen flex-col">
    <header class="bg-crust height-header w-header h-header z-20 flex w-full shrink-0 justify-between px-4 py-3">
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

    <footer class="bg-crust h-footer z-10 hidden justify-end p-3 lg:flex">
        <p class="text-mauve text-sm leading-4">@mikededo</p>
    </footer>
</div>

<Command />
<KeyWatcher />

