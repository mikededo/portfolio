<script lang="ts" module>
    export type CostItem = {
        label: string
        percentage: number
        color: string
        note?: string
    }
</script>

<script lang="ts">
    type Props = {
        items: CostItem[]
        title?: string
    }
    const { items, title = 'Time distribution when using LLM tools' }: Props = $props()

    const total = $derived(items.reduce((sum, item) => sum + item.percentage, 0))
</script>

<figure>
    <div class="relative mt-4 mb-2 w-full overflow-x-auto" style="scrollbar-gutter: stable">
        <div
            class="sticky top-0 left-0 inline-block px-3 py-1 text-[11px] font-medium tracking-wide text-white"
            style:background-color="#334155"
            data-slot="event-title"
        >
            {title}
        </div>

        <div
            class="min-w-140 p-2"
            style:background-color="color-mix(in oklch, #334155 10%, transparent)"
        >
            <div class="flex w-full items-center gap-1">
                {#each items as item}
                    <div class="relative" style="width: {(item.percentage / total) * 100}%">
                        <div
                            class="sticky top-0 left-0 inline-block px-2 py-1 text-[11px] font-medium tracking-wide text-nowrap text-white"
                            style:background-color={item.color}
                            data-slot="cost-title"
                        >
                            {item.label}
                        </div>

                        <div
                            class="flex h-10 items-end justify-center pb-1"
                            style:background-color="color-mix(in oklch, {item.color} 40%, var(--color-background))"
                            style:color={item.color}
                        >
                            <span class="text-[10px] font-medium">{item.percentage}%</span>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>

    <figcaption class="text-xs text-muted-foreground">
        The actual time breakdown — generation is only part of the story
    </figcaption>
</figure>
