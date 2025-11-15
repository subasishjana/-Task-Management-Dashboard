
export default function SearchFilter({ searchTerm, setSearchTerm, priorityFilter, setPriorityFilter }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search tasks by keyword..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      
      <select
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
        className="priority-filter"
      >
        <option value="all">All Priorities</option>
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
    </div>
  )
}
