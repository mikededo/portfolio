<script lang="ts">
    type Props = {
        carbs: number;
        fats: number;
        protein: number;
        total: number;
    };
    const { carbs, fats, protein, total }: Props = $props();

    const CARBS_COLOR = '#FF850D';
    const FATS_COLOR = '#8338EC';
    const PROTEIN_COLOR = '#10b981';
    const TOTAL_COLOR = '#717486';
</script>

<figure>
    <div class="relative mt-4 mb-2 w-full overflow-x-auto" style="scrollbar-gutter: stable">
        <div
            class="sticky top-0 left-0 inline-block px-3 py-1 text-[11px] font-medium tracking-wide text-white"
            style:background-color={TOTAL_COLOR}
            data-slot="event-title"
        >
            Total intake ({total}kcal, estimated)
        </div>

        <div
            class="min-w-180 p-2"
            style:background-color="color-mix(in oklch, {TOTAL_COLOR} 15%, transparent)"
            style:color={TOTAL_COLOR}
        >

            <div class="flex w-full items-center gap-1">
                <div class="relative" style="width: {carbs}%">
                    <div
                        class="sticky top-0 left-0 inline-block px-2 py-1 text-[11px] font-medium tracking-wide text-white"
                        style:background-color={CARBS_COLOR}
                        data-slot="event-title"
                    >
                        Carbs ({carbs}%)
                    </div>

                    <div
                        class="flex h-10 p-2 text-xs"
                        style:background-color="color-mix(in oklch, {CARBS_COLOR} 50%, white)"
                        style:color={CARBS_COLOR}
                    ></div>
                </div>

                <div class="relative" style="width: {protein}%">
                    <div
                        class="sticky top-0 left-0 inline-block px-2 py-1 text-[11px] font-medium tracking-wide text-white"
                        style:background-color={PROTEIN_COLOR}
                        data-slot="event-title"
                    >
                        Protein {protein}%
                    </div>

                    <div
                        class="flex h-10 justify-between p-2"
                        style:background-color="color-mix(in oklch, {PROTEIN_COLOR} 40%, white)"
                        style:color={PROTEIN_COLOR}
                    ></div>
                </div>

                <div class="relative" style="width: {fats}%">
                    <div
                        class="sticky top-0 left-0 inline-block shrink-0 px-2 py-1 text-[11px] font-medium tracking-wide text-nowrap text-white"
                        style:background-color={FATS_COLOR}
                        data-slot="event-title"
                    >
                        Fats {fats}%
                    </div>

                    <div
                        class="flex h-10 justify-between p-2"
                        style:background-color="color-mix(in oklch, {FATS_COLOR} 40%, white)"
                        style:color={FATS_COLOR}
                    ></div>
                </div>
            </div>
        </div>
    </div>

    <figcaption class="text-xs text-muted-foreground">For this caption, I've used a total of {total}kcal, as it's the average consumed for these days</figcaption>
</figure>
