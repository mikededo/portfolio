<script lang="ts">
    import type { PageData } from './$types'

    import { MoveRight } from '@lucide/svelte'

    import Header from '$lib/components/layout/header.svelte'
    import { useBlogNavigation } from '$lib/hooks/use-blog-navigation.svelte'
    import { formatDate } from '$lib/utils/date'

    type Props = { data: PageData }
    const { data }: Props = $props()

    useBlogNavigation({
        backUrl: '/',
        getElements: () => data.posts.map((post) => post.id)
    })
</script>

<svelte:head>
    <title>Blog | Miquel de Domingo</title>
    <meta content="Shower thoughts on frontend, design, and life as a cyclist" name="description" />

    <meta content="https://mikededo.com/blog" property="og:url" />
    <meta content="website" property="og:type" />
    <meta content="Blog | Miquel de Domingo" property="og:title" />
    <meta content="Shower thoughts on frontend, design, and life as a cyclist" property="og:description" />
    <meta content="https://mikededo.com/og.png" property="og:image" />
    <meta content="mikededo" property="og:site_name" />

    <meta content="summary_large_image" name="twitter:card" />
    <meta content="mikededo.com" property="twitter:domain" />
    <meta content="https://mikededo.com/blog" property="twitter:url" />
    <meta content="Blog | Miquel de Domingo" name="twitter:title" />
    <meta content="Shower thoughts on frontend, design, and life as a cyclist" name="twitter:description" />
    <meta content="https://mikededo.com/og.png" name="twitter:image" />

    <!-- Force the scrollbar-gutter here so we avoid flickering with blog page -->
    <style>
        html {
            scrollbar-gutter: stable;
        }
    </style>
</svelte:head>

<div class="flex flex-col pb-6">
    <Header
        description="Shower thoughts on frontend, design, and life as a cyclist"
        title="Blog"
    />

    <ul class="my-4 flex-1 space-y-4">
        {#each data.posts as post}
            <li class="group">
                <a class="flex flex-col hover:no-underline" href={post.relativeURL} id={post.id}>
                    <p class="flex justify-between text-blue-500 group-hover:underline">
                        <span>{post.title}</span>
                        <MoveRight
                            class="size-4 -translate-x-2 opacity-0 transition-all duration-150 ease-in-out group-hover:translate-x-0 group-hover:opacity-100"
                            aria-hidden="true"
                        />
                    </p>
                    <p class="flex justify-between text-sm text-muted-foreground">
                        <span class="line-clamp-2 max-w-3/4 flex-1">{post.description}</span>
                        <span class="shrink-0">{formatDate(post.date)}</span>
                    </p>
                </a>
            </li>
        {/each}
    </ul>
</div>
