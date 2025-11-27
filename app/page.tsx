import TimerDisplay from '@/components/TimerDisplay'
import TimerControls from '@/components/TimerControls'
import ModeSwitcher from '@/components/ModeSwitcher'
import TaskList from '@/components/TaskList'
import Settings from '@/components/Settings'
import History from '@/components/History'

export default function Home() {
  return (
    <div className="space-y-4 text-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold">番茄钟</h1>
      </div>
      <ModeSwitcher />
      <TimerDisplay />
      <TimerControls />
      <TaskList />
      <Settings />
      <History />
    </div>
  )
}
