export type StackLayer = {
  depth: number
  label: string
  scale: number
  translateY: number
  overlay: boolean
}

export type Iteration = {
  id: number
  title: string
  approach: string
  problem: string
  status: 'failed' | 'success'
}

export const STACK_LAYERS: StackLayer[] = [
  { depth: 0, label: 'Edit Role', overlay: true, scale: 0.97, translateY: -12 },
  { depth: 1, label: 'Delete Confirmation', overlay: false, scale: 1, translateY: 0 }
]

export const ITERATIONS: Iteration[] = [
  {
    approach: 'Render multiple DialogPrimitive.Content elements, one per dialog',
    id: 1,
    problem: 'Radix expects single Content — internal state breaks',
    status: 'failed',
    title: 'Multiple Radix Content'
  },
  {
    approach: 'Regular divs inside Content, absolute for inactive, normal flow for active',
    id: 2,
    problem: 'z-index ignored on non-positioned active element',
    status: 'failed',
    title: 'Single Content + Absolute'
  },
  {
    approach: 'All dialogs use position: absolute',
    id: 3,
    problem: 'Container collapses to zero height',
    status: 'failed',
    title: 'All Absolute Positioned'
  },
  {
    approach: 'Grid with [grid-area:1/1] — all occupy same cell',
    id: 4,
    problem: 'None — z-index works, height preserved',
    status: 'success',
    title: 'CSS Grid Stacking'
  }
]
