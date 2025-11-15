
import { useState, useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import TaskContext from './context/TaskContext'
import ThemeContext from './context/ThemeContext'
import Header from './components/Header'
import SearchFilter from './components/SearchFilter'
import AddTaskForm from './components/AddTaskForm'
import KanbanBoard from './components/KanbanBoard'
import './App.css'

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })
  
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved || 'light'
  })
  
  const [searchTerm, setSearchTerm] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }])
    setShowForm(false)
  }

  const updateTask = (id, updates) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, ...updates } : t))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter
    return matchesSearch && matchesPriority
  })

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result
    if (!destination) return
    if (source.droppableId === destination.droppableId && 
        source.index === destination.index) return

    const taskId = parseInt(draggableId)
    const task = tasks.find(t => t.id === taskId)
    if (task) {
      updateTask(taskId, { status: destination.droppableId })
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <TaskContext.Provider value={{ tasks: filteredTasks, addTask, updateTask, deleteTask }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={`app ${theme}`}>
            <Header />
            <SearchFilter 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm}
              priorityFilter={priorityFilter}
              setPriorityFilter={setPriorityFilter}
            />
            
            {showForm && (
              <AddTaskForm 
                onAdd={addTask} 
                onCancel={() => setShowForm(false)} 
              />
            )}
            
            {!showForm && (
              <button onClick={() => setShowForm(true)} className="add-btn">
                + Add Task
              </button>
            )}
            
            <KanbanBoard />
          </div>
        </DragDropContext>
      </TaskContext.Provider>
    </ThemeContext.Provider>
  )
}
