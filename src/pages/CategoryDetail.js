// React
import React, { useEffect } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';

// MUI
import {
  Box, Container, Typography, Grid, Button,
  Breadcrumbs, Chip, Divider,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  ArrowBack, Home, NavigateNext, CheckCircleOutline,
  Architecture, Construction, ViewComfy, Brush,
  MeetingRoom, Weekend, Park, ElectricBolt,
  Build, Whatshot, Terrain, ArrowForward,
} from '@mui/icons-material';

// Data
import { activityFields, brand } from '../constants/siteContent';
import { PATHS } from '../constants/navigation';

// ── Icon map (id → MUI icon component) ───────────────────────────────────────
const ICON_MAP = {
  'ic-mimarlik':          <Architecture     sx={{ fontSize: 48 }} />,
  'duvar-bolme':          <Construction     sx={{ fontSize: 48 }} />,
  'tavan':                <ViewComfy        sx={{ fontSize: 48 }} />,
  'boya-badana':          <Brush            sx={{ fontSize: 48 }} />,
  'kapi-gecis':           <MeetingRoom      sx={{ fontSize: 48 }} />,
  'mobilya-uretim':       <Weekend          sx={{ fontSize: 48 }} />,
  'peyzaj':               <Park             sx={{ fontSize: 48 }} />,
  'altyapi':              <ElectricBolt     sx={{ fontSize: 48 }} />,
  'celik-konstruksiyon':  <Build            sx={{ fontSize: 48 }} />,
  'mekanik-yangin':       <Whatshot         sx={{ fontSize: 48 }} />,
  'saha-betonlari':       <Terrain          sx={{ fontSize: 48 }} />,
};

// ── Sub-component: glass card for a single sub-service ───────────────────────
const ServiceCard = ({ label, index }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        display:        'flex',
        alignItems:     'flex-start',
        gap:            1.5,
        p:              2.5,
        borderRadius:   '14px',
        border:         '1px solid',
        borderColor:    isDark
          ? 'rgba(255,255,255,0.07)'
          : alpha(theme.palette.primary.main, 0.12),
        bgcolor:        isDark
          ? 'rgba(255,255,255,0.04)'
          : alpha(theme.palette.primary.main, 0.03),
        backdropFilter: 'blur(8px)',
        transition:     'all 0.25s ease',
        '&:hover': {
          borderColor: alpha(theme.palette.primary.main, isDark ? 0.35 : 0.3),
          bgcolor:     isDark
            ? 'rgba(255,255,255,0.08)'
            : alpha(theme.palette.primary.main, 0.07),
          transform:   'translateY(-2px)',
          boxShadow:   `0 8px 24px ${alpha(theme.palette.primary.main, 0.12)}`,
        },
        // Staggered entrance animation
        animationName:     'fadeSlideUp',
        animationDuration: '0.4s',
        animationDelay:    `${index * 0.05}s`,
        animationFillMode: 'both',
        '@keyframes fadeSlideUp': {
          from: { opacity: 0, transform: 'translateY(12px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      <CheckCircleOutline
        sx={{
          color:     'primary.main',
          fontSize:  22,
          flexShrink: 0,
          mt:        '2px',
        }}
      />
      <Typography variant="body1" sx={{ lineHeight: 1.6, fontWeight: 500 }}>
        {label}
      </Typography>
    </Box>
  );
};

// ── Main page component ───────────────────────────────────────────────────────
const CategoryDetail = () => {
  const { slug }   = useParams();
  const navigate   = useNavigate();
  const theme      = useTheme();
  const isDark     = theme.palette.mode === 'dark';

  // Find the matching activity field from static data
  const field = activityFields.find((f) => f.slug === slug);

  // ── BreadcrumbList JSON-LD ───────────────────────────────────────────────
  useEffect(() => {
    if (!field) return;

    const origin = window.location.origin;
    const schema = {
      '@context': 'https://schema.org',
      '@type':    'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Anasayfa',          item: origin + PATHS.HOME       },
        { '@type': 'ListItem', position: 2, name: 'Faaliyet Alanları', item: origin + PATHS.ACTIVITIES },
        { '@type': 'ListItem', position: 3, name: field.title,         item: origin + PATHS.ACTIVITIES + '/' + field.slug },
      ],
    };

    const script       = document.createElement('script');
    script.id          = 'ld-category-breadcrumb';
    script.type        = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.getElementById('ld-category-breadcrumb')?.remove();
    document.head.appendChild(script);

    return () => { document.getElementById('ld-category-breadcrumb')?.remove(); };
  }, [field]);

  // ── 404 state ────────────────────────────────────────────────────────────
  if (!field) {
    return (
      <Container maxWidth="sm" sx={{ py: 14, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Faaliyet Alanı Bulunamadı
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Aradığınız hizmet sayfası mevcut değil veya URL hatalı olabilir.
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to={PATHS.ACTIVITIES}
          startIcon={<ArrowBack />}
        >
          Tüm Faaliyet Alanları
        </Button>
      </Container>
    );
  }

  const icon = ICON_MAP[field.id] ?? <Build sx={{ fontSize: 48 }} />;

  // Sibling activities for "See also" row (exclude current, cap at 3)
  const related = activityFields.filter((f) => f.id !== field.id).slice(0, 3);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <Box
        component="section"
        aria-label={`${field.title} hero`}
        sx={{
          background: isDark
            ? 'linear-gradient(135deg, #0d1117 0%, #1a2235 50%, #0d2137 100%)'
            : `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 60%, ${alpha(theme.palette.primary.light, 0.85)} 100%)`,
          color:       '#fff',
          pt:          { xs: 10, md: 13 },
          pb:          { xs: 6,  md: 8  },
          position:    'relative',
          overflow:    'hidden',
          // Subtle mesh overlay
          '&::before': {
            content:    '""',
            position:   'absolute',
            inset:      0,
            background: 'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(255,255,255,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          },
        }}
      >
        <Container maxWidth="lg">
          {/* Breadcrumb */}
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" sx={{ color: 'rgba(255,255,255,0.5)' }} />}
            aria-label="breadcrumb"
            sx={{ mb: 4 }}
          >
            <Box
              component={RouterLink}
              to={PATHS.HOME}
              sx={{ display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', '&:hover': { color: '#fff' } }}
            >
              <Home sx={{ mr: 0.5, fontSize: 18 }} />
              Anasayfa
            </Box>
            <Box
              component={RouterLink}
              to={PATHS.ACTIVITIES}
              sx={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#fff' } }}
            >
              Faaliyet Alanları
            </Box>
            <Typography sx={{ color: '#fff', fontSize: '0.875rem' }}>{field.title}</Typography>
          </Breadcrumbs>

          {/* Icon + title */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
            <Box
              sx={{
                width:          80,
                height:         80,
                borderRadius:   '20px',
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
              {icon}
            </Box>

            <Box>
              <Chip
                label="Faaliyet Alanı"
                size="small"
                sx={{
                  bgcolor:    'rgba(255,255,255,0.15)',
                  color:      '#fff',
                  fontWeight: 600,
                  fontSize:   '0.7rem',
                  letterSpacing: '0.08em',
                  mb:         1.5,
                  border:     '1px solid rgba(255,255,255,0.25)',
                }}
              />
              <Typography
                variant="h2"
                component="h1"
                fontWeight={800}
                sx={{ lineHeight: 1.15, fontSize: { xs: '1.9rem', md: '2.75rem' } }}
              >
                {field.title}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── Body ──────────────────────────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
        <Grid container spacing={5}>

          {/* ── Left: description + sub-services ───────────────────────── */}
          <Grid item xs={12} lg={8}>

            {/* Back button */}
            <Button
              component={RouterLink}
              to={PATHS.ACTIVITIES}
              startIcon={<ArrowBack />}
              sx={{ mb: 4, borderRadius: '50px', textTransform: 'none', fontWeight: 600 }}
            >
              Tüm Faaliyet Alanları
            </Button>

            {/* Description */}
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.9, fontSize: '1.05rem', mb: 5 }}
            >
              {field.description}
            </Typography>

            <Divider sx={{ mb: 4 }} />

            {/* Sub-services */}
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ mb: 3 }}
            >
              Alt Hizmetlerimiz
            </Typography>

            <Grid container spacing={2}>
              {field.subServices.map((service, i) => (
                <Grid item xs={12} sm={6} key={service}>
                  <ServiceCard label={service} index={i} />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* ── Right: CTA sidebar ──────────────────────────────────────── */}
          <Grid item xs={12} lg={4}>
            <Box
              sx={{
                position:       { lg: 'sticky' },
                top:            { lg: '90px' },
                p:              3.5,
                borderRadius:   '20px',
                border:         '1px solid',
                borderColor:    isDark ? 'rgba(255,255,255,0.08)' : alpha(theme.palette.primary.main, 0.15),
                bgcolor:        isDark
                  ? 'rgba(255,255,255,0.03)'
                  : alpha(theme.palette.primary.main, 0.03),
                backdropFilter: 'blur(12px)',
              }}
            >
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Bu hizmet hakkında bilgi alın
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75, mb: 3 }}>
                {field.title} konusunda profesyonel destek almak için uzman ekibimizle iletişime geçin.
                Ücretsiz keşif ve teklif için bizi arayın.
              </Typography>

              <Button
                variant="contained"
                fullWidth
                size="large"
                component={RouterLink}
                to={PATHS.CONTACT}
                endIcon={<ArrowForward />}
                sx={{ borderRadius: '50px', fontWeight: 700, mb: 1.5 }}
              >
                Teklif Al
              </Button>

              <Button
                variant="outlined"
                fullWidth
                component={RouterLink}
                to={PATHS.ACTIVITIES}
                sx={{ borderRadius: '50px' }}
              >
                Diğer Hizmetler
              </Button>

              <Divider sx={{ my: 3 }} />

              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Toplam alt hizmet sayısı
              </Typography>
              <Typography variant="h3" fontWeight={800} color="primary.main">
                {field.subServices.length}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* ── Related activities ─────────────────────────────────────────── */}
        {related.length > 0 && (
          <Box sx={{ mt: { xs: 8, md: 11 } }}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
              Diğer Faaliyet Alanlarımız
            </Typography>
            <Grid container spacing={3}>
              {related.map((rel) => (
                <Grid item xs={12} sm={4} key={rel.id}>
                  <Box
                    component={RouterLink}
                    to={`${PATHS.ACTIVITIES}/${rel.slug}`}
                    sx={{
                      display:        'flex',
                      alignItems:     'center',
                      gap:            2,
                      p:              2.5,
                      borderRadius:   '16px',
                      border:         '1px solid',
                      borderColor:    isDark ? 'rgba(255,255,255,0.07)' : alpha(theme.palette.primary.main, 0.12),
                      bgcolor:        isDark ? 'rgba(255,255,255,0.03)' : alpha(theme.palette.primary.main, 0.03),
                      textDecoration: 'none',
                      color:          'text.primary',
                      transition:     'all 0.2s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor:     isDark ? 'rgba(255,255,255,0.07)' : alpha(theme.palette.primary.main, 0.07),
                        transform:   'translateY(-2px)',
                      },
                    }}
                  >
                    <Box sx={{ color: 'primary.main', display: 'flex', flexShrink: 0 }}>
                      {React.cloneElement(ICON_MAP[rel.id] ?? <Build sx={{ fontSize: 28 }} />, { sx: { fontSize: 28 } })}
                    </Box>
                    <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.4 }}>
                      {rel.title}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                variant="outlined"
                component={RouterLink}
                to={PATHS.ACTIVITIES}
                endIcon={<ArrowForward />}
                sx={{ borderRadius: '50px', px: 4 }}
              >
                Tüm Faaliyet Alanlarını Gör
              </Button>
            </Box>
          </Box>
        )}
      </Container>

      {/* ── Bottom CTA banner ─────────────────────────────────────────────── */}
      <Box
        component="section"
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          color:       '#fff',
          py:          { xs: 7, md: 9 },
          textAlign:   'center',
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Projenizi hayata geçirelim
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.8)', mb: 4 }}>
            {brand.name} uzman ekibi olarak anahtar teslim çözümler için yanınızdayız.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to={PATHS.CONTACT}
            endIcon={<ArrowForward />}
            sx={{
              bgcolor:      '#fff',
              color:        'primary.main',
              fontWeight:   700,
              borderRadius: '50px',
              px:           4,
              '&:hover':    { bgcolor: 'grey.100' },
            }}
          >
            Ücretsiz Keşif Talep Et
          </Button>
        </Container>
      </Box>
    </>
  );
};

export default CategoryDetail;
