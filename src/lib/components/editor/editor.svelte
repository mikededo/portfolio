<script lang="ts">
    import type { Snippet } from 'svelte';

    import { onMount } from 'svelte';

    import LineNumbers from './line-numbers.svelte';

    const SM_LINE_HEIGHT = 20;
    const MD_LINE_HEIGHT = 24;

    type Props = { children: Snippet };
    const { children }: Props = $props();

    let textElement: HTMLDivElement | undefined = $state();
    let smLineCount = $state(0);
    let mdLineCount = $state(0);
    let lineHover = $state(0);

    const calculateLineCount = () => {
        if (!textElement) {
            return;
        }

        const height = textElement.offsetHeight;
        smLineCount = Math.max(1, Math.ceil(height / SM_LINE_HEIGHT));
        mdLineCount = Math.max(1, Math.ceil(height / MD_LINE_HEIGHT));
    };

    onMount(() => {
        calculateLineCount();
        const controller = new AbortController();

        document.addEventListener('keydown', (e: KeyboardEvent) => {
            const isMd = window.innerWidth >= 768;
            if (e.key === 'j') {
                lineHover = Math.min(lineHover + 1, (isMd ? mdLineCount : smLineCount) - 1);
            } else if (e.key === 'k') {
                lineHover = Math.max(lineHover - 1, 0);
            }
        }, { signal: controller.signal });
        window.addEventListener('resize', calculateLineCount, { signal: controller.signal });

        return {
            destroy() {
                controller.abort();
            }
        };
    });
</script>

<LineNumbers
    class="md:hidden"
    active={null}
    count={smLineCount}
    lineHeight={SM_LINE_HEIGHT}
/>
<LineNumbers
    class="hidden md:flex"
    active={lineHover}
    count={mdLineCount}
    lineHeight={MD_LINE_HEIGHT}
    relative
/>

<div class="relative max-h-editor-bottom-pane shrink-0">
    <div
        class="absolute right-0 left-0 hidden bg-overlay0/15 md:block"
        aria-hidden={true}
        style="height: {MD_LINE_HEIGHT}px; top: {MD_LINE_HEIGHT * lineHover}px"
    ></div>

    <div class="w-(--width-editor-code) pr-2" bind:this={textElement}>
        {@render children()}
    </div>
</div>
