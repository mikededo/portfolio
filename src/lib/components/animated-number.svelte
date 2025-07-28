<script lang="ts">
    import { quadOut } from 'svelte/easing';
    import { Tween } from 'svelte/motion';

    import { browser } from '$app/environment';

    type Props = {
        value: number;
        duration?: number;
        format?: (value: number) => number | string;
    };

    const {
        duration = 1000,
        format = (value) => Math.round(value),
        value = 0
    }: Props = $props();
    const animatedValue = new Tween(0, { duration, easing: quadOut });

    $effect(() => {
        if (browser) {
            animatedValue.set(value);
        }
    });

</script>

<span>{format(animatedValue.current)}</span>
