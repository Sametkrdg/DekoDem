// pages/Projects.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectsHeader from '../components/ProjectsHeader';
import ProjectsGrid from '../components/ProjectsGrid';
import StatsSection from '../components/StatsSection';
import { SectionContainer } from '../styles/StyledComponents';
import projects from '../data/projects';

const Projects = () => {
    const navigate = useNavigate();

  const handleSelectProject = (project) => {
    navigate(`/projeler/${project.slug}`);
  };

  return (
    <SectionContainer maxWidth="lg">
      <ProjectsHeader />
            <ProjectsGrid projeler={projects} onSelect={handleSelectProject} />
      <StatsSection />
    </SectionContainer>
  );
};
export default Projects;