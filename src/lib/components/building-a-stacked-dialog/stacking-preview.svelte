<script lang="ts">
    import type { StackLayer } from '$lib/static/building-a-stacked-dialog'

    type Props = { layers: StackLayer[] }
    const { layers }: Props = $props()

    let stacked = $state(false)

    const start = () => {
        if (stacked) {
            stacked = false
            setTimeout(() => {
                stacked = true
            }, 400)
        } else {
            stacked = true
        }
    }

    const getLayerState = (layer: StackLayer) => {
        const maxDepth = Math.max(...layers.map((l) => l.depth))
        const isTopDialog = layer.depth === maxDepth
        const isBackground = stacked && !isTopDialog

        if (isTopDialog && !stacked) {
            return { opacity: 0, overlay: false, scale: 0.95, translateY: 8 }
        }
        if (isBackground) {
            return { opacity: 1, overlay: layer.overlay, scale: layer.scale, translateY: layer.translateY }
        }
        return { opacity: 1, overlay: false, scale: 1, translateY: 0 }
    }
</script>

<figure>
    <div class="relative mt-4 mb-2 flex items-center justify-center py-12">
        <div class="relative h-48 w-64">
            {#each [...layers].reverse() as layer (layer.depth)}
                {@const state = getLayerState(layer)}
                <div
                    class="absolute inset-0 flex flex-col rounded-md border border-muted-foreground/30 bg-background transition-all duration-300"
                    style:opacity={state.opacity}
                    style:transform="scale({state.scale}) translateY({state.translateY}px)"
                    style:z-index={layer.depth}
                >
                    <div class="border-b border-muted-foreground/30 px-4 py-2">
                        <span class="text-sm font-medium">{layer.label}</span>
                    </div>
                    <div class="flex flex-1 items-center justify-center p-4">
                        <div class="space-y-1 text-center text-[10px] text-muted-foreground">
                            <div>scale({state.scale})</div>
                            <div>translateY({state.translateY}px)</div>
                            <div>overlay: {state.overlay}</div>
                        </div>
                    </div>
                    {#if state.overlay}
                        <div class="absolute inset-0 rounded-md bg-black/5 transition-opacity duration-300"></div>
                    {/if}
                </div>
            {/each}
        </div>

        <button
            class="absolute top-2 left-4 rounded border border-muted-foreground/30 px-2 py-1 text-[10px] text-muted-foreground transition-colors hover:bg-muted"
            onclick={start}
        >
            {stacked ? 'Replay' : 'Start'}
        </button>

        <div class="absolute top-2 right-4 hidden space-y-1 text-[10px] md:block">
            {#each layers as layer (layer.depth)}
                {@const state = getLayerState(layer)}
                {@const isActive = state.opacity === 1 && !state.overlay}
                <div class="flex items-center gap-2">
                    <span
                        class="inline-block h-2 w-2 rounded-full transition-colors duration-300"
                        style:background-color={isActive ? '#10b981' : '#64748b'}
                    ></span>
                    <span class="text-muted-foreground">
                        Depth {layer.depth}: {isActive ? 'Active' : 'Background'}
                    </span>
                </div>
            {/each}
        </div>
    </div>

    <figcaption class="text-xs text-muted-foreground">
        Visual stacking effect — background dialogs scale down and shift up
    </figcaption>
</figure>
