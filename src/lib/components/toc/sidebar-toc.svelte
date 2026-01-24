<script lang="ts">
    import { sineOut } from 'svelte/easing'

    import AnimatedNumber from '../animated-number.svelte'
    import CornerMarkers from '../corner-markers.svelte'
    import TocItem from './toc-item.svelte'
    import { useHeadingsState } from './use-headings.svelte'

    const tocState = useHeadingsState()
</script>

<aside
    class="3xl:translate-x-0 fixed top-4 right-0 hidden w-full max-w-64 bg-background/75 transition-none xl:inline-block 2xl:right-12 2xl:max-w-72 2xl:translate-x-0"
>
    <CornerMarkers
        class="**:data-[corner=bottom-left]:-left-3 **:data-[corner=top-left]:-left-3"
    />

    <div class="absolute inset-y-5 -left-3 w-px overflow-hidden rounded-full bg-muted">
        <div
            class="w-px rounded-full bg-blue-500 transition-all duration-150 ease-out"
            style:height="{tocState.progress}%"
        ></div>
    </div>

    <div class="space-y-3 p-2 pr-3">
        <div class="flex items-center justify-between">
            <p class="font-mono text-xs font-normal tracking-tight text-muted-foreground/75 uppercase">
                On this page
            </p>

            <p class="text-right font-mono text-[11px] -tracking-widest text-muted-foreground/75">
                &uarr; j / k &darr;
            </p>
        </div>
        <nav class="max-h-[calc(100vh-calc(var(--spacing)*24))] overflow-auto pr-0 text-xs">
            <ul class="w-full space-y-2">
                {#each tocState.headings as heading}
                    {@const isActive = tocState.active.id === heading.id}
                    <TocItem {heading} {isActive} onclick={tocState.actions.gotoId} />
                {/each}
            </ul>
        </nav>

        <p class="font-mono text-xs text-muted-foreground/50">
            <AnimatedNumber
                duration={500}
                easing={sineOut}
                format={(v) => Math.floor(Math.min(100, v))}
                value={tocState.progress}
            />
            % read
        </p>
    </div>
</aside>
