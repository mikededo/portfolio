<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLAnchorAttributes } from 'svelte/elements';

    type Props = { children: Snippet; href: string } & HTMLAnchorAttributes;
    const { children, href, ...restProps }: Props = $props();
</script>

<a
    {...restProps}
    class="text-blue-500 hover:underline"
    href={href}
    rel="noopener noreferrer"
    target="_blank"
>
    {@render children()}
</a>
