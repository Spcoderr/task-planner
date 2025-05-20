import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../Common/Button';
import Alert from '../Common/Alert';
import TaskList from '../Tasks/TaskList';
import TaskForm from '../Tasks/TaskForm';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [sortBy, setSortBy] = useState('deadline'); // 'deadline' or 'dependency'
  
  useEffect(() => {
    // In a real app with axios:
    // const fetchProjectDetails = async () => {
    //   try {
    //     setIsLoading(true);
    //     const projectResponse = await axios.get(`/api/projects/${id}`);
    //     const tasksResponse = await axios.get(`/api/projects/${id}/tasks`);
    //     setProject(projectResponse.data);
    //     setTasks(tasksResponse.data);
    //     setIsLoading(false);
    //   } catch (err) {
    //     setError('Failed to load project details');
    //     setIsLoading(false);
    //   }
    // };
    // fetchProjectDetails();
    
    // Mock data
    setTimeout(() => {
      const mockProject = {
        id: parseInt(id),
        name: 'Website Redesign',
        description: 'Redesign the company website with new branding',
      };
      
      const mockTasks = [
        {
          id: 1,
          title: 'Design Homepage',
          description: 'Create mockups for the homepage',
          status: 'Done',
          deadline: '2025-06-01',
          dependencies: [],
        },
        {
          id: 2,
          title: 'Implement Homepage',
          description: 'Convert design to HTML/CSS',
          status: 'In Progress',
          deadline: '2025-06-15',
          dependencies: [1], // depends on task with id 1
        },
        {
          id: 3,
          title: 'Design About Page',
          description: 'Create mockups for the about page',
          status: 'To Do',
          deadline: '2025-06-10',
          dependencies: [],
        },
        {
          id: 4,
          title: 'Implement About Page',
          description: 'Convert design to HTML/CSS',
          status: 'To Do',
          deadline: '2025-06-20',
          dependencies: [3], // depends on task with id 3
        },
        {
          id: 5,
          title: 'Final Testing',
          description: 'Test all pages and features',
          status: 'To Do',
          deadline: '2025-06-25',
          dependencies: [2, 4], // depends on tasks with ids 2 and 4
        },
      ];
      
      setProject(mockProject);
      setTasks(mockTasks);
      setIsLoading(false);
    }, 800);
  }, [id]);

  const handleAddTask = (newTask) => {
    // In a real app with axios:
    // const addTask = async (taskData) => {
    //   try {
    //     const response = await axios.post(`/api/projects/${id}/tasks`, taskData);
    //     setTasks([...tasks, response.data]);
    //     setShowAddTaskForm(false);
    //   } catch (err) {
    //     setError('Failed to add task');
    //   }
    // };
    // addTask(newTask);
    
    // Mock adding a task
    const newTaskWithId = { 
      ...newTask, 
      id: Math.max(0, ...tasks.map(t => t.id)) + 1 
    };
    setTasks([...tasks, newTaskWithId]);
    setShowAddTaskForm(false);
  };

  const handleUpdateTask = (updatedTask) => {
    // In a real app with axios:
    // const updateTask = async (taskData) => {
    //   try {
    //     await axios.put(`/api/projects/${id}/tasks/${taskData.id}`, taskData);
    //     setTasks(tasks.map(task => task.id === taskData.id ? taskData : task));
    //   } catch (err) {
    //     setError('Failed to update task');
    //   }
    // };
    // updateTask(updatedTask);
    
    // Mock updating a task
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const handleDeleteTask = (taskId) => {
    // In a real app with axios:
    // const deleteTask = async (taskId) => {
    //   try {
    //     await axios.delete(`/api/projects/${id}/tasks/${taskId}`);
    //     setTasks(tasks.filter(task => task.id !== taskId));
    //   } catch (err) {
    //     setError('Failed to delete task');
    //   }
    // };
    // deleteTask(taskId);
    
    // Mock deleting a task
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Check if task can be marked as in progress or done
  const canUpdateStatus = (task, newStatus) => {
    if (newStatus === 'To Do') return true;
    
    // If task has dependencies, check if all are completed
    if (task.dependencies && task.dependencies.length > 0) {
      return task.dependencies.every(depId => {
        const depTask = tasks.find(t => t.id === depId);
        return depTask && depTask.status === 'Done';
      });
    }
    
    return true;
  };
  
  // Sort tasks by deadline or dependency level
  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === 'deadline') {
      return new Date(a.deadline) - new Date(b.deadline);
    } else {
      // Sort by dependency level (tasks with no dependencies first)
      const aDepLevel = a.dependencies?.length || 0;
      const bDepLevel = b.dependencies?.length || 0;
      return aDepLevel - bDepLevel;
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl text-gray-700 mb-4">Project not found</h2>
        <p className="text-gray-500 mb-6">The project you're looking for doesn't exist or has been deleted.</p>
        <Button variant="primary" onClick={() => navigate('/projects')}>
          Back to Projects
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {error && <Alert message={error} type="error" onClose={() => setError(null)} />}
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{project.name}</h1>
          <p className="text-gray-600 mt-2">{project.description}</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="secondary" 
            onClick={() => navigate(`/projects/${id}/edit`)}
          >
            Edit Project
          </Button>
          <Button 
            variant="primary" 
            onClick={() => setShowAddTaskForm(true)}
          >
            Add Task
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Tasks</h2>
          <div className="flex items-center space-x-3">
            <span className="text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="deadline">Deadline</option>
              <option value="dependency">Dependency Level</option>
            </select>
          </div>
        </div>
        
        {showAddTaskForm ? (
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Add New Task</h3>
            <TaskForm 
              tasks={tasks} 
              onSubmit={handleAddTask} 
              onCancel={() => setShowAddTaskForm(false)}
            />
          </div>
        ) : null}
        
        {tasks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No tasks found for this project.</p>
            <Button 
              variant="primary" 
              className="mt-4"
              onClick={() => setShowAddTaskForm(true)}
            >
              Add Your First Task
            </Button>
          </div>
        ) : (
          <TaskList 
            tasks={sortedTasks} 
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            canUpdateStatus={canUpdateStatus}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;