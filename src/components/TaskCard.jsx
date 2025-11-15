import { useContext, useState } from 'react'
import TaskContext from '../context/TaskContext'
import EditTaskModal from './EditTaskModal'

export default function TaskCard({ task }) {
  const { updateTask, deleteTask } = useContext(TaskContext)
  const [showEdit, setShowEdit] = useState(false)

  const priorityColors = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444'
  }

  return (
    <>
      <div
        draggable
        className="task-card"
        onDragStart={(e) => {
          e.dataTransfer.effectAllowed = 'move'
          e.dataTransfer.setData('taskId', task.id)
        }}
      >
        <div className="task-header">
          <h3>{task.title}</h3>
          <div className="task-actions">
            <button onClick={() => setShowEdit(true)} className="btn-edit">Edit</button>
            <button onClick={() => deleteTask(task.id)} className="btn-delete">Delete</button>
          </div>
        </div>
        
        {task.description && <p className="task-desc">{task.description}</p>}
        
        <div className="task-footer">
          <span
            className="priority-badge"
            style={{ backgroundColor: priorityColors[task.priority] }}
          >
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
        </div>
      </div>

      {showEdit && (
        <EditTaskModal
          task={task}
          onSave={(updates) => {
            updateTask(task.id, updates)
            setShowEdit(false)
          }}
          onClose={() => setShowEdit(false)}
        />
      )}
    </>
  )
}
