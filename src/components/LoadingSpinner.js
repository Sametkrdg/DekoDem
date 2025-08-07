import React from 'react';
import { 
  Box, 
  CircularProgress, 
  Typography, 
  Fade 
} from '@mui/material';

const LoadingSpinner = ({ 
  message = "Yükleniyor...", 
  size = 40,
  fullScreen = true,
  color = "primary" 
}) => {
  const containerStyles = fullScreen 
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        zIndex: 9999,
      }
    : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
      };

  return (
    <Fade in timeout={300}>
      <Box sx={containerStyles}>
        <CircularProgress 
          size={size} 
          color={color}
          sx={{ mb: 2 }}
        />
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            fontWeight: 500,
            letterSpacing: 0.5 
          }}
        >
          {message}
        </Typography>
      </Box>
    </Fade>
  );
};

export default LoadingSpinner;