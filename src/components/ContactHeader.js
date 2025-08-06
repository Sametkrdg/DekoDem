// components/ContactHeader.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { PageTitle } from '../styles/StyledComponents';

const ContactHeader = () => {
  return (
    <Box sx={{ textAlign: 'center', marginBottom: '60px' }}>
      <PageTitle variant="h1">
        İletişim
      </PageTitle>
      <Typography 
        variant="h6" 
        sx={{ 
          color: '#7f8c8d', 
          fontSize: '1.2rem',
          maxWidth: '600px', 
          margin: '0 auto',
          lineHeight: '1.6' 
        }}
      >
        Size nasıl yardımcı olabileceğimizi öğrenmek için bizimle iletişime geçin
      </Typography>
    </Box>
  );
};

export default ContactHeader;