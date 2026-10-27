import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { ArrowForward, Phone, Email, LocationOn } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

import { useSite } from '../context/SiteContext';
import { PATHS } from '../constants/navigation';

// ── Single contact row (icon + clickable text) ────────────────────────────────
const ContactRow = ({ icon, href, label, external }) => {
  const theme  = useTheme();
  const orange = theme.palette.secondary.main;

  return (
    <Box
      component={external ? 'a' : RouterLink}
      href={external ? href : undefined}
      to={external ? undefined : href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      sx={{
        display:        'flex',
        alignItems:     'center',
        gap:            1.5,
        color:          'rgba(255,255,255,0.85)',
        textDecoration: 'none',
        fontSize:       { xs: '0.9rem', md: '1rem' },
        fontWeight:     600,
        transition:     'color 0.2s',
        '&:hover': { color: '#fff' },
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          width:  44,
          height: 44,
          borderRadius:   '50%',
          bgcolor:        alpha(orange, 0.18),
          border:         `1.5px solid ${alpha(orange, 0.45)}`,
          color:          orange,
          flexShrink:     0,
          transition:     'background 0.2s, border-color 0.2s',
          'a:hover &': {
            bgcolor:     alpha(orange, 0.30),
            borderColor: orange,
          },
          '& svg': { fontSize: 22 },
        }}
      >
        {icon}
      </Box>
      <Typography
        component="span"
        sx={{
          fontSize:   'inherit',
          fontWeight: 'inherit',
          lineHeight: 1.5,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────
const ContactSection = () => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const orange = theme.palette.secondary.main;
  const { contactSettings } = useSite();

  // Build href values safely — only render a row when the value exists
  const phoneHref = contactSettings.Phone
    ? `tel:${contactSettings.Phone.replace(/\s/g, '')}`
    : null;
  const emailHref = contactSettings.Email
    ? `mailto:${contactSettings.Email}`
    : null;
  const mapsHref  = contactSettings.Address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactSettings.Address)}`
    : null;

  return (
    <Box
      component="section"
      aria-label="İletişim çağrısı"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        // Deep navy gradient — consistent with hero & CTA sections across the project
        background: isDark
          ? '#000000'
          : 'linear-gradient(135deg, #0d1a2e 0%, #1a365d 50%, #0d2137 100%)',
        py: { xs: 11, md: 15 },
        // 60% black overlay for maximum contrast
        '&::before': {
          content:    '""',
          position:   'absolute',
          inset:      0,
          background: 'rgba(0,0,0,0.60)',
          zIndex:     0,
          pointerEvents: 'none',
        },
        // Radial light bloom — depth cue
        '&::after': {
          content:    '""',
          position:   'absolute',
          inset:      0,
          background: `radial-gradient(ellipse 70% 55% at 50% 0%, ${alpha(orange, 0.18)} 0%, transparent 65%)`,
          zIndex:     1,
          pointerEvents: 'none',
        },
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          zIndex:   2,
          textAlign: 'center',
        }}
      >
        {/* Overline label */}
        <Typography
          variant="overline"
          sx={{
            color:         alpha(orange, 0.9),
            letterSpacing: '0.18em',
            fontWeight:    700,
            display:       'block',
            mb:            1.5,
          }}
        >
          İletişim
        </Typography>

        {/* Main heading — oversized white, orange accent on last word */}
        <Typography
          variant="h3"
          component="h2"
          fontWeight={800}
          sx={{
            color:      '#fff',
            lineHeight: 1.2,
            mb:         2.5,
            fontSize:   { xs: '2rem', sm: '2.5rem', md: '3rem' },
          }}
        >
          Projenizi birlikte{' '}
          <Box component="span" sx={{ color: orange }}>
            hayata geçirelim
          </Box>
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            color:      'rgba(255,255,255,0.75)',
            lineHeight: 1.9,
            fontWeight: 500,
            maxWidth:   540,
            mx:         'auto',
            mb:         { xs: 5, md: 6 },
          }}
        >
          Projeleriniz için detaylı bilgi almak ve ücretsiz keşif randevusu
          ayarlamak için bizimle iletişime geçin.
        </Typography>

        {/* Contact rows */}
        <Box
          sx={{
            display:        'flex',
            justifyContent: 'center',
            gap:            { xs: 3, md: 5 },
            flexWrap:       'wrap',
            mb:             { xs: 5, md: 6 },
          }}
        >
          {phoneHref && (
            <ContactRow icon={<Phone />} href={phoneHref} label={contactSettings.Phone} external />
          )}
          {emailHref && (
            <ContactRow icon={<Email />} href={emailHref} label={contactSettings.Email} external />
          )}
          {mapsHref && (
            <ContactRow icon={<LocationOn />} href={mapsHref} label="İzmit / Kocaeli" external />
          )}
        </Box>

        {/* CTA Button */}
        <Button
          variant="contained"
          component={RouterLink}
          to={PATHS.CONTACT}
          endIcon={<ArrowForward />}
          size="large"
          sx={{
            bgcolor:      orange,
            color:        '#fff',
            fontWeight:   700,
            fontSize:     { xs: '1rem', md: '1.1rem' },
            px:           4.5,
            py:           1.75,
            borderRadius: '50px',
            textTransform:'none',
            boxShadow:    `0 8px 28px ${alpha(orange, 0.45)}`,
            transition:   'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
            '&:hover': {
              bgcolor:   theme.palette.secondary.dark ?? alpha(orange, 0.85),
              transform: 'translateY(-3px)',
              boxShadow: `0 14px 36px ${alpha(orange, 0.55)}`,
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          }}
        >
          İletişime Geç
        </Button>
      </Container>
    </Box>
  );
};

export default ContactSection;
