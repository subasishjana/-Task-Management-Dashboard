import TaskCard from './TaskCard'

export default function TaskColumn({ column, tasks, draggedTask, setDraggedTask }) {
  const handleDragOver = (e) => e.preventDefault()

  const handleDrop = (e, columnId) => {
    e.preventDefault()
    if (draggedTask) {
      draggedTask.updateTask(draggedTask.task.id, { status: columnId })
      setDraggedTask(null)
    }
  }

  return (
    <div
      className="column"
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, column.id)}
    >
      <div className="column-header">
        <h2>{column.title}</h2>
        <span className="task-count">{tasks.length}</span>
      </div>
      <div className="tasks-list">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onDragStart={() => setDraggedTask({ task, updateTask: draggedTask?.updateTask })}
          />
        ))}
      </div>
    </div>
  )
}
