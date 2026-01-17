<script lang="ts">
    import type { Snippet } from 'svelte'

    import BottomSectionMarker from './bottom-section-marker.svelte'

    type Props = {
        number: number
        title: string
        children: Snippet
    }
    const { children, number, title }: Props = $props()

    const formattedNumber = $derived(number.toString().padStart(2, '0'))
</script>

<section class="group relative">
    <h2 class="flex items-center gap-2">
        <span class="mt-px font-mono text-sm tracking-tighter text-muted-foreground">
            {formattedNumber} /
        </span>
        {title}
    </h2>

    {@render children()}

    <div class="absolute -top-5.5 bottom-3 -left-6 bg-muted-foreground/20 group-last:bottom-5.5 md:-left-8 md:w-px" aria-hidden="true"></div>
    <div class="absolute -top-5.5 -right-8 bottom-3 bg-muted-foreground/20 group-last:bottom-5.5 md:w-px" aria-hidden="true"></div>

    <BottomSectionMarker />
</section>
