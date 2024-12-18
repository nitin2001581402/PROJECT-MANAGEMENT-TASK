import React, { useState } from 'react';
import axios from 'axios';

const ProjectForm = ({ onProjectAdd }) => {
  const [newProject, setNewProject] = useState({
    name: '',
    client: '',
    deadline: '',
  });

  const handleInputChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/api/projects', newProject, {
        headers: { Authorization: 'Bearer yourhardcodedtoken123' },
      })
      .then((response) => {
        onProjectAdd(response.data);
        setNewProject({ name: '', client: '', deadline: '' });
      })
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Project Name:</label>
      <input
        type='text'
        name='name'
        value={newProject.name}
        onChange={handleInputChange}
        required
      />
      <label>Client Name:</label>
      <input
        type='text'
        name='client'
        value={newProject.client}
        onChange={handleInputChange}
        required
      />
      <label>Deadline:</label>
      <input
        type='date'
        name='deadline'
        value={newProject.deadline}
        onChange={handleInputChange}
        required
      />
      <button type='submit'>Add Project</button>
    </form>
  );
};

export default ProjectForm;
