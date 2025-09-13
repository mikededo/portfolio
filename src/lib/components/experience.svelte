<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { SlideParams, TransitionConfig } from 'svelte/transition';

    import { circOut } from 'svelte/easing';
    import { slide as baseSlide } from 'svelte/transition';

    import Link from './link.svelte';

    const fadeSlide = (node: Element, options: SlideParams): TransitionConfig => {
        const slide = baseSlide(node, options);

        return {
            ...options,
            css: (t, u) => `${slide.css!(t, u)}; opacity: ${t}`
        };
    };

    type Props = {
        children: Snippet;
        expanded: boolean;
        subtitle: string;
        title: string;
        company: string;
        companyHref: string;
        onExpand: () => void;
    };
    const {
        children,
        company,
        companyHref,
        expanded,
        onExpand,
        subtitle,
        title
    }: Props = $props();
</script>

<article>
    <header class="flex items-center justify-between">
        <h3 class="font-medium">{title} @ <Link href={companyHref}>{company}</Link></h3>
        <button
            class="size-7 rounded-full text-lg"
            onclick={onExpand}
            aria-expanded={expanded}
            aria-label="Toggle expand"
        >
            <span aria-hidden="true">{expanded ? '-' : '+'}</span>
        </button>
    </header>
    {#if expanded}
        <div
            class="text-sm"
            style="scrollbar-gutter: auto"
            transition:fadeSlide={{ duration: 250, easing: circOut }}
        >
            <p class="mb-1 text-slate-500 italic">{subtitle}</p>
            <ul class="ml-8 list-disc space-y-1">
                {@render children()}
            </ul>
        </div>
    {/if}
</article>
