<script lang="ts">
    import type { Snippet } from 'svelte';

    import Link from './link.svelte';
    import PreviewPopover from './preview-popover.svelte';

    type Props = {
        children: Snippet;
        repo: string;
        repoHref: string;
        previewSlug?: string;
        topics?: string[];
    } & ({ site: string; siteHref: string } | { site?: never; siteHref?: never });
    const {
        children,
        previewSlug,
        repo,
        repoHref,
        site,
        siteHref,
        topics
    }: Props = $props();
</script>

<li>
    <p>
        {#if previewSlug}
            <PreviewPopover label={repo} slug={previewSlug}>
                <Link href={repoHref}>{repo}</Link>
            </PreviewPopover>
        {:else}
            <Link href={repoHref}>{repo}</Link>
        {/if}
        {#if site}
            &centerdot;
            <Link href={siteHref}>{site}</Link>
        {/if}
        {#if topics}
            &centerdot;
            <span class="text-slate-500 italic">{topics.join(', ')}</span>
        {/if}
    </p>
    <p>{@render children()}</p>
</li>

