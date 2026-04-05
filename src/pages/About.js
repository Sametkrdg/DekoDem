// React
import React from 'react';

// MUI
import {
  Box, Container, Typography, Grid, Paper,
  Chip, Divider,
} from '@mui/material';
import {
  CheckCircleOutline, WorkspacePremium, Star,
  Groups, Engineering, Bolt,
} from '@mui/icons-material';
import { alpha, useTheme } from '@mui/material/styles';

// Components
import ValuesSection  from '../components/ValueSection';
import ContactSection from '../components/ContactSection';

// Constants
import { brand, about, references } from '../constants/siteContent';

// Context
import { useSite } from '../context/SiteContext';

// ── Stats ─────────────────────────────────────────────────────────────────
const STATS = [
  { value: '10+',  label: 'Yıl Deneyim',         icon: <Star /> },
  { value: '200+', label: 'Tamamlanan Proje',     icon: <WorkspacePremium /> },
  { value: '50+',  label: 'Kurumsal Müşteri',     icon: <Groups /> },
  { value: '30+',  label: 'Uzman Kadro',          icon: <Engineering /> },
];

// ── Values bullet list ────────────────────────────────────────────────────
const HIGHLIGHTS = [
  'Fabrika, ofis ve depo projelerinde A\'dan Z\'ye uygulama',
  'Tasarım, planlama ve mühendislik süreçleri tek çatı altında',
  'Anahtar teslim çözümler — zamanında teslim garantisi',
  'Kaliteli işçilik ve müşteri memnuniyeti odaklı çalışma',
];

const About = () => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { aboutContent } = useSite();

  return (
    <Box component="article">

      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <Box
        sx={{
          background: isDark
            ? 'linear-gradient(135deg, #0d1117 0%, #1a1f35 100%)'
            : 'linear-gradient(135deg, #1a365d 0%, #2c5282 100%)',
          color: '#fff',
          py: { xs: 9, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse 60% 60% at 80% 50%, ${alpha(theme.palette.primary.main, 0.25)}, transparent)`,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Typography variant="overline" sx={{ color: alpha('#fff', 0.65), letterSpacing: 3 }}>
            Hakkımızda
          </Typography>
          <Typography
            variant="h2"
            component="h1"
            fontWeight={800}
            sx={{ mt: 1, mb: 2, maxWidth: 680 }}
          >
            {brand.name}
          </Typography>
          <Typography variant="h6" sx={{ color: alpha('#fff', 0.75), fontWeight: 400, maxWidth: 560, lineHeight: 1.7 }}>
            {brand.tagline}
          </Typography>
        </Container>
      </Box>

      {/* ── Stats Row ───────────────────────────────────────────────────── */}
      <Box
        sx={{
          bgcolor:    'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          py: { xs: 4, md: 5 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2} justifyContent="center">
            {STATS.map((stat) => (
              <Grid item xs={6} sm={3} key={stat.label}>
                <Box sx={{ textAlign: 'center', py: 1 }}>
                  <Box
                    sx={{
                      display:        'inline-flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      width:  48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color:   'primary.main',
                      mb: 1,
                      '& svg': { fontSize: 24 },
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography variant="h4" fontWeight={800} color="primary.main">
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── Main Content ────────────────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 } }}>
        <Grid container spacing={6} alignItems="flex-start">

          {/* Left — logo + about text */}
          <Grid item xs={12} md={6}>
            {/* Logo */}
            <Box
              sx={{
                mb: 4,
                p: 3,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Box
                component="img"
                src={brand.logoSrc}
                alt={brand.logoAlt}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                sx={{ height: 52, objectFit: 'contain' }}
              />
              <Typography variant="h5" fontWeight={800} color="primary.main">
                {brand.name}
              </Typography>
            </Box>

            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9, mb: 3 }}>
              {aboutContent.AboutLong || about.fullText}
            </Typography>

            {/* Highlights */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {HIGHLIGHTS.map((h) => (
                <Box key={h} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <CheckCircleOutline
                    sx={{ color: 'primary.main', mt: 0.25, flexShrink: 0 }}
                    fontSize="small"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {h}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Right — references card */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                ...(isDark && {
                  background:   theme.glass?.bgSubtle,
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }),
              }}
            >
              {/* Section header */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color:   'primary.main',
                    display: 'flex',
                  }}
                >
                  <Bolt />
                </Box>
                <Box>
                  <Typography variant="overline" color="primary.main" fontWeight={700} sx={{ lineHeight: 1 }}>
                    Referanslarımız
                  </Typography>
                  <Typography variant="h6" fontWeight={700}>
                    Güvenilen Markalar
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Reference chips */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                {references.map((ref) => (
                  <Chip
                    key={ref.name}
                    label={ref.name}
                    variant="outlined"
                    sx={{
                      fontWeight:  700,
                      fontSize:    '0.9rem',
                      px:          1,
                      py:          2.5,
                      borderRadius: '10px',
                      borderColor: alpha(theme.palette.primary.main, 0.4),
                      color:       'primary.main',
                      bgcolor:     alpha(theme.palette.primary.main, isDark ? 0.1 : 0.04),
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, isDark ? 0.18 : 0.08),
                        borderColor: 'primary.main',
                      },
                    }}
                  />
                ))}
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Quality promise */}
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.primary.main, isDark ? 0.12 : 0.05),
                  border: '1px solid',
                  borderColor: alpha(theme.palette.primary.main, 0.2),
                }}
              >
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  Sektörün önde gelen markalarıyla kurduğumuz uzun soluklu iş birlikleri,{' '}
                  <Typography component="span" variant="body2" color="primary.main" fontWeight={700}>
                    kalite ve güvenilirliğimizin
                  </Typography>{' '}
                  en somut göstergesidir. Her projede kurumsal standartta sonuçlar teslim etmeyi taahhüt ediyoruz.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* ── Values Section ──────────────────────────────────────────────── */}
      <ValuesSection />

      {/* ── Contact CTA ─────────────────────────────────────────────────── */}
      <ContactSection />
    </Box>
  );
};

export default About;
