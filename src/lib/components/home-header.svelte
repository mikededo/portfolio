<script lang="ts">
    import BottomSectionMarker from './bottom-section-marker.svelte'
    import Header from './layout/header.svelte'
    import Link from './link.svelte'
    import ThemeSwitcher from './theme-switcher.svelte'

    const URLS = [
        { href: 'mailto:miquelddg@gmail.com', name: 'email' },
        { href: 'https://github.com/mikededo', name: 'github' },
        { href: 'https://www.linkedin.com/in/miquelddg', name: 'linkedin' },
        { href: 'https://github.com/mikededo/portfolio', name: 'code' }
    ]
</script>

<header class="relative pt-6">
    <div class="pointer-events-none absolute -inset-x-2 top-0 h-px bg-muted" aria-hidden="true"></div>
    <div class="pointer-events-none absolute top-5 bottom-3 -left-8 w-px bg-muted" aria-hidden="true"></div>
    <div class="pointer-events-none absolute top-5 -right-8 bottom-3 w-px bg-muted" aria-hidden="true"></div>

    <Header
        description="Hey, I'm Miquel de Domingo a passionate software engineer, designer and cyclist!"
        title="mikededo"
    />

    <nav aria-label="Breadcrumbs">
        <ol class="flex gap-1 text-sm">
            <li class="flex items-center gap-1">
                <a href="/blog">blog</a>
                <span class="mx-2">|</span>
            </li>
            {#each URLS as { href, name }, i}
                <li class="flex items-center gap-1" role="listitem">
                    <Link {href}>{name}</Link>
                    {#if i < URLS.length - 1}<span>&centerdot;</span>{/if}
                </li>
            {/each}
            <li class="ml-auto">
                <ThemeSwitcher />
            </li>
        </ol>
    </nav>

    <BottomSectionMarker />
</header>
