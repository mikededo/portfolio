<script lang="ts">
    import type { Snippet } from 'svelte'

    import Link from './link.svelte'
    import PreviewPopover from './preview-popover.svelte'

    type Props = {
        children: Snippet
        repo: string
        repoHref: string
        previewSlug?: string
        topics?: string[]
    } & ({ site: string, siteHref: string } | { site?: never, siteHref?: never })
    const {
        children,
        previewSlug,
        repo,
        repoHref,
        site,
        siteHref,
        topics
    }: Props = $props()
</script>

{#snippet site_content()}
    &centerdot;
    <Link href={siteHref!}>{site}</Link>
{/snippet}

<li>
    <Link href={repoHref}>{repo}</Link>
    {#if site}
        {#if previewSlug}
            <PreviewPopover label={repo} slug={previewSlug}>
                <p>{@render site_content()}</p>
            </PreviewPopover>
        {:else}
            <p>{@render site_content()}</p>
        {/if}
    {/if}
    {#if topics}
        <span class="ml-1 inline-flex flex-wrap gap-1">
            {#each topics as topic}
                <span class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">{topic}</span>
            {/each}
        </span>
    {/if}
    <p>{@render children()}</p>
</li>

