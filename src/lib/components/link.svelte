<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLAnchorAttributes } from 'svelte/elements';

    type Props = { children: Snippet; href: string } & HTMLAnchorAttributes;
    const { children, href, ...restProps }: Props = $props();
</script>

<a
    {...restProps}
    href={href}
    rel="noopener"
    target="_blank"
>
    {@render children()}
</a>
