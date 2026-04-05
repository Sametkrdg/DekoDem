// React
import React from 'react';

// MUI
import {
  Box, Container, Typography, Grid,
  List, ListItem, ListItemIcon, ListItemText, Chip,
} from '@mui/material';
import { FiberManualRecord, NavigateNext } from '@mui/icons-material';
import { alpha, useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

// Constants
import { activityFields } from '../constants/siteContent';
import { activityPath } from '../constants/navigation';

// ── Colour palette for category accent strips ─────────────────────────────
const ACCENTS = [
  '#1a365d', '#276749', '#c05621', '#b7791f',
  '#2c5282', '#553c9a', '#285e61', '#702459',
  '#1a365d', '#276749', '#c05621',
];

// ── Single activity card (static, always expanded) ────────────────────────
const ActivityCard = ({ field, accent, isDark, theme }) => (
  <Box
    sx={{
      display:        'flex',
      flexDirection:  'column',
      height:         '100%',
      minHeight:      320,
      borderRadius:   '16px',
      border:         '1px solid',
      borderColor:    isDark ? alpha(accent, 0.25) : alpha(accent, 0.2),
      overflow:       'hidden',
      transition:     'border-color 0.25s, box-shadow 0.25s, transform 0.25s',
      boxShadow:      'none',
      '&:hover': {
        borderColor: isDark ? alpha(accent, 0.5) : alpha(accent, 0.45),
        boxShadow:   isDark
          ? `0 8px 32px rgba(0,0,0,0.55), 0 0 0 1px ${alpha(accent, 0.35)}`
          : `0 8px 28px ${alpha(accent, 0.18)}`,
        transform:   'translateY(-4px)',
      },
      ...(isDark && {
        background:           theme.glass?.bgSubtle ?? 'rgba(255,255,255,0.03)',
        backdropFilter:       'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }),
      ...(!isDark && {
        bgcolor: '#fff',
      }),
    }}
  >
    {/* Accent strip */}
    <Box sx={{ height: 4, bgcolor: accent, flexShrink: 0 }} />

    <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      {/* Header row */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
        <Box
          sx={{
            width:        10,
            height:       10,
            borderRadius: '50%',
            bgcolor:      accent,
            flexShrink:   0,
            boxShadow:    `0 0 8px ${alpha(accent, 0.6)}`,
          }}
        />
        <Typography variant="body1" fontWeight={700} sx={{ color: accent, lineHeight: 1.4 }}>
          {field.title}
        </Typography>
      </Box>

      {/* Sub-services list */}
      <List dense disablePadding sx={{ flexGrow: 1 }}>
        {field.subServices.map((service) => (
          <ListItem key={service} disableGutters sx={{ py: 0.4 }}>
            <ListItemIcon sx={{ minWidth: 20 }}>
              <FiberManualRecord sx={{ fontSize: 7, color: accent, opacity: 0.7 }} />
            </ListItemIcon>
            <ListItemText
              primary={service}
              primaryTypographyProps={{
                variant:    'body2',
                color:      'text.secondary',
                lineHeight: 1.55,
              }}
            />
          </ListItem>
        ))}
      </List>

      {/* Detail page link */}
      <Box
        component={Link}
        to={activityPath(field.slug)}
        sx={{
          display:        'inline-flex',
          alignItems:     'center',
          gap:            0.5,
          mt:             2,
          color:          accent,
          textDecoration: 'none',
          fontSize:       '0.8rem',
          fontWeight:     700,
          letterSpacing:  '0.03em',
          transition:     'gap 0.2s',
          '&:hover':      { gap: '6px' },
        }}
      >
        Detayları Gör <NavigateNext sx={{ fontSize: 16 }} />
      </Box>
    </Box>
  </Box>
);

// ── Page ─────────────────────────────────────────────────────────────────────
const ActivityFields = () => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '80vh' }}>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <Box
        sx={{
          background: isDark
            ? 'linear-gradient(135deg, #0d1117 0%, #1a1f35 100%)'
            : 'linear-gradient(135deg, #1a365d 0%, #2c5282 100%)',
          color: '#fff',
          py: { xs: 8, md: 11 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse 55% 55% at 90% 50%, ${alpha(theme.palette.primary.main, 0.22)}, transparent)`,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Typography variant="overline" sx={{ color: alpha('#fff', 0.6), letterSpacing: 3 }}>
            Hizmetlerimiz
          </Typography>
          <Typography variant="h2" component="h1" fontWeight={800} sx={{ mt: 1, mb: 2 }}>
            Faaliyet Alanlarımız
          </Typography>
          <Typography variant="h6" sx={{ color: alpha('#fff', 0.72), fontWeight: 400, maxWidth: 560 }}>
            Fabrika, ofis ve ticari alanlarda A'dan Z'ye uygulama hizmetleri.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 3, flexWrap: 'wrap' }}>
            <Chip
              label={`${activityFields.length} Hizmet Alanı`}
              size="small"
              sx={{ bgcolor: alpha('#fff', 0.15), color: '#fff', fontWeight: 700 }}
            />
            <Chip
              label="Anahtar Teslim"
              size="small"
              sx={{ bgcolor: alpha('#fff', 0.15), color: '#fff', fontWeight: 700 }}
            />
          </Box>
        </Container>
      </Box>

      {/* ── Card grid ───────────────────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
        <Grid container spacing={3}>
          {activityFields.map((field, idx) => (
            <Grid item xs={12} md={6} key={field.id}>
              <ActivityCard
                field={field}
                accent={ACCENTS[idx % ACCENTS.length]}
                isDark={isDark}
                theme={theme}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ActivityFields;
