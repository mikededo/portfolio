<script lang="ts">
    import type { Snippet } from 'svelte';

    import type { LayoutServerData } from './$types';

    import { Editor, EditorDrawer, StravaStats, ThemeSelector, Timer } from '$lib/components';

    type Props = { children: Snippet; data: LayoutServerData };
    const { children, data }: Props = $props();

    const filetree: Editor.FileTreeNode[] = [
        {
            children: [
                {
                    children: [
                        { href: '/about', name: 'bio.md', type: 'file' },
                        { href: '/about/interests', name: 'interests.md', type: 'file' }
                    ],
                    name: 'about',
                    type: 'folder'
                },
                {
                    href: '/projects',
                    name: 'projects.md',
                    type: 'file'
                }
            ],
            name: 'src',
            type: 'folder'
        }
    ];
</script>

<div class="flex h-full">
    <aside class="hidden h-full w-editor-sidebar shrink-0 bg-mantle lg:flex lg:flex-col">
        <Editor.FileTree {filetree} />
        {#if data.strava}
            <StravaStats class="mx-4 mt-auto" data={data.strava} />
        {/if}
    </aside>

    <div class="flex h-full w-full flex-col">
        <!-- TODO: Add breadcrumbs -->
        <div class="flex h-editor-subheader shrink-0 items-center bg-mantle px-10 text-xs md:px-10">
            <span>~/home{data.pathname}</span>
        </div>

        <main class="flex h-editor-content w-editor-content overflow-x-hidden overflow-y-auto pb-2 text-sm md:text-md">
            {@render children()}
        </main>

        <div class="flex h-editor-bottom-pane w-editor-content shrink-0 items-center gap-4 overflow-hidden bg-mantle text-sm md:flex md:text-md">
            <div class="flex h-full items-center bg-blue px-3 text-base">NORMAL</div>
            <p class="hidden md:block">&middot;</p>
            <p class="hidden text-sm text-peach md:block">main</p>
            <p class="hidden md:block">&middot;</p>
            <p class="mr-2 ml-auto text-sm md:ml-0 lg:mr-0">~/home{data.pathname}/file.md</p>
            <div class="ml-auto box-content hidden h-full items-center rounded-l-full bg-crust px-4 text-sm md:flex">
                <Timer />
            </div>
        </div>
    </div>
</div>

<ThemeSelector editor />
<EditorDrawer strava={data.strava} {filetree} />
