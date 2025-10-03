import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { Engineering, Architecture, Business } from '@mui/icons-material';


const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
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

const HeroSectionContainer = styled(Section)(({ theme }) => ({
  minHeight: '70vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const HeroContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'stretch',
  minHeight: '500px',
  gap: '60px',
  maxWidth: '1400px',
  margin: '0 auto',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '40px',
    minHeight: 'auto',
  },
}));

const ImageSection = styled(Box)(({ theme }) => ({
  flex: '0 0 40%',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  [theme.breakpoints.down('md')]: {
    flex: '1',
  },
}));

const TextSection = styled(Box)(({ theme }) => ({
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '300px',
  borderRadius: '24px',
  overflow: 'hidden',
  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
  animation: `${fadeInLeft} 1s ease-out, ${floatAnimation} 6s ease-in-out infinite`,
  background: 'linear-gradient(135deg, #3498db 0%, #2ecc71 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2))',
    zIndex: 1,
  },
  [theme.breakpoints.down('md')]: {
    height: '250px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '200px',
  },
}));

const SmallImageContainer = styled(ImageContainer)(({ theme }) => ({
  height: '180px',
  animation: `${fadeInLeft} 1s ease-out 0.2s both`,
  [theme.breakpoints.down('md')]: {
    height: '150px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '120px',
  },
}));

const PlaceholderImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '18px',
  fontWeight: 'bold',
  position: 'relative',
  zIndex: 3,
}));

const TextContainer = styled(Box)(({ theme }) => ({
  animation: `${fadeInRight} 1s ease-out 0.3s both`,
}));

const MainTitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #3498db, #2ecc71)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: '1rem',
  lineHeight: 1.2,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-10px',
    left: 0,
    width: '80px',
    height: '4px',
    background: 'linear-gradient(90deg, #3498db, #2ecc71)',
    borderRadius: '2px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
  },
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.4rem',
  color: '#bdc3c7',
  marginBottom: '2rem',
  fontWeight: 300,
  lineHeight: 1.6,
  [theme.breakpoints.down('md')]: {
    fontSize: '1.2rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.1rem',
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  color: '#ecf0f1',
  lineHeight: 1.8,
  marginBottom: '2rem',
  textAlign: 'justify',
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    textAlign: 'left',
  },
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '30px',
  marginBottom: '3rem',
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    gap: '15px',
    justifyContent: 'center',
  },
}));

const StatItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '20px 25px',
  background: 'rgba(52, 152, 219, 0.15)',
  borderRadius: '16px',
  border: '1px solid rgba(52, 152, 219, 0.3)',
  transition: 'all 0.3s ease',
  minWidth: '180px',
  '&:hover': {
    background: 'rgba(52, 152, 219, 0.25)',
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(52, 152, 219, 0.15)',
  },
  [theme.breakpoints.down('md')]: {
    minWidth: '150px',
    padding: '15px 20px',
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: '120px',
    padding: '12px 15px',
    gap: '8px',
  },
}));

const StatNumber = styled(Typography)(({ theme }) => ({
  fontSize: '1.8rem',
  fontWeight: 'bold',
  color: '#3498db',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.3rem',
  },
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: '#bdc3c7',
  fontWeight: 500,
  [theme.breakpoints.down('md')]: {
    fontSize: '0.9rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
}));

const ProjectHeroSection = ({ totalProjects = 150, activeProjects = 12, completedThisYear = 25 }) => {
  const stats = [
    { number: `${totalProjects}+`, label: 'Toplam Proje', icon: <Engineering sx={{ color: '#3498db' }} /> },
    { number: `${activeProjects}`, label: 'Aktif Proje', icon: <Architecture sx={{ color: '#2ecc71' }} /> },
    { number: `${completedThisYear}+`, label: 'Bu Yıl Teslim', icon: <Business sx={{ color: '#3498db' }} /> }
  ];

  return (
    <HeroSectionContainer>
      <HeroContent>
        <ImageSection>
          <ImageContainer>
            <PlaceholderImage>
              <Engineering sx={{ fontSize: 80, opacity: 0.8 }} />
            </PlaceholderImage>
          </ImageContainer>
          <SmallImageContainer>
            <PlaceholderImage>
              <Architecture sx={{ fontSize: 60, opacity: 0.8 }} />
            </PlaceholderImage>
          </SmallImageContainer>
        </ImageSection>

        <TextSection>
          <TextContainer>
            <MainTitle>
              Projelerimiz
            </MainTitle>
            
            <SubTitle>
              15 Yıllık Deneyimle Hayata Geçirdiğimiz Projeler
            </SubTitle>

            <Description>
              Konut projelerinden ticari alanlara, villa serilerinden endüstriyel yapılara kadar 
              geniş bir yelpazede projeler gerçekleştirdik. Her projede müşteri memnuniyeti ve 
              kaliteli işçiliği ön planda tutarak, modern mimariye uygun çözümler sunuyoruz.
            </Description>

            <Description>
              Projelerimiz, güvenilir malzeme kullanımı, zamanında teslim ve estetik tasarım 
              ilkeleriyle şekillenir. Uzman ekibimizle birlikte, her detayda mükemmellik arayışımız devam ediyor.
            </Description>

            <StatsContainer>
              {stats.map((stat, index) => (
                <StatItem key={index}>
                  {stat.icon}
                  <Box>
                    <StatNumber>{stat.number}</StatNumber>
                    <StatLabel>{stat.label}</StatLabel>
                  </Box>
                </StatItem>
              ))}
            </StatsContainer>
          </TextContainer>
        </TextSection>
      </HeroContent>
    </HeroSectionContainer>
  );
};

export default ProjectHeroSection;