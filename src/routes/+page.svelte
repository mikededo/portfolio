<script lang="ts">
    import type { PageData } from './$types';

    import { SvelteSet } from 'svelte/reactivity';

    import { AnimatedNumber, Experience, Link, Project } from '$lib/components';

    const URLS = [
        { href: 'mailto:miquelddg@gmail.com', name: 'email' },
        { href: 'https://github.com/mikededo', name: 'github' },
        { href: 'https://www.linkedin.com/in/mikededo', name: 'linkedin' }
    ];

    type Props = { data: PageData };
    const { data }: Props = $props();

    const expanded = new SvelteSet<string>(['xing']);

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

<main class="mx-auto w-full lg:w-3/4">
    <h1 class="mb-2 text-2xl font-bold">mikededo</h1>
    <div class="flex gap-1 text-sm" role="list">
        {#each URLS as { href, name }, i}
            <Link href={href} role="listitem">{name}</Link>
            {#if i < URLS.length - 1}&centerdot;{/if}
        {/each}
    </div>

    {@render h2('me')}
    <ul class="ml-8 list-disc text-sm">
        <li>graduated in CS and master's in SW design & architecture</li>
        <li>frontend dev, experienced in multiple frameworks (svelte lover)</li>
        <li>love building things, specially whenever I can try other tools and languages</li>
        <li>fast problem solver, ship fast</li>
        <li>obsessed in providing best user experience, while ensuring best developer experience</li>
        <li>active sports person, mostly cycling</li>
        <li>
            <Link href="https://www.strava.com/athletes/mikededo">ridden</Link>
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

    {@render h2('projects')}
    <ul class="ml-8 list-disc space-y-1 text-sm">
        <Project
            repo="this"
            repoHref="https://github.com/mikededo/portfolio"
            topics={['svelte', 'sveltekit', 'vercel']}
        >
            codebase of this portfolio
        </Project>
        <Project
            repo="dart barrel file generator"
            repoHref="https://github.com/mikededo/dart-barrel-file-generator"
            topics={['typescript', 'bun']}
        >
            vscode extension to generate
            <Link href="https://dart.dev">dart</Link>
            barrel files. it's also a cli tool to use outside vscode
        </Project>
        <Project
            repo="advent of code"
            repoHref="https://github.com/mikededo/advent"
            topics={['rust', 'algorithms']}
        >
            some of the advent of code solutions, for some
            years, done in rust in order to code in different languages and
            paradigms
        </Project>
        <Project
            repo="advent ui"
            repoHref="https://github.com/mikededo/advent-ui"
            site="site"
            siteHref="https://advent-visuals.vercel.app"
            topics={['svelte', 'sveltekit', 'vercel']}
        >
            visualitsations to some of the previous aoc solution algorithms
        </Project>
        <Project
            repo="squared-ci"
            repoHref="https://github.com/mikededo/squared-ci"
            site="site"
            siteHref="https://squared-ci.vercel.app"
            topics={['typescript', 'react', 'nextjs', 'vercel']}
        >
            a project that i started with the goal of simplifying the
            learning curve of GitHub Actions. the app helps devs build from
            simple to complex workflows, through an intuitive ui. i also
            tried to get out of my comfort zone by removing any external
            library that would simplify the task, so, for instance, i had
            to work on a draggable interface, which was great challenge
        </Project>
        <Project
            repo="eslint plugin svelte tailwindcss"
            repoHref="https://github.com/mikededo/eslint-plugin-svelte-tailwindcss"
            topics={['typescript', 'eslint']}
        >
            i prefer eslint over prettier, and i created this port of
            <Link href="https://github.com/tailwindlabs/prettier-plugin-tailwindcss">
                prettier-plugin-tailwindcss
            </Link>
            for eslint and svelte
        </Project>
        <Project
            repo=".dotfiles"
            repoHref="https://github.com/mikededo/.dotfiles"
            topics={['lua', 'sh']}
        >
            personal dotfiles, in case you are interested
        </Project>
        <Project
            repo="other repos"
            repoHref="https://github.com/mikededo?tab=repositories"
        >
            here you can find other projects i've done in my spare time. i
            also enjoy contributing to os projects whenever i can
        </Project>
    </ul>

    {@render h2('experience')}
    <ul class="space-y-2">
        <li>
            <Experience
                company="XING"
                companyHref="https://www.xing.com"
                expanded={expanded.has('xing')}
                subtitle="jobs marketplace platform, serving millions of users"
                title="frontend engineer"
                onExpand={onToggleExpand('xing')}
            >
                <li>part of the search and recommendations team</li>
                <li>facilitated cross-functional collaboration between product, design and engineering team</li>
                <li>mentored a junior developer through a company program, providing technical guidance, teaching and review</li>
                <li>architected and defined migration for old codebase deprecation</li>
                <li>delivered rapid problem-solving to ensure high application standards</li>
            </Experience>
        </li>
        <li>
            <Experience
                company="Additio"
                companyHref="https://additioapp.com"
                expanded={expanded.has('additio')}
                subtitle="educational technology platform"
                title="frontend engineer"
                onExpand={onToggleExpand('additio')}
            >
                <li>designed architecture for multiple React applications within the Additio App</li>
                <li>built and maintained internal React component libraries, design system and other internal tools</li>
                <li>led application redesign from designing to implementation</li>
                <li>mentored junior students in React development</li>
            </Experience>
        </li>
    </ul>
</main>

{#snippet h2(name: string)}
    <h2 class="relative">
        {name}
        <span class="absolute -top-4 -left-4 font-thin text-slate-600" aria-hidden="true">+</span>
    </h2>
{/snippet}
