<script lang="ts">
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';

    import { ALLOW_ANALYTICS_COOKIE } from '$lib/cookies';

    let show = $state(false);

    onMount(() => {
        if (!window.localStorage) {
            return;
        }

        show = !window.localStorage.getItem(ALLOW_ANALYTICS_COOKIE);
    });

    const onDeny = () => {
        if (window.localStorage) {
            window.localStorage.removeItem(ALLOW_ANALYTICS_COOKIE);
        }
        show = false;
    };

    const onAccept = () => {
        if (window.localStorage) {
            window.localStorage.setItem(ALLOW_ANALYTICS_COOKIE, 'true');
        }
        show = false;
    };
</script>

{#snippet button(text: string, cb: () => void)}
    <button
        class="bg-base hover:bg-mantle cursor-pointer rounded-full px-4 py-1.5 transition-colors"
        onclick={cb}
    >
        {text}
    </button>
{/snippet}

{#if show}
    <div
        transition:fly={{ y: 28 }}
        class="border-base bg-crust bottom-cookies fixed left-4 right-4 z-50 rounded-xl border-2 p-4 text-sm md:left-auto md:right-2 md:max-w-[460px]"
    >
        <p class="mb-4">This site uses tracking technologies. You may opt in or opt out of the use of these technologies.</p>
        <div class="flex justify-end gap-2">
            {@render button('Deny', onDeny)}
            {@render button('Accept', onAccept)}
        </div>
    </div>
{/if}
