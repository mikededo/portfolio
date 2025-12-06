<script lang="ts">
    import type { HTMLButtonAttributes } from 'svelte/elements'

    import { cn } from 'tailwind-variants'

    import { getThemeContext, toggleTheme } from '$lib/context/theme.svelte'
    import { Theme } from '$lib/utils/theme'

    const { ...props }: HTMLButtonAttributes = $props()

    const theme = getThemeContext()

    const onThemeChange = () => {
        toggleTheme()
    }
</script>

<button
    {...props}
    class={cn('cursor-pointer hover:underline', props.class)}
    type="button"
    onclick={onThemeChange}
>
    {theme() === Theme.Light ? 'dark' : 'light'}
</button>
