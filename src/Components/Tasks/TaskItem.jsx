import React from 'react';
 import '../../Style/TaskItem.css';

const TaskItem = ({ task, allTasks, projectId, onStatusChange, onDelete }) => {
  // Find dependency tasks
  const dependencyTasks = task.dependencies
    ? task.dependencies.map(depId => allTasks.find(t => t.id === depId)).filter(Boolean)
    : [];
  
  // Check if all dependencies are completed
  const allDependenciesCompleted = dependencyTasks.every(depTask => depTask.status === 'Done');
  
  // Determine if status can be changed
  const canChangeStatus = (newStatus) => {
    if (newStatus === 'To Do') return true;
    return allDependenciesCompleted;
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    
    if (!canChangeStatus(newStatus)) {
      alert('Cannot change status: Not all dependencies are completed!');
      return;
    }
    
    onStatusChange(task.id, newStatus);
  };

  const getStatusClass = () => {
    switch (task.status) {
      case 'Done': return 'status-done';
      case 'In Progress': return 'status-progress';
      default: return 'status-todo';
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Check if task is blocked
  const isBlocked = !allDependenciesCompleted && task.status === 'To Do';

  return (
    <div className={`task-item ${isBlocked ? 'task-blocked' : ''}`}>
      <div className="title-column">
        <span className="task-title">{task.title}</span>
        {isBlocked && <span className="blocked-indicator" title="Blocked by dependencies">⚠️</span>}
      </div>
      
      <div className="status-column">
        <select 
          value={task.status} 
          onChange={handleStatusChange}
          className={getStatusClass()}
          disabled={!allDependenciesCompleted && task.status === 'To Do'}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      
      <div className="deadline-column">
        {formatDate(task.deadline)}
      </div>
      
      <div className="dependencies-column">
        {dependencyTasks.length > 0 ? (
          <ul className="dependencies-list">
            {dependencyTasks.map(depTask => (
              <li key={depTask.id} className={depTask.status === 'Done' ? 'dep-completed' : 'dep-pending'}>
                {depTask.title} {depTask.status === 'Done' ? '✓' : '○'}
              </li>
            ))}
          </ul>
        ) : (
          <span className="no-dependencies">None</span>
        )}
      </div>
      
      <div className="actions-column">
        <button 
          className="mark-done-btn"
          disabled={!allDependenciesCompleted || task.status === 'Done'}
          onClick={() => onStatusChange(task.id, 'Done')}
        >
          Mark as Done
        </button>
        <button className="delete-btn" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;