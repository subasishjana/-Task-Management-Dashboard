import { useState } from 'react'

export default function AddTaskForm({ onAdd, onCancel }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [status, setStatus] = useState('to-do')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      onAdd({ title, description, priority, status })
      setTitle('')
      setDescription('')
      setPriority('medium')
      setStatus('to-do')
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="add-form">
        <h2>Add New Task</h2>
        
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-textarea"
          rows="3"
        />

        <div className="form-row">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="form-select"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="form-select"
          >
            <option value="to-do">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-submit">Create Task</button>
          <button type="button" onClick={onCancel} className="btn-cancel">Cancel</button>
        </div>
      </form>
    </div>
  )
}
