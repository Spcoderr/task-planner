import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Layout/Header';
import Sidebar from '../Components/Layout/Sidebar';
import Footer from '../Components/Layout/Footer';
import '../Style/HomePage.css'; 

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          <div className="welcome-section">
            <h1>Welcome to Task Planner</h1>
            <p>Manage your projects and tasks with dependencies and timelines</p>
            
            <div className="features">
              <div className="feature-card">
                <h3>Project Management</h3>
                <p>Create and organize projects to keep your work structured</p>
              </div>
              
              <div className="feature-card">
                <h3>Task Dependencies</h3>
                <p>Set dependencies between tasks to ensure proper work sequence</p>
              </div>
              
              <div className="feature-card">
                <h3>Timeline View</h3>
                <p>View tasks sorted by deadlines to meet your schedule</p>
              </div>
            </div>
            
            <div className="cta-section">
              <Link to="/projects" className="btn-primary">View Projects</Link>
              {/* <Link to="/projects" className="btn-secondary">Create New Project</Link> */}
            </div>
          </div>
          
          <div className="info-section">
            <h2>How It Works</h2>
            <ol className="steps">
              <li>
                <strong>Create a Project</strong>
                <p>Start by creating a project to organize your tasks</p>
              </li>
              <li>
                <strong>Add Tasks</strong>
                <p>Add tasks with descriptions, deadlines, and dependencies</p>
              </li>
              <li>
                <strong>Set Dependencies</strong>
                <p>Define which tasks must be completed before others can start</p>
              </li>
              <li>
                <strong>Track Progress</strong>
                <p>Update task statuses as you make progress</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;