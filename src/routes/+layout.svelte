<script lang="ts">
    import '../app.css';

    import type { LayoutProps } from './$types';

    import { CookieConsent, TailwindIndicator } from '$lib/components';
    import { initThemeContext } from '$lib/context/theme.svelte';

    const { children, data }: LayoutProps = $props();

    initThemeContext(data.theme);
</script>

{@render children()}

<TailwindIndicator />
<CookieConsent />
