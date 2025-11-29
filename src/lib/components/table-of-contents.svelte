<script lang="ts">
    import { onMount } from 'svelte';
    import { sineOut } from 'svelte/easing';
    import { cn } from 'tailwind-variants';

    import AnimatedNumber from './animated-number.svelte';

    type TOCItem = {
        id: string;
        level: number;
        text: string;
    };

    let activeId = $state('');
    let scrollProgress = $state(0);

    let headings = $state<TOCItem[]>([]);

    onMount(() => {
        headings = [
            ...document.querySelectorAll('h2,h3,h4,h5,h6').values()
        ].map((e) => {
            const element = e as HTMLHeadingElement;

            return {
                id: e.id,
                level: Number.parseInt(element.tagName.charAt(1)) - 2,
                text: element.textContent || ''
            };
        });
    });

    $effect(() => {
        const handleScroll = () => {
            // Calculate scroll progress
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

            scrollProgress = (progress);

            const viewportOffset = window.innerHeight * 0.5;
            const headingElements = headings.map((h) => document.getElementById(h.id)).filter(Boolean);

            let currentActive = '';
            for (let i = headingElements.length - 1; i >= 0; i--) {
                const element = headingElements[i];
                if (!element) {
                    continue;
                }

                const rect = element.getBoundingClientRect();
                if (rect.top <= viewportOffset) {
                    currentActive = headings[i].id;
                    break;
                }
            }

            activeId = (currentActive || (headings[0]?.id ?? ''));
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    });

    const onTitleClick = (id: string) => () => {
        const element = document.getElementById(id);
        if (!element) {
            return;
        }

        const offset = window.innerHeight * 0.35;
        const pos = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            behavior: 'smooth',
            top: pos - offset
        });
    };
</script>

<aside
    class="3xl:translate-x-0 fixed top-64 left-3/4 hidden w-full max-w-64 transition-none xl:inline-block xl:translate-x-16 2xl:max-w-80 2xl:translate-x-0"
>
    <div class="absolute top-1 bottom-1 -left-4 w-0.75 overflow-hidden rounded-full bg-muted">
        <div
            class="w-0.75 rounded-full bg-blue-500 transition-all duration-150 ease-out"
            style:height="{scrollProgress}%"
        ></div>
    </div>

    <div class="space-y-4">
        <p class="font-mono text-xs font-medium tracking-widest text-muted-foreground/75 uppercase">
            On this page
        </p>

        <nav class="max-h-[calc(100vh - calc(var(--spacing) * 24))] overflow-auto pr-0 text-xs">
            <ul class="w-full space-y-2">
                {#each headings as heading}
                    {@const isActive = activeId === heading.id}

                    <li>
                        <button
                            class={cn(
                                'text-left cursor-pointer text-sm leading-snug transition-all duration-100 hover:text-foreground line-clamp-1',
                                isActive ? 'text-accent font-medium' : 'text-muted-foreground/75'
                            )}
                            style:padding-left="calc(var(--spacing) * 2 * {heading.level})"
                            title={heading.text}
                            onclick={onTitleClick(heading.id)}
                        >
                            {heading.text}
                        </button>
                    </li>
                {/each}
            </ul>
        </nav>

        <p class="font-mono text-xs text-muted-foreground/50">
            <AnimatedNumber
                duration={500}
                easing={sineOut}
                format={(v) => Math.floor(v)}
                value={scrollProgress}
            />
            % read
        </p>
    </div>
</aside>
