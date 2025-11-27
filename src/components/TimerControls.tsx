'use client'
import { usePomodoroStore } from '@/stores/usePomodoroStore'

export default function TimerControls() {
  const running = usePomodoroStore(s => s.running)
  const start = usePomodoroStore(s => s.start)
  const pause = usePomodoroStore(s => s.pause)
  const reset = usePomodoroStore(s => s.reset)

  return (
    <div className="flex items-center justify-center gap-3 mt-4">
      {running ? (
        <button className="rounded bg-white/10 px-4 py-2 text-white" onClick={pause}>暂停</button>
      ) : (
        <button className="rounded bg-white/20 px-4 py-2 text-white" onClick={start}>开始</button>
      )}
      <button className="rounded bg-white/10 px-4 py-2 text-white" onClick={reset}>重置</button>
    </div>
  )
}

