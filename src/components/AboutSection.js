/**
 * AboutSection.js — Homepage "Hakkımızda" section.
 *
 * Left column  : company intro text + highlights + CTA
 * Right column : CoreValue 2×2 grid (replaces vanity stats)
 *
 * All strings sourced from siteContent.js — no hardcoding.
 */

import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Container, Typography, Grid, Button, Stack } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  CheckCircleOutline, ArrowForward,
  Search, Schedule, Engineering, FavoriteBorder,
} from '@mui/icons-material';

import ValueCard from './ValueCard.jsx';

import { brand, about, coreValues } from '../constants/siteContent';
import { PATHS } from '../constants/navigation';
import { useSite } from '../context/SiteContext';

// ── Icon registry (same as ValueSection) ─────────────────────────────────────
const ICON_MAP = {
  Search:         <Search />,
  Schedule:       <Schedule />,
  Engineering:    <Engineering />,
  FavoriteBorder: <FavoriteBorder />,
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

          {/* ── Left: Text content ────────────────────────────────────────── */}
          <Grid item xs={12} md={6}>

            <Typography
              variant="overline"
              sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.12em', display: 'block', mb: 1.5 }}
            >
              HAKKIMIZDA
            </Typography>

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

            <Typography
              variant="h6"
              color="text.secondary"
              fontWeight={400}
              sx={{ lineHeight: 1.5, mb: 3, fontSize: '1.05rem' }}
            >
              {brand.tagline}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.9, mb: 4, fontSize: '1rem' }}
            >
              {aboutContent.AboutShort || about.shortSummary}
            </Typography>

            {/* Highlights */}
            <Stack spacing={1.5} sx={{ mb: 5 }}>
              {about.highlights.map((item) => (
                <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CheckCircleOutline sx={{ color: 'primary.main', fontSize: 22, flexShrink: 0 }} />
                  <Typography variant="body2" fontWeight={500} sx={{ lineHeight: 1.5 }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Stack>

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

          {/* ── Right: optional photo + CoreValue 2×2 grid ───────────────── */}
          <Grid item xs={12} md={6}>
            {primaryPhoto && (
              <Box
                component="img"
                src={primaryPhoto.url}
                alt={primaryPhoto.title || `${brand.name} — proje görseli`}
                loading="lazy"
                sx={{
                  width:        '100%',
                  height:       240,
                  objectFit:    'cover',
                  borderRadius: '20px',
                  mb:           3,
                  boxShadow:    `0 16px 40px ${alpha('#000', 0.18)}`,
                }}
              />
            )}

            {/* Core value pillars — 2 × 2 */}
            <Grid
              container
              spacing={2}
              component="ul"
              aria-label="Temel değerlerimiz"
              sx={{ listStyle: 'none', p: 0, m: 0 }}
            >
              {coreValues.map((val) => (
                <Grid item xs={6} key={val.id} component="li">
                  <ValueCard
                    icon={ICON_MAP[val.icon] ?? <Engineering />}
                    title={val.title}
                    description=""
                    compact
                  />
                </Grid>
              ))}
            </Grid>

            {/* Decorative separator (only when no photo present) */}
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
