'use client'
import { usePomodoroStore } from '@/stores/usePomodoroStore'

const modes: { key: 'focus' | 'short' | 'long' | 'custom'; label: string }[] = [
  { key: 'focus', label: '专注 25' },
  { key: 'short', label: '短休 5' },
  { key: 'long', label: '长休 15' },
  { key: 'custom', label: '自定义' }
]

export default function ModeSwitcher() {
  const mode = usePomodoroStore(s => s.mode)
  const setMode = usePomodoroStore(s => s.setMode)

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-6">
      {modes.map(m => (
        <button
          key={m.key}
          className={`px-3 py-1 rounded ${mode === m.key ? 'bg-white text-black' : 'bg-white/20 text-white'}`}
          onClick={() => setMode(m.key)}
        >
          {m.label}
        </button>
      ))}
    </div>
  )
}

