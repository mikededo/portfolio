<script lang="ts">
    import type { SlideParams, TransitionConfig } from 'svelte/transition';

    import type { PageData } from './$types';

    import { quintOut } from 'svelte/easing';
    import { SvelteSet } from 'svelte/reactivity';
    import { slide as baseSlide } from 'svelte/transition';

    import { AnimatedNumber } from '$lib/components';

    const URLS = [
        { href: 'mailto:miquelddg@gmail.com', name: 'email' },
        { href: 'https://github.com/mikededo', name: 'github' },
        { href: 'https://www.linkedin.com/in/mikededo', name: 'linkedin' }
    ];

    type Props = { data: PageData };
    const { data }: Props = $props();

    const expanded = new SvelteSet<string>(['xing']);

    const fadeSlide = (node: Element, options: SlideParams): TransitionConfig => {
        const slide = baseSlide(node, options);

        return {
            ...options,
            css: (t, u) => `${slide.css!(t, u)}; opacity: ${t}`
        };
    };

    const onToggleExpand = (id: string) => () => {
        if (expanded.has(id)) {
            expanded.delete(id);
        } else {
            expanded.add(id);
        }
    };

    const formatTime = (hours: number): string => {
        const wholeHours = Math.floor(hours);
        const minutes = Math.round((hours - wholeHours) * 60);

        if (minutes === 60) {
            return `${wholeHours + 1}h 00m`;
        }

        return `${wholeHours}h${minutes.toString().padStart(2, '0')}m`;
    };

    const formatNumber = (digits: number = 2) => (value: number): string => value.toFixed(digits);
</script>

<svelte:head>
    <title>Miquel de Domingo</title>
</svelte:head>

<main class="mx-auto w-full md:w-5/6">
    <h1 class="mb-2 text-2xl font-bold">mikededo</h1>
    <div class="flex gap-1 text-sm">
        {#each URLS as { href, name }, i}
            {@render link(href, name)}
            {#if i < URLS.length - 1}&centerdot;{/if}
        {/each}
    </div>

    <h2>me</h2>
    <ul class="ml-8 list-disc text-sm">
        <li>graduated in CS and master's in SW design & architecture</li>
        <li>frontend dev, experienced in multiple frameworks (svelte lover)</li>
        <li>love building things, specially whenever I can try other tools and languages</li>
        <li>fast problem solver, ship fast</li>
        <li>obsessed in providing best user experience, while ensuring best developer experience</li>
        <li>active sports person, mostly cycling</li>
        <li>
            {@render link('https://strava.com/athletes/mikededo', 'ridden')}
            <AnimatedNumber format={formatNumber()} value={data.stats?.distance ?? 0} />km
            and
            <AnimatedNumber format={formatNumber(0)} value={data.stats?.elevation ?? 0} />m
            in
            <AnimatedNumber format={formatTime} value={data.stats?.time ?? 0} />
            the last 7 days
        </li>
        <li>
            helping other friends and athletes achieve their fitness goals, as a side hustle
        </li>
        <li>cat owner</li>
    </ul>

    <h2>projects</h2>
    <ul class="ml-8 list-disc space-y-2 text-sm">
        <li>
            <p>
                {@render link('https://github.com/mikededo/portfolio', 'this')}
                &centerdot;
                <span class="text-slate-500 italic">svelte, sveltekit, vercel</span>
            </p>
            <p>codebase of the portfolio</p>
        </li>
        <li>
            <p>
                {@render link('https://github.com/mikededo/dart-barrel-file-generator', 'dart barrel file generator')}
                &centerdot;
                <span class="text-slate-500 italic">typescript, bun</span>
            </p>
            <p>
                vscode extension to generate
                {@render link('https://dart.dev', 'dart')}
                barrel files. it's also a cli tool to use outside vscode
            </p>
        </li>
        <li>
            <p>
                {@render link('https://github.com/mikededo/advent', 'advent of code')}
                &centerdot;
                <span class="text-slate-500 italic">rust</span>
            </p>
            <p>
                some of the advent of code solutions, for some
                years, done in rust in order to code in different languages and
                paradigms
            </p>
        </li>
        <li>
            <p>
                {@render link('https://github.com/mikededo/advent-ui', 'advent of code ui')}
                &centerdot;
                {@render link('https://advent-visuals.vercel.app', 'site')}
                &centerdot;
                <span class="text-slate-500 italic">svelte, sveltekit, vercel</span>
            </p>
            <p>visualitsations to some of the previous aoc solution algorithms</p>
        </li>
        <li>
            <p>
                {@render link('https://github.com/mikededo/squared-ci', 'squared-ci')}
                &centerdot;
                {@render link('https://squared-ci.vercel.app', 'site')}
                &centerdot;
                <span class="text-slate-500 italic">typescript, react, nextjs, vercel</span>
            </p>
            <p>
                a project that i started with the goal of simplifying the
                learning curve of GitHub Actions. the app helps devs build from
                simple to complex workflows, through an intuitive ui. i also
                tried to get out of my comfort zone by removing any external
                library that would simplify the task, so, for instance, i had
                to work on a draggable interface, which was great challenge
            </p>
        </li>
        <li>
            <p>
                {@render link('https://github.com/mikededo/eslint-plugin-svelte-tailwindcss', 'advent of code')}
                &centerdot;
                <span class="text-slate-500 italic">typescript</span>
            </p>
            <p>
                i prefer eslint over prettier, and i created this port of
                {@render link('https://github.com/tailwindlabs/prettier-plugin-tailwindcss', 'prettier-plugin-tailwindcss')}
                for eslint and svelte </p>
        </li>
        <li>
            <p>
                {@render link('https://github.com/mikededo/.dotfiles', '.dotfiles')}
                &centerdot;
                <span class="text-slate-500 italic">lua, sh</span>
            </p>
            <p>personal dotfiles, in case you are interested</p>
        </li>
        <li>
            <p>
                {@render link('https://github.com/mikededo?tab=repositories', 'other repos')}
            </p>
            <p>
                here you can find other projects i've done in my spare time. i
                also enjoy contributing to os projects whenever i can
            </p>
        </li>
    </ul>

    <h2>experience</h2>
    <ul class="space-y-2">
        <li>
            <article>
                <header class="flex items-center justify-between">
                    <h3 class="font-medium">frontend engineer @ {@render link('https://xing.com', 'Xing')}</h3>
                    <button
                        class="size-7 rounded-full text-lg"
                        onclick={onToggleExpand('xing')}
                    >
                        +
                    </button>
                </header>
                {#if expanded.has('xing')}
                    <div class="text-sm" transition:fadeSlide={{ duration: 100, easing: quintOut }}>
                        <p class="mb-1 text-slate-500 italic">
                            jobs marketplace platform, serving millions of users
                        </p>
                        <ul class="ml-8 list-disc">
                            <li>part of the search and recommendations team</li>
                            <li>facilitated cross-functional collaboration between product, design and engineering team</li>
                            <li>mentored a junior developer through a company program, providing technical guidance, teaching and review</li>
                            <li>architected and defined migration for old codebase deprecation</li>
                            <li>delivered rapid problem-solving to ensure high application standards</li>
                        </ul>
                    </div>
                {/if}
            </article>
        </li>
        <li>
            <article>
                <header class="flex items-center justify-between">
                    <h3 class="font-medium">frontend engineer @ {@render link('https://additioapp.com', 'Additio')}</h3>
                    <button
                        class="size-7 rounded-full text-lg"
                        onclick={onToggleExpand('additio')}
                    >
                        +
                    </button>
                </header>
                {#if expanded.has('additio')}
                    <div class="text-sm" transition:fadeSlide={{ duration: 100, easing: quintOut }}>
                        <p class="mb-1 text-slate-500 italic">educational technology platform</p>
                        <ul class="ml-8 list-disc">
                            <li>designed architecture for multiple React applications within the Additio App</li>
                            <li>built and maintained internal React component libraries, design system and other internal tools</li>
                            <li>led application redesign from designing to implementation</li>
                            <li>mentored junior students in React development</li>
                        </ul>
                    </div>
                {/if}
            </article>
        </li>
    </ul>
</main>

{#snippet link(href: string, name: string)}
    <a
        class="text-blue-500 hover:underline"
        href={href}
        rel="noopener noreferrer"
        target="_blank"
    >
        {name}
    </a>
{/snippet}
