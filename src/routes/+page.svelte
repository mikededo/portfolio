<script lang="ts">
    import { Link } from 'lucide-svelte';

    import { HomeBackground } from '$lib/components';

    const COMMANDS = [
        {
            desc: 'Go to /about',
            href: '/about',
            key: '⌘ Cmd + a',
            sm: true
        },
        {
            desc: 'Go to /projects',
            href: '/projects',
            key: '⌘ Cmd + p',
            sm: true
        },
        {
            desc: 'Open my GitHub profile',
            external: true,
            href: 'https://github.com/mikededo',
            key: '⌘ Cmd + g',
            sm: true
        },
        { desc: 'See how I implemented this!', key: '⌘ Cmd + i', sm: true },
        { desc: 'Designs are also available!', key: '⌘ Cmd + d', sm: true },
        { desc: 'Change theme', key: '⌘ Cmd + t', sm: false }
    ];
</script>

<div class="container flex h-full w-full flex-col justify-center px-4 md:px-8 lg:px-12 xl:px-0">
    <div class="mb-32 flex flex-col gap-2">
        <div class="flex items-center gap-4 text-sm md:text-md">
            <span>&nbsp;</span>
            <p class="text-overlay1">~/home</p>
        </div>
        <div class="flex items-center gap-4 text-sm md:text-md">
            <span class="text-overlay1">1</span>
            <p>Hi, I&apos;m</p>
        </div>
        <div class="flex items-end gap-4">
            <span class="text-overlay1">2</span>
            <h1 class="text-3xl font-bold sm:text-5xl md:text-6xl xl:text-7xl">Miquel de Domingo</h1>
        </div>
        <div class="flex items-center gap-4 text-sm md:text-md">
            <span class="text-overlay1">3</span>
            <p>a software engineer based in Girona</p>
        </div>
    </div>

    <!-- Currently hidden on sm devices -->
    <div class="flex flex-col gap-4 sm:gap-6 lg:mx-auto lg:w-1/2 lg:gap-9">
        <div>
            <p>Shortcuts</p>
            <p class="hidden italic md:block">You can run the shortcuts page wide!</p>
        </div>
        <!-- TODO: Decide if text should stay smaller -->
        <ul class="flex flex-col gap-1 text-sm md:text-md">
            {#each COMMANDS as { desc, external, href, key, sm }(key)}
                <li class:hidden={!sm} class="flex items-center justify-between">
                    {#if href}
                        <a
                            class="hover:underline"
                            rel={external ? 'noreferrer noopener' : undefined}
                            target={external ? '_blank' : undefined}
                            {href}
                        >
                            {desc}
                        </a>
                        {#if external}
                            <Link class="ml-2 mr-auto size-4" strokeWidth={1.5} />
                        {/if}
                    {:else}
                        <p>{desc}</p>
                    {/if}
                    <p class="hidden text-peach md:block">{key}</p>
                </li>
            {/each}
        </ul>

        <p class="hidden italic md:block">Open the command palette with <span class="text-peach">:</span></p>
    </div>
</div>

<HomeBackground />
