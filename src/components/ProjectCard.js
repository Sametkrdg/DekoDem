// components/ProjectCard.js
import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { LocationOn, CalendarToday, Engineering } from '@mui/icons-material';
import { ProjectCard as StyledProjectCard, ContactItem, GradientText, ContactText } from '../styles/StyledComponents';

const ProjectCard = ({ proje, onSelect }) => {
  const getStatusColor = (durum) => {
    switch(durum) {
      case 'Tamamlandı': return '#27ae60';
      case 'Devam Ediyor': return '#f39c12';
      case 'Planlama': return '#9b59b6';
      default: return 'primary.main';
    }
  };

  const ProjectImage = ({ children, imageUrl, title }) => (
    <Box
      sx={{
        height: '200px',
          background: imageUrl
          ? 'transparent'
          : (theme) => theme.palette.gradients?.primary || 'primary.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '4rem',
                overflow: 'hidden',
      }}
    >
      {imageUrl ? (
        <Box
          component="img"
          src={imageUrl}
          alt={title}
          loading="lazy"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ) : (
        children
      )}
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

    const projectTitle = proje.ad || proje.title || 'Proje';
  const projectStatus = proje.durum || proje.status || 'Devam Ediyor';
  const projectDescription =
    proje.aciklama || proje.description || 'Proje açıklaması yakında eklenecektir.';
  const projectLocation = proje.yer || proje.location || 'Belirtilmedi';
  const projectYear = proje.yıl || proje.year || '';
  const projectArea = proje.alan || proje.area || '';
  const projectIcon = proje.icon || proje.emoji || '🏗️';
  const projectImage = proje.imageUrl || proje.coverImage || '';

  const isSelectable = Boolean(onSelect && proje?.canNavigate);


  return (
    <StyledProjectCard
      component="article"
      role={isSelectable ? 'button' : undefined}
      tabIndex={isSelectable ? 0 : -1}
      onClick={() => isSelectable && onSelect(proje)}
      onKeyDown={(event) => {
        if (!isSelectable) {
          return;
        }

        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect(proje);
        }
      }}
      sx={{ cursor: isSelectable ? 'pointer' : 'default' }}
    >
      <ProjectImage imageUrl={projectImage} title={projectTitle}>
        {projectIcon}
      </ProjectImage>
      
      <ProjectContent>
        <ProjectHeader>
          <ProjectTitle>
            {projectTitle}
          </ProjectTitle>
          <StatusChip durum={projectStatus} />
        </ProjectHeader>

        <ContactText sx={{ marginBottom: '20px', color: '#7f8c8d' }}>
          {projectDescription}
        </ContactText>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <ContactItem>
            <LocationOn color="primary" />
            <ContactText>
              <strong>Konum:</strong> {projectLocation}
            </ContactText>
          </ContactItem>

          <ContactItem>
            <CalendarToday color="primary" />
            <ContactText>
              <strong>Yıl:</strong> {projectYear || 'Belirtilmedi'}
            </ContactText>
          </ContactItem>

          <ContactItem>
            <Engineering color="primary" />
            <ContactText>
              <strong>Alan:</strong>
              <GradientText component="span" sx={{ marginLeft: '5px' }}>
                {projectArea || '-'}
              </GradientText>
            </ContactText>
          </ContactItem>
        </Box>
      </ProjectContent>
    </StyledProjectCard>
  );
};

export default ProjectCard;