<script lang="ts">
    import type { ActivitySummary } from '$lib/server';

    import { browser } from '$app/environment';

    import AnimatedNumber from './animated-number.svelte';

    type Props = { data: ActivitySummary };
    const { data }: Props = $props();

    let summary = $state<ActivitySummary>({
        distance: 0,
        elevation: 0,
        lastFetched: new Date(),
        time: 0
    });

    $effect(() => {
        // This way we ensure the animation is executed on the browser, not on ssr
        if (browser && data) {
            summary = data;
        }
    });

    const formatTime = (hours: number): string => {
        const wholeHours = Math.floor(hours);
        const minutes = Math.round((hours - wholeHours) * 60);

        if (minutes === 60) {
            return `${wholeHours + 1}h 00m`;
        }

        return `${wholeHours}h${minutes.toString().padStart(2, '0')}m`;
    };
</script>

<div class="mx-4 mt-auto mb-10 rounded-xl bg-crust p-4 text-sm">
    <div class="mb-2 flex flex-col">
        <p class="font-semibold text-peach">Ride stats</p>
        <p class="text-overlay0 italic">Last 7 days</p>
    </div>
    <div class="flex flex-col">
        <div class="flex gap-2">
            <p>Distance: </p>
            <p>
                <AnimatedNumber format={(value) => value.toFixed(2).toLocaleString()} value={summary.distance} />km
            </p>
        </div>
        <div class="flex gap-2">
            <p>Time: </p>
            <AnimatedNumber format={formatTime} value={summary.time} />
        </div>
        <div class="flex gap-2">
            <p>Elevation: </p>
            <p>
                <AnimatedNumber format={(value) => Math.floor(value).toLocaleString()} value={summary.elevation} />m
            </p>
        </div>
    </div>
</div>

