<script lang="ts">
    import type { Snippet } from 'svelte';

    import Link from './link.svelte';

    type Props = {
        children: Snippet;
        repo: string;
        repoHref: string;
        topics?: string[];
    } & ({ site: string; siteHref: string } | { site?: never; siteHref?: never });
    const { children, repo, repoHref, site, siteHref, topics }: Props = $props();
</script>

<li>
    <p>
        <Link href={repoHref}>{repo}</Link>
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

