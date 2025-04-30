<script lang="ts">
    import { onMount } from 'svelte';
    import { twMerge } from 'tailwind-merge';

    import LineNumbers from './line-numbers.svelte';

    const SM_LINE_HEIGHT = 20;
    const MD_LINE_HEIGHT = 24;

    type Props = { text: string };
    const { text = '' }: Props = $props();

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

{#snippet codeHover(classes: string, height: number)}
    <div
        class={twMerge('absolute right-0 left-0 bg-overlay0/15', classes)}
        aria-hidden={true}
        style="height: {height}px; top: {height * lineHover}px"
    ></div>
{/snippet}

<LineNumbers
    class="md:hidden"
    active={lineHover}
    count={smLineCount}
    lineHeight={SM_LINE_HEIGHT}
/>
<LineNumbers
    class="hidden md:flex"
    active={lineHover}
    count={mdLineCount}
    lineHeight={MD_LINE_HEIGHT}
/>

<div class="relative max-h-editor-bottom-pane shrink-0">
    {@render codeHover('md:hidden', SM_LINE_HEIGHT)}
    {@render codeHover('hidden md:block', MD_LINE_HEIGHT)}

    <div class="w-(--width-editor-code) pr-2" bind:this={textElement}>
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html text}
    </div>
</div>
