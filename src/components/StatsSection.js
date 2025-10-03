// components/StatsSection.js
import React from 'react';
import { Grid, Box } from '@mui/material';
import { SectionTitle, StatLabel, GradientText } from '../styles/StyledComponents';

const StatsSection = () => {
  const statsData = [
    { number: '50+', label: 'Tamamlanan Proje' },
    { number: '15', label: 'Yıl Deneyim' },
    { number: '100K+', label: 'm² İnşaat Alanı' },
    { number: '98%', label: 'Müşteri Memnuniyeti' },
  ];

  return (
    <Box sx={{ textAlign: 'center', marginTop: '80px' }}>
      <SectionTitle 
        variant="h4" 
        sx={{ 
          textAlign: 'center', 
          fontSize: '2rem', 
          marginBottom: '40px',
          color: '#2c3e50'
        }}
      >
        Başarılarımız
      </SectionTitle>
      
      <Grid container spacing={4} justifyContent="center">
        {statsData.map((stat, index) => (
          <Grid item xs={6} md={3} key={index}>
            <Box sx={{ textAlign: 'center' }}>
              <GradientText 
                variant="h3" 
                sx={{ 
                  fontSize: '2.5rem', 
                  marginBottom: '10px',
                  display: 'block'
                }}
              >
                {stat.number}
              </GradientText>
              <StatLabel sx={{ fontSize: '1.1rem' }}>
                {stat.label}
              </StatLabel>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatsSection;