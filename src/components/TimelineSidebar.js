import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const TimelineSidebarContainer = styled(Box)(({ theme }) => ({
  width: '30%',
  minHeight: '100vh',
  position: 'sticky',
  top: 0,
  background: 'rgba(255,255,255,0.03)',
  borderRight: '1px solid rgba(255,255,255,0.1)',
  padding: '60px 20px',
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  [theme.breakpoints.down('lg')]: {
    width: '25%',
    padding: '30px 10px',
    minHeight: '100vh',
    position: 'sticky',
  },
  [theme.breakpoints.down('md')]: {
    width: '25%',
    padding: '20px 8px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '25%',
    padding: '15px 6px',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2rem, 4vw, 3rem)',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #3498db, #2ecc71)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: '2rem',
  textAlign: 'center',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '4px',
    background: 'linear-gradient(90deg, #3498db, #2ecc71)',
    borderRadius: '2px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
  },
}));

const TimelineContainer = styled(Box)(({ theme }) => ({
  height: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '15px',
    top: '60px',
    bottom: '60px',
    width: '2px',
    background: 'linear-gradient(180deg, #3498db, #2ecc71)',
    [theme.breakpoints.down('lg')]: {
      left: '8px',
    },
    [theme.breakpoints.down('md')]: {
      left: '6px',
    },
    [theme.breakpoints.down('sm')]: {
      left: '5px',
    },
  },
}));

const TimelineItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  position: 'relative',
  marginLeft: '40px',
  [theme.breakpoints.down('lg')]: {
    marginLeft: '25px',
  },
  [theme.breakpoints.down('md')]: {
    marginLeft: '20px',
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '18px',
  },
}));

const TimelineContent = styled(Box)(({ theme }) => ({
  padding: '15px',
  background: 'rgba(255,255,255,0.05)',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.1)',
  transition: 'all 0.3s ease',
  width: '100%',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    background: 'rgba(255,255,255,0.08)',
    transform: 'translateX(5px)',
    '& .timeline-description': {
      opacity: 1,
      visibility: 'visible',
      transform: 'translateY(0)',
    },
  },
  [theme.breakpoints.down('lg')]: {
    padding: '10px',
  },
  [theme.breakpoints.down('md')]: {
    padding: '8px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '6px',
  },
}));

const TimelineDescription = styled(Typography)(({ theme }) => ({
  fontSize: '0.8rem',
  color: '#bdc3c7',
  lineHeight: 1.4,
  marginTop: '8px',
  opacity: 0,
  visibility: 'hidden',
  transform: 'translateY(-10px)',
  transition: 'all 0.3s ease',
  position: 'absolute',
  top: '100%',
  left: '0',
  right: '0',
  background: 'rgba(44, 62, 80, 0.95)',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid rgba(255,255,255,0.1)',
  backdropFilter: 'blur(10px)',
  zIndex: 10,
  boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
  [theme.breakpoints.up('lg')]: {
    position: 'static',
    opacity: 1,
    visibility: 'visible',
    transform: 'none',
    background: 'transparent',
    border: 'none',
    padding: '0',
    boxShadow: 'none',
    backdropFilter: 'none',
    marginTop: '8px',
  },
  [theme.breakpoints.down('lg')]: {
    fontSize: '0.7rem',
    marginTop: '5px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '0.65rem',
    marginTop: '4px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.6rem',
    marginTop: '3px',
  },
}));

const TimelineDot = styled(Box)(({ theme }) => ({
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #3498db, #2ecc71)',
  position: 'absolute',
  left: '-46px',
  top: '20px',
  zIndex: 2,
  boxShadow: '0 0 0 3px rgba(52, 152, 219, 0.2)',
  [theme.breakpoints.down('lg')]: {
    left: '-33px',
    width: '8px',
    height: '8px',
    top: '15px',
  },
  [theme.breakpoints.down('md')]: {
    left: '-28px',
    width: '6px',
    height: '6px',
    top: '12px',
  },
  [theme.breakpoints.down('sm')]: {
    left: '-26px',
    width: '6px',
    height: '6px',
    top: '10px',
  },
}));

const TimelineTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  fontWeight: 700,
  background: 'linear-gradient(135deg, #3498db, #2ecc71)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: '5px',
  [theme.breakpoints.down('lg')]: {
    fontSize: '0.9rem',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '0.8rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.7rem',
  },
}));

const TimelineSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  fontWeight: 600,
  color: '#ecf0f1',
  [theme.breakpoints.down('lg')]: {
    fontSize: '0.7rem',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '0.65rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.6rem',
  },
}));

const TimelineSidebar = ({ timeline }) => {
  return (
    <TimelineSidebarContainer>
      <Box>
        <SectionTitle style={{ textAlign: 'left', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', marginBottom: '30px' }}>
          Tarihçemiz
        </SectionTitle>
      </Box>
      
      <TimelineContainer>
        {timeline.map((item, index) => (
          <TimelineItem key={index}>
            <TimelineDot />
            <TimelineContent>
              <TimelineTitle>{item.year}</TimelineTitle>
              <TimelineSubtitle>{item.title}</TimelineSubtitle>
              <TimelineDescription className="timeline-description">
                {item.description}
              </TimelineDescription>
            </TimelineContent>
          </TimelineItem>
        ))}
      </TimelineContainer>
    </TimelineSidebarContainer>
  );
};

export default TimelineSidebar;