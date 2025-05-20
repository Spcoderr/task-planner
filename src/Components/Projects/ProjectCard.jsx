import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Common/Button';

const ProjectCard = ({ project, onDelete }) => {
  const { id, name, description, tasksCount, completedTasks } = project;
  
  const progress = tasksCount > 0 ? Math.round((completedTasks / tasksCount) * 100) : 0;
  
  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this project?')) {
      onDelete();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 mb-4 h-12 overflow-hidden">{description}</p>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="text-sm text-gray-600 mb-6">
          <span>{completedTasks} of {tasksCount} tasks completed</span>
        </div>
        
        <div className="flex justify-between">
          <Link to={`/projects/${id}`}>
            <Button variant="primary" size="sm">
              View Details
            </Button>
          </Link>
          
          <div className="flex space-x-2">
            <Link to={`/projects/${id}/edit`}>
              <Button variant="secondary" size="sm">
                Edit
              </Button>
            </Link>
            <Button variant="danger" size="sm" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;