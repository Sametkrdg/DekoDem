// pages/Contact.js
import React from 'react';
import { Grid, Box } from '@mui/material';
import ContactHeader from '../components/ContactHeader';
import ContactInfo from '../components/ContactInfo';
import ContactForm from '../components/ContactForm';
import LocationMap from '../components/LocationMap';
import { SectionContainer } from '../styles/StyledComponents';

const Contact = () => {
  return (
    <SectionContainer maxWidth="lg">
      {/* Header Section */}
      <ContactHeader />

      {/* Main Content Grid */}
      <Grid container spacing={6} sx={{ marginBottom: '80px' }}>
        {/* Contact Info */}
        <Grid item xs={12} lg={8}>
          <ContactInfo />
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} lg={4}>
          <ContactForm />
        </Grid>
      </Grid>

      {/* Location Map */}
      <LocationMap />

      {/* Quick Contact Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
          borderRadius: '20px',
          padding: '50px 30px',
          marginTop: '80px',
          textAlign: 'center',
          color: 'white'
        }}
      >
        <Box sx={{ marginBottom: '30px' }}>
          <Box 
            sx={{ 
              fontSize: '3rem',
              marginBottom: '20px'
            }}
          >
            📞
          </Box>
          
          <Box 
            sx={{ 
              fontSize: '2rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #3498db, #2ecc71)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '10px'
            }}
          >
            Hızlı İletişim
          </Box>
          
          <Box 
            sx={{ 
              color: '#bdc3c7',
              fontSize: '1.2rem',
              marginBottom: '30px'
            }}
          >
            Acil durumlar için bizi arayabilirsiniz
          </Box>
          
          <Box 
            sx={{ 
              fontSize: '1.8rem',
              fontWeight: 'bold',
              color: '#3498db',
              marginBottom: '20px'
            }}
          >
            +90 532 123 45 67
          </Box>
          
          <Box sx={{ color: '#95a5a6' }}>
            Pazartesi - Cuma: 09:00 - 18:00
          </Box>
        </Box>
      </Box>
    </SectionContainer>
  );
};

export default Contact;