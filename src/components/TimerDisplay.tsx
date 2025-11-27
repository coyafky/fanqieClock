'use client'
import { useEffect, useRef } from 'react'
import { usePomodoroStore } from '@/stores/usePomodoroStore'

function format(ms: number) {
  const total = Math.ceil(ms / 1000)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function TimerDisplay() {
  const remainingMs = usePomodoroStore(s => s.remainingMs)
  const running = usePomodoroStore(s => s.running)
  const tick = usePomodoroStore(s => s.tick)
  const last = useRef<number | null>(null)

  useEffect(() => {
    let raf: number | null = null
    const loop = (ts: number) => {
      if (last.current == null) last.current = ts
      const delta = ts - last.current
      last.current = ts
      if (running) tick(delta)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      last.current = null
    }
  }, [running, tick])

  return <div className="text-6xl font-bold text-white text-center select-none">{format(remainingMs)}</div>
}

