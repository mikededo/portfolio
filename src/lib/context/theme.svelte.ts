import { getContext, setContext } from 'svelte'

import { Theme } from '$lib/utils/theme'

const value = $state<{ theme: Theme }>({ theme: Theme.Light })

export const initThemeContext = (initialValue: Theme) => {
  value.theme = initialValue
  setContext('context:theme', () => value.theme)
}

export const getThemeContext = () => {
  const ctx = getContext<() => Theme>('context:theme')
  if (!ctx) {
    throw new Error('Theme context not found')
  }

  return ctx
}

const themeChangeAnimation = async (theme: Theme) => {
  const root = document.documentElement

  if (!document.startViewTransition) {
    root.classList = theme
    return
  }

  const transition = document.startViewTransition(() => {
    root.classList = theme
  })
  await transition.ready

  document.documentElement.animate(
    {
      clipPath: [
        'inset(0 0 100% 0)',
        'inset(0 0 0% 0)'
      ]
    },
    {
      duration: 450,
      easing: 'cubic-bezier(0.2, 0, 0, 1)',
      pseudoElement: '::view-transition-new(root)'
    }
  )
}

export const toggleTheme = () => {
  const newTheme = value.theme === Theme.Light ? Theme.Dark : Theme.Light

  value.theme = newTheme
  themeChangeAnimation(newTheme)

  fetch('/api/set-theme', {
    body: JSON.stringify({ theme: newTheme }),
    method: 'POST'
  })
}

