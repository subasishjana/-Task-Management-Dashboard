
import { useContext } from 'react'
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import TaskContext from '../context/TaskContext'
import TaskColumn from './TaskColumn'

export default function KanbanBoard() {
  const { tasks } = useContext(TaskContext)

  const columns = [
    { id: 'to-do', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' }
  ]

  const getColumnTasks = (columnId) => tasks.filter(t => t.status === columnId)

  return (
    <div className="kanban">
      {columns.map(column => (
        <TaskColumn
          key={column.id}
          column={column}
          tasks={getColumnTasks(column.id)}
        />
      ))}
    </div>
  )
}
