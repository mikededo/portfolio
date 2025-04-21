<script lang="ts">
    import { onMount } from 'svelte';
    import { quintOut } from 'svelte/easing';
    import { fly, slide } from 'svelte/transition';

    import { DENY_ANALYTICS } from '$lib/cookies';

    let show = $state(false);
    let knowMore = $state(false);

    onMount(() => {
        if (!window.localStorage) {
            return;
        }

        show = window.localStorage.getItem(DENY_ANALYTICS) === null;
    });

    const onDeny = () => {
        if (window.localStorage) {
            window.localStorage.setItem(DENY_ANALYTICS, 'true');
        }
        show = false;
    };

    const onAccept = () => {
        if (window.localStorage) {
            window.localStorage.setItem(DENY_ANALYTICS, 'false');
        }

        show = false;
    };

    const onKnowMore = () => {
        knowMore = !knowMore;
    };

</script>

{#snippet button(text: string, cb: () => void, left: boolean = false)}
    <button
        class="bg-base hover:bg-mantle cursor-pointer rounded-full px-4 py-1.5 transition-colors"
        class:bg-crust={left}
        class:mr-auto={left}
        onclick={cb}
    >
        {text}
    </button>
{/snippet}

{#if show}
    <div
        class="border-base bg-crust bottom-cookies fixed left-2 right-2 z-50 rounded-xl border-2 p-4 text-sm md:left-auto md:right-2 md:max-w-[460px]"
        transition:fly={{ y: 28 }}
    >
        <p class="mb-4">This site uses tracking technologies. You may opt in or opt out of the use of these technologies.</p>
        {#if knowMore}
            <p
                class="mb-6 origin-bottom"
                transition:slide={{ duration: 450, easing: quintOut }}
            >
                The site does not track any personal information nor any sensitive data! It tracks page visits, and other things that can help me provide a better experience to the site! Since I'm using Vercel's integrated tracking, check:
                <a class="text-peach hover:underline" href="https://vercel.com/docs/analytics/privacy-policy#privacy-and-compliance">Vercel's conditions</a>
                You can completely opt out of analytics without being able to use the site at it's 100%!
            </p>
        {/if}
        <div class="flex justify-end gap-2">
            {@render button(knowMore ? 'Close' : 'Know more', onKnowMore, true)}
            {@render button('Deny', onDeny)}
            {@render button('Accept', onAccept)}
        </div>
    </div>
{/if}

