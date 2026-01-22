<script lang="ts">
    import './blog.css'

    import type { PageProps } from './$types'

    import Header from '$lib/components/layout/header.svelte'
    import { getBaseUrl } from '$lib/content'
    import { useBlogNavigation } from '$lib/hooks/use-blog-navigation.svelte'
    import { formatDate } from '$lib/utils/date'

    const { data }: PageProps = $props()
    const post = $derived(data.metadata)
    const baseUrl = $derived(getBaseUrl())
    const ogImage = $derived(post.ogImage ? `${baseUrl}${post.ogImage}` : `${baseUrl}/og.png`)

    useBlogNavigation({
        backUrl: '/blog',
        behavior: 'scroll',
        getElements: () => {
            // having post here so it forces reactivity
            // eslint-disable-next-line no-unused-expressions
            post

            return []
        }
    })
</script>

<svelte:head>
    <title>{post.title}</title>
    <meta content={post.description} name="description" />

    <meta content="article" property="og:type" />
    <meta content={post.canonicalURL} property="og:url" />
    <meta content={post.title} property="og:title" />
    <meta content={post.description} property="og:description" />
    <meta content={ogImage} property="og:image" />
    <meta content={post.title} property="og:image:alt" />
    <meta content="1200" property="og:image:width" />
    <meta content="630" property="og:image:height" />
    <meta content="mikededo" property="og:site_name" />
    <meta content="en_US" property="og:locale" />

    <meta content="summary_large_image" name="twitter:card" />
    <meta content="mikededo.com" property="twitter:domain" />
    <meta content={post.canonicalURL} property="twitter:url" />
    <meta content={post.title} name="twitter:title" />
    <meta content={post.description} name="twitter:description" />
    <meta content={ogImage} name="twitter:image" />
    <meta content={post.title} name="twitter:image:alt" />
    <meta content="@miqueldedomini" name="twitter:creator" />

    <meta content={post.date.toISOString()} property="article:published_time" />
    <meta content="mikededo" property="article:author" />
    {#each post.tags as tag}
        <meta content={tag} property="article:tag" />
    {/each}
</svelte:head>

<header class="mb-12 space-y-2">
    <Header description={post.description} title={post.title} />

    <div class="flex items-center gap-1.5">
        {#each post.tags as tag}
            <span class="hidden rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground sm:inline-block">
                #{tag}
            </span>
        {/each}
        <p class="ml-auto text-sm text-muted-foreground">{formatDate(post.date)}</p>
    </div>
</header>

<hr class="-my-2 text-muted" />

<article class="blog">
    {#if data.Content}
        <data.Content.default />
    {/if}
</article>
