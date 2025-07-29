import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';
import { 
  SectionContainer, 
  PageTitle,
  ServiceCard,
  GradientText 
} from '../styles/StyledComponents';

// 🔁 Animasyonlar
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255,255,255,0.4);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(255,255,255,0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255,255,255,0);
  }
`;

const glassShimmer = keyframes`
  0% {
    background: rgba(255,255,255,0.05);
  }
  50% {
    background: rgba(255,255,255,0.15);
  }
  100% {
    background: rgba(255,255,255,0.05);
  }
`;

// 🔲 Styled bileşenler - Theme ile uyumlu
const ActivitiesContainer = styled(Box)(({ theme }) => ({
  padding: '80px 0',
  background: theme.mixins.gradientBackground.background,
  minHeight: '70vh',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1), transparent 50%)',
    zIndex: 0,
  },
  [theme.breakpoints.down('md')]: {
    padding: '60px 0',
  },
}));

const ContentWrapper = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  animation: `${fadeInUp} 1s ease-out`,
  maxWidth: '1400px',
}));

const SliderTitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
  fontWeight: 800,
  textAlign: 'center',
  marginBottom: '3rem',
  ...theme.mixins.gradientText,
  [theme.breakpoints.down('md')]: {
    marginBottom: '2rem',
  },
}));

const SliderContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '520px',
  overflow: 'hidden',
  borderRadius: '32px',
  background: 'rgba(255,255,255,0.08)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.1)',
  animation: `${glassShimmer} 6s infinite ease-in-out`,
  boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
  [theme.breakpoints.down('md')]: {
    height: '450px',
    borderRadius: '24px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '380px',
    borderRadius: '16px',
  },
}));

const SlideWrapper = styled(Box)({
  display: 'flex',
  width: '300%',
  height: '100%',
  transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
});

const Slide = styled(Box)(({ theme }) => ({
  width: '33.333%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '30px',
  padding: '40px 20px',
  [theme.breakpoints.down('md')]: {
    gap: '20px',
    padding: '30px 15px',
  },
  [theme.breakpoints.down('sm')]: {
    gap: '15px',
    padding: '20px 10px',
  },
}));

// ServiceCard'ı extend ederek özelleştiriyoruz
const ActivityCard = styled(ServiceCard)(({ theme }) => ({
  width: '300px',
  height: '380px',
  padding: '0',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '20px',
  overflow: 'hidden',
  position: 'relative',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
  },
  [theme.breakpoints.down('md')]: {
    width: '260px',
    height: '340px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '220px',
    height: '300px',
  },
}));

const CardImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '75%',
  objectFit: 'cover',
  transition: 'transform 0.4s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const CardContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
  color: theme.palette.text.white,
  padding: '20px',
  textAlign: 'center',
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1.2rem',
  color: theme.palette.text.white,
  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
}));

// Navigation buttons - Theme ile uyumlu
const NavigationButton = styled(IconButton)(({ theme, direction }) => ({
  position: 'absolute',
  top: '50%',
  [direction]: '20px',
  transform: 'translateY(-50%)',
  background: 'rgba(255,255,255,0.15)',
  backdropFilter: 'blur(10px)',
  color: theme.palette.text.white,
  zIndex: 10,
  width: '55px',
  height: '55px',
  border: '1px solid rgba(255,255,255,0.2)',
  animation: `${pulse} 3s infinite`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-50%) scale(1.1)',
    background: 'rgba(255,255,255,0.25)',
    boxShadow: '0 8px 25px rgba(255,255,255,0.2)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '45px',
    height: '45px',
    [direction]: '10px',
  },
}));

const ProgressIndicator = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: '12px',
  [theme.breakpoints.down('sm')]: {
    bottom: '15px',
    gap: '8px',
  },
}));

const ProgressDot = styled(Box)(({ theme, active }) => ({
  width: active ? '32px' : '12px',
  height: '12px',
  borderRadius: '6px',
  backgroundColor: active ? theme.palette.text.white : 'rgba(255,255,255,0.4)',
  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: active ? theme.palette.text.white : 'rgba(255,255,255,0.7)',
  },
}));

// 🔧 Faaliyet Kartları Data
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activitySlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activitySlides.length) % activitySlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <ActivitiesContainer>
      <ContentWrapper maxWidth={false}>
        <SliderTitle variant="h2">
          Faaliyet Alanlarımız
        </SliderTitle>

        <SliderContainer>
          <NavigationButton 
            direction="left" 
            onClick={prevSlide}
            aria-label="Önceki slayt"
          >
            <ChevronLeft fontSize={isMobile ? "medium" : "large"} />
          </NavigationButton>

          <SlideWrapper 
            sx={{ 
              transform: `translateX(-${currentSlide * 33.333}%)` 
            }}
          >
            {activitySlides.map((slide, slideIndex) => (
              <Slide key={slideIndex}>
                {slide.map((activity, cardIndex) => (
                  <ActivityCard key={cardIndex}>
                    <CardImage 
                      src={activity.image} 
                      alt={activity.title}
                      onError={(e) => {
                        e.target.src = '/images/placeholder.jpg'; // Fallback image
                      }}
                    />
                    <CardContent>
                      <CardTitle variant="h6">
                        {activity.title}
                      </CardTitle>
                    </CardContent>
                  </ActivityCard>
                ))}
              </Slide>
            ))}
          </SlideWrapper>

          <NavigationButton 
            direction="right" 
            onClick={nextSlide}
            aria-label="Sonraki slayt"
          >
            <ChevronRight fontSize={isMobile ? "medium" : "large"} />
          </NavigationButton>

          <ProgressIndicator>
            {activitySlides.map((_, index) => (
              <ProgressDot 
                key={index} 
                active={index === currentSlide}
                onClick={() => goToSlide(index)}
              />
            ))}
          </ProgressIndicator>
        </SliderContainer>
      </ContentWrapper>
    </ActivitiesContainer>
  );
};

export default ActivitiesSlider;