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
        &centerdot;
        <span class="font-mono text-sm tracking-tight text-muted-foreground italic">{topics.join(', ')}</span>
    {/if}
    <p>{@render children()}</p>
</li>

