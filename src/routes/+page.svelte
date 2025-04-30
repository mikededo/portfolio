<script lang="ts">
    import { Link } from '@lucide/svelte';

    import { HomeBackground, ThemeSelector } from '$lib/components';

    const COMMANDS = [
        {
            desc: 'Go to /about',
            href: '/about',
            key: 'CTRL + a',
            sm: true
        },
        {
            desc: 'Go to /projects',
            href: '/projects',
            key: 'CTRL + p',
            sm: true
        },
        {
            desc: 'Open my GitHub profile',
            external: true,
            href: 'https://github.com/mikededo',
            key: 'CTRL + g',
            sm: true
        },
        { desc: 'See how I implemented this!', key: 'CTRL + i', sm: true },
        { desc: 'Designs are also available!', key: 'CTRL + d', sm: true },
        { desc: 'Change theme', key: 'CTRL + t', sm: false }
    ];

</script>

<main class="h-content flex-1 overflow-x-hidden bg-base">
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
            <ul class="flex flex-col gap-1 text-sm md:text-md">
                {#each COMMANDS as { desc, external, href, key, sm }(key)}
                    <li class="flex items-center justify-between lg:flex" class:hidden={!sm}>
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
                                <Link class="mr-auto ml-2 size-4" strokeWidth={1.5} />
                            {/if}
                        {:else}
                            <p>{desc}</p>
                        {/if}
                        <p class="hidden text-peach md:block">{key}</p>
                    </li>
                {/each}
            </ul>

            <div class="relative hidden md:block">
                <span class="indicator absolute -ml-4">&gt;</span>
                <p class="italic">Open the command palette with <span class="text-peach">:</span></p>
            </div>
        </div>
    </div>
</main>

<HomeBackground />
<ThemeSelector />

<style>
/* Inspired by tailwind's bounce animation, but on the X axis */
@keyframes x-bounce {
    0%,to {
        transform: translateX(-25%);
        animation-timing-function: cubic-bezier(.8, 0, 1, 1)
    }
    50% {
        transform: none;
        animation-timing-function: cubic-bezier(0, 0, .2, 1)
    }
}

.indicator {
    animation: x-bounce 1.5s infinite;
}
</style>
