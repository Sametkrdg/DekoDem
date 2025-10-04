import React from 'react';
import projects from '../../data/projects';
import ProjectDetail from '../../components/project/ProjectDetail';

const AlisverisMerkezi = () => {
  const project = projects.find((item) => item.slug === 'alisveris-merkezi');
  return <ProjectDetail project={project} />;
};

export default AlisverisMerkezi;