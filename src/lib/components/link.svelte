<script lang="ts">
    import type { Snippet } from 'svelte';

    type Props = { children: Snippet; href: string };
    const { children, href }: Props = $props();
</script>

<a
    class="text-blue-500 hover:underline"
    href={href}
    rel="noopener noreferrer"
    target="_blank"
>
    {@render children()}
</a>
