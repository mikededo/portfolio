<script lang="ts">
    import type { Snippet } from 'svelte'
    import type { SlideParams, TransitionConfig } from 'svelte/transition'

    import { circOut } from 'svelte/easing'
    import { slide as baseSlide } from 'svelte/transition'

    import Link from './link.svelte'

    import { prefersReducedMotion } from '$lib/utils/reduced-motion'

    const fadeSlide = (node: Element, options: SlideParams): TransitionConfig => {
        if (prefersReducedMotion()) {
            return { duration: 0 }
        }

        const slide = baseSlide(node, options)

        return {
            ...options,
            css: (t, u) => `${slide.css!(t, u)}; opacity: ${t}`
        }
    }

    type Props = {
        children: Snippet
        expanded: boolean
        subtitle: string
        title: string
        company: string
        companyHref: string
        onExpand: () => void
    }
    const {
        children,
        company,
        companyHref,
        expanded,
        onExpand,
        subtitle,
        title
    }: Props = $props()
</script>

<article>
    <header>
        <button
            class="flex w-full items-center justify-between"
            onclick={onExpand}
            aria-expanded={expanded}
            aria-label="Toggle expand"
        >
            <h3 class="font-medium">{title} @ <Link href={companyHref}>{company}</Link></h3>
            <span aria-hidden="true">{expanded ? '-' : '+'}</span>
        </button>
    </header>
    {#if expanded}
        <div
            style="scrollbar-gutter: auto"
            transition:fadeSlide={{ duration: 250, easing: circOut }}
        >
            <p class="mb-1 text-sm text-slate-500 italic">{subtitle}</p>
            <ul class="ml-8 list-disc *:first:mt-2">
                {@render children()}
            </ul>
        </div>
    {/if}
</article>
