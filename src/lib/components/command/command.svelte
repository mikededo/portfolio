<script lang="ts">
    import type { Option } from './options';

    import { SearchIcon } from 'lucide-svelte';
    import { tick } from 'svelte';
    import { quintOut } from 'svelte/easing';
    import { fade, scale } from 'svelte/transition';

    import { useClickAway, useTrapFocus } from '$lib/actions';
    import { getAppContext, hideCommand, showCommand } from '$lib/context';
    import { EventManager } from '$lib/event-manager';
    import { Keys } from '$lib/keyboards';

    import { OPTIONS } from './options';

    const { command: commandState } = getAppContext();
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
        hideCommand();
        command = '';
    };

    const toggleCommand = async (e: KeyboardEvent) => {
        if (e.key === Keys.Colon) {
            e.preventDefault();
            if (commandState.show) {
                resetState();
                return;
            }

            showCommand();
            tick().then(() => {
                input?.focus();
            });
        } else if (e.key === Keys.Escape && commandState.show) {
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
        EventManager.register('keydown', toggleCommand);

        return () => {
            EventManager.unregister('keydown', toggleCommand);
        };
    });
</script>

{#if commandState.show}
    <div
        role="presentation"
        tabindex="-1"
        transition:fade={{ duration: 150 }}
        class="bg-crust/90 fixed inset-0 z-30 hidden md:block"
    ></div>
    <div
        transition:scale={{ duration: 350, easing: quintOut, start: 0.975 }}
        class="border-base bg-mantle fixed left-1/2 top-1/2 z-30 hidden h-[480px] w-[720px] -translate-x-1/2 -translate-y-1/2 flex-col gap-8 rounded-2xl border-4 p-5 shadow-2xl md:flex"
        role="dialog"
        aria-modal="true"
        use:useTrapFocus
        use:useClickAway={resetState}
    >
        <div class="relative">
            <SearchIcon class="stroke-text absolute left-4 top-1/2 size-4 -translate-y-1/2" strokeWidth={2} />
            <input
                class="bg-crust outline-hidden hover:border-surface0 focus:border-surface0 active:border-surface0 flex w-full items-center gap-3 rounded-xl border-2 border-transparent py-3 pl-10 pr-4 text-sm transition-colors"
                placeholder="Try searching &apos;Open &mldr;&apos;"
                bind:value={command}
                bind:this={input}
                onkeydown={onKeydownBlocker}
            />
        </div>

        <div class="bg-crust flex h-full w-full flex-col overflow-auto rounded-xl p-3">
            {#if !command}
                <pre class="text-overlay2 m-auto">
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
                            class="outline-hidden hover:bg-base focus:bg-base active:bg-base curosr-pointer flex h-11 items-center gap-4 rounded-lg px-3 py-2.5 text-left transition"
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
