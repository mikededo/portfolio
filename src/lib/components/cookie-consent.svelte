<script lang="ts" module>
    import { tv } from 'tailwind-variants';

    export const DENY_ANALYTICS = 'deny-analytics';

    const buttonStyles = tv({
        base: 'cursor-pointer px-4 py-1.5 transition-colors',
        defaultVariants: { type: 'secondary' },
        variants: {
            type: {
                primary: 'bg-slate-300 hover:bg-slate-200',
                secondary: 'bg-slate-100 hover:bg-slate-200'
            }
        }
    });
</script>

<script lang="ts">
    import { onMount } from 'svelte';
    import { quintOut } from 'svelte/easing';
    import { fly, slide } from 'svelte/transition';

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

{#if show}
    <div
        class="fixed right-2 bottom-2 left-2 z-50 border border-slate-300 bg-white p-3 text-sm sm:right-0 sm:left-auto sm:max-w-sm"
        transition:fly={{ easing: quintOut, y: 28 }}
    >
        <p class="mb-2">
            This site uses tracking technologies. You may opt in or opt out of the use of these technologies.
        </p>
        {#if knowMore}
            <p
                class="mb-4 origin-bottom"
                transition:slide={{ duration: 250, easing: quintOut }}
            >
                The site does not track any personal information nor any sensitive data! It tracks page visits, and other things that can help me provide a better experience to the site! Since I'm using Vercel's integrated tracking, check:
                <a class="text-peach hover:underline" href="https://vercel.com/docs/analytics/privacy-policy#privacy-and-compliance">Vercel's conditions</a>
                You can completely opt out of analytics without being able to use the site at it's 100%!
            </p>
        {/if}
        <div class="flex justify-end gap-2">
            <button class={buttonStyles({ class: 'mr-auto' })} onclick={onKnowMore}>
                {knowMore ? 'Close' : 'Know more'}
            </button>
            <button class={buttonStyles()} onclick={onDeny}>
                Deny
            </button>
            <button class={buttonStyles({ type: 'primary' })} onclick={onAccept}>
                Accept
            </button>
        </div>
    </div>
{/if}
