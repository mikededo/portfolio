import type { ThemeType } from '$lib/utils/theme'

import { getContext, setContext } from 'svelte'

import { Theme } from '$lib/utils/theme'

const value = $state<{ theme: ThemeType }>({ theme: Theme.light })

export const initThemeContext = (initialGetter: () => ThemeType) => {
  value.theme = initialGetter()
  setContext('context:theme', () => value.theme)
}

export const getThemeContext = () => {
  const ctx = getContext<() => ThemeType>('context:theme')
  if (!ctx) {
    throw new Error('Theme context not found')
  }

  return ctx
}

const themeChangeAnimation = async (theme: ThemeType) => {
  const root = document.documentElement

  if (!document.startViewTransition) {
    root.classList = theme
    return
  }

  root.dataset.themeTransition = ''
  const transition = document.startViewTransition(() => {
    root.classList = theme
  })
  transition.finished.then(() => delete root.dataset.themeTransition)
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
  const newTheme = value.theme === Theme.light ? Theme.dark : Theme.light

  value.theme = newTheme
  themeChangeAnimation(newTheme)

  fetch('/api/set-theme', {
    body: JSON.stringify({ theme: newTheme }),
    method: 'POST'
  })
}

