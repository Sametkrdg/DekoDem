// components/LocationMap.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { LocationOn, Directions } from '@mui/icons-material';
import { ServiceCard, SectionTitle, ContactText, CTAButton } from '../styles/StyledComponents';

const LocationMap = () => {
  const handleDirections = () => {
    // Google Maps'te konum açma
    const address = encodeURIComponent("Bağcılar, İstanbul, Turkey");
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  };

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
        Lokasyonumuz
      </SectionTitle>

      <ServiceCard>
        {/* Harita placeholder */}
        <Box
          sx={{
            height: '300px',
            background: 'linear-gradient(135deg, #3498db, #2ecc71)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '30px',
            color: 'white',
            fontSize: '4rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <LocationOn sx={{ fontSize: '4rem' }} />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: 'white',
            }}
          >
            <LocationOn sx={{ fontSize: '3rem', marginBottom: '10px' }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Bağcılar, İstanbul
            </Typography>
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <SectionTitle 
            variant="h6" 
            sx={{ 
              fontSize: '1.3rem', 
              marginBottom: '15px',
              color: '#2c3e50'
            }}
          >
            Adresimiz
          </SectionTitle>
          
          <ContactText 
            sx={{ 
              fontSize: '1.1rem', 
              color: '#7f8c8d',
              marginBottom: '10px',
              lineHeight: '1.6'
            }}
          >
            Bağcılar Mahallesi<br />
            İstanbul, Turkey
          </ContactText>

          <ContactText 
            sx={{ 
              fontSize: '0.95rem', 
              color: '#95a5a6',
              marginBottom: '25px'
            }}
          >
            Metro ve otobüs hatlarına yakın, kolay ulaşılabilir konumda
          </ContactText>

          <CTAButton
            onClick={handleDirections}
            startIcon={<Directions />}
            sx={{ minWidth: '200px' }}
          >
            Yol Tarifi Al
          </CTAButton>
        </Box>
      </ServiceCard>
    </Box>
  );
};

export default LocationMap;