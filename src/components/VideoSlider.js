import React, { useState } from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const SliderContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '600px',
  overflow: 'hidden',
  backgroundColor: '#f5f5f5',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    height: '500px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '400px',
  },
}));

const SlideWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '300%', // 3 slide için
  height: '100%',
  transition: 'transform 0.8s ease-in-out',
}));

const Slide = styled(Box)(({ theme }) => ({
  width: '33.333%', // Her slide 1/3 genişlik
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '20px',
  gap: '20px',
  [theme.breakpoints.down('sm')]: {
    padding: '10px',
    gap: '10px',
  },
}));

const VideoContainer = styled(Box)(({ theme }) => ({
  width: '300px',
  height: '500px',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
  },
  [theme.breakpoints.down('md')]: {
    width: '250px',
    height: '400px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '200px',
    height: '320px',
  },
}));

const StyledIframe = styled('iframe')(({ theme }) => ({
  width: '100%',
  height: '100%',
  border: 'none',
}));

const NavigationButton = styled(IconButton)(({ theme, direction }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  [direction]: '20px',
  backgroundColor: 'rgba(25, 118, 210, 0.9)',
  color: 'white',
  width: '56px',
  height: '56px',
  zIndex: 10,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(25, 118, 210, 1)',
    transform: 'translateY(-50%) scale(1.1)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '48px',
    height: '48px',
    [direction]: '10px',
  },
}));

const SlideContent = styled(Box)(({ theme }) => ({
  flex: '1',
  overflow: 'hidden',
}));

const VideoSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Örnek video verileri - YouTube video ID'leri ile değiştirebilirsiniz
  const videoSlides = [
    [
      { id: 'dQw4w9WgXcQ', title: 'Video 1' },
      { id: 'L_jWHffIx5E', title: 'Video 2' },
      { id: '9bZkp7q19f0', title: 'Video 3' }
    ],
    [
      { id: 'kJQP7kiw5Fk', title: 'Video 4' },
      { id: 'fJ9rUzIMcZQ', title: 'Video 5' },
      { id: 'uelHwf8o7_U', title: 'Video 6' }
    ],
    [
      { id: 'hFZFjoX2cGg', title: 'Video 7' },
      { id: 'y6120QOlsfU', title: 'Video 8' },
      { id: 'Ct6BUPvE2sM', title: 'Video 9' }
    ]
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % videoSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + videoSlides.length) % videoSlides.length);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Typography 
        variant="h3" 
        component="h2" 
        textAlign="center" 
        gutterBottom
        sx={{ mb: 4, fontWeight: 'bold' }}
      >
        Projelerimizden Görüntüler
      </Typography>
      
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
      </SliderContainer>
    </Container>
  );
};

export default VideoSlider;