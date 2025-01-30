<script lang="ts">
    import { onMount } from 'svelte';

    import Code from './code.svelte';
    import LineNumbers from './line-numbers.svelte';

    type Props = { content: string[] };
    const { content }: Props = $props();

    let lineHover = $state(0);

    onMount(() => {
        const onKeydown = (e: KeyboardEvent) => {
            if (e.key === 'j') {
                lineHover = Math.min(lineHover + 1, content.length - 1);
            } else if (e.key === 'k') {
                lineHover = Math.max(lineHover - 1, 0);
            }
        };

        document.addEventListener('keydown', onKeydown);
        return {
            destroy() {
                document.removeEventListener('keydown', onKeydown);
            }
        };
    });
</script>

<LineNumbers active={lineHover} count={content.length} />
<Code active={lineHover} code={content} />
