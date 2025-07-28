import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Container,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';

// 🔁 Animasyonlar
const fadeInUp = keyframes`from {opacity: 0; transform: translateY(30px);} to {opacity: 1; transform: translateY(0);}`;
const pulse = keyframes`0% {box-shadow: 0 0 0 0 rgba(255,255,255,0.4);} 70% {box-shadow: 0 0 0 20px rgba(255,255,255,0);} 100% {box-shadow: 0 0 0 0 rgba(255,255,255,0);}`;
const glassEffect = keyframes`0% {background: rgba(255,255,255,0.05);} 50% {background: rgba(255,255,255,0.15);} 100% {background: rgba(255,255,255,0.05);}`;

// 🔲 Styled bileşenler
const MainContainer = styled(Container)({
  padding: '80px 20px',
  background: 'linear-gradient(135deg, #667eea, #764ba2)',
  minHeight: '100vh',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1), transparent 50%)',
    zIndex: 0,
  },
});

const ContentWrapper = styled(Box)({
  position: 'relative',
  zIndex: 1,
  animation: `${fadeInUp} 1s ease-out`,
});

const Title = styled(Typography)({
  fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
  fontWeight: 800,
  textAlign: 'center',
  color: '#fff',
  marginBottom: '2rem',
});

const SliderContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '500px',
  overflow: 'hidden',
  borderRadius: '32px',
  background: 'rgba(255,255,255,0.08)',
  backdropFilter: 'blur(20px)',
  animation: `${glassEffect} 6s infinite ease-in-out`,
  [theme.breakpoints.down('md')]: {
    height: '400px',
  },
}));

const SlideWrapper = styled(Box)({
  display: 'flex',
  width: '300%',
  height: '100%',
  transition: 'transform 0.7s ease-in-out',
});

const Slide = styled(Box)({
  width: '33.333%',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  gap: '30px',
  padding: '40px 20px',
});

const Card = styled(Box)(({ theme }) => ({
  width: '280px',
  height: '360px',
  backgroundColor: '#fff',
  borderRadius: '24px',
  overflow: 'hidden',
  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
  textAlign: 'center',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '220px',
    height: '300px',
  },
}));

const CardImage = styled('img')({
  width: '100%',
  height: '70%',
  objectFit: 'cover',
});

const CardTitle = styled(Typography)({
  padding: '12px',
  fontWeight: 600,
  fontSize: '1.1rem',
});

// 🔁 Navigasyon
const NavigationButton = styled(IconButton)(({ direction }) => ({
  position: 'absolute',
  top: '50%',
  [direction]: '20px',
  transform: 'translateY(-50%)',
  background: 'rgba(255,255,255,0.2)',
  color: 'white',
  zIndex: 10,
  animation: `${pulse} 3s infinite`,
  '&:hover': {
    transform: 'translateY(-50%) scale(1.2)',
    background: 'rgba(255,255,255,0.4)',
  },
}));

const ProgressIndicator = styled(Box)({
  position: 'absolute',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: '10px',
});

const ProgressDot = styled(Box)(({ active }) => ({
  width: active ? '28px' : '10px',
  height: '10px',
  borderRadius: '5px',
  backgroundColor: active ? '#fff' : 'rgba(255,255,255,0.4)',
  transition: 'all 0.3s ease',
}));

// 🔧 Faaliyet Kartları
const activitySlides = [
  [
    { title: 'Konut İnşaatı', image: '/images/konut.jpg' },
    { title: 'Ticari Yapılar', image: '/images/ticari.jpg' },
    { title: 'Tadilat & Renovasyon', image: '/images/tadilat.jpg' },
  ],
  [
    { title: 'Proje Yönetimi', image: '/images/proje.jpg' },
    { title: 'İç Mekan Tasarımı', image: '/images/icmekan.jpg' },
    { title: 'Peyzaj Düzenleme', image: '/images/peyzaj.jpg' },
  ],
  [
    { title: 'Cephe Giydirme', image: '/images/cephe.jpg' },
    { title: 'Endüstriyel Yapılar', image: '/images/endustriyel.jpg' },
    { title: 'Restorasyon', image: '/images/restorasyon.jpg' },
  ],
];

const ActivitiesSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const next = () => setCurrentSlide((prev) => (prev + 1) % activitySlides.length);
  const prev = () => setCurrentSlide((prev) => (prev - 1 + activitySlides.length) % activitySlides.length);

  return (
    <MainContainer maxWidth={false}>
      <ContentWrapper>
        <Title>Faaliyet Alanlarımız</Title>

        <SliderContainer>
          <NavigationButton direction="left" onClick={prev}>
            <ChevronLeft fontSize="large" />
          </NavigationButton>

          <SlideWrapper sx={{ transform: `translateX(-${currentSlide * 33.333}%)` }}>
            {activitySlides.map((slide, index) => (
              <Slide key={index}>
                {slide.map((item, i) => (
                  <Card key={i}>
                    <CardImage src={item.image} alt={item.title} />
                    <CardTitle>{item.title}</CardTitle>
                  </Card>
                ))}
              </Slide>
            ))}
          </SlideWrapper>

          <NavigationButton direction="right" onClick={next}>
            <ChevronRight fontSize="large" />
          </NavigationButton>

          <ProgressIndicator>
            {activitySlides.map((_, i) => (
              <ProgressDot key={i} active={i === currentSlide} />
            ))}
          </ProgressIndicator>
        </SliderContainer>
      </ContentWrapper>
    </MainContainer>
  );
};

export default ActivitiesSlider;
