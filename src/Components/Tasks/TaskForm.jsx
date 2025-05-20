import React, { useState, useEffect } from 'react';
import '../../Style/TaskForm.css'

const TaskForm = ({ 
  projectId, 
  onSubmit, 
  initialData = null, 
  existingTasks = [],
  onCancel 
}) => {
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    status: 'To Do',
    dependencies: []
  });

  // If editing, load initial data
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        // Ensure dependencies is always an array
        dependencies: initialData.dependencies || []
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormError('');
  };

  const handleDependencyChange = (e) => {
    const options = e.target.options;
    const selectedValues = [];
    
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    
    setFormData(prev => ({ ...prev, dependencies: selectedValues }));
    
    // Reset form error when dependencies change
    setFormError('');
  };

  const validateForm = () => {
    // Validate required fields
    if (!formData.title.trim()) return 'Title is required';
    if (!formData.deadline) return 'Deadline is required';
    
    // Current task ID (if editing)
    const currentTaskId = initialData?.id || 'new';
    
    // Check for circular dependencies
    if (formData.dependencies.length > 0) {
      if (formData.dependencies.includes(currentTaskId)) {
        return 'A task cannot depend on itself';
      }
      
      // Build dependency graph and check for cycles
      const dependencyGraph = {};
      
      // Initialize graph with all tasks
      existingTasks.forEach(task => {
        dependencyGraph[task.id] = task.dependencies || [];
      });
      
      // Add or update current task (for validation)
      dependencyGraph[currentTaskId] = formData.dependencies;
      
      // Helper function to detect cycles
      const hasCycle = (node, visited = new Set(), recStack = new Set()) => {
        visited.add(node);
        recStack.add(node);
        
        // Check all dependencies
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
      
      // Check for cycles starting from the current task
      if (hasCycle(currentTaskId)) {
        return 'Circular dependency detected! This would create a loop.';
      }
    }
    
    // Validate deadline in relation to dependencies
    if (formData.dependencies.length > 0) {
      const taskDeadline = new Date(formData.deadline);
      
      for (const depId of formData.dependencies) {
        const depTask = existingTasks.find(t => t.id === depId);
        if (depTask) {
          const depDeadline = new Date(depTask.deadline);
          if (taskDeadline < depDeadline) {
            return `Task deadline cannot be before its dependency "${depTask.title}"`;
          }
        }
      }
    }
    
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const error = validateForm();
    if (error) {
      setFormError(error);
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <div className="task-form-container">
      <h3>{initialData ? 'Edit Task' : 'Add New Task'}</h3>
      
      {formError && (
        <div className="form-error">
          <p>{formError}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">
            Task Title <span className="required">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="deadline">
            Deadline <span className="required">*</span>
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="dependencies">
            Dependencies (Hold Ctrl/Cmd for multiple)
          </label>
          <select
            id="dependencies"
            name="dependencies"
            multiple
            value={formData.dependencies}
            onChange={handleDependencyChange}
            size={Math.min(5, existingTasks.length || 3)}
          >
            {existingTasks
              .filter(task => task.id !== initialData?.id) // Filter out current task if editing
              .map(task => (
                <option key={task.id} value={task.id}>
                  {task.title} ({task.status})
                </option>
              ))}
          </select>
          <small className="helper-text">
            Select tasks that must be completed before this one can start
          </small>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {initialData ? 'Update Task' : 'Create Task'}
          </button>
          {onCancel && (
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;