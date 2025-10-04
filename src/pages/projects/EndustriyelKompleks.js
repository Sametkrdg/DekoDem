import React from 'react';
import projects from '../../data/projects';
import ProjectDetail from '../../components/project/ProjectDetail';

const EndustriyelKompleks = () => {
  const project = projects.find((item) => item.slug === 'endustriyel-kompleks');
  return <ProjectDetail project={project} />;
};

export default EndustriyelKompleks;