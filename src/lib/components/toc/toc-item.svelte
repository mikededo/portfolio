<script lang="ts">
    import type { TOCItem } from './use-headings.svelte'

    import { tv } from 'tailwind-variants'

    type Props = {
        heading: TOCItem
        onclick: (id: string) => void
        isActive?: boolean
    }
    const { heading, isActive, onclick }: Props = $props()

    const classes = tv(
        {
            base: 'w-full cursor-pointer truncate pl-[calc(var(--spacing)*2*var(--level))] text-left text-sm leading-snug transition-all duration-100 hover:text-foreground',
            defaultVariants: {
                active: false
            },
            variants: {
                active: {
                    false: 'text-muted-foreground/75',
                    true: 'text-accent cursor-default font-medium'
                }
            }
        }
    )

    const onClick = () => {
        onclick(heading.id)
    }
</script>

<li>
    <button
        class={classes({ active: isActive })}
        style:--level={heading.level * 2}
        title={heading.text}
        onclick={onClick}
    >
        {heading.text}
    </button>
</li>
