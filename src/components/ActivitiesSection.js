// React
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// MUI
import { Box, Container, Typography, Grid, Button, Fade } from '@mui/material';
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

  // Firestore items use their doc ID as the URL segment
  const linkTo = field.slug
    ? activityPath(field.slug)
    : field._docId ? activityPath(field._docId) : PATHS.ACTIVITIES;

  const hairline = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)';
  const gold     = theme.palette.primary.main;

  return (
    <Box
      component={Link}
      to={linkTo}
      sx={{
        display:        'flex',
        flexDirection:  'column',
        height:         '100%',
        width:          '100%',
        borderRadius:   '24px',
        border:         '1px solid',
        borderColor:    hairline,
        bgcolor:        'background.paper',
        overflow:       'hidden',
        textDecoration: 'none',
        color:          'text.primary',
        boxShadow:      'none',
        transition:     'transform 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s ease',
        '&:hover': {
          transform:   'scale(1.02)',
          borderColor: alpha(gold, isDark ? 0.55 : 0.45),
          '& .card-arrow':  { transform: 'translateX(4px)', opacity: 1 },
          '& .card-accent': { opacity: 1 },
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
          }}
        >
          <IconComponent sx={{ fontSize: 26 }} />
        </Box>

        {/* Title only — extreme minimalism per the luxury rules */}
        <Typography
          variant="subtitle1"
          fontWeight={700}
          sx={{ lineHeight: 1.35 }}
        >
          {field.title}
        </Typography>

        {/* "View details" footer — Equalizer: pinned to bottom via mt:auto */}
        <Box
          sx={{
            mt:         'auto',
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
            id:          String(item.Id ?? item._docId ?? ''),
            _docId:      item._docId ?? null,
            title:       item.Name        ?? '',
            description: item.Description ?? '',
            photoUrl:    item.PhotoUrl    ?? '',
            slug:        null,   // no slug in Firestore schema — link by _docId
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

        {/* Card grid — Equalizer: alignItems stretch so every card in a row matches height */}
        <Grid container spacing={3} alignItems="stretch">
          {fields.map((field, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={field.id || index} sx={{ display: 'flex' }}>
              <Fade in timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
                <Box sx={{ width: '100%', display: 'flex' }}>
                  <ActivityCard field={field} index={index} />
                </Box>
              </Fade>
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
