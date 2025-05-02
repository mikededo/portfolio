<script lang="ts">
    import type { Snippet } from 'svelte';

    type Props = { children: Snippet };
    const { children }: Props = $props();
</script>

<p class="text-overlay2 italic">&lt;!-- {@render children()} --&gt;</p>
