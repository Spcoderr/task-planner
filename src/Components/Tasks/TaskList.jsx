import React, { useState, useEffect } from 'react';
import '../../Style/TaskList.css'
import TaskItem from './TaskItem';

const TaskList = ({ tasks, projectId, onTaskStatusChange, onTaskDelete }) => {
  const [sortedTasks, setSortedTasks] = useState([]);
  const [sortBy, setSortBy] = useState('deadline');

  useEffect(() => {
    sortTasks(sortBy);
  }, [tasks, sortBy]);

  const sortTasks = (criteria) => {
    let sorted = [...tasks];
    
    if (criteria === 'deadline') {
      sorted.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else if (criteria === 'dependencies') {
      // Sort by dependency level (tasks with fewer dependencies first)
      sorted.sort((a, b) => (a.dependencies?.length || 0) - (b.dependencies?.length || 0));
    }
    
    setSortedTasks(sorted);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h3>Project Tasks</h3>
        <div className="sort-control">
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" value={sortBy} onChange={handleSortChange}>
            <option value="deadline">Deadline</option>
            <option value="dependencies">Dependency Level</option>
          </select>
        </div>
      </div>
      
      {sortedTasks.length === 0 ? (
        <div className="no-tasks">No tasks added yet.</div>
      ) : (
        <div className="task-list">
          <div className="task-list-headings">
            <div className="title-column">Title</div>
            <div className="status-column">Status</div>
            <div className="deadline-column">Deadline</div>
            <div className="dependencies-column">Dependencies</div>
            <div className="actions-column">Actions</div>
          </div>
          
          {sortedTasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task}
              allTasks={tasks}
              projectId={projectId}
              onStatusChange={onTaskStatusChange}
              onDelete={onTaskDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;