/**
 * ActivityDetail.js — Firestore activity detail view.
 *
 * Layout (per breakpoint):
 *   Desktop (md+): two-column split — text LEFT, image RIGHT (sticky)
 *   Mobile  (xs):  single column    — image TOP, text BOTTOM (order swap)
 *
 * Props:
 *   activity  { id, Name, Description, PhotoUrl }   Firestore document data
 */

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// MUI
import {
  Box, Container, Typography, Grid, Button,
  Breadcrumbs, Chip, Divider, Paper,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  ArrowBack, ArrowForward, Home, NavigateNext,
  Build, Phone, Image as ImageIcon,
  CheckCircleOutline, CalendarMonth,
} from '@mui/icons-material';

// Services & constants
import { buildCloudinaryUrl } from '../../services/cloudinary';
import { useSite } from '../../context/SiteContext';
import { activityFields, brand } from '../../constants/siteContent';
import { PATHS, activityPath } from '../../constants/navigation';

// ── Related-activity mini-card ────────────────────────────────────────────────
const RelatedCard = ({ field }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      component={RouterLink}
      to={`${PATHS.ACTIVITIES}/${field.slug}`}
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
        <Build sx={{ fontSize: 26 }} />
      </Box>
      <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.4 }}>
        {field.title}
      </Typography>
    </Box>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const ActivityDetail = ({ activity }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const orange = theme.palette.secondary?.main ?? theme.palette.primary.main;
  const navy   = theme.palette.primary.main;
  const { contactSettings } = useSite();

  if (!activity) return null;

  const title       = activity.Name        ?? '';
  const description = activity.Description ?? '';
  const photoUrl    = activity.PhotoUrl
    ? buildCloudinaryUrl(activity.PhotoUrl, { width: 800, height: 600, crop: 'fill' })
    : null;

  const phoneHref = contactSettings.Phone
    ? `tel:${contactSettings.Phone.replace(/\s/g, '')}`
    : null;

  const related = activityFields.slice(0, 3);

  return (
    <>
      {/* ── Hero banner ───────────────────────────────────────────────────── */}
      <Box
        component="section"
        aria-label={`${title} hero`}
        sx={{
          background: isDark
            ? 'linear-gradient(135deg, #0d1117 0%, #1a2235 50%, #0d2137 100%)'
            : `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${navy} 60%, ${alpha(theme.palette.primary.light, 0.85)} 100%)`,
          color:    '#fff',
          pt:       { xs: 10, md: 13 },
          pb:       { xs: 6,  md: 8 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content:       '""',
            position:      'absolute',
            inset:         0,
            background:    'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(255,255,255,0.06) 0%, transparent 70%)',
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
              component={RouterLink} to={PATHS.HOME}
              sx={{ display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', '&:hover': { color: '#fff' } }}
            >
              <Home sx={{ mr: 0.5, fontSize: 18 }} />
              Anasayfa
            </Box>
            <Box
              component={RouterLink} to={PATHS.ACTIVITIES}
              sx={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#fff' } }}
            >
              Faaliyet Alanları
            </Box>
            <Typography sx={{ color: '#fff', fontSize: '0.875rem' }}>{title}</Typography>
          </Breadcrumbs>

          {/* Title block */}
          <Chip
            label="Faaliyet Alanı"
            size="small"
            sx={{
              bgcolor:       'rgba(255,255,255,0.15)',
              color:         '#fff',
              fontWeight:    600,
              fontSize:      '0.7rem',
              letterSpacing: '0.08em',
              mb:            1.5,
              border:        '1px solid rgba(255,255,255,0.25)',
            }}
          />
          <Typography
            variant="h2"
            component="h1"
            fontWeight={800}
            sx={{ lineHeight: 1.15, fontSize: { xs: '1.9rem', md: '2.75rem' }, maxWidth: 700 }}
          >
            {title}
          </Typography>
        </Container>
      </Box>

      {/* ── Split body ────────────────────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid
          container
          spacing={{ xs: 4, md: 8 }}
          alignItems="flex-start"
        >

          {/* ── TEXT COLUMN — left on desktop, bottom on mobile ───────── */}
          <Grid item xs={12} md={7} sx={{ order: { xs: 2, md: 1 } }}>

            {/* Back link */}
            <Button
              component={RouterLink}
              to={PATHS.ACTIVITIES}
              startIcon={<ArrowBack />}
              sx={{
                mb:            4,
                borderRadius:  '50px',
                textTransform: 'none',
                fontWeight:    600,
                color:         'text.secondary',
                '&:hover':     { color: 'primary.main' },
              }}
            >
              Tüm Faaliyet Alanları
            </Button>

            {/* Title with orange left-border accent */}
            <Box
              sx={{
                borderLeft:  `4px solid ${orange}`,
                pl:          3,
                mb:          4,
                py:          0.5,
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                fontWeight={800}
                sx={{
                  lineHeight: 1.25,
                  fontSize:   { xs: '1.6rem', md: '2rem' },
                  color:      'text.primary',
                }}
              >
                {title}
              </Typography>
            </Box>

            {/* Description */}
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                lineHeight: 1.95,
                fontSize:   { xs: '1rem', md: '1.05rem' },
                mb:         5,
              }}
            >
              {description}
            </Typography>

            {/* Quality guarantee bullets */}
            <Box
              component="ul"
              sx={{ listStyle: 'none', p: 0, m: 0, mb: 5, display: 'flex', flexDirection: 'column', gap: 1.25 }}
            >
              {['2 yıl işçilik garantisi', '5 yıl yapısal eleman garantisi', 'A-sınıfı malzeme kullanımı'].map((g) => (
                <Box key={g} component="li" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CheckCircleOutline sx={{ fontSize: 18, color: orange, flexShrink: 0 }} aria-hidden="true" />
                  <Typography variant="body2" color="text.secondary" fontWeight={500} sx={{ lineHeight: 1.6 }}>
                    {g}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* ── CTA card ─────────────────────────────────────────────── */}
            <Paper
              elevation={0}
              sx={{
                p:           3.5,
                borderRadius:'20px',
                border:      '1px solid',
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : alpha(navy, 0.15),
                bgcolor:     isDark ? 'rgba(255,255,255,0.03)' : alpha(navy, 0.03),
                backdropFilter: 'blur(12px)',
              }}
            >
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Ücretsiz Teklif Alın
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75, mb: 3 }}>
                <strong>{title}</strong> konusunda yerinde keşif ve ücretsiz teklif için uzman ekibimizle iletişime geçin.
              </Typography>

              <Button
                variant="contained"
                fullWidth
                size="large"
                component={RouterLink}
                to={PATHS.CONTACT}
                endIcon={<ArrowForward />}
                sx={{ borderRadius: '50px', fontWeight: 700, mb: phoneHref ? 1.5 : 0 }}
              >
                Teklif Al
              </Button>

              {phoneHref && (
                <Button
                  variant="outlined"
                  fullWidth
                  component="a"
                  href={phoneHref}
                  startIcon={<Phone />}
                  sx={{ borderRadius: '50px', fontWeight: 600 }}
                >
                  {contactSettings.Phone}
                </Button>
              )}
            </Paper>
          </Grid>

          {/* ── IMAGE COLUMN — right on desktop, top on mobile ────────── */}
          <Grid item xs={12} md={5} sx={{ order: { xs: 1, md: 2 } }}>
            <Box sx={{ position: { md: 'sticky' }, top: { md: '90px' } }}>
              {photoUrl ? (
                <Box
                  component="img"
                  src={photoUrl}
                  alt={title}
                  loading="eager"
                  sx={{
                    display:      'block',
                    width:        '100%',
                    aspectRatio:  '4 / 3',
                    objectFit:    'cover',
                    borderRadius: '20px',
                    boxShadow:    isDark
                      ? `0 20px 56px rgba(0,0,0,0.55), 0 0 0 1px ${alpha(navy, 0.25)}`
                      : `0 16px 48px ${alpha(navy, 0.18)}, 0 4px 12px ${alpha(navy, 0.08)}`,
                    transition:   'transform 0.4s ease, box-shadow 0.4s ease',
                    '&:hover': {
                      transform:  'translateY(-4px) scale(1.01)',
                      boxShadow:  isDark
                        ? `0 28px 68px rgba(0,0,0,0.65), 0 0 0 1px ${alpha(orange, 0.3)}`
                        : `0 24px 60px ${alpha(navy, 0.22)}, 0 0 0 2px ${alpha(orange, 0.35)}`,
                    },
                  }}
                />
              ) : (
                /* Placeholder when no PhotoUrl */
                <Box
                  sx={{
                    width:        '100%',
                    aspectRatio:  '4 / 3',
                    borderRadius: '20px',
                    border:       '1px solid',
                    borderColor:  isDark ? 'rgba(255,255,255,0.08)' : alpha(navy, 0.1),
                    bgcolor:      isDark ? 'rgba(255,255,255,0.04)' : alpha(navy, 0.04),
                    display:      'flex',
                    flexDirection:'column',
                    alignItems:   'center',
                    justifyContent:'center',
                    gap:          1.5,
                    color:        'text.disabled',
                  }}
                >
                  <ImageIcon sx={{ fontSize: 56 }} />
                  <Typography variant="caption" fontWeight={600}>
                    Görsel eklenmemiş
                  </Typography>
                </Box>
              )}

              {/* Decorative brand-color underline below image */}
              <Box
                aria-hidden="true"
                sx={{
                  mt:           1.5,
                  mx:           'auto',
                  width:        '60%',
                  height:       3,
                  borderRadius: '2px',
                  background:   `linear-gradient(90deg, ${alpha(orange, 0)}, ${orange}, ${alpha(orange, 0)})`,
                  opacity:      0.7,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* ── Related static activities ──────────────────────────────────────── */}
      {related.length > 0 && (
        <Box
          component="section"
          aria-label="Diğer faaliyet alanları"
          sx={{
            bgcolor:   isDark ? alpha(navy, 0.05) : alpha(navy, 0.03),
            borderTop: '1px solid',
            borderColor: 'divider',
            py: { xs: 7, md: 9 },
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
              Diğer Faaliyet Alanlarımız
            </Typography>
            <Grid container spacing={3}>
              {related.map((rel) => (
                <Grid item xs={12} sm={4} key={rel.id}>
                  <RelatedCard field={rel} />
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
          </Container>
        </Box>
      )}

      {/* ── Bottom CTA banner ──────────────────────────────────────────────── */}
      <Box
        component="section"
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${navy} 100%)`,
          color:      '#fff',
          py:         { xs: 7, md: 9 },
          textAlign:  'center',
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
            startIcon={<CalendarMonth sx={{ fontSize: '1.25rem' }} />}
            aria-label="Ücretsiz Keşif Talep Et"
            sx={{
              bgcolor:       orange,
              color:         '#fff',
              fontWeight:    700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              borderRadius:  '50px',
              px:            5,
              py:            1.75,
              fontSize:      { xs: '0.9rem', md: '1rem' },
              boxShadow:     `0 8px 28px ${alpha(orange, 0.45)}, 0 2px 8px ${alpha(orange, 0.3)}`,
              transition:    'transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease',
              '&:hover': {
                bgcolor:   theme.palette.secondary.dark ?? alpha(orange, 0.82),
                transform: 'scale(1.05)',
                boxShadow: `0 14px 36px ${alpha(orange, 0.55)}, 0 4px 12px ${alpha(orange, 0.35)}`,
              },
              '&:active': {
                transform: 'scale(0.98)',
              },
              '&:focus-visible': {
                outline:       `3px solid ${orange}`,
                outlineOffset: '3px',
              },
            }}
          >
            Ücretsiz Keşif Talep Et
          </Button>
        </Container>
      </Box>
    </>
  );
};

export default ActivityDetail;
