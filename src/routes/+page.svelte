<script lang="ts">
    import type { SlideParams, TransitionConfig } from 'svelte/transition';

    import type { PageData } from './$types';

    import { quadOut } from 'svelte/easing';
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

<main class="mx-auto w-full md:w-3/4">
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
    </ul>

    <h2>experience</h2>
    <ul>
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
                    <div class="text-sm" transition:fadeSlide={{ duration: 100, easing: quadOut }}>
                        <p class="mb-1 text-slate-500 italic">
                            Jobs marketplace platform, serving millions of users
                        </p>
                        <ul class="ml-8 list-disc">
                            <li>Part of the search and recommendations team</li>
                            <li>Facilitated cross-functional collaboration between product, design and engineering team</li>
                            <li>Mentored a junior developer through a company program, providing technical guidance, teaching and review</li>
                            <li>Architected and defined migration for old codebase deprecation</li>
                            <li>Delivered rapid problem-solving to ensure high application standards</li>
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
                    <div class="text-sm" transition:fadeSlide={{ duration: 100, easing: quadOut }}>
                        <p class="mb-1 text-slate-500 italic">Educational technology platform</p>
                        <ul class="ml-8 list-disc">
                            <li>Designed architecture for multiple React applications within the Additio App</li>
                            <li>Built and maintained internal React component libraries, design system and other internal tools</li>
                            <li>Led application redesign from designing to implementation</li>
                            <li>Mentored junior students in React development</li>
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
