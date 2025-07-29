<script>
    import { CookieConsent } from '$lib/components';
    import '../app.css';

    const { children } = $props();
</script>

{@render children()}

<CookieConsent />
