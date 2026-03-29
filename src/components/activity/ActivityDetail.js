import React from 'react';
import { Box, Container, Typography, Chip, Stack } from '@mui/material';

const ActivityDetail = ({ activity }) => {
  if (!activity) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Faaliyet bulunamadı
        </Typography>
        <Typography color="text.secondary">
          Aradığınız faaliyet alanı şu anda mevcut değil. Lütfen menüden farklı bir seçenek deneyin.
        </Typography>
      </Container>
    );
  }

  return (
    <Box component="article" sx={{ backgroundColor: '#f7f9fc' }}>
      <Box
        sx={{
          position: 'relative',
          color: 'white',
          py: { xs: 10, md: 16 },
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={activity.heroImage}
          alt={activity.title}
          fetchpriority="high"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55))',
            zIndex: 1,
          }}
        />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h2" component="h1" sx={{ fontSize: { xs: '2.25rem', md: '3.5rem' }, fontWeight: 700 }}>
            {activity.title}
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, maxWidth: 640, color: 'rgba(255,255,255,0.85)' }}>
            {activity.summary}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', mb: 4 }}>
          {activity.description}
        </Typography>

        <Stack spacing={2}>
          {activity.highlights.map((item, index) => (
            <Chip
              key={index}
              label={item}
              color="primary"
              variant="outlined"
              sx={{
                justifyContent: 'flex-start',
                fontWeight: 500,
                '& .MuiChip-label': { whiteSpace: 'normal', textAlign: 'left' },
              }}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default ActivityDetail;