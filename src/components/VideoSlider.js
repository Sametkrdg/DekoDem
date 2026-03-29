import React, { useState, useCallback } from 'react';
import { Box, Container, Typography, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { ChevronLeft, ChevronRight, PlayCircleOutline } from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';
import { DEFAULT_HOME_VIDEOS } from '../constants/defaultSiteContent';


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
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
`;

const glassShimmer = keyframes`
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

const VideoSection = styled(Box)(({ theme }) => ({
  padding: '80px 0',
  ...theme.mixins.gradientBackground,
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

const VideoTitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
  fontWeight: 800,
  textAlign: 'center',
  marginBottom: '1rem',
  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  letterSpacing: '-0.02em',
  ...theme.mixins.gradientText,
  background: 'linear-gradient(135deg, #ffffff, #f0f0f0)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  color: 'rgba(255,255,255,0.9)',
  textAlign: 'center',
  marginBottom: '4rem',
  fontWeight: 300,
  [theme.breakpoints.down('md')]: {
    marginBottom: '3rem',
    fontSize: '1.1rem',
  },
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
  animation: `${glassShimmer} 4s ease-in-out infinite`,
  [theme.breakpoints.down('md')]: {
    height: '550px',
    borderRadius: '24px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '400px',
    borderRadius: '16px',
  },
}));

const SlideContent = styled(Box)(({ theme }) => ({
  flex: '1',
  overflow: 'hidden',
  padding: '0 80px',
  [theme.breakpoints.down('md')]: {
    padding: '0 60px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '0 20px',
  },
}));

const SlideWrapper = styled(Box)(() => ({
  display: 'flex',
  height: '100%',
  transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
}));

const Slide = styled(Box)(({ theme, ismobile }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '40px 20px',
  gap: ismobile ? '0' : '30px',
  [theme.breakpoints.down('md')]: {
    gap: ismobile ? '0' : '20px',
    padding: '30px 15px',
  },
  [theme.breakpoints.down('sm')]: {
    gap: '0',
    padding: '20px 10px',
  },
}));

const VideoContainer = styled(Box)(({ theme, ismobile }) => ({
  width: ismobile ? '280px' : '320px',
  height: ismobile ? '320px' : '520px',
  borderRadius: '24px',
  overflow: 'hidden',
  position: 'relative',
  background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
  boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  ...theme.mixins.hoverEffect,
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
    width: ismobile ? '260px' : '280px',
    height: ismobile ? '300px' : '450px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '240px',
    height: '280px',
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

// ───── YouTube Facade Component ─────
// Renders a static thumbnail instead of a heavy iframe.
// The real player is only injected on explicit user click.
const VideoFacade = ({ videoId, title }) => {
  const [isPlayerLoaded, setIsPlayerLoaded] = useState(false);

  const handleActivate = useCallback(() => {
    setIsPlayerLoaded(true);
  }, []);

  if (isPlayerLoaded) {
    return (
      <StyledIframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&showinfo=0&rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <Box
      onClick={handleActivate}
      role="button"
      tabIndex={0}
      aria-label={`${title} videosunu oynat`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleActivate();
        }
      }}
      sx={{
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
        '&:hover .facade-play-btn': {
          transform: 'translate(-50%, -50%) scale(1.15)',
          filter: 'drop-shadow(0 0 20px rgba(249, 115, 22, 0.6))',
        },
        '&:hover .facade-overlay': {
          background: 'rgba(0, 0, 0, 0.25)',
        },
      }}
    >
      {/* YouTube Thumbnail */}
      <Box
        component="img"
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        loading="lazy"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {/* Hover Overlay */}
      <Box
        className="facade-overlay"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.15)',
          transition: 'background 0.3s ease',
        }}
      />

      {/* Professional Play Button */}
      <PlayCircleOutline
        className="facade-play-btn"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: { xs: 56, sm: 72 },
          color: 'primary.main',
          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))',
          transition: 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          background: 'radial-gradient(circle, rgba(255,255,255,0.95) 30%, rgba(255,255,255,0) 70%)',
          borderRadius: '50%',
        }}
      />

      {/* Video Title Badge */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 12,
          left: 12,
          right: 12,
          color: 'white',
          fontSize: '0.8rem',
          fontWeight: 500,
          textShadow: '0 1px 4px rgba(0,0,0,0.6)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {title}
      </Box>
    </Box>
  );
};

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
  [theme.breakpoints.down('sm')]: {
    gap: '8px',
    padding: '8px 16px',
    bottom: '20px',
  },
}));

const ProgressDot = styled(Box)(({ theme, active }) => ({
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

const extractYouTubeId = (value) => {
  if (!value) return '';

  const trimmedValue = value.trim();
  const directIdRegex = /^[a-zA-Z0-9_-]{11}$/;

  if (directIdRegex.test(trimmedValue)) {
    return trimmedValue;
  }

  // eslint-disable-next-line no-useless-escape
  const urlRegex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = trimmedValue.match(urlRegex);

  if (match && match[1]) {
    return match[1];
  }

  return '';
};

const VideoSlider = ({ videos = DEFAULT_HOME_VIDEOS }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const normalizedVideos = React.useMemo(() => {
    const source = videos && videos.length ? videos : DEFAULT_HOME_VIDEOS;

    return source
      .map((video, index) => {
        if (!video) {
          return null;
        }

        if (typeof video === 'string') {
          const id = extractYouTubeId(video);
          return id
            ? {
                id,
                title: `Video ${index + 1}`,
              }
            : null;
        }

        const urlOrId = video.url || video.id || video.videoId;
        const id = extractYouTubeId(urlOrId || '');

        if (!id) {
          return null;
        }

        return {
          id,
          title: video.title || video.ad || `Video ${index + 1}`,
        };
      })
      .filter(Boolean);
  }, [videos]);

  const videoSlides = React.useMemo(() => {
    if (!normalizedVideos.length) {
      return [];
    }

    const groupSize = isMobile ? 1 : Math.min(3, normalizedVideos.length);
    const slides = [];

    for (let i = 0; i < normalizedVideos.length; i += groupSize) {
      slides.push(normalizedVideos.slice(i, i + groupSize));
    }

    return slides;
  }, [normalizedVideos, isMobile]);

  const maxSlides = videoSlides.length || 1;
  const showNavigation = videoSlides.length > 1;
  const slidePercentage = 100 / maxSlides;

  const nextSlide = () => {
        if (!showNavigation) return;
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
        if (!showNavigation) return;
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  const goToSlide = (index) => {
        if (!showNavigation) return;
    setCurrentSlide(index);
  };

  // currentSlide sınırlarını kontrol et
  React.useEffect(() => {
        if (videoSlides.length === 0) {
      setCurrentSlide(0);
      return;
    }

    if (currentSlide >= maxSlides) {
      setCurrentSlide(0);
    }
  }, [isMobile, maxSlides, currentSlide, videoSlides.length]);

  if (!videoSlides.length) {
    return (
      <VideoSection component="section">
        <ContentWrapper maxWidth={false}>
          <VideoTitle>
            Projelerimizden Öne Çıkanlar
          </VideoTitle>
          <SubTitle>
            Gerçekleştirdiğimiz başarılı projeleri keşfedin
          </SubTitle>
          <Box
            sx={{
              background: 'rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.9)',
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'center',
            }}
          >
            Henüz video eklenmedi. Lütfen admin panelinden yeni videolar ekleyin.
          </Box>
        </ContentWrapper>
      </VideoSection>
    );
  }

  return (
    <VideoSection component="section">
      <ContentWrapper maxWidth={false}>
        <VideoTitle>
          Projelerimizden Öne Çıkanlar
        </VideoTitle>
        <SubTitle>
          Gerçekleştirdiğimiz başarılı projeleri keşfedin
        </SubTitle>
        
        <SliderContainer>
          {/* Sol Navigation Butonu */}
          {showNavigation && (
            <NavigationButton
              direction="left"
              onClick={prevSlide}
              aria-label="Önceki video"
            >
              <ChevronLeft fontSize="large" />
            </NavigationButton>
          )}

          {/* Slide İçeriği */}
          <SlideContent>
            <SlideWrapper 
              ismobile={isMobile}
              sx={{
                width: `${maxSlides * 100}%`,
                transform: `translateX(-${currentSlide * slidePercentage}%)`
              }}
            >
              {videoSlides.map((slide, slideIndex) => (
                <Slide key={slideIndex} ismobile={isMobile}>
                  {slide.map((video, videoIndex) => (
                    <VideoContainer 
                      key={`${slideIndex}-${videoIndex}`}
                      ismobile={isMobile}
                    >
                      <VideoFacade
                        videoId={video.id}
                        title={video.title}
                      />
                    </VideoContainer>
                  ))}
                </Slide>
              ))}
            </SlideWrapper>
          </SlideContent>

          {/* Sağ Navigation Butonu */}
          {showNavigation && (
            <NavigationButton
              direction="right"
              onClick={nextSlide}
              aria-label="Sonraki video"
            >
              <ChevronRight fontSize="large" />
            </NavigationButton>
          )}

          {/* Progress Indicator - Tüm Ekranlarda Görünür */}
          {showNavigation && (
            <ProgressIndicator>
              {videoSlides.map((_, index) => (
                <ProgressDot
                  key={index}
                  active={currentSlide === index}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </ProgressIndicator>
          )}
        </SliderContainer>
      </ContentWrapper>
    </VideoSection>
  );
};

export default VideoSlider;