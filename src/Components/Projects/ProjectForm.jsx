import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../Common/Button';
import Input from '../Common/Input';
import Alert from '../Common/Alert';

const ProjectForm = ({ isEditing = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // If editing, fetch project data
  React.useEffect(() => {
    if (isEditing && id) {
      // In a real app with axios:
      // const fetchProject = async () => {
      //   try {
      //     const response = await axios.get(`/api/projects/${id}`);
      //     setFormData({
      //       name: response.data.name,
      //       description: response.data.description,
      //     });
      //   } catch (err) {
      //     setAlert({
      //       message: 'Failed to load project details',
      //       type: 'error',
      //     });
      //   }
      // };
      // fetchProject();
      
      // Mock data for editing
      setFormData({
        name: 'Website Redesign',
        description: 'Redesign the company website with new branding',
      });
    }
  }, [isEditing, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Project name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (isEditing) {
        // In a real app with axios:
        // await axios.put(`/api/projects/${id}`, formData);
        
        // Mock update - just wait
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setAlert({
          message: 'Project updated successfully',
          type: 'success',
        });
      } else {
        // In a real app with axios:
        // const response = await axios.post('/api/projects', formData);
        
        // Mock create - just wait
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setAlert({
          message: 'Project created successfully',
          type: 'success',
        });
        
        // Reset form after successful submission
        setFormData({
          name: '',
          description: '',
        });
      }
      
      // Redirect after short delay to show success message
      setTimeout(() => {
        navigate('/projects');
      }, 1500);
    } catch (err) {
      setAlert({
        message: isEditing 
          ? 'Failed to update project' 
          : 'Failed to create project',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditing ? 'Edit Project' : 'Create New Project'}
      </h1>
      
      {alert.message && (
        <Alert 
          message={alert.message} 
          type={alert.type} 
          onClose={() => setAlert({ message: '', type: '' })} 
          className="mb-6"
        />
      )}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <Input
          label="Project Name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter project name"
          required
          error={errors.name}
        />
        
        <div className="mb-4">
          <label 
            htmlFor="description" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Enter project description"
            className={`w-full px-3 py-2 border ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            required
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
          )}
        </div>
        
        <div className="flex justify-end mt-6 space-x-3">
          <Button 
            type="button" 
            variant="secondary"
            onClick={() => navigate('/projects')}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isEditing ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              isEditing ? 'Update Project' : 'Create Project'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;