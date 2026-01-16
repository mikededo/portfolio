<script lang="ts" module>
    export type EffectivenessItem = {
        task: string
        level: number // 0-100
        label: string
        color: string
    }
</script>

<script lang="ts">
    type Props = { items: EffectivenessItem[] }
    const { items }: Props = $props()
</script>

<figure>
    <div class="mt-4 mb-2 space-y-3">
        {#each items as item}
            <div class="group">
                <div class="flex items-center justify-between text-xs">
                    <span class="font-medium">{item.task}</span>
                    <span
                        class="px-2 py-0.5 text-[10px] font-medium tracking-wide text-white"
                        style:background-color={item.color}
                    >
                        {item.label}
                    </span>
                </div>
                <div
                    class="h-6 w-full"
                    style:background-color="color-mix(in oklch, {item.color} 10%, transparent)"
                >
                    <div
                        class="h-full transition-all duration-500"
                        style:background-color="color-mix(in oklch, {item.color} 50%, var(--color-background))"
                        style:width="{item.level}%"
                    ></div>
                </div>
            </div>
        {/each}
    </div>

    <figcaption class="text-xs text-muted-foreground">
        Effectiveness based on my experience over 4-5 months of daily use
    </figcaption>
</figure>
