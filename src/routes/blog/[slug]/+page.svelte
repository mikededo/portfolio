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
            <span class="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                #{tag}
            </span>
        {/each}
        <p class="ml-auto text-xs text-foreground-muted">{formatDate(post.date)}</p>
    </div>
</header>

<hr class="-my-2 text-slate-300 dark:text-slate-800" />

<article>
    {#if data.Content}
        <!-- // @ts-expect-error Need to fix the types  -->
        <data.Content.default />
    {/if}
</article>
