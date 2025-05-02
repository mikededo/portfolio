<script lang="ts">
    import type { Snippet } from 'svelte';

    type Props = { children?: Snippet };
    const { children }: Props = $props();
</script>

<h2 class="text-blue italic">## {@render children?.()}</h2>

