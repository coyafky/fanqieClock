import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'

export type Mode = 'focus' | 'short' | 'long' | 'custom'
export type Task = { id: string; title: string; done: boolean }
export type HistoryItem = { id: string; mode: Mode; startedAt: number; endedAt: number; durationMs: number }

type State = {
  mode: Mode
  durations: Record<Mode, number>
  remainingMs: number
  running: boolean
  currentTaskId?: string
  tasks: Task[]
  history: HistoryItem[]
  setMode: (m: Mode) => void
  setDuration: (m: Mode, minutes: number) => void
  start: () => void
  pause: () => void
  reset: () => void
  tick: (deltaMs: number) => void
  addTask: (title: string) => void
  updateTask: (id: string, title: string) => void
  removeTask: (id: string) => void
  toggleTask: (id: string) => void
  setCurrentTask: (id?: string) => void
  addHistory: (item: Omit<HistoryItem, 'id'>) => void
}

const initialDurations: Record<Mode, number> = { focus: 25, short: 5, long: 15, custom: 25 }

export const usePomodoroStore = create<State>()(
  persist(
    (set, get) => ({
      mode: 'focus',
      durations: initialDurations,
      remainingMs: initialDurations.focus * 60_000,
      running: false,
      tasks: [],
      history: [],
      setMode: (m) => {
        const minutes = get().durations[m]
        set({ mode: m, remainingMs: minutes * 60_000, running: false })
      },
      setDuration: (m, minutes) => {
        const durations = { ...get().durations, [m]: minutes }
        set({ durations })
        if (get().mode === m) set({ remainingMs: minutes * 60_000 })
      },
      start: () => set({ running: true }),
      pause: () => set({ running: false }),
      reset: () => {
        const minutes = get().durations[get().mode]
        set({ remainingMs: minutes * 60_000, running: false })
      },
      tick: (deltaMs) => {
        if (!get().running) return
        const next = Math.max(0, get().remainingMs - deltaMs)
        set({ remainingMs: next })
        if (next === 0) {
          const now = Date.now()
          const minutes = get().durations[get().mode]
          const item = { mode: get().mode, startedAt: now - minutes * 60_000, endedAt: now, durationMs: minutes * 60_000 }
          get().addHistory(item)
          set({ running: false })
        }
      },
      addTask: (title) => set({ tasks: [...get().tasks, { id: nanoid(), title, done: false }] }),
      updateTask: (id, title) => set({ tasks: get().tasks.map(t => t.id === id ? { ...t, title } : t) }),
      removeTask: (id) => set({ tasks: get().tasks.filter(t => t.id !== id) }),
      toggleTask: (id) => set({ tasks: get().tasks.map(t => t.id === id ? { ...t, done: !t.done } : t) }),
      setCurrentTask: (id) => set({ currentTaskId: id }),
      addHistory: (item) => set({ history: [{ id: nanoid(), ...item }, ...get().history] })
    }),
    { name: 'pomodoro-store' }
  )
)

