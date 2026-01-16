<script lang="ts">
    import { sineOut } from 'svelte/easing'

    import AnimatedNumber from '../animated-number.svelte'
    import TocItem from './toc-item.svelte'
    import { useHeadingsState } from './use-headings.svelte'

    const tocState = useHeadingsState()
</script>

<aside
    class="3xl:translate-x-0 fixed top-64 left-3/4 hidden w-full max-w-64 transition-none xl:inline-block xl:translate-x-16 2xl:max-w-80 2xl:translate-x-0"
>
    <div class="absolute top-7 bottom-0.5 -left-3 w-0.5 overflow-hidden rounded-full bg-muted">
        <div
            class="w-0.5 rounded-full bg-blue-500 transition-all duration-150 ease-out"
            style:height="{tocState.progress}%"
        ></div>
    </div>

    <div class="space-y-3">
        <p class="font-mono text-[11px] -tracking-widest text-muted-foreground/75">
            &uarr; j / k &darr;
        </p>

        <p class="font-mono text-xs font-normal tracking-tight text-muted-foreground/75 uppercase">
            On this page
        </p>

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
