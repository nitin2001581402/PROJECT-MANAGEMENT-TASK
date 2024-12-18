import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import './App.css';

const App = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/projects', {
        headers: { Authorization: 'Bearer yourhardcodedtoken123' },
      })
      .then((response) => setProjects(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleProjectAdd = (newProject) => {
    setProjects([...projects, newProject]);
  };

  const handleProjectDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/projects/${id}`, {
        headers: { Authorization: 'Bearer yourhardcodedtoken123' },
      })
      .then(() => setProjects(projects.filter((project) => project._id !== id)))
      .catch((error) => console.error(error));
  };

  const handleProjectEdit = (id, updatedData) => {
    axios
      .put(`http://localhost:5000/api/projects/${id}`, updatedData, {
        headers: { Authorization: 'Bearer yourhardcodedtoken123' },
      })
      .then((response) => {
        const updatedProjects = projects.map((project) =>
          project._id === id ? { ...project, ...updatedData } : project
        );
        setProjects(updatedProjects);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="main-container">
      <h1>Project Management Dashboard</h1>
      <ProjectForm onProjectAdd={handleProjectAdd} />
      <ProjectList
        projects={projects}
        onProjectDelete={handleProjectDelete}
        onProjectEdit={handleProjectEdit}
      />
    </div>
  );
};

export default App;
