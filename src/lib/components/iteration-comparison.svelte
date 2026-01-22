<script lang="ts">
    import type { Iteration } from '$lib/static/stacked-dialog'

    const COLORS: Record<Iteration['status'], string> = {
        failed: '#ef4444',
        success: '#10b981'
    }

    type Props = { iterations: Iteration[] }
    const { iterations }: Props = $props()

    let selected = $state(1)

    const onClickIteration = (id: number) => () => {
        selected = id
    }
</script>

<article>
    <div class="mt-4 mb-2 space-y-2">
        <div class="flex flex-wrap gap-2">
            {#each iterations as iteration (iteration.id)}
                <button
                    class="px-3 py-1.5 text-xs font-medium transition-all"
                    class:bg-foreground={selected === iteration.id}
                    class:bg-muted={selected !== iteration.id}
                    class:text-background={selected === iteration.id}
                    class:text-muted-foreground={selected !== iteration.id}
                    onclick={onClickIteration(iteration.id)}
                >
                    #{iteration.id}
                </button>
            {/each}
        </div>

        {#each iterations as iteration (iteration.id)}
            {#if selected === iteration.id}
                <div
                    class="space-y-1 border-l-2 bg-muted/50 px-4 py-2"
                    style:border-color={COLORS[iteration.status]}
                >
                    <div class="flex items-center justify-between">
                        <p class="my-0! text-sm font-medium">{iteration.title}</p>
                        <span
                            class="px-2 py-0.5 text-[10px] font-medium tracking-wide text-white uppercase"
                            style:background-color={COLORS[iteration.status]}
                        >
                            {iteration.status}
                        </span>
                    </div>

                    <div class="space-y-1 text-xs">
                        <div>
                            <span class="font-medium text-muted-foreground">Approach:</span>
                            <span class="ml-1">{iteration.approach}</span>
                        </div>
                        <div>
                            <span class="font-medium text-muted-foreground">
                                {iteration.status === 'success' ? 'Result:' : 'Problem:'}
                            </span>
                            <span class="ml-1">{iteration.problem}</span>
                        </div>
                    </div>
                </div>
            {/if}
        {/each}
    </div>
</article>
