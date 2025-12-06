<script lang="ts">
    import type { PageData } from './$types'

    import { MoveRight } from '@lucide/svelte'

    import Header from '$lib/components/layout/header.svelte'
    import { formatDate } from '$lib/utils/date'

    type Props = { data: PageData }
    const { data }: Props = $props()

</script>

<Header
    description="shower thoughts on frontend desing, design, and life as cyclist"
    title="blog"
/>

<ul class="my-4 space-y-1 text-sm">
    {#each data.posts as post}
        <li class="group">
            <a class="flex flex-col hover:no-underline" href={post.relativeURL}>
                <p class="flex justify-between text-blue-500 group-hover:underline">
                    <span>{post.title}</span>
                    <MoveRight
                        class="size-4 -translate-x-2 opacity-0 transition-all duration-150 ease-in-out group-hover:translate-x-0 group-hover:opacity-100"
                    />
                </p>
                <p class="flex justify-between text-xs text-muted-foreground">
                    <span class="line-clamp-2 max-w-3/4 flex-1">{post.description}</span>
                    <span class="shrink-0">{formatDate(post.date)}</span>
                </p>
            </a>
        </li>
    {/each}
</ul>
