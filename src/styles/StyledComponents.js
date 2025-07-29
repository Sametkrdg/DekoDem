// styledComponents.js
import { styled } from '@mui/material/styles';
import { Box, Typography, IconButton, Container, Button } from '@mui/material';

// ===== LAYOUT COMPONENTS =====
export const FooterContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
  color: '#fff',
  marginTop: 'auto',
}));

export const MainFooter = styled(Box)(({ theme }) => ({
  padding: '60px 0 40px 0',
  [theme.breakpoints.down('md')]: {
    padding: '40px 0 30px 0',
  },
}));

export const FooterSection = styled(Box)(({ theme }) => ({
  height: '100%',
}));

export const CopyrightSection = styled(Box)(({ theme }) => ({
  background: 'rgba(0,0,0,0.2)',
  padding: '20px 0',
  borderTop: '1px solid rgba(255,255,255,0.1)',
}));

// ===== HEADER/LOGO COMPONENTS =====
export const LogoContainer = styled(Box)(({ theme }) => ({
  marginBottom: '20px',
}));

export const LogoText = styled(Typography)(({ theme }) => ({
  fontSize: '1.8rem',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #3498db, #2ecc71)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: '10px',
}));

export const LogoSubtext = styled(Typography)(({ theme }) => ({
  color: '#bdc3c7',
  fontSize: '0.9rem',
  marginBottom: '25px',
}));

// ===== SECTION TITLES =====
export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  fontWeight: '600',
  marginBottom: '25px',
  color: '#ecf0f1',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: 0,
    width: '40px',
    height: '3px',
    background: 'linear-gradient(90deg, #3498db, #2ecc71)',
    borderRadius: '2px',
  },
}));

export const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #3498db, #2ecc71)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: '20px',
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
  },
}));

// ===== SOCIAL MEDIA COMPONENTS =====
export const SocialMediaContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '12px',
  marginTop: '20px',
}));

export const SocialButton = styled(IconButton)(({ theme }) => ({
  background: 'rgba(255,255,255,0.1)',
  color: '#ecf0f1',
  width: '45px',
  height: '45px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    background: 'linear-gradient(135deg, #3498db, #2ecc71)',
    boxShadow: '0 8px 20px rgba(52, 152, 219, 0.4)',
  },
}));

// ===== LIST ITEMS =====
export const ServiceItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '15px',
  color: '#bdc3c7',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    color: '#3498db',
    transform: 'translateX(5px)',
  },
}));

export const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '15px',
  color: '#bdc3c7',
}));

// ===== TEXT COMPONENTS =====
export const ContactText = styled(Typography)(({ theme }) => ({
  fontSize: '0.95rem',
  lineHeight: 1.5,
}));

export const CopyrightText = styled(Typography)(({ theme }) => ({
  color: '#95a5a6',
  fontSize: '0.9rem',
  textAlign: 'center',
}));

export const GradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(135deg, #3498db, #2ecc71)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
}));

// ===== CARD COMPONENTS =====
export const ProjectCard = styled(Box)(({ theme }) => ({
  background: '#fff',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
  },
}));

export const ServiceCard = styled(Box)(({ theme }) => ({
  background: '#fff',
  padding: '30px',
  borderRadius: '12px',
  textAlign: 'center',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
  },
}));

// ===== HERO SECTION =====
export const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
  color: '#fff',
  padding: '100px 0',
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    padding: '60px 0',
  },
}));

export const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: '3.5rem',
  fontWeight: 'bold',
  marginBottom: '20px',
  background: 'linear-gradient(135deg, #3498db, #2ecc71)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
  },
}));

export const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  color: '#bdc3c7',
  marginBottom: '40px',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.1rem',
  },
}));

// ===== CONTAINERS =====
export const SectionContainer = styled(Container)(({ theme }) => ({
  padding: '80px 0',
  [theme.breakpoints.down('md')]: {
    padding: '60px 0',
  },
}));

// ===== ABOUT SECTION COMPONENTS =====
export const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '30px',
  marginBottom: '3rem',
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    gap: '20px',
  },
}));

export const StatItem = styled(Box)(({ theme }) => ({
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

export const StatNumber = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#3498db',
}));

export const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  color: '#bdc3c7',
  fontWeight: 500,
}));

export const FeaturesList = styled(Box)(({ theme }) => ({
  marginBottom: '3rem',
}));

export const FeatureItem = styled(Box)(({ theme }) => ({
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

// ===== CTA BUTTON =====
export const CTAButton = styled(Button)(({ theme }) => ({
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