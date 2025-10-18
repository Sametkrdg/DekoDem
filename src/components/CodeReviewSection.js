import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip
} from '@mui/material';
import {
  Code as CodeIcon,
  Security,
  BugReport,
  Insights
} from '@mui/icons-material';

const focusAreas = [
  {
    icon: CodeIcon,
    title: 'Standartlara Uygun Kod',
    description:
      'Kod yapısını ve naming kurallarını gözden geçirerek sürdürülebilir ve bakımı kolay bir yapı oluşturuyoruz.'
  },
  {
    icon: Security,
    title: 'Güvenlik Kontrolleri',
    description:
      'Olası güvenlik açıklarını tespit ediyor, verilerin korunması ve yetkisiz erişimlerin engellenmesi için öneriler sunuyoruz.'
  },
  {
    icon: Insights,
    title: 'Performans Analizi',
    description:
      'Uygulamanın hızlı çalışması için kritik bileşenlerde optimizasyon fırsatlarını ortaya çıkarıyoruz.'
  }
];

const workflowSteps = [
  'Ön inceleme ve kod standartlarının değerlendirilmesi',
  'Birlikte çalışma araçları üzerinden ayrıntılı geri bildirim paylaşımı',
  'Takip toplantıları ve iyileştirmelerin doğrulanması'
];

const CodeReviewSection = () => {
  return (
    <Box
      component="section"
      sx={{
        background: 'linear-gradient(135deg, #ecf9ff 0%, #e8fff5 100%)',
        py: { xs: 8, md: 12 },
        mt: { xs: 6, md: 8 },
        borderRadius: { xs: 4, md: 6 }
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2} alignItems="center" textAlign="center" sx={{ mb: 6 }}>
          <Chip
            label="Kod İncelemesi"
            color="primary"
            sx={{ fontWeight: 600, letterSpacing: 0.4 }}
          />
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #3498db, #2ecc71)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Daha Güvenilir Yazılım için Kod İncelemesi
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720 }}>
            Projelerinizde yüksek kaliteyi sürdürebilmek için düzenli kod incelemeleri
            gerçekleştiriyoruz. Süreç boyunca ekiplerinizle birlikte çalışarak
            gelişim alanlarını belirliyor ve hızlı aksiyon alınmasına destek oluyoruz.
          </Typography>
        </Stack>

        <Grid container spacing={4}>
          {focusAreas.map(({ icon: IconComponent, title, description }) => (
            <Grid item xs={12} md={4} key={title}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.85)',
                  boxShadow: '0 12px 30px rgba(52, 152, 219, 0.12)',
                  border: '1px solid rgba(52, 152, 219, 0.12)'
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, #3498db, #2ecc71)',
                      color: 'white',
                      mb: 3
                    }}
                  >
                    <IconComponent fontSize="large" />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Card
          elevation={0}
          sx={{
            mt: 6,
            borderRadius: 4,
            background: 'rgba(255,255,255,0.9)',
            boxShadow: '0 16px 40px rgba(46, 204, 113, 0.12)',
            border: '1px solid rgba(46, 204, 113, 0.12)'
          }}
        >
          <CardContent sx={{ p: { xs: 4, md: 6 } }}>
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <BugReport sx={{ color: '#27ae60' }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  İnceleme Akışımız
                </Typography>
              </Stack>
              <Typography variant="body1" color="text.secondary">
                Deneyimli ekiplerimizle kodunuzu uçtan uca analiz ediyor, performans ve
                güvenlik açısından riskleri ortadan kaldırmak için uygulanabilir eylem
                adımları sunuyoruz.
              </Typography>
              <Stack spacing={1.5}>
                {workflowSteps.map((step, index) => (
                  <Box
                    key={step}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 2
                    }}
                  >
                    <Chip
                      label={index + 1}
                      color="success"
                      sx={{
                        fontWeight: 600,
                        minWidth: 40,
                        height: 32
                      }}
                    />
                    <Typography variant="body1" sx={{ flex: 1 }}>
                      {step}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default CodeReviewSection;