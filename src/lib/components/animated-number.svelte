<script lang="ts">
    import { quadOut } from 'svelte/easing'
    import { Tween } from 'svelte/motion'

    import { browser } from '$app/environment'

    type Props = {
        value: number
        easing?: (t: number) => number
        duration?: number
        format?: (value: number) => number | string
    }

    const {
        duration = 1000,
        easing = quadOut,
        format = (value) => Math.round(value),
        value = 0
    }: Props = $props()
    // svelte-ignore state_referenced_locally
    const animatedValue = new Tween(0, { duration, easing })

    $effect(() => {
        if (browser) {
            animatedValue.set(value)
        }
    })

</script>

<span>{format(animatedValue.current)}</span>
