<script lang="ts">
    import type { Snippet } from 'svelte';

    type Props = { children?: Snippet };
    const { children }: Props = $props();
</script>

<p class="my-5 md:my-6">{@render children?.()}</p>
