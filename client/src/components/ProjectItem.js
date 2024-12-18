import React, { useState } from 'react';

const ProjectItem = ({ project, onProjectDelete, onProjectEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState(project);

  const handleInputChange = (e) => {
    setEditedProject({ ...editedProject, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onProjectEdit(project._id, editedProject);
    setIsEditing(false);
  };

  return (
    <tr>
      <td>
        {isEditing ? (
          <input
            type='text'
            name='name'
            value={editedProject.name}
            onChange={handleInputChange}
          />
        ) : (
          project.name
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type='text'
            name='client'
            value={editedProject.client}
            onChange={handleInputChange}
          />
        ) : (
          project.client
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type='date'
            name='deadline'
            value={editedProject.deadline}
            onChange={handleInputChange}
          />
        ) : (
          project.deadline
        )}
      </td>
      <td>
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onProjectDelete(project._id)}>
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default ProjectItem;
