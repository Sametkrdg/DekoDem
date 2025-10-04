import React from 'react';
import projects from '../../data/projects';
import ProjectDetail from '../../components/project/ProjectDetail';

const ModernKonutlar = () => {
  const project = projects.find((item) => item.slug === 'modern-konutlar');
  return <ProjectDetail project={project} />;
};

export default ModernKonutlar;