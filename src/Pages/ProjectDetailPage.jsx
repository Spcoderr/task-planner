import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Components/Layout/Header';
import Sidebar from '../Components/Layout/Sidebar';
import Footer from '../Components/Layout/Footer';
import TaskList from '../Components/Tasks/TaskList';
import TaskForm from '../Components/Tasks/TaskForm';
import Alert from '../Components/Common/Alert';
 import '../Style/ProjectDetailPage.css';

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [sortBy, setSortBy] = useState('deadline');
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  
  useEffect(() => {
    // Fetch project details
    fetchProjectDetails();
    // Fetch tasks for this project
    fetchProjectTasks();
  }, [projectId]);
  
  const fetchProjectDetails = () => {
    // Commented out for now as mentioned in requirements
    /*
    axios.get(`/api/projects/${projectId}`)
      .then(response => {
        setProject(response.data);
      })
      .catch(error => {
        console.error('Error fetching project details:', error);
        setAlert({
          show: true,
          message: 'Failed to load project details',
          type: 'error'
        });
      });
    */
    
    // Mock project data
    setProject({
      id: parseInt(projectId),
      name: `Project ${projectId}`,
      description: 'This is a sample project description.',
      createdAt: '2025-05-15'
    });
  };
  
  const fetchProjectTasks = () => {
    // Commented out for now as mentioned in requirements
    /*
    axios.get(`/api/projects/${projectId}/tasks`)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
        setAlert({
          show: true,
          message: 'Failed to load tasks',
          type: 'error'
        });
      });
    */
    
    // Mock tasks data with dependencies
    setTasks([
      { 
        id: 1, 
        title: 'Research Requirements', 
        description: 'Gather all project requirements', 
        status: 'Done', 
        deadline: '2025-05-20',
        dependencies: []
      },
      { 
        id: 2, 
        title: 'Design Wireframes', 
        description: 'Create wireframes for UI', 
        status: 'In Progress', 
        deadline: '2025-05-25',
        dependencies: [1]
      },
      { 
        id: 3, 
        title: 'Database Schema', 
        description: 'Design database schema', 
        status: 'To Do', 
        deadline: '2025-05-30',
        dependencies: [1]
      },
      { 
        id: 4, 
        title: 'Frontend Development', 
        description: 'Develop the frontend components', 
        status: 'To Do', 
        deadline: '2025-06-15',
        dependencies: [2, 3]
      },
      { 
        id: 5, 
        title: 'Backend Development', 
        description: 'Develop the backend API', 
        status: 'To Do', 
        deadline: '2025-06-20',
        dependencies: [3]
      }
    ]);
  };

  const handleCreateTask = (taskData) => {
    // Validate if the task has circular dependencies
    if (hasCircularDependency(taskData.dependencies, taskData.id)) {
      setAlert({
        show: true,
        message: 'Circular dependency detected! Task cannot depend on itself or create a dependency loop.',
        type: 'error'
      });
      return;
    }

    // Commented out for now as mentioned in requirements
    /*
    axios.post(`/api/projects/${projectId}/tasks`, taskData)
      .then(response => {
        setTasks([...tasks, response.data]);
        setShowTaskForm(false);
        setAlert({
          show: true,
          message: 'Task created successfully!',
          type: 'success'
        });
      })
      .catch(error => {
        console.error('Error creating task:', error);
        setAlert({
          show: true,
          message: 'Failed to create task',
          type: 'error'
        });
      });
    */
    
    // Mock task creation
    const newTask = {
      id: tasks.length + 1,
      ...taskData,
      status: 'To Do'
    };
    
    setTasks([...tasks, newTask]);
    setShowTaskForm(false);
    setAlert({
      show: true,
      message: 'Task created successfully!',
      type: 'success'
    });
  };

  const hasCircularDependency = (dependencies, taskId) => {
    // Helper function to detect circular dependencies
    const visited = new Set();
    const recursionStack = new Set();
    
    const dfs = (currentTaskId) => {
      visited.add(currentTaskId);
      recursionStack.add(currentTaskId);
      
      const task = tasks.find(t => t.id === currentTaskId);
      if (task) {
        for (const depId of task.dependencies) {
          if (!visited.has(depId)) {
            if (dfs(depId)) return true;
          } else if (recursionStack.has(depId)) {
            return true;
          }
        }
      }
      
      recursionStack.delete(currentTaskId);
      return false;
    };
    
    // Check if adding these dependencies would create a cycle
    const tempTasks = [...tasks];
    if (taskId) {
      // If updating an existing task
      const taskIndex = tempTasks.findIndex(t => t.id === taskId);
      if (taskIndex !== -1) {
        tempTasks[taskIndex] = { ...tempTasks[taskIndex], dependencies };
      } else {
        // If creating a new task
        tempTasks.push({ id: taskId, dependencies });
      }
    } else {
      // New task with a temporary ID
      const newTaskId = Math.max(...tasks.map(t => t.id), 0) + 1;
      tempTasks.push({ id: newTaskId, dependencies });
      taskId = newTaskId;
    }
    
    return dfs(taskId);
  };

  const handleUpdateTaskStatus = (taskId, newStatus) => {
    // Check if all dependencies are completed
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    if (newStatus !== 'To Do') {
      for (const depId of task.dependencies) {
        const depTask = tasks.find(t => t.id === depId);
        if (!depTask || depTask.status !== 'Done') {
          setAlert({
            show: true,
            message: 'Cannot update status: Not all dependencies are completed!',
            type: 'error'
          });
          return;
        }
      }
    }
    
    // Commented out for now as mentioned in requirements
    /*
    axios.put(`/api/projects/${projectId}/tasks/${taskId}`, { status: newStatus })
      .then(() => {
        setTasks(tasks.map(t => 
          t.id === taskId ? { ...t, status: newStatus } : t
        ));
        setAlert({
          show: true,
          message: 'Task status updated successfully!',
          type: 'success'
        });
      })
      .catch(error => {
        console.error('Error updating task status:', error);
        setAlert({
          show: true,
          message: 'Failed to update task status',
          type: 'error'
        });
      });
    */
    
    // Mock status update
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, status: newStatus } : t
    ));
    setAlert({
      show: true,
      message: 'Task status updated successfully!',
      type: 'success'
    });
  };

  const handleDeleteTask = (taskId) => {
    // Check if any other task depends on this one
    const dependentTasks = tasks.filter(task => 
      task.dependencies.includes(taskId)
    );
    
    if (dependentTasks.length > 0) {
      setAlert({
        show: true,
        message: `Cannot delete: This task is a dependency for ${dependentTasks.length} other task(s)`,
        type: 'error'
      });
      return;
    }
    
    // Commented out for now as mentioned in requirements
    /*
    axios.delete(`/api/projects/${projectId}/tasks/${taskId}`)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== taskId));
        setAlert({
          show: true,
          message: 'Task deleted successfully!',
          type: 'success'
        });
      })
      .catch(error => {
        console.error('Error deleting task:', error);
        setAlert({
          show: true,
          message: 'Failed to delete task',
          type: 'error'
        });
      });
    */
    
    // Mock deletion
    setTasks(tasks.filter(task => task.id !== taskId));
    setAlert({
      show: true,
      message: 'Task deleted successfully!',
      type: 'success'
    });
  };

  const sortTasks = (tasks) => {
    if (sortBy === 'deadline') {
      return [...tasks].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else if (sortBy === 'dependency') {
      // Sort by dependency level (tasks with no dependencies first)
      const dependencyLevels = {};
      
      const calculateLevel = (taskId, visited = new Set()) => {
        if (visited.has(taskId)) {
          return 0; // Avoid cycles
        }
        
        visited.add(taskId);
        const task = tasks.find(t => t.id === taskId);
        if (!task || task.dependencies.length === 0) {
          return 0;
        }
        
        const maxDependencyLevel = Math.max(
          ...task.dependencies.map(depId => 
            calculateLevel(depId, new Set([...visited])) + 1
          )
        );
        
        return maxDependencyLevel;
      };
      
      tasks.forEach(task => {
        dependencyLevels[task.id] = calculateLevel(task.id);
      });
      
      return [...tasks].sort((a, b) => dependencyLevels[a.id] - dependencyLevels[b.id]);
    }
    
    return tasks;
  };
  
  const goBack = () => {
    navigate('/projects');
  };

  if (!project) {
    return <div className="loading">Loading project details...</div>;
  }

  return (
    <div className="project-detail-page">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          <div className="project-header">
            <button className="btn-back" onClick={goBack}>&larr; Back to Projects</button>
            <h1>{project.name}</h1>
            <p className="project-description">{project.description}</p>
          </div>

          {alert.show && (
            <Alert 
              message={alert.message} 
              type={alert.type} 
              onClose={() => setAlert({ ...alert, show: false })} 
            />
          )}

          <div className="actions">
            <div className="sort-options">
              <label>Sort by: </label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="deadline">Deadline</option>
                <option value="dependency">Dependency Level</option>
              </select>
            </div>
            <button 
              className="btn-primary" 
              onClick={() => setShowTaskForm(true)}
            >
              Add New Task
            </button>
          </div>
          
          {showTaskForm && (
            <div className="form-container">
              <h2>Create New Task</h2>
              <TaskForm 
                onSubmit={handleCreateTask} 
                onCancel={() => setShowTaskForm(false)}
                existingTasks={tasks}
              />
            </div>
          )}
          
          <TaskList 
            tasks={sortTasks(tasks)}
            onUpdateStatus={handleUpdateTaskStatus}
            onDelete={handleDeleteTask}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;