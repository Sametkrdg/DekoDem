import { styled, alpha } from '@mui/material/styles';
import { Box, Typography, IconButton, Container, Button, Card, Paper } from '@mui/material';

// ===== LAYOUT COMPONENTS =====
export const MainLayout = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
}));

// ===== FOOTER COMPONENTS =====
export const FooterContainer = styled(Box)(({ theme }) => ({
  ...theme.mixins.gradientBackground,
  color: theme.palette.text.white,
  marginTop: 'auto',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
  }
}));

export const MainFooter = styled(Box)(({ theme }) => ({
  ...theme.mixins.sectionPadding,
  paddingTop: '60px',
  paddingBottom: '40px',
}));

export const FooterSection = styled(Box)(({ theme }) => ({
  height: '100%',
  '& > *': {
    marginBottom: theme.spacing(2),
  }
}));

export const CopyrightSection = styled(Box)(({ theme }) => ({
  background: 'rgba(0,0,0,0.3)',
  padding: theme.spacing(3, 0),
  borderTop: '1px solid rgba(255,255,255,0.1)',
  backdropFilter: 'blur(5px)',
}));

// ===== HEADER/LOGO COMPONENTS =====
export const LogoContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}));

export const LogoText = styled(Typography)(({ theme }) => ({
  ...theme.mixins.gradientText,
  fontSize: '1.8rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  }
}));

export const LogoSubtext = styled(Typography)(({ theme }) => ({
  color: theme.palette.neutral.gray,
  fontSize: '0.9rem',
  marginBottom: theme.spacing(3),
  opacity: 0.9,
}));

// ===== SECTION TITLES =====
export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  fontWeight: 600,
  marginBottom: theme.spacing(3),
  color: theme.palette.text.white,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-10px',
    left: 0,
    width: '50px',
    height: '3px',
    background: theme.palette.gradients.primary,
    borderRadius: '2px',
    transition: 'width 0.3s ease',
  },
  '&:hover::after': {
    width: '70px',
  }
}));

export const PageTitle = styled(Typography)(({ theme }) => ({
  ...theme.mixins.gradientText,
  fontSize: 'clamp(2rem, 4vw, 3rem)',
  fontWeight: 'bold',
  marginBottom: theme.spacing(3),
  textAlign: 'center',
  lineHeight: 1.2,
}));

export const SectionHeading = styled(Typography)(({ theme }) => ({
  ...theme.mixins.gradientText,
  fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
  fontWeight: 600,
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-15px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '4px',
    background: theme.palette.gradients.primary,
    borderRadius: '2px',
  }
}));

// ===== SOCIAL MEDIA COMPONENTS =====
export const SocialMediaContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1.5),
  marginTop: theme.spacing(3),
  flexWrap: 'wrap',
}));

export const SocialButton = styled(IconButton)(({ theme }) => ({
  ...theme.mixins.socialButton,
  '&:active': {
    transform: 'translateY(-1px) scale(1.05)',
  }
}));

// ===== INTERACTIVE COMPONENTS =====
export const ServiceItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(2),
  color: theme.palette.neutral.gray,
  padding: theme.spacing(1, 0),
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.primary.light,
    transform: 'translateX(8px)',
    paddingLeft: theme.spacing(1),
    background: alpha(theme.palette.primary.main, 0.05),
  },
  '& .MuiSvgIcon-root': {
    transition: 'all 0.3s ease',
    fontSize: '1.2rem',
  },
  '&:hover .MuiSvgIcon-root': {
    color: theme.palette.secondary.main,
    transform: 'scale(1.1)',
  }
}));

export const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(2),
  color: theme.palette.neutral.gray,
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255,255,255,0.05)',
    transform: 'translateX(5px)',
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.light,
    fontSize: '1.3rem',
  }
}));

// ===== TEXT COMPONENTS =====
export const ContactText = styled(Typography)(({ theme }) => ({
  fontSize: '0.95rem',
  lineHeight: 1.6,
  fontWeight: 400,
}));

export const CopyrightText = styled(Typography)(({ theme }) => ({
  color: theme.palette.neutral.gray,
  fontSize: '0.9rem',
  textAlign: 'center',
  opacity: 0.8,
}));

export const GradientText = styled(Typography)(({ theme }) => ({
  ...theme.mixins.gradientText,
}));

export const DescriptionText = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  lineHeight: 1.7,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(3),
  '& strong': {
    color: theme.palette.text.primary,
    fontWeight: 600,
  }
}));

// ===== CARD COMPONENTS =====
export const ProjectCard = styled(Card)(({ theme }) => ({
  ...theme.mixins.hoverEffect,
  borderRadius: '10px',
  overflow: 'hidden',
  background: theme.palette.background.paper,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: theme.palette.gradients.primary,
  }
}));

export const ServiceCard = styled(Card)(({ theme }) => ({
  ...theme.mixins.hoverEffect,
  padding: theme.spacing(4),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: `radial-gradient(circle, ${theme.palette.primary.main}15 0%, transparent 70%)`,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover::before': {
    opacity: 1,
  },
  '& .MuiSvgIcon-root': {
    fontSize: '3rem',
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
    transition: 'all 0.3s ease',
  },
  '&:hover .MuiSvgIcon-root': {
    color: theme.palette.secondary.main,
    transform: 'scale(1.1) rotate(5deg)',
  }
}));

export const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '10px',
  textAlign: 'center',
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.primary.main}20`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
    borderColor: theme.palette.primary.main,
  }
}));

// ===== HERO SECTION =====
export const HeroSection = styled(Box)(({ theme }) => ({
  ...theme.mixins.gradientBackground,
  ...theme.mixins.flexColumnCenter,
  color: theme.palette.text.white,
  minHeight: '80vh',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.3)',
    zIndex: 1,
  },
  '& > *': {
    position: 'relative',
    zIndex: 2,
  }
}));

export const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
  fontWeight: 'bold',
  marginBottom: theme.spacing(3),
  background: `linear-gradient(135deg, ${theme.palette.common.white}, ${alpha(theme.palette.common.white, 0.82)})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  lineHeight: 1.2,
}));

export const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
  color: theme.palette.neutral.lightGray,
  marginBottom: theme.spacing(5),
  maxWidth: '600px',
  opacity: 0.9,
  lineHeight: 1.6,
}));

// ===== CONTAINERS =====
export const SectionContainer = styled(Container)(({ theme }) => ({
  ...theme.mixins.sectionPadding,
}));

export const FlexContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    textAlign: 'center',
  }
}));

// ===== STATISTICS COMPONENTS =====
export const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(4),
  flexWrap: 'wrap',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(2),
  },
}));

export const StatItem = styled(Box)(({ theme }) => ({
  ...theme.mixins.flexCenter,
  gap: theme.spacing(1.5),
  padding: theme.spacing(2, 3),
  background: `${theme.palette.primary.main}15`,
  borderRadius: '50px',
  border: `1px solid ${theme.palette.primary.main}30`,
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  cursor: 'pointer',
  minWidth: '160px',
  '&:hover': {
    background: `${theme.palette.primary.main}25`,
    transform: 'translateY(-8px)',
    boxShadow: `0 12px 40px ${theme.palette.primary.main}25`,
    borderColor: theme.palette.primary.main,
  }
}));

export const StatNumber = styled(Typography)(({ theme }) => ({
  fontSize: '1.8rem',
  fontWeight: 'bold',
  ...theme.mixins.gradientText,
}));

export const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  color: theme.palette.text.secondary,
  fontWeight: 500,
}));

// ===== FEATURE COMPONENTS =====
export const FeaturesList = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const FeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1.5),
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.primary.main,
    transform: 'translateX(10px)',
    background: `${theme.palette.primary.main}08`,
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.secondary.main,
    transition: 'all 0.3s ease',
  },
  '&:hover .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
    transform: 'scale(1.2)',
  }
}));

// ===== CTA BUTTON =====
export const CTAButton = styled(Button)(({ theme }) => ({
  background: theme.palette.gradients.primary,
  color: 'white',
  padding: theme.spacing(2, 4),
  borderRadius: '50px',
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: `0 8px 25px ${theme.palette.primary.main}40`,
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  position: 'relative',
  overflow: 'hidden',
  minWidth: '180px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)`,
    transition: 'left 0.6s',
  },
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: `0 12px 35px ${theme.palette.primary.main}50`,
    background: theme.palette.gradients.hover,
    '&::before': {
      left: '100%',
    },
  },
  '&:active': {
    transform: 'translateY(-1px) scale(1.02)',
  },
}));

// ===== ANIMATION COMPONENTS =====
export const AnimatedBox = styled(Box)(({ theme }) => ({
  opacity: 0,
  transform: 'translateY(30px)',
  transition: 'all 0.6s ease-out',
  '&.animate-in': {
    opacity: 1,
    transform: 'translateY(0)',
  }
}));

export const FadeInBox = styled(Box)(({ theme, delay = 0 }) => ({
  opacity: 0,
  transform: 'translateY(20px)',
  animation: `fadeInUp 0.8s ease-out ${delay}s forwards`,
  '@keyframes fadeInUp': {
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    }
  }
}));

// ===== GRID COMPONENTS =====
export const ResponsiveGrid = styled(Box)(({ theme, columns = 3 }) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${columns}, 1fr)`,
  gap: theme.spacing(3),
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: columns > 2 ? 'repeat(2, 1fr)' : '1fr',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(2),
  }
}));

export const ImageGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
}));

// ===== IMAGE COMPONENTS =====
export const ProjectImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '250px',
  objectFit: 'cover',
  borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  }
}));

export const HeroImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  maxHeight: '500px',
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: theme.shadows[6],
  }
}));

// ===== FORM COMPONENTS =====
export const FormContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: '10px',
  boxShadow: theme.shadows[3],
  '& .MuiTextField-root': {
    marginBottom: theme.spacing(2),
  },
  '& .MuiButton-root': {
    marginTop: theme.spacing(2),
  }
}));

export const ContactFormWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '10px',
  background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
  border: `1px solid ${theme.palette.primary.main}20`,
}));

// ===== NAVIGATION COMPONENTS =====
export const NavbarContainer = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderBottom: `1px solid ${theme.palette.primary.main}20`,
  position: 'sticky',
  top: 0,
  zIndex: 1100,
  transition: 'all 0.3s ease',
}));

export const NavLink = styled(Box)(({ theme, active }) => ({
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  fontWeight: active ? 600 : 500,
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-5px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: active ? '80%' : '0%',
    height: '2px',
    background: theme.palette.gradients.primary,
    transition: 'width 0.3s ease',
  },
  '&:hover': {
    color: theme.palette.primary.main,
    '&::after': {
      width: '80%',
    }
  }
}));

// ===== LOADING COMPONENTS =====
export const LoadingContainer = styled(Box)(({ theme }) => ({
  ...theme.mixins.flexColumnCenter,
  minHeight: '200px',
  gap: theme.spacing(2),
}));

export const SkeletonCard = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  '& .skeleton': {
    background: `linear-gradient(90deg, ${theme.palette.background.default} 25%, ${theme.palette.background.paper} 50%, ${theme.palette.background.default} 75%)`,
    backgroundSize: '200% 100%',
    animation: 'loading 1.5s infinite',
    borderRadius: '4px',
  },
  '@keyframes loading': {
    '0%': {
      backgroundPosition: '200% 0',
    },
    '100%': {
      backgroundPosition: '-200% 0',
    }
  }
}));

// ===== UTILITY COMPONENTS =====
export const Spacer = styled(Box)(({ theme, size = 1 }) => ({
  height: theme.spacing(size),
  width: '100%',
}));

export const Divider = styled(Box)(({ theme }) => ({
  height: '1px',
  background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}40, transparent)`,
  margin: theme.spacing(4, 0),
}));

export const GradientDivider = styled(Box)(({ theme }) => ({
  height: '3px',
  background: theme.palette.gradients.primary,
  borderRadius: '2px',
  margin: theme.spacing(2, 0),
  width: '100px',
  alignSelf: 'center',
}));

// ===== OVERLAY COMPONENTS =====
export const Overlay = styled(Box)(({ theme, visible = false }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,0.5)',
  zIndex: 1300,
  opacity: visible ? 1 : 0,
  visibility: visible ? 'visible' : 'hidden',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(5px)',
}));

export const Modal = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: theme.palette.background.paper,
  borderRadius: '10px',
  padding: theme.spacing(4),
  boxShadow: theme.shadows[6],
  maxWidth: '90vw',
  maxHeight: '90vh',
  overflow: 'auto',
  zIndex: 1301,
}));

// ===== BADGE COMPONENTS =====
export const StatusBadge = styled(Box)(({ theme, status = 'default' }) => {
  const statusColors = {
    success: theme.palette.secondary.main,
    warning: theme.palette.warning?.main ?? '#f59e0b',
    error:   theme.palette.error?.main   ?? '#ef4444',
    info:    theme.palette.primary.main,
    default: theme.palette.neutral.gray,
  };

  return {
    display: 'inline-flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 1.5),
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 600,
    background: `${statusColors[status]}20`,
    color: statusColors[status],
    border: `1px solid ${statusColors[status]}40`,
  };
});

// ===== TIMELINE COMPONENTS =====
export const TimelineContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: '2px',
    background: theme.palette.gradients.primary,
    transform: 'translateX(-50%)',
    [theme.breakpoints.down('md')]: {
      left: '20px',
    }
  }
}));

export const TimelineItem = styled(Box)(({ theme, left = false }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  flexDirection: left ? 'row-reverse' : 'row',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'row',
    paddingLeft: theme.spacing(6),
  }
}));

// ===== PRICING COMPONENTS =====
export const PricingCard = styled(Card)(({ theme, featured = false }) => ({
  ...theme.mixins.hoverEffect,
  padding: theme.spacing(4),
  textAlign: 'center',
  position: 'relative',
  border: featured ? `2px solid ${theme.palette.primary.main}` : '1px solid transparent',
  background: featured ? 
    `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.primary.main}05)` : 
    theme.palette.background.paper,
  ...(featured && {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[6],
    '&::before': {
      content: '"Önerilen"',
      position: 'absolute',
      top: '-10px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: theme.palette.gradients.primary,
      color: 'white',
      padding: theme.spacing(0.5, 2),
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: 600,
    }
  })
}));