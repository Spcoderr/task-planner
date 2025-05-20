import React, { useState, useEffect } from 'react';
import '../Style/DependencySelect.css';

const DependencySelect = ({ 
  projectId, 
  taskId = null, 
  selectedDependencies = [], 
  onChange,
  existingTasks = []
}) => {
  const [availableTasks, setAvailableTasks] = useState([]);
  const [warning, setWarning] = useState('');
  
  // Filter out current task and prepare available tasks
  useEffect(() => {
    const filtered = existingTasks.filter(task => task.id !== taskId);
    setAvailableTasks(filtered);
  }, [taskId, existingTasks]);
  
  // Check for circular dependencies
  useEffect(() => {
    if (selectedDependencies.length === 0) {
      setWarning('');
      return;
    }
    
    // Build dependency graph
    const dependencyGraph = {};
    
    // Initialize graph with all tasks
    existingTasks.forEach(task => {
      dependencyGraph[task.id] = task.dependencies || [];
    });
    
    // Update current task dependencies for validation
    dependencyGraph[taskId || 'temp'] = selectedDependencies;
    
    // Helper function to detect cycles using DFS
    const hasCycle = (node, visited = new Set(), recStack = new Set()) => {
      visited.add(node);
      recStack.add(node);
      
      for (const dep of dependencyGraph[node] || []) {
        if (!visited.has(dep)) {
          if (hasCycle(dep, visited, recStack)) {
            return true;
          }
        } else if (recStack.has(dep)) {
          return true; // Cycle detected
        }
      }
      
      recStack.delete(node);
      return false;
    };
    
    // Check for cycles
    if (hasCycle(taskId || 'temp')) {
      setWarning('Warning: Circular dependency detected! This would create a loop.');
    } else {
      setWarning('');
    }
  }, [selectedDependencies, taskId, existingTasks]);
  
  const handleChange = (e) => {
    const options = e.target.options;
    const values = [];
    
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    
    onChange(values);
  };
  
  return (
    <div className="dependency-select-container">
      <label htmlFor="dependencies">Dependencies:</label>
      <select
        id="dependencies"
        multiple
        value={selectedDependencies}
        onChange={handleChange}
        className={warning ? 'has-warning' : ''}
        size={Math.min(5, availableTasks.length || 3)}
      >
        {availableTasks.map(task => (
          <option key={task.id} value={task.id}>
            {task.title} ({task.status})
          </option>
        ))}
      </select>
      
      <div className="task-dependency-info">
        <small>Hold Ctrl/Cmd to select multiple tasks</small>
      </div>
      
      {warning && (
        <div className="dependency-warning">
          <span className="warning-icon">⚠️</span>
          <span>{warning}</span>
        </div>
      )}
    </div>
  );
};

export default DependencySelect;