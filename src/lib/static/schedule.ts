import type { ScheduleEvent } from '$lib/components/schedule.svelte'

export const WORK_AND_TRAIN_SCHEDULE: ScheduleEvent[] = [
  {
    color: '#717486',
    content: { left: '', right: '07:00' },
    label: 'Sleep',
    width: 150
  },
  {
    color: '#FF850D',
    content: { left: '07:00', right: '07:30' },
    label: 'Wake up',
    width: 100
  },
  {
    color: '#8338EC',
    content: { left: '07:30', right: '11:00' },
    label: 'Work',
    width: 350
  },
  {
    color: '#10b981',
    content: { left: '11:00', right: '15:00' },
    label: 'Training',
    width: 400
  },
  {
    color: '#FF850D',
    content: { left: '15:00', right: '16:00' },
    label: 'Lunch',
    width: 100
  },
  {
    color: '#8338EC',
    content: { left: '16:00', right: '21:00' },
    label: 'Work',
    width: 500
  },
  {
    color: '#385bdb',
    content: { left: '21:00', right: '22:30' },
    label: 'Cool down',
    width: 150
  },
  {
    color: '#717486',
    content: { left: '22:30', right: '' },
    label: 'Sleep',
    width: 150
  }
]
