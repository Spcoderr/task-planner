import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Common/Button';
import Alert from '../Common/Alert';
import ProjectCard from './ProjectCard';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      try {
        // Mock data - in a real app, this would be an axios call to the backend
        const mockProjects = [
          { id: 1, name: 'Website Redesign', description: 'Redesign the company website with new branding', tasksCount: 12, completedTasks: 5 },
          { id: 2, name: 'Mobile App Development', description: 'Create a new mobile app for customers', tasksCount: 20, completedTasks: 8 },
          { id: 3, name: 'Database Migration', description: 'Migrate from MySQL to PostgreSQL', tasksCount: 8, completedTasks: 2 },
        ];
        setProjects(mockProjects);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load projects');
        setIsLoading(false);
      }
    }, 800);
    
    // In a real app with axios:
    // const fetchProjects = async () => {
    //   try {
    //     setIsLoading(true);
    //     const response = await axios.get('/api/projects');
    //     setProjects(response.data);
    //     setIsLoading(false);
    //   } catch (err) {
    //     setError('Failed to load projects');
    //     setIsLoading(false);
    //   }
    // };
    // fetchProjects();
  }, []);

  const handleDeleteProject = (projectId) => {
    // In a real app with axios:
    // try {
    //   await axios.delete(`/api/projects/${projectId}`);
    //   setProjects(projects.filter(project => project.id !== projectId));
    // } catch (err) {
    //   setError('Failed to delete project');
    // }
    
    // Mock deletion
    setProjects(projects.filter(project => project.id !== projectId));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
        <Link to="/projects/new">
          <Button variant="primary">Create New Project</Button>
        </Link>
      </div> */}

      {error && <Alert message={error} type="error" onClose={() => setError(null)} />}

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl text-gray-600 mb-4">No projects found</h2>
          <p className="text-gray-500 mb-6">Get started by creating your first project</p>
          <Link to="/projects/new">
            <Button variant="primary">Create Project</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onDelete={() => handleDeleteProject(project.id)} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;