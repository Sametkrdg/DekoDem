import React, { useMemo } from 'react';
import defaultProjects from '../../data/projects';
import ProjectDetail from '../../components/project/ProjectDetail';

const EndustriyelKompleks = ({ siteContent }) => {
  const projects = siteContent?.projects?.length
    ? siteContent.projects
    : defaultProjects;

  const project = useMemo(
    () => projects.find((item) => item.slug === 'endustriyel-kompleks'),
    [projects]
  );
  return <ProjectDetail project={project} />;
};

export default EndustriyelKompleks;