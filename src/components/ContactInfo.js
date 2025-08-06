// components/ContactInfo.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Phone, LocationOn, Email, AccessTime, Language } from '@mui/icons-material';
import { ServiceCard, SectionTitle, ContactItem, ContactText, SocialMediaContainer, SocialButton } from '../styles/StyledComponents';
import { Facebook, Instagram, Twitter, LinkedIn } from '@mui/icons-material';

const ContactInfo = () => {
  const contactData = [
    {
      icon: <Phone sx={{ color: '#3498db' }} />,
      title: 'Telefon',
      content: '+90 532 123 45 67',
      subtitle: 'Pazartesi - Cuma: 09:00 - 18:00'
    },
    {
      icon: <Email sx={{ color: '#3498db' }} />,
      title: 'E-posta',
      content: 'info@firmaismi.com',
      subtitle: 'Size 24 saat içinde dönüş yapacağız'
    },
    {
      icon: <LocationOn sx={{ color: '#3498db' }} />,
      title: 'Adres',
      content: 'Bağcılar, İstanbul',
      subtitle: 'Merkezi konum, kolay ulaşım'
    },
    {
      icon: <AccessTime sx={{ color: '#3498db' }} />,
      title: 'Çalışma Saatleri',
      content: '09:00 - 18:00',
      subtitle: 'Pazartesi - Cuma'
    }
  ];

  return (
    <Box>
      <SectionTitle 
        variant="h4" 
        sx={{ 
          textAlign: 'center', 
          fontSize: '2rem', 
          marginBottom: '40px',
          color: '#2c3e50'
        }}
      >
        İletişim Bilgileri
      </SectionTitle>

      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: '30px',
          marginBottom: '50px'
        }}
      >
        {contactData.map((item, index) => (
          <ServiceCard key={index}>
            <Box sx={{ marginBottom: '20px' }}>
              {item.icon}
            </Box>
            
            <SectionTitle 
              variant="h6" 
              sx={{ 
                fontSize: '1.3rem', 
                marginBottom: '15px',
                color: '#2c3e50'
              }}
            >
              {item.title}
            </SectionTitle>
            
            <ContactText 
              sx={{ 
                fontSize: '1.1rem', 
                fontWeight: '600', 
                color: '#3498db',
                marginBottom: '5px'
              }}
            >
              {item.content}
            </ContactText>
            
            <ContactText sx={{ color: '#7f8c8d' }}>
              {item.subtitle}
            </ContactText>
          </ServiceCard>
        ))}
      </Box>

      {/* Social Media Section */}
      <Box sx={{ textAlign: 'center' }}>
        <SectionTitle 
          variant="h6" 
          sx={{ 
            fontSize: '1.3rem', 
            marginBottom: '25px',
            color: '#2c3e50'
          }}
        >
          Sosyal Medya
        </SectionTitle>
        
        <SocialMediaContainer sx={{ justifyContent: 'center' }}>
          <SocialButton>
            <Facebook />
          </SocialButton>
          <SocialButton>
            <Instagram />
          </SocialButton>
          <SocialButton>
            <Twitter />
          </SocialButton>
          <SocialButton>
            <LinkedIn />
          </SocialButton>
        </SocialMediaContainer>
      </Box>
    </Box>
  );
};

export default ContactInfo;