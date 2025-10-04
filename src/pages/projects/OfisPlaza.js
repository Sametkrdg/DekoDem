import React from 'react';
import projects from '../../data/projects';
import ProjectDetail from '../../components/project/ProjectDetail';

const OfisPlaza = () => {
  const project = projects.find((item) => item.slug === 'ofis-plaza');
  return <ProjectDetail project={project} />;
};

export default OfisPlaza;