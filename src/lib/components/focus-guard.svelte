<script lang="ts">
    import { onMount } from 'svelte'

    const BEGIN_GUARD_ID = 'begin_guard'
    const END_GUARD_ID = 'end_guard'

    const createFocusGuard = (id: string) => {
        const element = document.createElement('span')

        element.id = id
        element.tabIndex = 0
        element.style.outline = 'none'
        element.style.opacity = '0'
        element.style.position = 'fixed'
        element.style.pointerEvents = 'none'

        return element
    }

    const deleteGuard = (id: string) => {
        const existing = document.getElementById(id)
        if (existing) {
            existing.remove()
        }
    }

    onMount(() => {
        // Delete any existing
        deleteGuard(BEGIN_GUARD_ID)
        deleteGuard(END_GUARD_ID)

        const beginGuard = document.body.insertAdjacentElement(
            'afterbegin',
            createFocusGuard(BEGIN_GUARD_ID)
        )
        const endGuard = document.body.insertAdjacentElement(
            'beforeend',
            createFocusGuard(END_GUARD_ID)
        )

        return () => {
            beginGuard?.remove()
            endGuard?.remove()
        }
    })
</script>
