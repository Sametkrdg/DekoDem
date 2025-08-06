// components/ProjectsGrid.js
import React from 'react';
import { Grid } from '@mui/material';
import ProjectCard from './ProjectCard';

const ProjectsGrid = ({ projeler }) => {
  return (
    <Grid container spacing={4} sx={{ marginBottom: '80px' }}>
      {projeler.map((proje, index) => (
        <Grid item xs={12} md={6} key={index}>
          <ProjectCard proje={proje} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectsGrid;