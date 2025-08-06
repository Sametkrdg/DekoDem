// components/ProjectCard.js
import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { LocationOn, CalendarToday, Engineering } from '@mui/icons-material';
import { ProjectCard as StyledProjectCard, ContactItem, GradientText, ContactText } from '../styles/StyledComponents';

const ProjectCard = ({ proje }) => {
  const getStatusColor = (durum) => {
    switch(durum) {
      case 'Tamamlandı': return '#27ae60';
      case 'Devam Ediyor': return '#f39c12';
      case 'Planlama': return '#9b59b6';
      default: return '#3498db';
    }
  };

  const ProjectImage = ({ children }) => (
    <Box
      sx={{
        height: '200px',
        background: 'linear-gradient(135deg, #3498db, #2ecc71)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '4rem',
      }}
    >
      {children}
    </Box>
  );

  const ProjectContent = ({ children }) => (
    <Box sx={{ padding: '25px' }}>
      {children}
    </Box>
  );

  const ProjectHeader = ({ children }) => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '15px',
      }}
    >
      {children}
    </Box>
  );

  const ProjectTitle = ({ children }) => (
    <Typography
      variant="h5"
      sx={{
        fontSize: '1.4rem',
        fontWeight: '600',
        color: '#2c3e50',
        margin: 0,
      }}
    >
      {children}
    </Typography>
  );

  const StatusChip = ({ durum }) => (
    <Chip
      label={durum}
      sx={{
        background: getStatusColor(durum),
        color: 'white',
        fontWeight: '600',
      }}
    />
  );

  return (
    <StyledProjectCard>
      <ProjectImage>
        {proje.icon}
      </ProjectImage>
      
      <ProjectContent>
        <ProjectHeader>
          <ProjectTitle>
            {proje.ad}
          </ProjectTitle>
          <StatusChip durum={proje.durum} />
        </ProjectHeader>

        <ContactText sx={{ marginBottom: '20px', color: '#7f8c8d' }}>
          {proje.aciklama}
        </ContactText>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <ContactItem>
            <LocationOn sx={{ color: '#3498db' }} />
            <ContactText>
              <strong>Konum:</strong> {proje.yer}
            </ContactText>
          </ContactItem>

          <ContactItem>
            <CalendarToday sx={{ color: '#3498db' }} />
            <ContactText>
              <strong>Yıl:</strong> {proje.yıl}
            </ContactText>
          </ContactItem>

          <ContactItem>
            <Engineering sx={{ color: '#3498db' }} />
            <ContactText>
              <strong>Alan:</strong> 
              <GradientText component="span" sx={{ marginLeft: '5px' }}>
                {proje.alan}
              </GradientText>
            </ContactText>
          </ContactItem>
        </Box>
      </ProjectContent>
    </StyledProjectCard>
  );
};

export default ProjectCard;