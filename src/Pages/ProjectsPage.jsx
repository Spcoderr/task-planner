import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectList from '../Components/Projects/ProjectList';
import ProjectForm from '../Components/Projects/ProjectForm';
import Header from '../Components/Layout/Header';
import Sidebar from '../Components/Layout/Sidebar';
import Footer from '../Components/Layout/Footer';
import Alert from '../Components/Common/Alert';
import '../Style/ProjectsPage.css'; // Assuming you have a CSS file for styling

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch projects data
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    // Commented out for now as mentioned in requirements
    /*
    axios.get('/api/projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
        setAlert({
          show: true,
          message: 'Failed to load projects',
          type: 'error'
        });
      });
    */
    
    // Mock data for now
    setProjects([
      { id: 1, name: 'Website Redesign', description: 'Redesign the company website', createdAt: '2025-03-15', tasksCount: 5 },
      { id: 2, name: 'Mobile App Development', description: 'Develop a new mobile application', createdAt: '2025-04-10', tasksCount: 8 },
      { id: 3, name: 'Database Migration', description: 'Migrate database to new system', createdAt: '2025-05-01', tasksCount: 3 }
    ]);
  };

  const handleCreateProject = (projectData) => {
    // Commented out for now as mentioned in requirements
    /*
    axios.post('/api/projects', projectData)
      .then(response => {
        setProjects([...projects, response.data]);
        setShowForm(false);
        setAlert({
          show: true,
          message: 'Project created successfully!',
          type: 'success'
        });
      })
      .catch(error => {
        console.error('Error creating project:', error);
        setAlert({
          show: true,
          message: 'Failed to create project',
          type: 'error'
        });
      });
    */
    
    // Mock creation for now
    const newProject = {
      id: projects.length + 1,
      ...projectData,
      createdAt: new Date().toISOString().split('T')[0],
      tasksCount: 0
    };
    
    setProjects([...projects, newProject]);
    setShowForm(false);
    setAlert({
      show: true,
      message: 'Project created successfully!',
      type: 'success'
    });
  };

  const handleDeleteProject = (projectId) => {
    // Commented out for now as mentioned in requirements
    /*
    axios.delete(`/api/projects/${projectId}`)
      .then(() => {
        setProjects(projects.filter(project => project.id !== projectId));
        setAlert({
          show: true,
          message: 'Project deleted successfully!',
          type: 'success'
        });
      })
      .catch(error => {
        console.error('Error deleting project:', error);
        setAlert({
          show: true,
          message: 'Failed to delete project',
          type: 'error'
        });
      });
    */
    
    // Mock deletion for now
    setProjects(projects.filter(project => project.id !== projectId));
    setAlert({
      show: true,
      message: 'Project deleted successfully!',
      type: 'success'
    });
  };

  const handleViewProject = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="projects-page">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          <h1>Projects</h1>
          {alert.show && (
            <Alert 
              message={alert.message} 
              type={alert.type} 
              onClose={() => setAlert({ ...alert, show: false })} 
            />
          )}
          <div className="actions">
            <button 
              className="btn-primary" 
              onClick={() => setShowForm(true)}
            >
              Create New Project
            </button>
          </div>
          
          {showForm ? (
            <div className="form-container">
              <h2>Create New Project</h2>
              <ProjectForm 
                onSubmit={handleCreateProject} 
                onCancel={() => setShowForm(false)} 
              />
            </div>
          ) : (
            <ProjectList 
              projects={projects} 
              onView={handleViewProject}
              onDelete={handleDeleteProject}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectsPage;