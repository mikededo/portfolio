<script lang="ts">
    import { SearchIcon } from 'lucide-svelte';
    import { tick } from 'svelte';
    import { fade, scale } from 'svelte/transition';

    import { EventManager } from '$lib/event-manager';

    const OPTIONS = [
        'Open /home page',
        'Open /projects page',
        'Open /about page'
    ];

    let show = $state(false);
    let search = $state('');
    let input: HTMLInputElement | undefined = $state();

    const matches = $derived.by(() => OPTIONS.reduce<
        { html: string; option: string }[]
    >((acc, option) => {
        const match = option.match(new RegExp(search, 'gi'));
        if (!match) {
            return acc;
        }

        const html = option
            .split(new RegExp(`(${search})`, 'gi'))
            .reduce(
                (acc, slice, i) => `${acc}${i % 2 === 0 ? slice : `<span class="text-peach underline">${slice}</span>`}`,
                ''
            );

        return [...acc, { html, option }];
    }, []));

    const showCommand = async (e: KeyboardEvent) => {
        e.preventDefault();

        if (e.key === ':') {
            show = !show;

            if (!show) {
                return;
            }
            tick().then(() => {
                input?.focus();
            });
        } else if (e.key === 'Escape' && show) {
            show = false;
        }
    };

    // Since a global listener is registered, we need to prevent when a key is
    // pressed when the input is focused
    const onKeydownBlocker = (e: KeyboardEvent) => {
        // When Escape is pressed the command should be hidden, so no blocking
        if (e.key === 'Escape') {
            return;
        }

        e.stopPropagation();
    };

    $effect(() => {
        EventManager.register('keydown', showCommand);

        return () => {
            EventManager.unregister('keydown', showCommand);
        };
    });
</script>

{#if show}
    <div transition:fade={{ duration: 150 }} class="hidden md:block fixed inset-0 bg-crust/90"></div>
    <div
        transition:scale={{ duration: 250, start: 0.975 }}
        class="hidden p-5 shadow-2xl fixed w-[720px] h-[480px] rounded-2xl border-4 border-base bg-mantle left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 md:flex flex-col gap-8"
    >
        <div class="relative">
            <SearchIcon class="absolute top-1/2 -translate-y-1/2 left-4 size-4 stroke-text" strokeWidth={2} />
            <input
                class="rounded-xl outline-none text-sm flex gap-3 bg-crust items-center w-full py-3 pl-10 pr-4 transition-colors border-2 border-transparent hover:border-surface0 active:border-surface0 focus:border-surface0"
                placeholder="Start typing here..."
                bind:value={search}
                bind:this={input}
                onkeydown={onKeydownBlocker}
            />
        </div>

        <div class="bg-crust w-full h-full rounded-xl flex flex-col p-3">
            {#if !search}
                <pre class="m-auto text-overlay2">
┌─────────────────┐
│ Command palette │
└─────────────────┘
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
                </pre>
            {:else}
                <div class="flex flex-col gap-[1px]">
                    {#each matches as { html }}
                        <button class="text-left px-3 py-2.5 transition hover:bg-base rounded-lg">
                            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                            {@html html}
                        </button>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
{/if}
