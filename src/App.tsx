import { useEffect, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import type { Task } from './types'
import './App.css'

const STORAGE_KEY = 'task-board:tasks'

function loadTasks(): Task[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as Task[]) : []
  } catch {
    return []
  }
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (text: string) => {
    setTasks((prev) => [...prev, { id: crypto.randomUUID(), text, completed: false }])
  }

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    )
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const remainingCount = tasks.filter((task) => !task.completed).length

  return (
    <main className="task-board">
      <h1>タスクボード</h1>
      <TaskForm onAdd={addTask} />
      <p className="task-summary">未完了: {remainingCount} / 全{tasks.length}件</p>
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </main>
  )
}

export default App
