<script lang="ts">
    type Props = {
        /** Optional coordinate labels at corners */
        showCoordinates?: boolean
    }

    const { showCoordinates = false }: Props = $props()
</script>

<div class="pointer-events-none absolute inset-0" aria-hidden="true">
    <div class="absolute top-0 left-0 h-4 w-4 border-t border-l border-muted-foreground/20"></div>
    <div class="absolute top-0 right-0 h-4 w-4 border-t border-r border-muted-foreground/20"></div>
    <div class="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-muted-foreground/20"></div>
    <div class="absolute right-0 bottom-0 h-4 w-4 border-r border-b border-muted-foreground/20"></div>

    {#if showCoordinates}
        <span class="absolute top-1.5 left-1.5 font-mono text-[10px] text-muted-foreground/50">0,0</span>
        <span class="absolute top-1.5 right-1.5 font-mono text-[10px] text-muted-foreground/50">1,0</span>
        <span class="absolute bottom-1.5 left-1.5 font-mono text-[10px] text-muted-foreground/50">0,1</span>
        <span class="absolute right-1.5 bottom-1.5 font-mono text-[10px] text-muted-foreground/50">1,1</span>
    {/if}
</div>
