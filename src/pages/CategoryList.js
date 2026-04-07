/**
 * CategoryList.js — Faaliyet Alanları listing page.
 *
 * Visual DNA mirrors ActivitiesSection.js (homepage):
 *   • Same gradient-accent top strip
 *   • Same icon badge (gradient background, white icon, 52×52)
 *   • Same glassmorphism card surface
 *   • Same hover: lift + shadow + border brighten
 *   • Same sub-service chip rows (2 shown + "+N" overflow chip)
 *   • Same "Detayları Gör" footer link
 *
 * All accent gradients and icon map are imported from / match ActivitiesSection.
 */

import React, { useEffect, useState } from 'react';

import {
  Box, Container, Typography, Grid,
  Chip, Breadcrumbs,
} from '@mui/material';
import {
  NavigateNext,
  Architecture, Construction, ViewComfy, Brush,
  MeetingRoom, Weekend, Park, ElectricBolt,
  Build, Whatshot, Terrain, ArrowForward,
} from '@mui/icons-material';
import { alpha, useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

import { activityFields } from '../constants/siteContent';
import { activityPath, PATHS } from '../constants/navigation';
import { getActivities } from '../services/firestore';

// ── Shared visual tokens ──────────────────────────────────────────────────────
// Keep these in sync with ActivitiesSection.js

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

// Identical to ActivitiesSection.js — single source would be better in a later refactor
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

// ── Activity card ─────────────────────────────────────────────────────────────

const ActivityCard = ({ field, index }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const IconComponent = ICON_MAP[field.id] ?? Build;
  const accent        = ACCENT_GRADIENTS[index % ACCENT_GRADIENTS.length];

  // Static items use slug; Firestore items use their doc ID
  const linkTo = field.slug
    ? activityPath(field.slug)
    : field._docId ? activityPath(field._docId) : PATHS.ACTIVITIES;

  return (
    <Box
      component={RouterLink}
      to={linkTo}
      sx={{
        display:              'flex',
        flexDirection:        'column',
        height:               '100%',
        borderRadius:         '20px',
        border:               '1px solid',
        borderColor:          isDark ? theme.glass.border : alpha(theme.palette.primary.main, 0.12),
        background:           isDark ? theme.glass.bg : '#fff',
        backdropFilter:       isDark ? theme.glass.blur : 'none',
        WebkitBackdropFilter: isDark ? theme.glass.blur : 'none',
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
        animationDelay:    `${index * 0.05}s`,
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
          opacity:    isDark ? 0.7 : 0.55,
          transition: 'opacity 0.28s',
          flexShrink: 0,
        }}
      />

      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Icon badge — matches ActivitiesSection */}
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
          aria-hidden="true"
        >
          <IconComponent sx={{ fontSize: 26 }} />
        </Box>

        {/* Title */}
        <Typography
          variant="subtitle1"
          component="h2"
          fontWeight={700}
          sx={{ lineHeight: 1.35, mb: 1.5 }}
        >
          {field.title}
        </Typography>

        {/* Sub-service chips — first 2 + overflow count */}
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
                  : alpha(theme.palette.primary.main, 0.06),
                color:       'text.secondary',
                border:      '1px solid',
                borderColor: isDark
                  ? 'rgba(255,255,255,0.1)'
                  : alpha(theme.palette.primary.main, 0.14),
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

        {/* Description — 3-line clamp */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            lineHeight:          1.65,
            flexGrow:            1,
            display:             '-webkit-box',
            WebkitLineClamp:     3,
            WebkitBoxOrient:     'vertical',
            overflow:            'hidden',
            mb:                  2.5,
          }}
        >
          {field.description}
        </Typography>

        {/* "Detayları Gör" footer link */}
        <Box
          sx={{
            display:       'inline-flex',
            alignItems:    'center',
            gap:           0.5,
            color:         'primary.main',
            fontSize:      '0.8rem',
            fontWeight:    700,
            letterSpacing: '0.03em',
            mt:            'auto',
            transition:    'gap 0.2s',
            '& .card-arrow': { opacity: 0.7, transition: 'transform 0.2s, opacity 0.2s' },
          }}
          aria-hidden="true"
        >
          Detayları Gör
          <ArrowForward className="card-arrow" sx={{ fontSize: 15 }} />
        </Box>
      </Box>
    </Box>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────

const CategoryList = () => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [fields, setFields] = useState(activityFields);

  useEffect(() => {
    getActivities()
      .then((data) => {
        if (data && data.length > 0) {
          const normalized = data.map((item) => ({
            id:          String(item.Id ?? item._docId ?? ''),
            _docId:      item._docId ?? null,
            title:       item.Name        ?? '',
            description: item.Description ?? '',
            photoUrl:    item.PhotoUrl    ?? '',
            slug:        null,
            subServices: [],
          }));
          setFields(normalized);
        }
      })
      .catch(() => { /* keep static data on error */ });
  }, []);

  return (
    <Box
      component="main"
      sx={{ bgcolor: 'background.default', minHeight: '80vh' }}
    >

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <Box
        component="section"
        aria-label="Faaliyet alanları başlığı"
        sx={{
          background: isDark
            ? 'linear-gradient(135deg, #0d1117 0%, #1a1f35 100%)'
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
              component={RouterLink}
              to={PATHS.HOME}
              sx={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#fff' } }}
            >
              Anasayfa
            </Box>
            <Typography sx={{ color: '#fff', fontSize: '0.875rem' }}>Faaliyet Alanları</Typography>
          </Breadcrumbs>

          <Typography variant="overline" sx={{ color: alpha('#fff', 0.6), letterSpacing: 3, display: 'block', mb: 1 }}>
            Hizmetlerimiz
          </Typography>
          <Typography variant="h2" component="h1" fontWeight={800} sx={{ mb: 2 }}>
            Faaliyet Alanlarımız
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: alpha('#fff', 0.72), fontWeight: 400, maxWidth: 560, lineHeight: 1.7 }}
          >
            Fabrika, ofis ve ticari alanlarda A'dan Z'ye uygulama hizmetleri.
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, mt: 3, flexWrap: 'wrap' }}>
            <Chip
              label={`${fields.length} Hizmet Alanı`}
              size="small"
              sx={{ bgcolor: alpha('#fff', 0.15), color: '#fff', fontWeight: 700, border: '1px solid rgba(255,255,255,0.25)' }}
            />
            <Chip
              label="Anahtar Teslim"
              size="small"
              sx={{ bgcolor: alpha('#fff', 0.15), color: '#fff', fontWeight: 700, border: '1px solid rgba(255,255,255,0.25)' }}
            />
          </Box>
        </Container>
      </Box>

      {/* ── Card grid ───────────────────────────────────────────────────── */}
      <Container
        maxWidth="lg"
        component="section"
        aria-label="Hizmet kartları"
        sx={{ py: { xs: 6, md: 9 } }}
      >
        <Grid container spacing={3}>
          {fields.map((field, idx) => (
            <Grid item xs={12} sm={6} lg={4} key={field._docId ?? field.id}>
              <ActivityCard field={field} index={idx} />
            </Grid>
          ))}
        </Grid>
      </Container>

    </Box>
  );
};

export default CategoryList;
