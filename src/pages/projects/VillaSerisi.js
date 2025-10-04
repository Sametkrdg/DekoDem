import React from 'react';
import projects from '../../data/projects';
import ProjectDetail from '../../components/project/ProjectDetail';

const VillaSerisi = () => {
  const project = projects.find((item) => item.slug === 'villa-serisi');
  return <ProjectDetail project={project} />;
};

export default VillaSerisi;