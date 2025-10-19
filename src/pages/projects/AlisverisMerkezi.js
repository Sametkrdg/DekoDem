import React, { useMemo } from 'react';
import defaultProjects from '../../data/projects';
import ProjectDetail from '../../components/project/ProjectDetail';

const AlisverisMerkezi = ({ siteContent }) => {
  const projects = siteContent?.projects?.length
    ? siteContent.projects
    : defaultProjects;

  const project = useMemo(
    () => projects.find((item) => item.slug === 'alisveris-merkezi'),
    [projects]
  );
  return <ProjectDetail project={project} />;
};

export default AlisverisMerkezi;