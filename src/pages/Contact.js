/**
 * Contact.js — İletişim page.
 *
 * Layout
 * ──────────────────────────────────────────────────────────────────────────────
 *   1. Full-bleed glassmorphism hero banner (matches About / Activities pages)
 *   2. Info cards + glassmorphism form  (stacks vertically on < md)
 *   3. Google Maps embed
 *   4. Quick-call CTA banner
 *
 * Responsive: at xs/sm the form and info section stack vertically.
 * The form itself already has validation UI via ContactForm.js.
 */

import React from 'react';

import { Box, Container, Grid, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Phone, MailOutline, LocationOn } from '@mui/icons-material';
import { Link as MuiLink } from '@mui/material';

import ContactInfo   from '../components/ContactInfo';
import ContactForm   from '../components/ContactForm';
import LocationMap   from '../components/LocationMap';

import { useSite } from '../context/SiteContext';

const Contact = () => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { contactSettings } = useSite();

  const phoneHref = contactSettings.Phone
    ? `tel:${contactSettings.Phone.replace(/\s/g, '')}`
    : '#';
  const mapsHref = contactSettings.Address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactSettings.Address)}`
    : null;

  return (
    <Box component="main" sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>

      {/* ── Hero banner ────────────────────────────────────────────────────── */}
      <Box
        component="section"
        aria-label="İletişim başlığı"
        sx={{
          background: isDark
            ? 'linear-gradient(135deg, #0d1117 0%, #1a1f35 100%)'
            : 'linear-gradient(135deg, #1a365d 0%, #2c5282 100%)',
          color: '#fff',
          py: { xs: 9, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content:    '""',
            position:   'absolute',
            inset:      0,
            background: `radial-gradient(ellipse 60% 70% at 80% 50%, ${alpha(theme.palette.primary.main, 0.3)}, transparent)`,
            pointerEvents: 'none',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Typography
            variant="overline"
            component="p"
            sx={{ color: alpha('#fff', 0.65), letterSpacing: 3, display: 'block', mb: 1 }}
          >
            İletişim
          </Typography>
          <Typography
            variant="h2"
            component="h1"
            fontWeight={800}
            sx={{ mb: 2, maxWidth: 600 }}
          >
            Bize Ulaşın
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: alpha('#fff', 0.75), fontWeight: 400, maxWidth: 520, lineHeight: 1.7 }}
          >
            Proje danışmanlığı, fiyat teklifi veya genel bilgi için mesaj bırakın.
            En kısa sürede size dönüş yaparız.
          </Typography>

          {/* Inline quick-contact pills */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 4 }}>
            {contactSettings.Phone && (
              <MuiLink
                href={phoneHref}
                underline="none"
                sx={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            0.75,
                  px:             2.5,
                  py:             1,
                  borderRadius:   '50px',
                  border:         '1px solid rgba(255,255,255,0.3)',
                  bgcolor:        'rgba(255,255,255,0.08)',
                  color:          '#fff',
                  fontWeight:     600,
                  fontSize:       '0.9rem',
                  backdropFilter: 'blur(8px)',
                  transition:     'all 0.2s',
                  '&:hover':      { bgcolor: 'rgba(255,255,255,0.16)', borderColor: '#fff' },
                }}
              >
                <Phone sx={{ fontSize: 18 }} aria-hidden="true" />
                {contactSettings.Phone}
              </MuiLink>
            )}
            {contactSettings.Email && (
              <MuiLink
                href={`mailto:${contactSettings.Email}`}
                underline="none"
                sx={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            0.75,
                  px:             2.5,
                  py:             1,
                  borderRadius:   '50px',
                  border:         '1px solid rgba(255,255,255,0.3)',
                  bgcolor:        'rgba(255,255,255,0.08)',
                  color:          '#fff',
                  fontWeight:     600,
                  fontSize:       '0.9rem',
                  backdropFilter: 'blur(8px)',
                  transition:     'all 0.2s',
                  '&:hover':      { bgcolor: 'rgba(255,255,255,0.16)', borderColor: '#fff' },
                }}
              >
                <MailOutline sx={{ fontSize: 18 }} aria-hidden="true" />
                {contactSettings.Email}
              </MuiLink>
            )}
            {contactSettings.Address && mapsHref && (
              <MuiLink
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
                sx={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            0.75,
                  px:             2.5,
                  py:             1,
                  borderRadius:   '50px',
                  border:         '1px solid rgba(255,255,255,0.2)',
                  bgcolor:        'rgba(255,255,255,0.05)',
                  color:          alpha('#fff', 0.75),
                  fontSize:       '0.875rem',
                  transition:     'all 0.2s',
                  '&:hover':      { bgcolor: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.4)', color: '#fff' },
                }}
              >
                <LocationOn sx={{ fontSize: 18 }} aria-hidden="true" />
                İzmit / Kocaeli
              </MuiLink>
            )}
          </Box>
        </Container>
      </Box>

      {/* ── Info + Form ────────────────────────────────────────────────────── */}
      <Container
        maxWidth="lg"
        component="section"
        aria-label="İletişim bilgileri ve form"
        sx={{ py: { xs: 7, md: 10 } }}
      >
        <Grid
          container
          spacing={{ xs: 5, md: 6 }}
          // On mobile stacks: info first, then form
          direction={{ xs: 'column', md: 'row' }}
        >
          {/* Info cards */}
          <Grid item xs={12} md={6} lg={5}>
            <ContactInfo />
          </Grid>

          {/* Glassmorphism form wrapper */}
          <Grid item xs={12} md={6} lg={7}>
            <Box
              sx={{
                borderRadius:   3,
                border:         '1px solid',
                borderColor:    isDark
                  ? 'rgba(255,255,255,0.08)'
                  : alpha(theme.palette.primary.main, 0.15),
                bgcolor:        isDark
                  ? 'rgba(255,255,255,0.03)'
                  : 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow:      isDark
                  ? '0 8px 40px rgba(0,0,0,0.35)'
                  : `0 8px 40px ${alpha(theme.palette.primary.main, 0.08)}`,
                overflow:       'hidden',
              }}
            >
              <ContactForm />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* ── Map ────────────────────────────────────────────────────────────── */}
      <Box
        component="section"
        aria-label="Konum haritası"
        sx={{ px: { xs: 2, md: 4 }, pb: { xs: 7, md: 10 } }}
      >
        <Container maxWidth="lg">
          <Box sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
            <LocationMap />
          </Box>
        </Container>
      </Box>

      {/* ── Quick-call CTA ─────────────────────────────────────────────────── */}
      <Box
        component="section"
        aria-label="Hızlı arama"
        sx={{ pb: { xs: 7, md: 10 } }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              background: isDark
                ? 'linear-gradient(135deg, #0d1117 0%, #1a1f35 100%)'
                : 'linear-gradient(135deg, #1a365d 0%, #2c5282 100%)',
              borderRadius: 4,
              p: { xs: '40px 24px', md: '56px 48px' },
              textAlign: 'center',
              color: '#fff',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content:    '""',
                position:   'absolute',
                inset:      0,
                background: `radial-gradient(ellipse 50% 70% at 50% 100%, ${alpha(theme.palette.primary.main, 0.25)}, transparent)`,
              },
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <Typography
                variant="overline"
                sx={{ color: alpha('#fff', 0.6), letterSpacing: 3, display: 'block', mb: 1 }}
              >
                Hızlı İletişim
              </Typography>
              <Typography variant="h4" fontWeight={800} sx={{ mb: 1.5 }}>
                Ücretsiz Keşif Talep Edin
              </Typography>
              <Typography sx={{ color: alpha('#fff', 0.7), mb: 4, maxWidth: 440, mx: 'auto', lineHeight: 1.7 }}>
                Projeleriniz için profesyonel destek ve yerinde keşif hizmeti tamamen ücretsizdir.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                {contactSettings.Phone && (
                  <MuiLink
                    href={phoneHref}
                    underline="none"
                    sx={{
                      display:        'inline-flex',
                      alignItems:     'center',
                      gap:            0.75,
                      px:             3.5,
                      py:             1.5,
                      borderRadius:   '50px',
                      border:         '1.5px solid rgba(255,255,255,0.35)',
                      bgcolor:        'rgba(255,255,255,0.08)',
                      color:          '#fff',
                      fontWeight:     700,
                      fontSize:       '1.05rem',
                      letterSpacing:  '0.03em',
                      backdropFilter: 'blur(8px)',
                      transition:     'all 0.2s ease',
                      '&:hover': {
                        bgcolor:     'rgba(255,255,255,0.16)',
                        borderColor: '#fff',
                        transform:   'translateY(-2px)',
                        boxShadow:   '0 8px 24px rgba(0,0,0,0.3)',
                      },
                    }}
                  >
                    <Phone sx={{ fontSize: 20 }} aria-hidden="true" />
                    {contactSettings.Phone}
                  </MuiLink>
                )}
              </Box>

              <Typography
                variant="caption"
                sx={{ color: alpha('#fff', 0.45), display: 'block', mt: 3 }}
              >
                Pazartesi – Cumartesi: 08:00 – 18:00
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

    </Box>
  );
};

export default Contact;
