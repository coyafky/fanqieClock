'use client'
import { useState } from 'react'
import { usePomodoroStore } from '@/stores/usePomodoroStore'

export default function TaskList() {
  const tasks = usePomodoroStore(s => s.tasks)
  const addTask = usePomodoroStore(s => s.addTask)
  const updateTask = usePomodoroStore(s => s.updateTask)
  const removeTask = usePomodoroStore(s => s.removeTask)
  const toggleTask = usePomodoroStore(s => s.toggleTask)
  const setCurrentTask = usePomodoroStore(s => s.setCurrentTask)
  const [title, setTitle] = useState('')

  return (
    <div className="mt-8 bg-white/10 rounded p-4 text-white">
      <div className="flex gap-2">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="添加任务"
          className="flex-1 rounded bg-white/20 px-3 py-2 outline-none"
        />
        <button
          className="rounded bg-white/20 px-3 py-2"
          onClick={() => {
            if (title.trim()) {
              addTask(title.trim())
              setTitle('')
            }
          }}
        >
          添加
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {tasks.map(t => (
          <li key={t.id} className="flex items-center gap-2">
            <input type="checkbox" checked={t.done} onChange={() => toggleTask(t.id)} />
            <input
              value={t.title}
              onChange={e => updateTask(t.id, e.target.value)}
              className={`flex-1 rounded bg-white/20 px-2 py-1 ${t.done ? 'line-through opacity-60' : ''}`}
            />
            <button className="rounded bg-white/20 px-2 py-1" onClick={() => setCurrentTask(t.id)}>当前</button>
            <button className="rounded bg-white/20 px-2 py-1" onClick={() => removeTask(t.id)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

