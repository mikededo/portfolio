import { registerGoBackKeybind } from '$lib/utils/shortcuts'

const getIdsOrHeaders = (ids: string[]) => {
  if (ids.length === 0) {
    return [
      ...document.querySelectorAll('h2,h3,h4,h5,h6').values()
    ] as HTMLElement[]
  }

  return ids.reduce(
    (elements: HTMLElement[], id) => {
      const element = document.getElementById(id)
      return element ? [...elements, element as HTMLElement] : elements
    },
    []
  )
}

type UseBlogNavigationParams = {
  getElements: () => string[]
  backUrl: NonApiRoutes
  behavior?: 'focus' | 'scroll'
}
export const useBlogNavigation = ({
  backUrl,
  behavior = 'focus',
  getElements
}: UseBlogNavigationParams) => {
  $effect(() => {
    const controller = new AbortController()
    let currentIndex = 0

    registerGoBackKeybind(backUrl, { controller })

    const onKeyDown = (event: KeyboardEvent) => {
      const headers = getIdsOrHeaders(getElements())

      if (headers.length === 0) {
        return
      }

      if (behavior === 'focus' && document.activeElement) {
        currentIndex = Math.max(
          headers.findIndex((header) => header === document.activeElement),
          0
        )
      }

      if (event.key === 'j' || event.key === 'ArrowDown') {
        const nextIndex = (currentIndex + 1) % headers.length
        if (behavior === 'scroll') {
          headers[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          currentIndex = nextIndex
        } else {
          headers[nextIndex]?.focus()
        }
        event.preventDefault()
      } else if (event.key === 'k' || event.key === 'ArrowUp') {
        const prevIndex = (currentIndex - 1 + headers.length) % headers.length
        if (behavior === 'scroll') {
          headers[prevIndex]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          currentIndex = prevIndex
        } else {
          headers[prevIndex]?.focus()
        }
        event.preventDefault()
      }
    }

    document.addEventListener('keydown', onKeyDown, { signal: controller.signal })

    return () => {
      controller.abort()
    }
  })
}
