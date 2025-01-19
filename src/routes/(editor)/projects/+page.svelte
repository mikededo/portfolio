<script lang="ts">
    const content: Record<number, string> = {
        12: '┌────────────────────────┐',
        13: '│ Still working on this! │',
        14: '└────────────────────────┘',
        15: '             \\   ^__^',
        16: '              \\  (oo)\\_______',
        17: '                 (__)\\       )\\/\\',
        18: '                     ||----w |',
        19: '                     ||     ||'
    };
</script>

<div class="flex flex-1 text-sm md:text-md">
    <div class="flex flex-col px-2 py-1">
        {#each { length: 30 } as _, i}
            <span class="text-right text-overlay1">{i + 1}</span>
        {/each}
    </div>
    <div class="flex w-full flex-col py-1">
        {#each { length: 30 } as _, i}
            <span>
                <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                {@html content[i]?.replaceAll(' ', '&nbsp;')}
                {#if i !== 29}
                    <span class="text-surface1">↴</span>
                {/if}
            </span>
        {/each}
    </div>
</div>
