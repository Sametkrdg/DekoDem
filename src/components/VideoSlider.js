import React, { useState } from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight, PlayArrow } from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';

// Animasyonlar
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
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.7);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(25, 118, 210, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0);
  }
`;

const glassEffect = keyframes`
  0% {
    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3));
  }
  50% {
    background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.4));
  }
  100% {
    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3));
  }
`;

const MainContainer = styled(Container)(({ theme }) => ({
  padding: '80px 20px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
    zIndex: 0,
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  animation: `${fadeInUp} 1s ease-out`,
}));

const MainTitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #ffffff, #f0f0f0)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'center',
  marginBottom: '1rem',
  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  letterSpacing: '-0.02em',
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  color: 'rgba(255,255,255,0.9)',
  textAlign: 'center',
  marginBottom: '4rem',
  fontWeight: 300,
}));

const SliderContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '650px',
  overflow: 'hidden',
  borderRadius: '32px',
  display: 'flex',
  alignItems: 'center',
  background: 'rgba(255,255,255,0.1)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.2)',
  boxShadow: '0 25px 50px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)',
  animation: `${glassEffect} 4s ease-in-out infinite`,
  [theme.breakpoints.down('md')]: {
    height: '550px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '450px',
    borderRadius: '24px',
  },
}));

const SlideContent = styled(Box)(({ theme }) => ({
  flex: '1',
  overflow: 'hidden',
  padding: '0 80px',
  [theme.breakpoints.down('sm')]: {
    padding: '0 60px',
  },
}));

const SlideWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '300%',
  height: '100%',
  transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
}));

const Slide = styled(Box)(({ theme }) => ({
  width: '33.333%',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '40px 20px',
  gap: '30px',
  [theme.breakpoints.down('md')]: {
    gap: '20px',
    padding: '30px 15px',
  },
  [theme.breakpoints.down('sm')]: {
    gap: '15px',
    padding: '20px 10px',
  },
}));

const VideoContainer = styled(Box)(({ theme }) => ({
  width: '320px',
  height: '520px',
  borderRadius: '24px',
  overflow: 'hidden',
  position: 'relative',
  background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
  boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  '&:hover': {
    transform: 'translateY(-20px) scale(1.05)',
    boxShadow: '0 30px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.2)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(255,255,255,0.1), transparent)',
    zIndex: 1,
    pointerEvents: 'none',
  },
  [theme.breakpoints.down('md')]: {
    width: '280px',
    height: '450px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '220px',
    height: '350px',
    borderRadius: '18px',
  },
}));

const StyledIframe = styled('iframe')(({ theme }) => ({
  width: '100%',
  height: '100%',
  border: 'none',
  position: 'relative',
  zIndex: 2,
}));

const NavigationButton = styled(IconButton)(({ theme, direction }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  [direction]: '20px',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.3)',
  color: 'white',
  width: '64px',
  height: '64px',
  zIndex: 10,
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  animation: `${pulse} 3s infinite`,
  '&:hover': {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.2))',
    transform: 'translateY(-50%) scale(1.15)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
  },
  '&:active': {
    transform: 'translateY(-50%) scale(0.95)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '56px',
    height: '56px',
    [direction]: '15px',
  },
}));

const ProgressIndicator = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '30px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: '16px',
  padding: '12px 24px',
  background: 'rgba(255,255,255,0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: '50px',
  border: '1px solid rgba(255,255,255,0.2)',
}));

const ProgressDot = styled(Box)(({ theme, active, index }) => ({
  width: active ? '32px' : '12px',
  height: '12px',
  borderRadius: '6px',
  backgroundColor: active ? '#ffffff' : 'rgba(255,255,255,0.4)',
  cursor: 'pointer',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    backgroundColor: active ? '#ffffff' : 'rgba(255,255,255,0.7)',
    transform: 'scale(1.2)',
  },
  '&::before': active ? {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
    animation: `${fadeInUp} 2s ease-in-out infinite`,
  } : {},
}));

const PlayButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: 'rgba(255,255,255,0.9)',
  color: theme.palette.primary.main,
  width: '80px',
  height: '80px',
  zIndex: 3,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: '#ffffff',
    transform: 'translate(-50%, -50%) scale(1.1)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '60px',
    height: '60px',
  },
}));

const VideoSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Örnek video verileri - YouTube video ID'leri ile değiştirebilirsiniz
  const videoSlides = [
    [
      { id: 'dQw4w9WgXcQ', title: 'Proje Tanıtımı 1' },
      { id: 'L_jWHffIx5E', title: 'İnşaat Süreci' },
      { id: '9bZkp7q19f0', title: 'Final Görünüm' }
    ],
    [
      { id: 'kJQP7kiw5Fk', title: 'Villa Projesi' },
      { id: 'fJ9rUzIMcZQ', title: 'Modern Tasarım' },
      { id: 'uelHwf8o7_U', title: 'İç Mekan' }
    ],
    [
      { id: 'hFZFjoX2cGg', title: 'Ofis Binası' },
      { id: 'y6120QOlsfU', title: 'Dış Cephe' },
      { id: 'Ct6BUPvE2sM', title: 'Peyzaj Düzenlemesi' }
    ]
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % videoSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + videoSlides.length) % videoSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <MainContainer maxWidth={false}>
      <ContentWrapper>
        <MainTitle>
          Projelerimizden Öne Çıkanlar
        </MainTitle>
        <SubTitle>
          Gerçekleştirdiğimiz başarılı projeleri keşfedin
        </SubTitle>
        
        <SliderContainer>
          {/* Sol Navigation Butonu */}
          <NavigationButton 
            direction="left" 
            onClick={prevSlide}
            aria-label="Önceki slide"
          >
            <ChevronLeft fontSize="large" />
          </NavigationButton>

          {/* Slide İçeriği */}
          <SlideContent>
            <SlideWrapper 
              sx={{ 
                transform: `translateX(-${currentSlide * 33.333}%)` 
              }}
            >
              {videoSlides.map((slide, slideIndex) => (
                <Slide key={slideIndex}>
                  {slide.map((video, videoIndex) => (
                    <VideoContainer key={`${slideIndex}-${videoIndex}`}>
                      <StyledIframe
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=1&showinfo=0&rel=0&loop=1&playlist=${video.id}`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </VideoContainer>
                  ))}
                </Slide>
              ))}
            </SlideWrapper>
          </SlideContent>

          {/* Sağ Navigation Butonu */}
          <NavigationButton 
            direction="right" 
            onClick={nextSlide}
            aria-label="Sonraki slide"
          >
            <ChevronRight fontSize="large" />
          </NavigationButton>

          {/* Progress Indicator */}
          <ProgressIndicator>
            {videoSlides.map((_, index) => (
              <ProgressDot
                key={index}
                active={currentSlide === index}
                index={index}
                onClick={() => goToSlide(index)}
              />
            ))}
          </ProgressIndicator>
        </SliderContainer>
      </ContentWrapper>
    </MainContainer>
  );
};

export default VideoSlider;