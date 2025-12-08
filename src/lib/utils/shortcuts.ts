import { goto } from '$app/navigation'

type RegisterGoBackKeybindOptions = {
  controller?: AbortController
}
export const registerGoBackKeybind = (to: NonApiRoutes, opts: RegisterGoBackKeybindOptions = {}) => {
  const controller = opts?.controller ?? new AbortController()

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
      goto(to)
    }
  }, { capture: true, signal: controller.signal })

  return () => {
    controller.abort()
  }
}
