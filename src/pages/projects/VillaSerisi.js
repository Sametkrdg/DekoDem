import React, { useMemo } from 'react';
import defaultProjects from '../../data/projects';
import ProjectDetail from '../../components/project/ProjectDetail';

const VillaSerisi = ({ siteContent }) => {
  const projects = siteContent?.projects?.length
    ? siteContent.projects
    : defaultProjects;

  const project = useMemo(
    () => projects.find((item) => item.slug === 'villa-serisi'),
    [projects]
  );
  return <ProjectDetail project={project} />;
};

export default VillaSerisi;