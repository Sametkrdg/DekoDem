import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { ArrowForward, CheckCircle, Engineering, Business, Star } from '@mui/icons-material';

// Animasyonlar
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

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const MainContainer = styled(Container)(({ theme }) => ({
  padding: '100px 20px',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 30% 20%, rgba(25, 118, 210, 0.1) 0%, transparent 50%)',
    zIndex: 0,
  },
}));

const ContentWrapper = styled(Grid)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  alignItems: 'stretch',
  minHeight: '700px',
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '600px',
  borderRadius: '24px',
  overflow: 'hidden',
  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
  animation: `${fadeInLeft} 1s ease-out, ${floatAnimation} 6s ease-in-out infinite`,
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3))',
    zIndex: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80px',
    height: '80px',
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '50%',
    backdropFilter: 'blur(10px)',
    zIndex: 2,
  },
  [theme.breakpoints.down('md')]: {
    height: '400px',
    marginBottom: '40px',
  },
}));

const PlaceholderImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  background: `
    linear-gradient(135deg, #667eea 0%, #764ba2 100%),
    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f0f0f0"/><text x="50" y="50" text-anchor="middle" dy=".3em" font-family="Arial" font-size="14" fill="%23999">Fotoğraf</text></svg>')
  `,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
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
  paddingLeft: '60px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    paddingLeft: '0',
    paddingTop: '20px',
  },
}));

const MainTitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
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
    background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
    borderRadius: '2px',
  },
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  color: '#666',
  marginBottom: '2rem',
  fontWeight: 300,
  lineHeight: 1.6,
}));

const Description = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  color: '#555',
  lineHeight: 1.8,
  marginBottom: '2rem',
  textAlign: 'justify',
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '30px',
  marginBottom: '3rem',
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    gap: '20px',
  },
}));

const StatItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '15px 20px',
  background: 'rgba(25, 118, 210, 0.1)',
  borderRadius: '50px',
  border: '1px solid rgba(25, 118, 210, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(25, 118, 210, 0.15)',
    transform: 'translateY(-3px)',
    boxShadow: '0 10px 20px rgba(25, 118, 210, 0.2)',
  },
}));

const StatNumber = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#1976d2',
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  color: '#666',
  fontWeight: 500,
}));

const FeaturesList = styled(Box)(({ theme }) => ({
  marginBottom: '3rem',
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  marginBottom: '15px',
  padding: '10px 0',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateX(10px)',
  },
}));

const FeatureText = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: '#555',
  fontWeight: 500,
}));

const CTAButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
  color: 'white',
  padding: '15px 35px',
  borderRadius: '50px',
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 8px 25px rgba(25, 118, 210, 0.3)',
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)`,
    transition: 'left 0.5s',
  },
  '&:hover': {
    transform: 'translateY(-3px) scale(1.05)',
    boxShadow: '0 15px 35px rgba(25, 118, 210, 0.4)',
    '&::before': {
      left: '100%',
    },
  },
  '&:active': {
    transform: 'translateY(-1px) scale(1.02)',
  },
}));

const AboutSection = () => {
  const stats = [
    { number: '15+', label: 'Yıl Deneyim', icon: <Star /> },
    { number: '100+', label: 'Tamamlanan Proje', icon: <Engineering /> },
    { number: '50+', label: 'Mutlu Müşteri', icon: <Business /> }
  ];

  const features = [
    'Kaliteli malzeme ve işçilik garantisi',
    'Zamanında teslim ve güvenilir hizmet',
    'Modern tasarım ve teknoloji kullanımı',
    'Müşteri memnuniyeti odaklı yaklaşım',
    'Profesyonel teknik destek'
  ];

  return (
    <MainContainer maxWidth="xl">
      <ContentWrapper container spacing={4}>
        {/* Sol taraf - Resim */}
        <Grid item xs={12} md={6}>
          <ImageContainer>
            <PlaceholderImage>
              {/* Buraya gerçek fotoğraf src ekleyebilirsiniz */}
              <Engineering sx={{ fontSize: 60, opacity: 0.7 }} />
            </PlaceholderImage>
          </ImageContainer>
        </Grid>

        {/* Sağ taraf - Metin */}
        <Grid item xs={12} md={6}>
          <TextContainer>
            <MainTitle>
              Sedat Demir Yapı
            </MainTitle>
            
            <SubTitle>
              Güvenilir İnşaat Çözümleri ve Kaliteli Hizmet
            </SubTitle>

            <Description>
              15 yılı aşkın sektör deneyimimizle, inşaat ve yapı sektöründe güvenilir bir isim olarak 
              hizmet vermekteyiz. Modern teknoloji ve geleneksel ustalığı bir araya getirerek, 
              müşterilerimizin hayallerini gerçeğe dönüştürüyoruz. Kalite, güvenilirlik ve 
              müşteri memnuniyeti önceliklerimizin başında gelir.
            </Description>

            {/* İstatistikler */}
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

            {/* Özellikler */}
            <FeaturesList>
              {features.map((feature, index) => (
                <FeatureItem key={index}>
                  <CheckCircle sx={{ color: '#4caf50', fontSize: 24 }} />
                  <FeatureText>{feature}</FeatureText>
                </FeatureItem>
              ))}
            </FeaturesList>

            {/* CTA Button */}
            <CTAButton 
              endIcon={<ArrowForward />}
              onClick={() => window.location.href = '/hakkimizda'}
            >
              Daha Fazla Bilgi
            </CTAButton>
          </TextContainer>
        </Grid>
      </ContentWrapper>
    </MainContainer>
  );
};

export default AboutSection;