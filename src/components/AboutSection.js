import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { ArrowForward, CheckCircle, Engineering, Business, Star } from '@mui/icons-material';

// Ortak styled components'leri import et
// Eğer import hatası alırsanız, aşağıdaki satırı yorum yapın ve manual tanımlamaları kullanın
import {
  StatsContainer,
  StatItem,
  StatNumber,
  StatLabel,
  FeaturesList,
  FeatureItem,
  CTAButton
} from '../styles/StyledComponents';

// About Section özel styled components
const ImageSection = styled(Box)(({ theme }) => ({
  width: '50%',
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

const TextSection = styled(Box)(({ theme }) => ({
  width: '50%',
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

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

const MainContainer = styled(Container)(({ theme }) => ({
  padding: '100px 20px',
  background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
  minHeight: '100vh',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 30% 20%, rgba(52, 152, 219, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(46, 204, 113, 0.1) 0%, transparent 50%)',
    zIndex: 0,
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  alignItems: 'stretch',
  minHeight: '700px',
  gap: '0',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '40px',
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  minHeight: '600px',
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
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80px',
    height: '80px',
    background: 'rgba(255,255,255,0.15)',
    borderRadius: '50%',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
    zIndex: 2,
  },
  [theme.breakpoints.down('md')]: {
    minHeight: '400px',
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
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  color: '#bdc3c7',
  marginBottom: '2rem',
  fontWeight: 300,
  lineHeight: 1.6,
}));

const Description = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  color: '#ecf0f1',
  lineHeight: 1.8,
  marginBottom: '2rem',
  textAlign: 'justify',
}));

const FeatureText = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: 'inherit',
  fontWeight: 500,
}));

// Eğer import hatası alırsanız, bu component'leri yorum satırından çıkarın:
/*
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
  background: 'rgba(52, 152, 219, 0.15)',
  borderRadius: '50px',
  border: '1px solid rgba(52, 152, 219, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(52, 152, 219, 0.25)',
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(52, 152, 219, 0.15)',
  },
}));

const StatNumber = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#3498db',
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  color: '#bdc3c7',
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
  color: '#bdc3c7',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    color: '#3498db',
    transform: 'translateX(5px)',
  },
}));

const CTAButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #3498db, #2ecc71)',
  color: 'white',
  padding: '15px 35px',
  borderRadius: '50px',
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 8px 25px rgba(52, 152, 219, 0.3)',
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
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
    background: 'linear-gradient(135deg, #2980b9, #27ae60)',
    '&::before': {
      left: '100%',
    },
  },
  '&:active': {
    transform: 'translateY(-1px) scale(1.02)',
  },
}));
*/

const AboutSection = ({ photos = [], about = {} }) => {
  const stats = [
    { number: '15+', label: 'Yıl Deneyim', icon: <Star sx={{ color: '#3498db' }} /> },
    { number: '100+', label: 'Tamamlanan Proje', icon: <Engineering sx={{ color: '#2ecc71' }} /> },
    { number: '50+', label: 'Mutlu Müşteri', icon: <Business sx={{ color: '#3498db' }} /> }
  ];

  const features = [
    'Kaliteli malzeme ve işçilik garantisi',
    'Zamanında teslim ve güvenilir hizmet',
    'Modern tasarım ve teknoloji kullanımı',
    'Müşteri memnuniyeti odaklı yaklaşım',
    'Profesyonel teknik destek'
  ];

    const primaryPhoto = photos.find((photo) => photo?.url) || null;
      const aboutTitle = about?.aboutTitle || 'Sedat Demir Yapı';
  const aboutDescription =
    about?.aboutBody ||
    '15 yılı aşkın sektör deneyimimizle, inşaat ve yapı sektöründe güvenilir bir isim olarak hizmet vermekteyiz. Modern teknoloji ve geleneksel ustalığı bir araya getirerek, müşterilerimizin hayallerini gerçeğe dönüştürüyoruz. Kalite, güvenilirlik ve müşteri memnuniyeti önceliklerimizin başında gelir.';
  const subtitle = about?.subtitle || 'Güvenilir İnşaat Çözümleri ve Kaliteli Hizmet';


  return (
    <MainContainer maxWidth="xl" component="section">
      <ContentWrapper>
        {/* Sol taraf - Resim */}
        <ImageSection>
          <ImageContainer>
            {primaryPhoto ? (
              <Box
                component="img"
                src={primaryPhoto.url}
                alt={primaryPhoto.title || 'Şirket görseli'}
                loading="lazy"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'relative',
                  zIndex: 3,
                }}
              />
            ) : (
              <PlaceholderImage>
                {/* Buraya gerçek fotoğraf src ekleyebilirsiniz */}
                <Engineering sx={{ fontSize: 60, opacity: 0.7 }} />
              </PlaceholderImage>
            )}
          </ImageContainer>
        </ImageSection>

        {/* Sağ taraf - Metin */}
        <TextSection>
          <TextContainer>
            <MainTitle>
              {aboutTitle}
            </MainTitle>
            
            <SubTitle>
              {subtitle}
            </SubTitle>

            <Description>
              {aboutDescription}
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
                  <CheckCircle sx={{ color: '#2ecc71', fontSize: 24 }} />
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
        </TextSection>
      </ContentWrapper>
    </MainContainer>
  );
};

export default AboutSection;