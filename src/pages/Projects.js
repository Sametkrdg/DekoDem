import React from 'react';
import { Container, Grid, Typography, Box, Chip } from '@mui/material';
import { LocationOn, CalendarToday, Engineering, Home, Business } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Import styled components from your styledComponents.js file
const SectionContainer = styled(Container)(({ theme }) => ({
  padding: '80px 0',
  [theme.breakpoints.down('md')]: {
    padding: '60px 0',
  },
}));

const PageTitle = styled(Typography)(({ theme }) => ({
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

const ProjectCard = styled(Box)(({ theme }) => ({
  background: '#fff',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  fontWeight: '600',
  marginBottom: '25px',
  color: '#2c3e50',
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

const GradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(135deg, #3498db, #2ecc71)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '15px',
  color: '#7f8c8d',
}));

const ProjectImage = styled(Box)(({ theme }) => ({
  height: '200px',
  background: 'linear-gradient(135deg, #3498db, #2ecc71)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '3rem',
}));

const ProjectContent = styled(Box)(({ theme }) => ({
  padding: '25px',
}));

const ProjectStatus = styled(Chip)(({ theme }) => ({
  background: 'linear-gradient(135deg, #3498db, #2ecc71)',
  color: 'white',
  fontWeight: '600',
  marginBottom: '15px',
}));

function Projects() {
  const projeler = [
    { 
      ad: "Modern Konutlar", 
      yer: "İstanbul", 
      yıl: 2023,
      durum: "Tamamlandı",
      aciklama: "Çağdaş mimarisi ve sürdürülebilir tasarımıyla öne çıkan lüks konut projesi.",
      icon: <Home />,
      alan: "15.000 m²"
    },
    { 
      ad: "Ofis Plaza", 
      yer: "Ankara", 
      yıl: 2022,
      durum: "Devam Ediyor",
      aciklama: "A sınıfı ofis binası olarak tasarlanan modern iş merkezi projesi.",
      icon: <Business />,
      alan: "25.000 m²"
    },
    { 
      ad: "Villa Serisi", 
      yer: "İzmir", 
      yıl: 2021,
      durum: "Tamamlandı",
      aciklama: "Deniz manzaralı özel tasarım villa kompleksi projesi.",
      icon: <Home />,
      alan: "8.500 m²"
    },
    { 
      ad: "Endüstriyel Kompleks", 
      yer: "Bursa", 
      yıl: 2024,
      durum: "Planlama",
      aciklama: "Yenilikçi üretim tesisleri için tasarlanan endüstriyel proje.",
      icon: <Engineering />,
      alan: "50.000 m²"
    },
  ];

  const getStatusColor = (durum) => {
    switch(durum) {
      case 'Tamamlandı': return { background: 'linear-gradient(135deg, #27ae60, #2ecc71)' };
      case 'Devam Ediyor': return { background: 'linear-gradient(135deg, #f39c12, #e67e22)' };
      case 'Planlama': return { background: 'linear-gradient(135deg, #9b59b6, #8e44ad)' };
      default: return { background: 'linear-gradient(135deg, #3498db, #2ecc71)' };
    }
  };

  return (
    <SectionContainer maxWidth="lg">
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <PageTitle variant="h1">
          Projelerimiz
        </PageTitle>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#7f8c8d', 
            maxWidth: '600px', 
            margin: '0 auto',
            lineHeight: 1.6 
          }}
        >
          Kaliteli tasarım ve mükemmel işçilikle hayata geçirdiğimiz projelerimizi keşfedin
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {projeler.map((proje, index) => (
          <Grid item xs={12} md={6} key={index}>
            <ProjectCard>
              <ProjectImage>
                {proje.icon}
              </ProjectImage>
              
              <ProjectContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <SectionTitle variant="h5" sx={{ mb: 1, fontSize: '1.4rem' }}>
                    {proje.ad}
                  </SectionTitle>
                  <ProjectStatus 
                    label={proje.durum}
                    sx={getStatusColor(proje.durum)}
                  />
                </Box>

                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#7f8c8d', 
                    mb: 3, 
                    lineHeight: 1.6 
                  }}
                >
                  {proje.aciklama}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <ContactItem>
                    <LocationOn sx={{ color: '#3498db' }} />
                    <Typography variant="body2">
                      <strong>Konum:</strong> {proje.yer}
                    </Typography>
                  </ContactItem>

                  <ContactItem>
                    <CalendarToday sx={{ color: '#3498db' }} />
                    <Typography variant="body2">
                      <strong>Yıl:</strong> {proje.yıl}
                    </Typography>
                  </ContactItem>

                  <ContactItem>
                    <Engineering sx={{ color: '#3498db' }} />
                    <Typography variant="body2">
                      <strong>Alan:</strong> <GradientText component="span">{proje.alan}</GradientText>
                    </Typography>
                  </ContactItem>
                </Box>
              </ProjectContent>
            </ProjectCard>
          </Grid>
        ))}
      </Grid>

      {/* Stats Section */}
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <SectionTitle variant="h4" sx={{ textAlign: 'center', fontSize: '2rem', mb: 4 }}>
          Başarılarımız
        </SectionTitle>
        
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <GradientText variant="h3" sx={{ fontSize: '2.5rem', mb: 1 }}>
                50+
              </GradientText>
              <Typography variant="h6" sx={{ color: '#7f8c8d' }}>
                Tamamlanan Proje
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <GradientText variant="h3" sx={{ fontSize: '2.5rem', mb: 1 }}>
                15
              </GradientText>
              <Typography variant="h6" sx={{ color: '#7f8c8d' }}>
                Yıl Deneyim
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <GradientText variant="h3" sx={{ fontSize: '2.5rem', mb: 1 }}>
                100K+
              </GradientText>
              <Typography variant="h6" sx={{ color: '#7f8c8d' }}>
                m² İnşaat Alanı
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <GradientText variant="h3" sx={{ fontSize: '2.5rem', mb: 1 }}>
                98%
              </GradientText>
              <Typography variant="h6" sx={{ color: '#7f8c8d' }}>
                Müşteri Memnuniyeti
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </SectionContainer>
  );
}

export default Projects;