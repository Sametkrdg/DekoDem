import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { Security, Build, Timeline, HomeWork } from '@mui/icons-material';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Section = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  padding: '80px 40px',
  [theme.breakpoints.down('md')]: {
    padding: '60px 20px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '40px 15px',
  },
}));

const ContentSection = styled(Section)(({ theme }) => ({
  background: 'rgba(255,255,255,0.02)',
  backdropFilter: 'blur(10px)',
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

const ValuesGrid = styled(Grid)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto',
  animation: `${fadeInUp} 1s ease-out`,
}));

const ValueCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '20px',
  textAlign: 'center',
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
    background: 'rgba(255,255,255,0.08)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
  },
  [theme.breakpoints.down('md')]: {
    height: '380px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '360px',
  },
}));

const ValueCardContent = styled(CardContent)(({ theme }) => ({
  padding: '30px !important',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    padding: '25px !important',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '20px !important',
  },
}));

const ValueTopSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '20px',
  flexShrink: 0,
}));

const ValueBottomSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
}));

const ValueIcon = styled(Box)(({ theme }) => ({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #3498db, #2ecc71)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '20px',
  '& svg': {
    fontSize: '40px',
    color: 'white',
  },
  [theme.breakpoints.down('md')]: {
    width: '70px',
    height: '70px',
    '& svg': {
      fontSize: '35px',
    },
  },
  [theme.breakpoints.down('sm')]: {
    width: '60px',
    height: '60px',
    marginBottom: '15px',
    '& svg': {
      fontSize: '30px',
    },
  },
}));

const ValueTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.4rem',
  fontWeight: 600,
  color: '#ecf0f1',
  marginBottom: '0',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.3rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
}));

const ValueDescription = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: '#bdc3c7',
  lineHeight: 1.6,
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    fontSize: '0.95rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    lineHeight: 1.5,
  },
}));

const ValuesSection = () => {
  const values = [
    {
      icon: <Security />,
      title: 'Güvenilirlik',
      description: 'Müşterilerimizle kurduğumuz güven ilişkisi, işimizin temel taşıdır. Sözümüzü tutmak ve kaliteli hizmet sunmak önceliğimizdir.'
    },
    {
      icon: <Build />,
      title: 'Kalite',
      description: 'En kaliteli malzemeleri kullanarak, uzman ekibimizle her projede mükemmelliği hedefliyoruz.'
    },
    {
      icon: <Timeline />,
      title: 'Deneyim',
      description: '15 yıllık sektör deneyimimizle, her türlü inşaat projesinde uzmanlaşmış durumdayız.'
    },
    {
      icon: <HomeWork />,
      title: 'Yenilik',
      description: 'Modern teknolojileri takip ederek, projelerimizde çağdaş çözümler sunuyoruz.'
    }
  ];

  return (
    <ContentSection>
      <SectionTitle>Değerlerimiz</SectionTitle>
      <ValuesGrid container spacing={4}>
        {values.map((value, index) => (
          <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
            <ValueCard>
              <ValueCardContent>
                <ValueTopSection>
                  <ValueIcon>
                    {value.icon}
                  </ValueIcon>
                  <ValueTitle>{value.title}</ValueTitle>
                </ValueTopSection>
                <ValueBottomSection>
                  <ValueDescription>{value.description}</ValueDescription>
                </ValueBottomSection>
              </ValueCardContent>
            </ValueCard>
          </Grid>
        ))}
      </ValuesGrid>
    </ContentSection>
  );
};

export default ValuesSection;