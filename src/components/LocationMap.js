// React
import React from 'react';

// MUI
import { Box, Typography, Paper, Link as MuiLink, Button } from '@mui/material';
import { LocationOn, OpenInNew, Directions } from '@mui/icons-material';
import { alpha, useTheme } from '@mui/material/styles';

// Constants
import { contact } from '../constants/siteContent';

const LocationMap = () => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
        Lokasyonumuz
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Ofisimizi ziyaret edin veya yol tarifi alın.
      </Typography>

      <Paper
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          overflow: 'hidden',
          ...(isDark && {
            background:           theme.glass?.bgSubtle,
            backdropFilter:       'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }),
        }}
      >
        {/* ── Google Maps iframe ────────────────────────────────────── */}
        <Box
          sx={{
            position: 'relative',
            width:    '100%',
            height:   { xs: 260, sm: 340, md: 400 },
            bgcolor:  'background.default',
            overflow: 'hidden',
          }}
        >
          <Box
            component="iframe"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3020.6!2d29.96!3d40.79!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQWxpa2FoeWEgTWVya2V6IE1haC4gU2FrxLFwIFNhYmFuY8SxIEJ1bHYuIE5vOiAyNi9B!5e0!3m2!1str!2str!4v1609459200000!5m2!1str!2str"
            title="DEKODEM Harita Konumu"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            sx={{
              border:   0,
              width:    '100%',
              height:   '100%',
              display:  'block',
              // Invert map colours in dark mode for visual consistency
              filter:   isDark ? 'invert(90%) hue-rotate(180deg)' : 'none',
            }}
          />
        </Box>

        {/* ── Address bar ──────────────────────────────────────────── */}
        <Box
          sx={{
            p:           { xs: 2.5, md: 3 },
            display:     'flex',
            alignItems:  { xs: 'flex-start', sm: 'center' },
            flexDirection: { xs: 'column', sm: 'row' },
            gap:         2,
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
            <Box
              sx={{
                flexShrink:     0,
                width:  38,
                height: 38,
                borderRadius:   2,
                bgcolor:        alpha('#c05621', isDark ? 0.2 : 0.1),
                color:          '#c05621',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
              }}
            >
              <LocationOn fontSize="small" />
            </Box>
            <Box>
              <Typography variant="caption" fontWeight={700} sx={{ color: '#c05621', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block' }}>
                Adresimiz
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
                {contact.address}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1.5, flexShrink: 0 }}>
            <Button
              component={MuiLink}
              href={contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              size="small"
              startIcon={<Directions />}
              sx={{ borderRadius: '10px', textDecoration: 'none', whiteSpace: 'nowrap' }}
            >
              Yol Tarifi
            </Button>
            <Button
              component={MuiLink}
              href={contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              size="small"
              endIcon={<OpenInNew sx={{ fontSize: '0.85rem !important' }} />}
              sx={{ borderRadius: '10px', textDecoration: 'none', whiteSpace: 'nowrap' }}
            >
              Haritada Gör
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default LocationMap;
