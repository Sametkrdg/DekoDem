// React
import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';

// MUI
import {
  Box, Container, Typography, Grid, Button,
  Breadcrumbs, Chip, Divider, Paper, CircularProgress,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  ArrowBack, Home, NavigateNext, CheckCircleOutline,
  Architecture, Construction, ViewComfy, Brush,
  MeetingRoom, Weekend, Park, ElectricBolt,
  Build, Whatshot, Terrain, ArrowForward,
  Shield, VerifiedUser, Phone,
} from '@mui/icons-material';

// Data
import { activityFields, brand, qualityClaims, contact } from '../constants/siteContent';
import { PATHS } from '../constants/navigation';

// Firebase
import { getDoc, doc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../config/firebase';

// Firestore activity detail layout (split-column)
import ActivityDetail from '../components/activity/ActivityDetail';

// ── Per-service technical notes ───────────────────────────────────────────────
// Fact-sheet text shown in the right sidebar for each service category.
const SERVICE_TECH_NOTES = {
  'ic-mimarlik':         'A-sınıfı malzeme ve ürünler kullanılır. 3D mimari görselleştirme, uygulama öncesinde müşteriyle paylaşılır.',
  'duvar-bolme':         'TS EN 520 normuna uygun alçıpan levhalar; yangına dayanıklı sistemlerde BS EN 1366 sertifikalı ürünler tercih edilir.',
  'tavan':               'TS EN 13964 normunda asma tavan sistemleri. Akustik tavanlar NRC ≥ 0.70 performans garantisi ile uygulanır.',
  'boya-badana':         'ISO 12944 kapsamında pasif yangın koruması dahil endüstriyel boya sistemleri. Epoksi zeminde TS 4561 uyumlu ürünler.',
  'kapi-gecis':          'Yangın kapıları TS EN 1634-1 sertifikalı; otomatik kapı sistemleri TS EN 16005 normuna uygun kurulur.',
  'mobilya-uretim':      'Mezzanine kat ve çelik platformlar TBDY 2018 yük hesaplamalarına göre projelendirilir.',
  'peyzaj':              'Yağmur suyu drenaj hatları TS 5281 normuna uygun; çimlendirme ve bitki seçimi yerel iklim koşullarına göre belirlenir.',
  'altyapi':             'Elektrik tesisatı TS EN 60364; zayıf akım altyapısı TS EN 50174 normlarına göre projelendirilir ve uygulanır.',
  'celik-konstruksiyon': 'Çelik konstrüksiyon imalatı TS EN 1090-2 sınıf EXC2 uyumlu; tüm kaynaklar sertifikalı kaynakçılar tarafından yapılır.',
  'mekanik-yangin':      'Sprinkler sistemleri NFPA 13 ve TS EN 12845 standartlarına uygun projelendirilir; yangın dolabı sistemleri TS EN 671 sertifikalı.',
  'saha-betonlari':      'Endüstriyel beton zeminde C30/37 beton sınıfı ve çelik fiber takviye uygulanır; forklift trafiğine uygun minimum 15 cm kalınlık.',
};

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

  // Firestore fallback — when slug doesn't match any static entry it may be a Firestore doc ID
  const [fsLoading,  setFsLoading]  = useState(false);
  const [fsActivity, setFsActivity] = useState(null);

  useEffect(() => {
    if (field || !slug) return;           // static match found — no Firestore call needed
    if (!isFirebaseConfigured || !db) return;

    setFsLoading(true);
    getDoc(doc(db, 'Activities', slug))
      .then((snap) => {
        if (snap.exists()) setFsActivity({ id: snap.id, ...snap.data() });
      })
      .catch((err) => console.error('[CategoryDetail] Firestore fallback:', err))
      .finally(() => setFsLoading(false));
  }, [slug, field]); // eslint-disable-line react-hooks/exhaustive-deps

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

  // ── Loading (Firestore fallback in progress) ─────────────────────────────
  if (!field && fsLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // ── 404 state ────────────────────────────────────────────────────────────
  if (!field && !fsActivity) {
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

  // ── Firestore activity — delegate to split-layout component ─────────────
  if (fsActivity) {
    return <ActivityDetail activity={fsActivity} />;
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
            ? '#000000'
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
          <Grid size={{ xs: 12, lg: 8 }}>

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
                <Grid size={{ xs: 12, sm: 6 }} key={service}>
                  <ServiceCard label={service} index={i} />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* ── Right: CTA sidebar ──────────────────────────────────────── */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Box sx={{ position: { lg: 'sticky' }, top: { lg: '90px' }, display: 'flex', flexDirection: 'column', gap: 3 }}>

              {/* Primary CTA card */}
              <Paper
                elevation={0}
                sx={{
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
                  Ücretsiz Teklif Alın
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75, mb: 3 }}>
                  <strong>{field.title}</strong> konusunda yerinde keşif ve ücretsiz teklif için uzman
                  ekibimizle iletişime geçin.
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
                  component="a"
                  href={`tel:${contact.phone1.replace(/\s/g, '')}`}
                  startIcon={<Phone />}
                  sx={{ borderRadius: '50px', fontWeight: 600 }}
                >
                  {contact.phone1}
                </Button>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Alt hizmet sayısı
                  </Typography>
                  <Typography variant="h4" fontWeight={800} color="primary.main">
                    {field.subServices.length}
                  </Typography>
                </Box>
              </Paper>

              {/* Technical spec note */}
              {SERVICE_TECH_NOTES[field.id] && (
                <Paper
                  elevation={0}
                  sx={{
                    p:           2.5,
                    borderRadius:'16px',
                    border:      '1px solid',
                    borderColor: isDark ? 'rgba(255,255,255,0.06)' : alpha(theme.palette.primary.main, 0.12),
                    bgcolor:     isDark ? 'rgba(255,255,255,0.03)' : alpha(theme.palette.primary.main, 0.03),
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <Shield sx={{ fontSize: 18, color: 'primary.main' }} aria-hidden="true" />
                    <Typography variant="caption" fontWeight={700} color="primary.main" sx={{ letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      Teknik Standart
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {SERVICE_TECH_NOTES[field.id]}
                  </Typography>
                </Paper>
              )}

              {/* Quality guarantee mini-card */}
              <Paper
                elevation={0}
                sx={{
                  p:           2.5,
                  borderRadius:'16px',
                  border:      '1px solid',
                  borderColor: isDark ? 'rgba(255,255,255,0.06)' : alpha(theme.palette.primary.main, 0.12),
                  bgcolor:     isDark ? 'rgba(255,255,255,0.03)' : alpha(theme.palette.primary.main, 0.03),
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <VerifiedUser sx={{ fontSize: 18, color: 'primary.main' }} aria-hidden="true" />
                  <Typography variant="caption" fontWeight={700} color="primary.main" sx={{ letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Garanti
                  </Typography>
                </Box>
                <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {['2 yıl işçilik garantisi', '5 yıl yapısal eleman garantisi', 'A-sınıfı malzeme kullanımı'].map((g) => (
                    <Box key={g} component="li" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircleOutline sx={{ fontSize: 15, color: 'primary.main', flexShrink: 0 }} aria-hidden="true" />
                      <Typography variant="caption" color="text.secondary" fontWeight={500}>{g}</Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>

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
                <Grid size={{ xs: 12, sm: 4 }} key={rel.id}>
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
