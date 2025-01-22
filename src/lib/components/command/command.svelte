<script lang="ts">
    import type { Option } from './options';

    import { SearchIcon } from 'lucide-svelte';
    import { tick } from 'svelte';
    import { fade, scale } from 'svelte/transition';

    import { useTrapFocus } from '$lib/actions';
    import { EventManager } from '$lib/event-manager';
    import { Keys } from '$lib/keyboards';

    import { OPTIONS } from './options';

    let show = $state(false);
    let command = $state('');
    let input: HTMLInputElement | undefined = $state();

    const matches = $derived.by(() => OPTIONS.reduce<
        { html: string; option: Option }[]
    >((acc, { value, ...option }) => {
        const match = value.match(new RegExp(command, 'gi'));
        if (!match) {
            return acc;
        }

        const html = value
            .split(new RegExp(`(${command})`, 'gi'))
            .reduce(
                (acc, slice, i) => `${acc}${i % 2 === 0 ? slice : `<span class="text-peach underline">${slice}</span>`}`,
                ''
            );

        return [...acc, { html, option: { value, ...option } }];
    }, []));

    const resetState = () => {
        show = false;
        command = '';
    };

    const showCommand = async (e: KeyboardEvent) => {
        if (e.key === Keys.Colon) {
            e.preventDefault();
            if (show) {
                resetState();
                return;
            }

            show = true;
            tick().then(() => {
                input?.focus();
            });
        } else if (e.key === Keys.Escape && show) {
            resetState();
        }
    };

    // Since a global listener is registered, we need to prevent when a key is
    // pressed when the input is focused
    const onKeydownBlocker = (e: KeyboardEvent) => {
        // When Escape is pressed the command should be hidden, so no blocking
        if (e.key === Keys.Escape) {
            return;
        }

        e.stopPropagation();
    };

    const actionProxy = (action: Option['action']) => () => {
        resetState();
        action();
    };

    $effect(() => {
        EventManager.register('keydown', showCommand);

        return () => {
            EventManager.unregister('keydown', showCommand);
        };
    });
</script>

{#if show}
    <div
        role="presentation"
        tabindex="-1"
        transition:fade={{ duration: 150 }}
        class="fixed inset-0 z-30 hidden bg-crust/90 md:block"
    ></div>
    <div
        transition:scale={{ duration: 250, start: 0.975 }}
        class="fixed left-1/2 top-1/2 z-30 hidden h-[480px] w-[720px] -translate-x-1/2 -translate-y-1/2 flex-col gap-8 rounded-2xl border-4 border-base bg-mantle p-5 shadow-2xl md:flex"
        role="dialog"
        aria-modal="true"
        use:useTrapFocus
    >
        <div class="relative">
            <SearchIcon class="absolute left-4 top-1/2 size-4 -translate-y-1/2 stroke-text" strokeWidth={2} />
            <input
                class="flex w-full items-center gap-3 rounded-xl border-2 border-transparent bg-crust py-3 pl-10 pr-4 text-sm outline-none transition-colors hover:border-surface0 focus:border-surface0 active:border-surface0"
                placeholder="Try searching &apos;Open &mldr;&apos;"
                bind:value={command}
                bind:this={input}
                onkeydown={onKeydownBlocker}
            />
        </div>

        <div class="flex h-full w-full flex-col rounded-xl bg-crust p-3">
            {#if !command}
                <pre class="m-auto text-overlay2">
┌──────────────────────────────────────────┐
│ Change the theme, open a page&mldr; Anything! │
└──────────────────────────────────────────┘
                  \   ^__^
                   \  (oo)\_______
                      (__)\       )\/\
                          ||----w |
                          ||     ||
                </pre>
            {:else}
                <div class="flex flex-col gap-0.5">
                    {#each matches as { html, option: { action, Icon } }}
                        <button
                            class="flex items-center gap-4 rounded-lg px-3 py-2.5 text-left outline-none transition hover:bg-base focus:bg-base active:bg-base"
                            onclick={actionProxy(action)}
                        >
                            <Icon class="size-5" />
                            <div>
                                <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                                {@html html}
                            </div>
                        </button>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
{/if}
