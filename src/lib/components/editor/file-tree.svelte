<script lang="ts" module>
    export type FileTreeNode = {
        children: FileTreeNode[];
        name: string;
        type: 'folder';
    } | {
        href: string;
        name: string;
        type: 'file';
    };
</script>

<script lang="ts">
    import { File, Folder } from '@lucide/svelte';

    import { page } from '$app/state';

    type Props = {
        filetree: FileTreeNode[];
        drawer?: boolean;
        onItemClick?: () => void;
    };
    const { drawer, filetree, onItemClick }: Props = $props();
</script>

{#snippet tree(node: FileTreeNode, depth: number, pos: number)}
    {#if node.type === 'folder'}
        <li class="node flex h-6 cursor-default items-center gap-2" style="--depth: {depth}">
            <Folder class="size-4 fill-mauve stroke-none" />
            <p>{node.name}</p>
        </li>
        <ul>
            {#each node.children as child, i}
                {@render tree(child, depth + 1, i)}
            {/each}
        </ul>
    {:else}
        <li
            class="flex h-6 items-center aria-not-current:hover:bg-overlay0/15 aria-current:cursor-default aria-current:bg-overlay0/15"
            aria-current={page.url.pathname === node.href}
        >
            <a
                class="node flex w-full items-center gap-2"
                href={node.href}
                style="--depth: {depth}"
                class:fill-flamingo={pos % 4 === 0}
                class:fill-maroon={pos % 4 === 1}
                class:fill-sky={pos % 4 === 3}
                class:fill-yellow={pos % 4 === 2}
                onclick={onItemClick}
            >
                <File class="size-4 fill-inherit stroke-none" />
                <p>{node.name}</p>
            </a>
        </li>
    {/if}
{/snippet}

<ul class="flex flex-col text-sm" class:mt-6={!drawer}>
    {#each filetree as child, i}
        {@render tree(child, drawer ? 0 : 1, i)}
    {/each}
</ul>

<style>
.node {
    padding-left: calc(var(--depth) * 1rem);
}
</style>
