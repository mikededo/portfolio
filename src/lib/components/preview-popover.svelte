<script lang="ts">
    import type { Snippet } from 'svelte';

    import { Spring } from 'svelte/motion';

    type Props = {
        children: Snippet;
        label: string;
        slug: string;
    };
    const { children, label, slug }: Props = $props();

    const coords = new Spring(
        { opacity: 0, scale: 0.95 },
        { damping: 0.4, stiffness: 0.1 }
    );

    const onMouseEnter = () => {
        coords.set({ opacity: 1, scale: 1 });
    };

    const onMouseLeave = () => {
        coords.set({ opacity: 0, scale: 0.95 });
    };
</script>

<div
    class="relative inline-flex"
    role="none"
    onmouseenter={onMouseEnter}
    onmouseleave={onMouseLeave}
>
    {@render children()}

    <div
        class="pointer-events-none absolute -top-1 z-10 aspect-3/2 h-50 -translate-y-full overflow-hidden border border-gray-200 bg-white p-1 shadow-md dark:border-slate-600 dark:bg-slate-800"
        style="opacity: {coords.current.opacity}; scale: {coords.current.scale}; scrollbar-gutter: auto"
        aria-hidden="true"
    >
        <img
            class="w-full"
            alt="Preview of {label}"
            src="/previews/{slug}.jpg"
        />
    </div>
</div>

