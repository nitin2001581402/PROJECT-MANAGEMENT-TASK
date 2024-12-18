import React from 'react';
import ProjectItem from './ProjectItem';

const ProjectList = ({ projects, onProjectDelete, onProjectEdit }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Client</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <ProjectItem
              key={project._id}
              project={project}
              onProjectDelete={onProjectDelete}
              onProjectEdit={onProjectEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
