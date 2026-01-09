<script lang="ts" module>
    export type ScheduleEvent = {
        label: string
        width: number
        color: string
        content: { left: string, right: string } | string
    }
</script>

<script lang="ts">
    import type { MouseEventHandler } from 'svelte/elements'

    type Props = { events: ScheduleEvent[] }
    const { events }: Props = $props()

    const handleOnClick = ({ width: original }: ScheduleEvent): MouseEventHandler<HTMLDivElement> => (e) => {
        const element = e.currentTarget
        const title = element.querySelector('[data-slot=event-title]')
        if (!title) {
            return
        }

        if (element.dataset.collapsed === 'true') {
            element.dataset.collapsed = 'false'
            element.style.setProperty('--event-width', `${original}px`)
            return
        }

        const width = title.getBoundingClientRect().width
        element.dataset.collapsed = 'true'
        element.style.setProperty('--event-width', `${width}px`)
    }
</script>

<div class="relative mt-6 flex h-22 gap-1 overflow-x-auto" style="scrollbar-gutter: stable">
    {#each events as event, index (index)}
        <div
            class="group relative w-(--event-width) shrink-0 transition-all duration-200 outline-none"
            id="event-{index}"
            role="button"
            style:--event-width="{event.width}px"
            tabindex="-1"
            onclick={handleOnClick(event)}
            onkeydown={() => {}}
            data-collapsed={false}
        >
            <div class="relative">
                <div
                    class="sticky top-0 left-0 inline-block px-3 py-1 text-[11px] font-medium tracking-wide text-white"
                    style:background-color={event.color}
                    data-slot="event-title"
                >
                    {event.label}
                </div>

                {#each { length: event.width <= 50 ? 0 : event.width / 50 - 1 } as _, i}
                    <div
                        class="absolute bottom-0 h-4 w-px transition-all group-data-[collapsed=true]:h-0"
                        style="background-color: {event.color}; left: {(i + 1) * 50}px"
                    ></div>
                {/each}

                <div
                    class="flex h-12 justify-between p-2 transition-all duration-300 select-none group-data-[collapsed=true]:flex-col"
                    style:background-color="color-mix(in oklch, {event.color} 15%, transparent)"
                    style:color={event.color}
                >
                    {#if typeof event.content === 'string'}
                        <span class="text-[11px]">
                            {event.content}
                        </span>
                    {:else}
                        <span class="text-[11px]">
                            {event.content.left}
                        </span>
                        <span class="text-[11px]">
                            {event.content.right}
                        </span>
                    {/if}
                </div>
            </div>
        </div>
    {/each}
</div>
