// React
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// MUI
import { Box, Container, Typography, Grid, Button, Chip } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  ArrowForward, Architecture, Construction, ViewComfy, Brush,
  MeetingRoom, Weekend, Park, ElectricBolt, Build, Whatshot, Terrain,
} from '@mui/icons-material';

// Data — single source of truth; no hardcoded strings in this file
import { activityFields } from '../constants/siteContent';
import { activityPath, PATHS } from '../constants/navigation';

// Firestore
import { getActivities } from '../services/firestore';

// ── Icon map: activity id → MUI icon component ────────────────────────────────
const ICON_MAP = {
  'ic-mimarlik':          Architecture,
  'duvar-bolme':          Construction,
  'tavan':                ViewComfy,
  'boya-badana':          Brush,
  'kapi-gecis':           MeetingRoom,
  'mobilya-uretim':       Weekend,
  'peyzaj':               Park,
  'altyapi':              ElectricBolt,
  'celik-konstruksiyon':  Build,
  'mekanik-yangin':       Whatshot,
  'saha-betonlari':       Terrain,
};

// Gradient accent per card index — cycles through primary-family shades
const ACCENT_GRADIENTS = [
  '135deg, #1a365d, #2c5282',
  '135deg, #2c5282, #2b6cb0',
  '135deg, #1a365d, #553c9a',
  '135deg, #1e4e8c, #2c7a7b',
  '135deg, #2c5282, #276749',
  '135deg, #702459, #1a365d',
  '135deg, #553c9a, #2c5282',
  '135deg, #2c7a7b, #1a365d',
  '135deg, #276749, #2c5282',
  '135deg, #1a365d, #702459',
  '135deg, #2b6cb0, #276749',
];

// ── Single activity card ──────────────────────────────────────────────────────
const ActivityCard = ({ field, index }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const IconComponent = ICON_MAP[field.id] ?? Build;
  const accent = ACCENT_GRADIENTS[index % ACCENT_GRADIENTS.length];

  // Firestore items have no slug → link to activities list instead of detail page
  const linkTo = field.slug ? activityPath(field.slug) : PATHS.ACTIVITIES;

  return (
    <Box
      component={Link}
      to={linkTo}
      sx={{
        display:              'flex',
        flexDirection:        'column',
        height:               '100%',
        borderRadius:         '20px',
        border:               '1px solid',
        borderColor:          isDark ? theme.glass.border : alpha(theme.palette.primary.main, 0.12),
        background:           isDark ? theme.glass.bg : alpha(theme.palette.primary.main, 0.02),
        backdropFilter:       theme.glass.blur,
        WebkitBackdropFilter: theme.glass.blur,
        overflow:             'hidden',
        textDecoration:       'none',
        color:                'text.primary',
        transition:           'transform 0.28s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.28s ease, border-color 0.28s ease',
        '&:hover': {
          borderColor: alpha(theme.palette.primary.main, isDark ? 0.45 : 0.35),
          transform:   'translateY(-6px)',
          boxShadow:   isDark
            ? `0 20px 48px rgba(0,0,0,0.62), 0 0 0 1px ${alpha(theme.palette.primary.main, 0.25)}`
            : `0 16px 40px ${alpha(theme.palette.primary.main, 0.12)}`,
          '& .card-arrow': { transform: 'translateX(4px)', opacity: 1 },
          '& .card-accent': { opacity: 1 },
        },
        // Stagger entrance
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
      {/* Gradient accent strip */}
      <Box
        className="card-accent"
        sx={{
          height:     4,
          background: `linear-gradient(${accent})`,
          opacity:    isDark ? 0.7 : 0.6,
          transition: 'opacity 0.28s',
          flexShrink: 0,
        }}
      />

      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Icon badge */}
        <Box
          sx={{
            width:          52,
            height:         52,
            borderRadius:   '14px',
            background:     `linear-gradient(${accent})`,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            color:          '#fff',
            mb:             2.5,
            flexShrink:     0,
            boxShadow:      `0 6px 16px ${alpha(theme.palette.primary.main, 0.25)}`,
          }}
        >
          <IconComponent sx={{ fontSize: 26 }} />
        </Box>

        {/* Title */}
        <Typography
          variant="subtitle1"
          fontWeight={700}
          sx={{ lineHeight: 1.35, mb: 1.5 }}
        >
          {field.title}
        </Typography>

        {/* Sub-service chips (static data) or description snippet (Firestore data) */}
        {field.subServices && field.subServices.length > 0 ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2.5 }}>
            {field.subServices.slice(0, 2).map((s) => (
              <Chip
                key={s}
                label={s}
                size="small"
                sx={{
                  fontSize:    '0.7rem',
                  height:      22,
                  bgcolor:     isDark
                    ? 'rgba(255,255,255,0.07)'
                    : alpha(theme.palette.primary.main, 0.07),
                  color:       'text.secondary',
                  border:      '1px solid',
                  borderColor: isDark ? 'rgba(255,255,255,0.1)' : alpha(theme.palette.primary.main, 0.15),
                }}
              />
            ))}
            {field.subServices.length > 2 && (
              <Chip
                label={`+${field.subServices.length - 2}`}
                size="small"
                sx={{
                  fontSize:    '0.7rem',
                  height:      22,
                  bgcolor:     'transparent',
                  color:       'primary.main',
                  border:      '1px solid',
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                  fontWeight:  600,
                }}
              />
            )}
          </Box>
        ) : field.description ? (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2.5, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {field.description}
          </Typography>
        ) : (
          <Box sx={{ mb: 2.5 }} />
        )}

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* "View details" footer */}
        <Box
          sx={{
            display:    'flex',
            alignItems: 'center',
            gap:        0.75,
            color:      'primary.main',
            fontWeight: 600,
            fontSize:   '0.82rem',
            letterSpacing: '0.02em',
          }}
        >
          Detayları Gör
          <ArrowForward
            className="card-arrow"
            sx={{ fontSize: 16, opacity: 0.7, transition: 'transform 0.2s, opacity 0.2s' }}
          />
        </Box>
      </Box>
    </Box>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────
const ActivitiesSection = () => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [fields, setFields] = useState(activityFields);

  useEffect(() => {
    getActivities()
      .then((data) => {
        if (data && data.length > 0) {
          // Normalize Firestore schema to the shape ActivityCard expects
          const normalized = data.map((item) => ({
            id:          String(item.Id ?? ''),
            title:       item.Name   ?? '',
            description: item.Description ?? '',
            photoUrl:    item.PhotoUrl ?? '',
            slug:        null,        // no slug in Firestore schema → card links to list page
            subServices: [],
          }));
          setFields(normalized);
        }
        // If empty, keep static activityFields (default state)
      })
      .catch(() => {
        // On error keep static data
      });
  }, []);

  return (
    <Box
      component="section"
      aria-label="Faaliyet alanları"
      sx={{
        py:       { xs: 9, md: 13 },
        // Frosted glass overlay in dark; pure white in light → alternates with sectionSurface
        ...theme.mixins.sectionSurfaceAlt,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content:    '""',
          position:   'absolute',
          inset:      0,
          background: isDark
            ? `radial-gradient(ellipse 70% 50% at 20% 60%, ${alpha(theme.palette.primary.main, 0.12)} 0%, transparent 70%)`
            : `radial-gradient(ellipse 70% 50% at 80% 40%, ${alpha(theme.palette.primary.main, 0.04)} 0%, transparent 70%)`,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>

        {/* Section header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', letterSpacing: '0.14em', display: 'block', mb: 1 }}
          >
            HİZMETLERİMİZ
          </Typography>
          <Typography
            variant="h3"
            component="h2"
            fontWeight={800}
            sx={{ mb: 2, fontSize: { xs: '1.9rem', md: '2.5rem' } }}
          >
            Faaliyet Alanlarımız
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ maxWidth: 560, mx: 'auto', lineHeight: 1.75 }}
          >
            Endüstriyel ve ticari projelerde A'dan Z'ye tüm uygulama süreçlerini kapsayan {fields.length} faaliyet alanında hizmet veriyoruz.
          </Typography>
        </Box>

        {/* Card grid — all activity fields, 3 cols desktop / 2 tablet / 1 mobile */}
        <Grid container spacing={3}>
          {fields.map((field, index) => (
            <Grid item xs={12} sm={6} md={4} key={field.id || index}>
              <ActivityCard field={field} index={index} />
            </Grid>
          ))}
        </Grid>

        {/* "View all" CTA */}
        <Box sx={{ textAlign: 'center', mt: { xs: 5, md: 7 } }}>
          <Button
            component={Link}
            to={PATHS.ACTIVITIES}
            variant="outlined"
            size="large"
            endIcon={<ArrowForward />}
            sx={{ borderRadius: '50px', px: 5, fontWeight: 700 }}
          >
            Tüm Faaliyet Alanlarını Gör
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ActivitiesSection;
