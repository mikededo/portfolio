<script lang="ts">
    import type { Snippet } from 'svelte';

    type Props = {
        href: string;
        children?: Snippet;
    };
    const { children, href }: Props = $props();

    const internal = $derived(href.startsWith('/') || href.startsWith('#'));
    const rel = $derived(!internal ? 'noopener noreferrer' : undefined);
    const target = $derived(!internal ? '_blank' : undefined);
</script>

<a
    class="text-yellow hover:underline"
    {href}
    {rel}
    {target}
>
    <span class="hidden md:inline">[</span><span>{@render children?.()}</span><span class="hidden md:inline">]</span><span class="hidden md:inline">({href})</span>
</a>

