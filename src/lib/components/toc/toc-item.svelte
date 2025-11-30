<script lang="ts">
    import type { TOCItem } from './use-headings.svelte';

    import { cn } from 'tailwind-variants';

    type Props = {
        heading: TOCItem;
        onclick: (id: string) => void;
        isActive?: boolean;
    };
    const { heading, isActive, onclick }: Props = $props();

    const onClick = () => {
        onclick(heading.id);
    };
</script>

<li>
    <button
        class={cn(
            'text-left cursor-pointer text-sm leading-snug transition-all duration-100 hover:text-foreground line-clamp-1',
            isActive ? 'text-accent font-medium' : 'text-muted-foreground/75'
        )}
        style:padding-left="calc(var(--spacing) * 2 * {heading.level})"
        title={heading.text}
        onclick={onClick}
    >
        {heading.text}
    </button>
</li>
