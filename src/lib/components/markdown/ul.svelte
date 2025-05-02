<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';

    type Props = HTMLAttributes<HTMLUListElement>;
    const { children, ...restProps }: Props = $props();
</script>

<ul {...restProps} class="my-5 ml-5 list-disc md:my-6 md:ml-6">
    {@render children?.()}
</ul>

