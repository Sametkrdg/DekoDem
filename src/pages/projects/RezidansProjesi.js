import React from 'react';
import projects from '../../data/projects';
import ProjectDetail from '../../components/project/ProjectDetail';

const RezidansProjesi = () => {
  const project = projects.find((item) => item.slug === 'rezidans-projesi');
  return <ProjectDetail project={project} />;
};

export default RezidansProjesi;