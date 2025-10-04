import React from 'react';
import { Box, Container, Typography, Grid, Paper, Chip, Stack } from '@mui/material';

const ProjectDetail = ({ project }) => {
  if (!project) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Proje bulunamadı
        </Typography>
        <Typography color="text.secondary">
          Aradığınız proje sayfası şu anda mevcut değil. Lütfen projeler listesine geri dönün.
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f4f6fb' }}>
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(41,128,185,0.85), rgba(39,174,96,0.85))',
          color: 'white',
          py: { xs: 10, md: 16 },
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" sx={{ fontWeight: 700, fontSize: { xs: '2.4rem', md: '3.6rem' } }}>
            {project.ad}
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, maxWidth: 640, color: 'rgba(255,255,255,0.85)' }}>
            {project.aciklama}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 3, backgroundColor: 'white' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Proje Özeti
              </Typography>
              <Typography color="text.secondary">
                {project.overview}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 3, backgroundColor: 'white' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Proje Bilgileri
              </Typography>
              <Stack spacing={1.5}>
                <Typography><strong>Konum:</strong> {project.yer}</Typography>
                <Typography><strong>Yıl:</strong> {project.yıl}</Typography>
                <Typography><strong>Durum:</strong> {project.durum}</Typography>
                <Typography><strong>Alan:</strong> {project.alan}</Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        <Paper elevation={0} sx={{ mt: 6, p: { xs: 4, md: 5 }, borderRadius: 3, backgroundColor: 'white' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            Sağlanan Hizmetler
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            {project.services.map((service, index) => (
              <Chip key={index} label={service} color="primary" variant="outlined" sx={{ mb: 1 }} />
            ))}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProjectDetail;