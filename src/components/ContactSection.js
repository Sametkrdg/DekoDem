import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowForward, Phone, Email, LocationOn } from '@mui/icons-material';
import { contact } from '../constants/siteContent';

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

const ContentSection = styled(Section)(({ theme }) => ({
  background: 'rgba(255,255,255,0.02)',
  backdropFilter: 'blur(10px)',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2rem, 4vw, 3rem)',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #3498db, #2ecc71)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: '2rem',
  textAlign: 'center',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '4px',
    background: 'linear-gradient(90deg, #3498db, #2ecc71)',
    borderRadius: '2px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
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

const ContactSectionContainer = styled(Box)(({ theme }) => ({
  background: 'rgba(255,255,255,0.03)',
  borderRadius: '24px',
  padding: '40px',
  marginTop: '60px',
  textAlign: 'center',
  border: '1px solid rgba(255,255,255,0.1)',
  [theme.breakpoints.down('md')]: {
    padding: '30px',
    marginTop: '40px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '20px',
    marginTop: '30px',
  },
}));

const ContactInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '40px',
  marginTop: '30px',
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    gap: '20px',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  color: '#bdc3c7',
  fontSize: '1rem',
  '& svg': {
    color: '#3498db',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '0.9rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
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
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transition: 'left 0.5s',
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 30px rgba(52, 152, 219, 0.4)',
    background: 'linear-gradient(135deg, #2980b9, #27ae60)',
    '&::before': {
      left: '100%',
    },
  },
  [theme.breakpoints.down('md')]: {
    padding: '12px 28px',
    fontSize: '1rem',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '10px 24px',
    fontSize: '0.9rem',
  },
}));

const ContactSection = () => {
  return (
    <ContentSection>
      <ContactSectionContainer>
        <SectionTitle style={{ marginBottom: '20px' }}>Bizimle İletişime Geçin</SectionTitle>
        <Description style={{ textAlign: 'center', marginBottom: '30px' }}>
          Projeleriniz için detaylı bilgi almak ve ücretsiz keşif randevusu ayarlamak için bizimle iletişime geçin.
        </Description>
        
        <ContactInfo>
          <ContactItem>
            <Phone />
            <span>{contact.phone1}</span>
          </ContactItem>
          <ContactItem>
            <Email />
            <span>{contact.email}</span>
          </ContactItem>
          <ContactItem>
            <LocationOn />
            <span>İzmit / Kocaeli</span>
          </ContactItem>
        </ContactInfo>

        <Box sx={{ mt: 4 }}>
          <CTAButton 
            endIcon={<ArrowForward />}
            onClick={() => window.location.href = '/iletisim'}
          >
            İletişime Geç
          </CTAButton>
        </Box>
      </ContactSectionContainer>
    </ContentSection>
  );
};

export default ContactSection;