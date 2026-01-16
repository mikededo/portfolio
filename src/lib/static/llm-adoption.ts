import type { CostItem } from '$lib/components/hidden-costs.svelte'
import type { EffectivenessItem } from '$lib/components/llm-effectiveness.svelte'

export const LLM_EFFECTIVENESS: EffectivenessItem[] = [
  {
    color: '#10b981',
    label: 'High',
    level: 85,
    task: 'Boilerplate & repetitive code'
  },
  {
    color: '#22c55e',
    label: 'Good',
    level: 70,
    task: 'Exploring unfamiliar APIs'
  },
  {
    color: '#84cc16',
    label: 'Good',
    level: 65,
    task: 'Rubber-ducking & brainstorming'
  },
  {
    color: '#eab308',
    label: 'Decent',
    level: 55,
    task: 'Documentation & comments'
  },
  {
    color: '#f97316',
    label: 'Low',
    level: 25,
    task: 'Complex domain logic'
  },
  {
    color: '#ef4444',
    label: 'Low',
    level: 15,
    task: 'Architecture decisions'
  }
]

export const LLM_HIDDEN_COSTS: CostItem[] = [
  {
    color: '#FF850D',
    label: 'Prompting',
    percentage: 25
  },
  {
    color: '#10b981',
    label: 'Generation',
    percentage: 15
  },
  {
    color: '#8338EC',
    label: 'Verification',
    percentage: 40
  },
  {
    color: '#ef4444',
    label: 'Fixing',
    percentage: 20
  }
]
