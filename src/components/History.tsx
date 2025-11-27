'use client'
import { usePomodoroStore } from '@/stores/usePomodoroStore'

export default function History() {
  const history = usePomodoroStore(s => s.history)

  return (
    <div className="mt-8 bg-white/10 rounded p-4 text-white">
      <div className="font-semibold mb-2">统计</div>
      <ul className="space-y-2">
        {history.map(h => (
          <li key={h.id} className="text-sm">
            {h.mode} {new Date(h.startedAt).toLocaleTimeString()} - {new Date(h.endedAt).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
  )
}

