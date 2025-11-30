<script lang="ts">
    import './blog.css';

    import type { PageProps } from './$types';

    import Header from '$lib/components/layout/header.svelte';
    import { formatDate } from '$lib/utils/date';

    const { data }: PageProps = $props();
    const post = $derived(data.metadata);
</script>

<header class="mb-12 space-y-2">
    <Header description={post.description} title={post.title} />

    <div class="flex items-center gap-1">
        {#each post.tags as tag}
            <span class="hidden rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground sm:inline-block">
                #{tag}
            </span>
        {/each}
        <p class="ml-auto text-xs text-muted-foreground">{formatDate(post.date)}</p>
    </div>
</header>

<hr class="-my-2 text-muted" />

<article>
    {#if data.Content}
        <data.Content.default />
    {/if}
</article>
