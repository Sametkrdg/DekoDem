/**
 * Contact.js — İletişim page.
 *
 * Layout (desktop):
 *   ┌──────────────────────────────────────────┐
 *   │ Hero — minimal title block               │
 *   ├──────────────────────┬───────────────────┤
 *   │ Google Map (left)    │ Contact form      │
 *   │                      │ (right)           │
 *   ├──────────────────────┴───────────────────┤
 *   │ ContactInfo — single icon row            │
 *   └──────────────────────────────────────────┘
 *
 * Mobile: map → form → ContactInfo, stacked vertically.
 * No duplicate phone CTAs; one minimal contact info row only.
 */

import React from 'react';

import { Box, Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import ContactInfo   from '../components/ContactInfo';
import ContactForm   from '../components/ContactForm';
import LocationMap   from '../components/LocationMap';

const Contact = () => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const hairline = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)';
  const cardBg   = isDark ? '#1C1C1E' : '#FFFFFF';

  // Shared minimum row height so map + form look like a single unified block on desktop.
  // Equalizer is enforced via `alignItems="stretch"` on the Grid — this just guarantees
  // the map has something to fill when the form's natural height is short.
  const ROW_MIN_HEIGHT = { xs: 320, md: 560 };

  return (
    <Box
      component="main"
      sx={{
        bgcolor:   'background.default', // pure black in dark mode
        minHeight: '100vh',
      }}
    >
      {/* ── Hero — minimal title only ───────────────────────────────────── */}
      <Box
        component="section"
        aria-label="İletişim başlığı"
        sx={{
          pt: { xs: 11, md: 14 },
          pb: { xs: 5,  md: 7  },
          borderBottom: '1px solid',
          borderColor:  'divider',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            sx={{
              color:         'primary.main',
              letterSpacing: '0.14em',
              fontWeight:    700,
              display:       'block',
              mb:            1.5,
            }}
          >
            İLETİŞİM
          </Typography>
          <Typography
            variant="h2"
            component="h1"
            fontWeight={800}
            sx={{
              lineHeight:    1.15,
              letterSpacing: '-0.02em',
              fontSize:      { xs: '2rem', md: '2.75rem' },
              mb:            2,
              maxWidth:      640,
            }}
          >
            Bize Ulaşın
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 560, lineHeight: 1.7 }}
          >
            Proje danışmanlığı, fiyat teklifi veya genel bilgi için mesaj bırakın.
            En kısa sürede size dönüş yaparız.
          </Typography>
        </Container>
      </Box>

      {/* ── Side-by-side: Map (left) + Form (right) ─────────────────────── */}
      <Container
        maxWidth="lg"
        component="section"
        aria-label="Harita ve iletişim formu"
        sx={{ py: { xs: 6, md: 9 } }}
      >
        {/* MUI 7 Grid2 API: use `size={{ xs, sm }}` — the legacy `item` prop is gone. */}
        <Grid
          container
          spacing={{ xs: 3, sm: 4, md: 5 }}
          alignItems="stretch"
        >
          {/* LEFT — Google Map (side-by-side from sm/600px upward) */}
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
            <Box
              sx={{
                width:        '100%',
                minHeight:    ROW_MIN_HEIGHT,
                borderRadius: '24px',
                overflow:     'hidden',
                border:       '1px solid',
                borderColor:  hairline,
                bgcolor:      cardBg,
                boxShadow:    'none',
                // Force LocationMap (and its inner iframe) to fill the capsule
                '& > *':      { width: '100%', height: '100%' },
                '& iframe':   { display: 'block', width: '100%', height: '100%', border: 0 },
              }}
            >
              <LocationMap />
            </Box>
          </Grid>

          {/* RIGHT — Contact form */}
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
            <Box
              sx={{
                width:        '100%',
                minHeight:    ROW_MIN_HEIGHT,
                display:      'flex',
                flexDirection:'column',
                borderRadius: '24px',
                border:       '1px solid',
                borderColor:  hairline,
                bgcolor:      cardBg,
                boxShadow:    'none',
                overflow:     'hidden',
                '& > *':      { flex: 1 }, // let ContactForm expand to fill the capsule
              }}
            >
              <ContactForm />
            </Box>
          </Grid>
        </Grid>

        {/* ── Unified ContactInfo row — Address / Phone / E-mail ────────── */}
        <Box
          sx={{
            mt:           { xs: 5, md: 6 },
            p:            { xs: 2.5, md: 3 },
            borderRadius: '24px',
            border:       '1px solid',
            borderColor:  hairline,
            bgcolor:      cardBg,
            boxShadow:    'none',
          }}
        >
          <ContactInfo />
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
