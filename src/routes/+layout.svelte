<script lang="ts">
    import '../app.css'

    import type { LayoutProps } from './$types'

    import { onNavigate } from '$app/navigation'
    import { CookieConsent, TailwindIndicator } from '$lib/components'
    import { initThemeContext } from '$lib/context/theme.svelte'
    import { prefersReducedMotion } from '$lib/utils/reduced-motion'

    const { children, data }: LayoutProps = $props()

    // svelte-ignore state_referenced_locally
    initThemeContext(data.theme)

    onNavigate((navigation) => {
        if (prefersReducedMotion() || !document.startViewTransition) {
            return
        }

        return new Promise((resolve) => {
            document.startViewTransition(async () => {
                resolve()
                await navigation.complete
            })
        })
    })
</script>

{@render children()}

<TailwindIndicator />
<CookieConsent />
