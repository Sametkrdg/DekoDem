// components/ProjectsGrid.js
import React from 'react';
import { Grid } from '@mui/material';
import ProjectCard from './ProjectCard';

const ProjectsGrid = ({ projeler, onSelect }) => {
  return (
    <Grid container spacing={4} sx={{ marginBottom: '80px' }}>
      {projeler.map((proje, index) => (
        <Grid item xs={12} md={6} key={index}>
          <ProjectCard proje={proje} onSelect={onSelect} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectsGrid;