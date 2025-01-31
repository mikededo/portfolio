<script lang="ts">
    import type { Snippet } from 'svelte';

    import type { LayoutServerData } from './$types';

    import { Editor, ThemeSelector, Timer } from '$lib/components';

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
    <aside class="bg-mantle w-editor-sidebar hidden h-full shrink-0 lg:flex lg:flex-col">
        <Editor.FileTree {filetree} />
    </aside>

    <div class="flex h-full w-full flex-col">
        <!-- TODO: Add breadcrumbs -->
        <div class="bg-mantle h-editor-subheader flex shrink-0 items-center px-10 text-xs md:px-10">
            <span>~/home{data.pathname}</span>
        </div>

        <main class="h-editor-content w-editor-content flex overflow-auto text-sm md:text-md">
            {@render children()}
        </main>

        <div class="bg-mantle h-editor-bottom-pane w-editor-content flex shrink-0 items-center gap-4 overflow-hidden text-sm md:flex md:text-md">
            <div class="bg-blue text-base flex h-full items-center px-3">NORMAL</div>
            <p class="hidden md:block">&middot;</p>
            <p class="text-peach hidden text-sm md:block">main</p>
            <p class="hidden md:block">&middot;</p>
            <p class="ml-auto mr-2 text-sm md:ml-0 lg:mr-0">~/home{data.pathname}/file.md</p>
            <div class="bg-crust ml-auto box-content hidden h-full items-center rounded-l-full px-4 text-sm md:flex">
                <Timer />
            </div>
        </div>
    </div>
</div>

<ThemeSelector sidebar />
