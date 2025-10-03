// components/ProjectsHeader.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { PageTitle } from '../styles/StyledComponents';

const ProjectsHeader = () => {
  return (
    <Box sx={{ textAlign: 'center', marginBottom: '60px' }}>
      <PageTitle variant="h1">
        Projelerimiz
      </PageTitle>
      <Typography 
        variant="h6" 
        sx={{ 
          color: '#7f8c8d', 
          fontSize: '1.2rem',
          maxWidth: '600px', 
          margin: '0 auto',
          lineHeight: '1.6' 
        }}
      >
        Kaliteli tasarım ve mükemmel işçilikle hayata geçirdiğimiz projelerimizi keşfedin
      </Typography>
    </Box>
  );
};

export default ProjectsHeader;