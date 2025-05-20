import React from 'react'
import HomePage from './Pages/HomePage'
import ProjectPage from './Pages/ProjectsPage'
import ProjectDetailPage from './Pages/ProjectDetailPage'
import {  Routes, Route } from 'react-router-dom'

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
       
      </Routes>
  )
}

export default App
