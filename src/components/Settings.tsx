'use client'
import { usePomodoroStore } from '@/stores/usePomodoroStore'
import { useState } from 'react'

export default function Settings() {
  const durations = usePomodoroStore(s => s.durations)
  const setDuration = usePomodoroStore(s => s.setDuration)
  const [custom, setCustom] = useState(durations.custom)

  return (
    <div className="mt-8 bg-white/10 rounded p-4 text-white">
      <div className="grid grid-cols-2 gap-3">
        {(['focus','short','long'] as const).map(k => (
          <label key={k} className="flex items-center gap-2">
            <span className="w-20">{k}</span>
            <input
              type="number"
              min={1}
              value={durations[k]}
              onChange={e => setDuration(k, Number(e.target.value))}
              className="flex-1 rounded bg-white/20 px-2 py-1"
            />
          </label>
        ))}
        <label className="flex items-center gap-2 col-span-2">
          <span className="w-20">自定义</span>
          <input
            type="number"
            min={1}
            value={custom}
            onChange={e => setCustom(Number(e.target.value))}
            className="flex-1 rounded bg-white/20 px-2 py-1"
          />
          <button className="rounded bg-white/20 px-3 py-1" onClick={() => setDuration('custom', custom)}>保存</button>
        </label>
      </div>
    </div>
  )
}

