<script lang="ts">
    import type { PageData } from './$types'
    import type { ActivitySummary } from '$lib/server'

    import { SvelteSet } from 'svelte/reactivity'

    import { Experience, Link, Project } from '$lib/components'
    import AnimatedNumber from '$lib/components/animated-number.svelte'
    import Header from '$lib/components/layout/header.svelte'
    import ThemeSwitcher from '$lib/components/theme-switcher.svelte'

    const URLS = [
        { href: 'mailto:miquelddg@gmail.com', name: 'email' },
        { href: 'https://github.com/mikededo', name: 'github' },
        { href: 'https://www.linkedin.com/in/mikededo', name: 'linkedin' },
        { href: 'https://github.com/mikededo/portfolio', name: 'code' }
    ]

    type Props = { data: PageData }
    const { data }: Props = $props()

    const expanded = new SvelteSet<string>(['stackai'])
    let stats = $state<ActivitySummary | null>(null)

    const onToggleExpand = (id: string) => () => {
        if (expanded.has(id)) {
            expanded.delete(id)
        } else {
            expanded.add(id)
        }
    }

    const formatTime = (hours: number): string => {
        const wholeHours = Math.floor(hours)
        const minutes = Math.round((hours - wholeHours) * 60)

        if (minutes === 60) {
            return `${wholeHours + 1}h 00m`
        }

        return `${wholeHours}h${minutes.toString().padStart(2, '0')}m`
    }

    const formatNumber = (digits: number = 2) => (value: number): string => value.toFixed(digits)

    $effect(() => {
        data.statsPromise.then((data: ActivitySummary | null) => {
            stats = data
        })
    })
</script>

<main class="mx-auto w-full md:w-3/4" id="main-content">
    <Header
        description="Hey, I'm Miquel de Domingo a passionate software engineer and cyclist!"
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

    {@render h2('Me')}
    <ul class="ml-4 list-disc md:ml-8">
        <li>Graduated in CS and master's in SW design & architecture</li>
        <li>Frontend dev, experienced in multiple frameworks (svelte lover)</li>
        <li>
            Love building things, specially whenever I can try other tools and
            languages
        </li>
        <li>Fast problem solver, ship fast</li>
        <li>Design oriented</li>
        <li>
            Obsessed in providing best user experience, while ensuring best
            developer experience
        </li>
        <li>Active sports person, mostly cycling</li>
        <li>
            {#await data.recoveryPeriodPromise then response}
                {#if response}
                    Currently in recovery period! -
                {/if}
            {/await}

            <Link href="https://www.strava.com/athletes/mikededo">Ridden</Link>
            <AnimatedNumber
                format={formatNumber()}
                value={stats?.distance ?? 0}
            />km and
            <AnimatedNumber
                format={formatNumber(0)}
                value={stats?.elevation ?? 0}
            />m in
            <AnimatedNumber format={formatTime} value={stats?.time ?? 0} />
            the last 7 days
        </li>
        <li>
            Helping other friends and athletes achieve their fitness goals, as a
            side hustle
        </li>
        <li>Cat owner</li>
    </ul>

    {@render h2('How I work')}
    <ul class="ml-4 list-disc md:ml-8">
        <li>
            <strong>ship fast, iterate faster.</strong> plans are great, but sometimes
            you just need to get things done
        </li>
        <li>
            <strong>user-first.</strong> tech decisions are important and should
            consider end-user impact
        </li>
        <li>
            <strong>design driven.</strong> consistent design adds as much value
            as new features
        </li>
        <li>
            <strong>learn in public.</strong> contribute to os and share within the
            community
        </li>
        <li>
            <strong>knowledge sharing.</strong> i strongly believe in mentoring and
            contributing team growth
        </li>
        <li>
            <strong>code quality matters.</strong> write code that you don&apos;t
            mind reading in 6 months
        </li>
        <li>
            <strong>automate the boring stuff.</strong> if i can spend 30m working
            on a script to automate a repetitive task, i will
        </li>
        <li>
            <strong>stay curious.</strong> explore, try, learn, repeat
        </li>
    </ul>

    {@render h2('Projects')}
    <ul class="ml-4 list-disc md:ml-8">
        <Project
            previewSlug="advent-ui"
            repo="advent ui"
            repoHref="https://github.com/mikededo/advent-ui"
            site="site"
            siteHref="https://advent-ui.mikededo.com"
            topics={['svelte', 'sveltekit', 'vercel']}
        >
            Visualizations to some of the previous aoc solution algorithms
        </Project>
        <Project
            previewSlug="squared-ci"
            repo="squared-ci"
            repoHref="https://github.com/mikededo/squared-ci"
            site="site"
            siteHref="https://squared-ci.vercel.app"
            topics={['typescript', 'react', 'nextjs', 'vercel']}
        >
            A project that i started with the goal of simplifying the learning
            curve of GitHub Actions. The app helps devs build from simple to
            complex workflows, through an intuitive ui. I also tried to get out
            of my comfort zone by removing any external library that would
            simplify the task, so, for instance, I had to work on a draggable
            interface, which was great challenge
        </Project>
        <Project
            repo="advent of code"
            repoHref="https://github.com/mikededo/advent"
            topics={['rust', 'algorithms']}
        >
            Some of the advent of code solutions, for some years, done in rust
            in order to code in different languages and paradigms
        </Project>
        <Project
            repo="dart barrel file generator"
            repoHref="https://github.com/mikededo/dart-barrel-file-generator"
            topics={['typescript', 'bun']}
        >
            VSCode extension to generate
            <Link href="https://dart.dev">dart</Link>
            barrel files. It's also a cli tool to use outside vscode
        </Project>
        <Project
            repo="eslint plugin svelte tailwindcss"
            repoHref="https://github.com/mikededo/eslint-plugin-svelte-tailwindcss"
            topics={['typescript', 'eslint']}
        >
            I prefer eslint over prettier, and i created this port of
            <Link
                class="font-mono text-sm"
                href="https://github.com/tailwindlabs/prettier-plugin-tailwindcss"
            >
                prettier-plugin-tailwindcss
            </Link>
            for eslint and svelte
        </Project>
        <Project
            repo=".dotfiles"
            repoHref="https://github.com/mikededo/.dotfiles"
            topics={['lua', 'sh']}
        >
            Personal dotfiles, in case you are interested
        </Project>
        <Project
            repo="other repos"
            repoHref="https://github.com/mikededo?tab=repositories"
        >
            Here you can find other projects I've done in my spare time. I also
            enjoy contributing to os projects whenever I can
        </Project>
    </ul>

    {@render h2('Experience')}
    <ul class="space-y-2">
        <li>
            <Experience
                company="Stack AI"
                companyHref="https://www.stack-ai.com"
                expanded={expanded.has('stackai')}
                subtitle="AI toolkit for enterprises"
                title="Lead software engineer"
                onExpand={onToggleExpand('stackai')}
            >
                <li>Y-combinator startup, joined after a-series</li>
                <li>Streamlining the design system</li>
            </Experience>
        </li>
        <li>
            <Experience
                company="XING"
                companyHref="https://www.xing.com"
                expanded={expanded.has('xing')}
                subtitle="Jobs marketplace platform, serving millions of users"
                title="Frontend engineer"
                onExpand={onToggleExpand('xing')}
            >
                <li>Part of the search and recommendations team</li>
                <li>
                    Facilitated cross-functional collaboration between product,
                    design and engineering teams
                </li>
                <li>
                    Collaborated with design system and platform teams, to align
                    ui specs and infrastructure needs
                </li>
                <li>
                    Mentored a junior developer through a company program,
                    providing technical guidance, design feedback, and reviews
                </li>
                <li>
                    Architected and defined migration for old codebase
                    deprecation, reducing technical debt
                </li>
                <li>
                    Delivered rapid problem-solving to ensure high application
                    standards
                </li>
            </Experience>
        </li>
        <li>
            <Experience
                company="Additio"
                companyHref="https://additioapp.com"
                expanded={expanded.has('additio')}
                subtitle="Educational technology platform"
                title="Frontend engineer"
                onExpand={onToggleExpand('additio')}
            >
                <li>
                    Designed architecture for multiple React applications within
                    the Additio App
                </li>
                <li>
                    Built and maintained internal React component libraries,
                    design system and other internal tools
                </li>
                <li>
                    Led application redesign from ideation and wireframing to
                    implementation
                </li>
                <li>Mentored junior students in React development</li>
            </Experience>
        </li>
    </ul>
</main>

{#snippet h2(name: string)}
    <h2 class="relative font-semibold">
        {name}
        <span
            class="absolute -top-4 -left-4 font-thin text-slate-600"
            aria-hidden="true"
        >+</span>
    </h2>
{/snippet}
