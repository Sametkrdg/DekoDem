// React
import React from 'react';
import { Link } from 'react-router-dom';

// MUI
import { Box, Container, Typography, Grid, Button, Stack } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { CheckCircleOutline, ArrowForward } from '@mui/icons-material';

// Data — single source of truth; no hardcoded strings in this file
import { brand, about } from '../constants/siteContent';
import { PATHS } from '../constants/navigation';

// Context
import { useSite } from '../context/SiteContext';

// ── Stat card ─────────────────────────────────────────────────────────────────
const StatCard = ({ number, label }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        p:                    2.5,
        borderRadius:         '16px',
        border:               '1px solid',
        borderColor:          isDark ? theme.glass.border : alpha(theme.palette.primary.main, 0.15),
        background:           isDark ? theme.glass.bgSubtle : alpha(theme.palette.primary.main, 0.04),
        backdropFilter:       theme.glass.blur,
        WebkitBackdropFilter: theme.glass.blur,
        textAlign:            'center',
        transition:           'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
        '&:hover': {
          borderColor: alpha(theme.palette.primary.main, isDark ? 0.45 : 0.4),
          transform:   'translateY(-4px)',
          boxShadow:   isDark
            ? `0 12px 32px rgba(0,0,0,0.5), 0 0 0 1px ${alpha(theme.palette.primary.main, 0.2)}`
            : `0 10px 28px ${alpha(theme.palette.primary.main, 0.12)}`,
        },
      }}
    >
      <Typography
        variant="h4"
        fontWeight={800}
        sx={{
          background:           `linear-gradient(135deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.light, 0.85)})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor:  'transparent',
          lineHeight:           1,
          mb:                   0.5,
        }}
      >
        {number}
      </Typography>
      <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ letterSpacing: '0.04em' }}>
        {label}
      </Typography>
    </Box>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const AboutSection = ({ photos = [] }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { aboutContent } = useSite();

  const primaryPhoto = photos.find((p) => p?.url) ?? null;

  return (
    <Box
      component="section"
      aria-label="Hakkımızda"
      sx={{
        py:       { xs: 9, md: 13 },
        // Transparent in dark → shows fixed body gradient; off-white in light
        ...theme.mixins.sectionSurface,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content:    '""',
          position:   'absolute',
          top:        '10%',
          right:      '-5%',
          width:      '45%',
          height:     '80%',
          background: `radial-gradient(ellipse at center, ${alpha(theme.palette.primary.main, isDark ? 0.07 : 0.05)} 0%, transparent 70%)`,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">

          {/* ── Left: Text content ──────────────────────────────────────── */}
          <Grid item xs={12} md={6}>

            {/* Overline */}
            <Typography
              variant="overline"
              sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.12em', display: 'block', mb: 1.5 }}
            >
              HAKKIMIZDA
            </Typography>

            {/* Title */}
            <Typography
              variant="h3"
              component="h2"
              fontWeight={800}
              sx={{
                lineHeight:           1.15,
                mb:                   2.5,
                fontSize:             { xs: '2rem', md: '2.5rem' },
                background:           isDark
                  ? `linear-gradient(135deg, #fff 30%, ${alpha(theme.palette.primary.light, 0.85)} 100%)`
                  : `linear-gradient(135deg, ${theme.palette.text.primary} 30%, ${theme.palette.primary.main} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor:  'transparent',
              }}
            >
              {brand.name}
            </Typography>

            {/* Tagline */}
            <Typography
              variant="h6"
              color="text.secondary"
              fontWeight={400}
              sx={{ lineHeight: 1.5, mb: 3, fontSize: '1.05rem' }}
            >
              {brand.tagline}
            </Typography>

            {/* Short summary */}
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.9, mb: 4, fontSize: '1rem' }}
            >
              {aboutContent.AboutShort || about.shortSummary}
            </Typography>

            {/* Highlights — pulled from siteContent.about.highlights */}
            <Stack spacing={1.5} sx={{ mb: 5 }}>
              {about.highlights.map((item) => (
                <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CheckCircleOutline
                    sx={{ color: 'primary.main', fontSize: 22, flexShrink: 0 }}
                  />
                  <Typography variant="body2" fontWeight={500} sx={{ lineHeight: 1.5 }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Stack>

            {/* CTA */}
            <Button
              component={Link}
              to={PATHS.ABOUT}
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{ borderRadius: '50px', fontWeight: 700, px: 4 }}
            >
              Daha Fazla Bilgi
            </Button>
          </Grid>

          {/* ── Right: Stats grid + optional photo ─────────────────────── */}
          <Grid item xs={12} md={6}>
            {/* If a real photo exists, show it above the stats */}
            {primaryPhoto && (
              <Box
                component="img"
                src={primaryPhoto.url}
                alt={primaryPhoto.title || `${brand.name} — proje görseli`}
                loading="lazy"
                sx={{
                  width:        '100%',
                  height:       260,
                  objectFit:    'cover',
                  borderRadius: '20px',
                  mb:           3,
                  boxShadow:    `0 16px 40px ${alpha('#000', 0.18)}`,
                }}
              />
            )}

            {/* Stats 2 × 2 grid — data from siteContent.about.stats */}
            <Grid container spacing={2}>
              {about.stats.map((stat) => (
                <Grid item xs={6} key={stat.label}>
                  <StatCard number={stat.number} label={stat.label} />
                </Grid>
              ))}
            </Grid>

            {/* Decorative separator line (only when no photo) */}
            {!primaryPhoto && (
              <Box
                sx={{
                  mt:           3,
                  height:       4,
                  borderRadius: 2,
                  background:   `linear-gradient(90deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.light, 0.3)}, transparent)`,
                }}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutSection;
