<script lang="ts">
    import { MoveLeftIcon, MoveRightIcon } from '@lucide/svelte'
    import { onMount } from 'svelte'
    import { sineInOut } from 'svelte/easing'
    import { fade } from 'svelte/transition'

    import FocusGuard from '../focus-guard.svelte'
    import TocItem from './toc-item.svelte'
    import { useHeadingsState } from './use-headings.svelte'

    import { prefersReducedMotion } from '$lib/utils/reduced-motion'

    const MAX_BOTTOM_SHEET_HEIGHT = 384
    const BOTTOM_BAR_HEIGHT = 40

    const tocState = useHeadingsState()

    let contentHeight = $state<number>(0)
    let open = $state(false)
    let sheetRef = $state<HTMLElement>()
    let reducedMotion = $state(false)

    const activeText = $derived(tocState.headings.find((h) => h.id === tocState.active.id))
    const position = $derived.by(() => {
        if (tocState.progress >= 100) {
            return -BOTTOM_BAR_HEIGHT
        }

        if (open) {
            return Math.min(MAX_BOTTOM_SHEET_HEIGHT, contentHeight) + BOTTOM_BAR_HEIGHT - 1
        }

        return BOTTOM_BAR_HEIGHT
    })

    const onToggleToc = () => {
        open = !open
        document.body.dataset.scrollLocked = String(open)
    }

    const onItemClick = (id: string) => {
        open = false
        tocState.actions.gotoId(id)
    }

    onMount(() => {
        reducedMotion = prefersReducedMotion()

        const onClickOutside = (e: PointerEvent) => {
            if (!open || !sheetRef) {
                return
            }

            if (e.target !== sheetRef && !sheetRef.contains(e.target as Node)) {
                onToggleToc()
            }
        }

        document.body.addEventListener('pointerdown', onClickOutside)
        return () => {
            document.body.addEventListener('pointerdown', onClickOutside)
        }
    })
</script>

{#if open}
    <FocusGuard />
    <div
        class="fixed inset-0 z-10 bg-black/75"
        transition:fade={{ duration: reducedMotion ? 0 : 150, easing: sineInOut }}
    ></div>
{/if}

<div
    class="fixed right-0 left-0 z-10 h-0.5 overflow-hidden bg-muted transition-all duration-300 ease-out"
    style="bottom: {position}px"
>
    <div
        class="h-0.5 rounded-r-full bg-blue-500 transition-all duration-150 ease-out"
        style:width="{tocState.progress}%"
    ></div>
</div>
<div
    class="fixed right-0 left-0 z-10 translate-y-full divide-y divide-muted bg-background transition-all duration-300 ease-out"
    bind:this={sheetRef}
    style="bottom: {position}px"
>
    <div class="flex h-10 w-full divide-x divide-muted">
        <button
            class="px-4 transition-colors duration-100 disabled:text-muted-foreground/50"
            disabled={tocState.active.index === 0}
            onclick={tocState.actions.gotoPrev}
            aria-label="Go to previous heading"
        >
            <MoveLeftIcon class="size-4" />
        </button>
        <button
            class="flex w-full flex-1 items-center px-2 py-2 text-left text-xs"
            onclick={onToggleToc}
            aria-expanded={open}
            aria-label="Toggle table of contents"
        >
            {#if !activeText}
                <span>Table of contents</span>
            {:else}
                {#key activeText}
                    <span class="line-clamp-1" in:fade={{ duration: reducedMotion ? 0 : 250, easing: sineInOut }}>{activeText.text}</span>
                {/key}
            {/if}
        </button>
        <button
            class="px-4 transition-colors duration-100 disabled:text-muted-foreground/50"
            disabled={tocState.active.index === tocState.headings.length - 1}
            onclick={tocState.actions.gotoNext}
            aria-label="Go to next heading"
        >
            <MoveRightIcon class="size-4" />
        </button>
    </div>

    <ul
        class="w-full space-y-2 overflow-y-auto p-4"
        bind:clientHeight={contentHeight}
        style:max-height="{MAX_BOTTOM_SHEET_HEIGHT}px"
    >
        {#each tocState.headings as heading}
            {@const isActive = tocState.active.id === heading.id}
            <TocItem {heading} {isActive} onclick={onItemClick} />
        {/each}
    </ul>
</div>
