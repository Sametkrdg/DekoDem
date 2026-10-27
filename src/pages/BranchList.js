/**
 * BranchList.js — Şubelerimiz listing page (static data).
 * Branch data is hardcoded — no Firebase dependency.
 */
import React from 'react';
import {
  Container, Typography, Grid, Box, Button,
  Chip, Breadcrumbs,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Phone, Email, LocationOn, Home, NavigateNext,
  ArrowForward, StoreMallDirectory,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { PATHS } from '../constants/navigation';

// ── Static branch data ────────────────────────────────────────────────────────
const BRANCHES = [
  {
    id:      "izmit-merkez",
    name:    "İzmit Merkez Şube",
    address: "Alikahya Merkez Mah. Sakıp Sabancı Bulv. No: 26/A, İzmit / Kocaeli",
    phone:   "+90 537 466 71 72",
    email:   "dekodemyapi@gmail.com",
  },
];

// ── Branch card ───────────────────────────────────────────────────────────────
const BranchCard = ({ branch, index }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        display:              'flex',
        flexDirection:        'column',
        height:               '100%',
        borderRadius:         '20px',
        border:               '1px solid',
        borderColor:          isDark ? theme.glass?.border : alpha(theme.palette.primary.main, 0.12),
        background:           isDark ? theme.glass?.bg : '#fff',
        backdropFilter:       isDark ? theme.glass?.blur : 'none',
        WebkitBackdropFilter: isDark ? theme.glass?.blur : 'none',
        overflow:             'hidden',
        transition:           'transform 0.28s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.28s ease, border-color 0.28s ease',
        '&:hover': {
          borderColor: alpha(theme.palette.primary.main, isDark ? 0.45 : 0.35),
          transform:   'translateY(-6px)',
          boxShadow:   isDark
            ? `0 20px 48px rgba(0,0,0,0.62), 0 0 0 1px ${alpha(theme.palette.primary.main, 0.25)}`
            : `0 16px 40px ${alpha(theme.palette.primary.main, 0.12)}`,
        },
        animationName:     'cardFadeUp',
        animationDuration: '0.45s',
        animationDelay:    `${index * 0.06}s`,
        animationFillMode: 'both',
        '@keyframes cardFadeUp': {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      {/* Accent strip */}
      <Box sx={{ height: 4, background: 'linear-gradient(135deg, #1a365d, #2c5282)', flexShrink: 0 }} />

      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Icon badge */}
        <Box
          aria-hidden="true"
          sx={{
            width:          52,
            height:         52,
            borderRadius:   '14px',
            background:     'linear-gradient(135deg, #1a365d, #2c5282)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            color:          '#fff',
            mb:             2.5,
            flexShrink:     0,
            boxShadow:      `0 6px 16px ${alpha(theme.palette.primary.main, 0.25)}`,
          }}
        >
          <StoreMallDirectory sx={{ fontSize: 26 }} />
        </Box>

        <Typography variant="subtitle1" component="h2" fontWeight={700} sx={{ lineHeight: 1.35, mb: 2 }}>
          {branch.name}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, flexGrow: 1, mb: 2.5 }}>
          {branch.address && (
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
              <LocationOn sx={{ fontSize: 18, color: 'primary.main', mt: '2px', flexShrink: 0 }} aria-hidden="true" />
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.55 }}>
                {branch.address}
              </Typography>
            </Box>
          )}
          {branch.phone && (
            <Box
              component="a"
              href={`tel:${branch.phone.replace(/\s/g, '')}`}
              sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
            >
              <Phone sx={{ fontSize: 18, color: 'primary.main', flexShrink: 0 }} aria-hidden="true" />
              <Typography variant="body2">{branch.phone}</Typography>
            </Box>
          )}
          {branch.email && (
            <Box
              component="a"
              href={`mailto:${branch.email}`}
              sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
            >
              <Email sx={{ fontSize: 18, color: 'primary.main', flexShrink: 0 }} aria-hidden="true" />
              <Typography variant="body2" noWrap>{branch.email}</Typography>
            </Box>
          )}
        </Box>

        <Button
          component={Link}
          to={`${PATHS.BRANCHES}/${branch.id}`}
          variant="outlined"
          size="small"
          endIcon={<ArrowForward />}
          sx={{ borderRadius: '50px', fontWeight: 600, mt: 'auto' }}
          fullWidth
        >
          Detayları Gör
        </Button>
      </Box>
    </Box>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────
const BranchList = () => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box component="main" sx={{ bgcolor: 'background.default', minHeight: '80vh' }}>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <Box
        component="section"
        aria-label="Şubelerimiz başlığı"
        sx={{
          background: isDark
            ? '#000000'
            : 'linear-gradient(135deg, #1a365d 0%, #2c5282 100%)',
          color:    '#fff',
          py:       { xs: 9, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content:    '""',
            position:   'absolute',
            inset:      0,
            background: `radial-gradient(ellipse 55% 55% at 90% 50%, ${alpha(theme.palette.primary.main, 0.22)}, transparent)`,
            pointerEvents: 'none',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" sx={{ color: 'rgba(255,255,255,0.5)' }} />}
            aria-label="Sayfa konumu"
            sx={{ mb: 3 }}
          >
            <Box
              component={Link}
              to={PATHS.HOME}
              sx={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#fff' } }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Home sx={{ fontSize: 17 }} />
                Anasayfa
              </Box>
            </Box>
            <Typography sx={{ color: '#fff', fontSize: '0.875rem' }}>Şubelerimiz</Typography>
          </Breadcrumbs>

          <Typography variant="overline" sx={{ color: alpha('#fff', 0.6), letterSpacing: 3, display: 'block', mb: 1 }}>
            Lokasyonlar
          </Typography>
          <Typography variant="h2" component="h1" fontWeight={800} sx={{ mb: 2 }}>
            Şubelerimiz
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: alpha('#fff', 0.72), fontWeight: 400, maxWidth: 520, lineHeight: 1.7 }}
          >
            Türkiye genelinde hizmet veren şubelerimizden size en yakın olanı bulun.
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Chip
              label={`${BRANCHES.length} Şube`}
              size="small"
              sx={{ bgcolor: alpha('#fff', 0.15), color: '#fff', fontWeight: 700, border: '1px solid rgba(255,255,255,0.25)' }}
            />
          </Box>
        </Container>
      </Box>

      {/* ── Grid ───────────────────────────────────────────────────────────── */}
      <Container maxWidth="lg" component="section" aria-label="Şube kartları" sx={{ py: { xs: 6, md: 9 } }}>
        <Grid container spacing={3}>
          {BRANCHES.map((branch, idx) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={branch.id}>
              <BranchCard branch={branch} index={idx} />
            </Grid>
          ))}
        </Grid>
      </Container>

    </Box>
  );
};

export default BranchList;
