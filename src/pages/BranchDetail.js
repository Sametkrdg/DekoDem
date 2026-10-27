/**
 * BranchDetail.js — Single branch detail page (static data).
 * No Firebase dependency — branch is looked up from the static BRANCHES array.
 */
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container, Typography, Box,
  Button, Grid, Breadcrumbs, Divider,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Home, NavigateNext, Phone, Email, LocationOn,
  ArrowBack, StoreMallDirectory,
} from '@mui/icons-material';
import { PATHS } from '../constants/navigation';

// ── Static branch data (single source of truth with BranchList.js) ───────────
const BRANCHES = [
  {
    id:      "izmit-merkez",
    name:    "İzmit Merkez Şube",
    address: "Alikahya Merkez Mah. Sakıp Sabancı Bulv. No: 26/A, İzmit / Kocaeli",
    phone:   "+90 537 466 71 72",
    email:   "dekodemyapi@gmail.com",
  },
];

// ── Contact info row ──────────────────────────────────────────────────────────
const InfoRow = ({ icon, label, value, href }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const Inner = (
    <Box
      sx={{
        display:      'flex',
        alignItems:   'flex-start',
        gap:          2,
        p:            2,
        borderRadius: '12px',
        bgcolor:      isDark ? 'rgba(255,255,255,0.04)' : alpha(theme.palette.primary.main, 0.04),
        border:       '1px solid',
        borderColor:  isDark ? 'rgba(255,255,255,0.06)' : alpha(theme.palette.primary.main, 0.1),
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          width:          44,
          height:         44,
          borderRadius:   '12px',
          background:     'linear-gradient(135deg, #1a365d, #2c5282)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          color:          '#fff',
          flexShrink:     0,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', mb: 0.25 }}>
          {label}
        </Typography>
        <Typography variant="body1" fontWeight={500} sx={{ color: href ? 'primary.main' : 'text.primary', lineHeight: 1.55 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );

  if (href) {
    return (
      <Box component="a" href={href} sx={{ textDecoration: 'none', display: 'block', '&:hover .MuiTypography-body1': { textDecoration: 'underline' } }}>
        {Inner}
      </Box>
    );
  }
  return Inner;
};

// ── Page ──────────────────────────────────────────────────────────────────────
const BranchDetail = () => {
  const { id }  = useParams();
  const theme   = useTheme();
  const isDark  = theme.palette.mode === 'dark';

  const branch  = BRANCHES.find((b) => b.id === id) ?? null;

  // ── Not found ───────────────────────────────────────────────────────────
  if (!branch) {
    return (
      <Box sx={{ bgcolor: 'background.default', minHeight: '70vh' }}>
        <Box
          sx={{
            background: isDark
              ? '#000000'
              : 'linear-gradient(135deg, #1a365d 0%, #2c5282 100%)',
            py: { xs: 10, md: 14 },
          }}
        />
        <Container maxWidth="sm" sx={{ py: { xs: 7, md: 10 }, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={800} gutterBottom>Şube Bulunamadı</Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Aradığınız şube mevcut değil veya URL hatalı olabilir.
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to={PATHS.BRANCHES}
            startIcon={<ArrowBack />}
            sx={{ borderRadius: '50px', fontWeight: 700 }}
          >
            Tüm Şubeler
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box component="main" sx={{ bgcolor: 'background.default', minHeight: '80vh' }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <Box
        component="section"
        aria-label={`${branch.name} başlığı`}
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
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#fff' } }}
            >
              <Home sx={{ fontSize: 17 }} />
              Anasayfa
            </Box>
            <Box
              component={Link}
              to={PATHS.BRANCHES}
              sx={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#fff' } }}
            >
              Şubelerimiz
            </Box>
            <Typography sx={{ color: '#fff', fontSize: '0.875rem' }}>{branch.name}</Typography>
          </Breadcrumbs>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, flexWrap: 'wrap' }}>
            <Box
              aria-hidden="true"
              sx={{
                width:          72,
                height:         72,
                borderRadius:   '18px',
                bgcolor:        'rgba(255,255,255,0.12)',
                border:         '1px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(12px)',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                color:          '#fff',
                flexShrink:     0,
              }}
            >
              <StoreMallDirectory sx={{ fontSize: 36 }} />
            </Box>
            <Box>
              <Typography variant="overline" sx={{ color: alpha('#fff', 0.6), letterSpacing: 3 }}>
                Şube
              </Typography>
              <Typography variant="h2" component="h1" fontWeight={800} sx={{ lineHeight: 1.15, fontSize: { xs: '1.8rem', md: '2.6rem' } }}>
                {branch.name}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
        <Grid container spacing={5}>

          {/* Contact info */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Button
              component={Link}
              to={PATHS.BRANCHES}
              startIcon={<ArrowBack />}
              sx={{ mb: 4, borderRadius: '50px', fontWeight: 600 }}
            >
              Tüm Şubeler
            </Button>

            <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
              İletişim Bilgileri
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {branch.address && (
                <InfoRow icon={<LocationOn sx={{ fontSize: 22 }} />} label="Adres" value={branch.address} />
              )}
              {branch.phone && (
                <InfoRow icon={<Phone sx={{ fontSize: 22 }} />} label="Telefon" value={branch.phone} href={`tel:${branch.phone.replace(/\s/g, '')}`} />
              )}
              {branch.email && (
                <InfoRow icon={<Email sx={{ fontSize: 22 }} />} label="E-posta" value={branch.email} href={`mailto:${branch.email}`} />
              )}
            </Box>

            <Divider sx={{ my: 4 }} />

            <Button
              variant="contained"
              component={Link}
              to={PATHS.CONTACT}
              sx={{ borderRadius: '50px', fontWeight: 700 }}
              fullWidth
            >
              Bizimle İletişime Geçin
            </Button>
          </Grid>

          {/* Map placeholder */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box
              sx={{
                borderRadius:   3,
                overflow:       'hidden',
                border:         '1px solid',
                borderColor:    'divider',
                height:         420,
                display:        'flex',
                flexDirection:  'column',
                alignItems:     'center',
                justifyContent: 'center',
                gap:            1.5,
                bgcolor:        isDark ? 'rgba(255,255,255,0.03)' : alpha(theme.palette.primary.main, 0.03),
              }}
            >
              <LocationOn sx={{ fontSize: 56, color: 'primary.main', opacity: 0.4 }} />
              <Typography variant="h6" color="text.secondary" fontWeight={600}>Harita</Typography>
              {branch.address && (
                <Typography variant="body2" color="text.disabled" sx={{ textAlign: 'center', maxWidth: 280 }}>
                  {branch.address}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>

    </Box>
  );
};

export default BranchDetail;
