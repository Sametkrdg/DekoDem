/**
 * ActivityShowcase.js — Luxury card grid for activity areas.
 *
 * Design rules applied:
 *   - Text-only cards (photo lives on the Activity Detail page only)
 *   - "The Equalizer": flex column, CTA pinned via mt:auto, Grid alignItems:stretch
 *   - Hairline 1px border, 24px radius, no heavy shadows
 *   - Hover: scale(1.02) + Champagne Gold border shift
 *   - Staggered Fade entrance @ 100ms per card
 *
 * Data contract preserved: { activities: [{ title, summary|description, slug }] }
 */
import React from 'react';
import { Box, Container, Typography, Button, Grid, Fade, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { PATHS } from '../../constants/navigation';

// ── Single activity card ─────────────────────────────────────────────────────
const ActivityCard = ({ activity }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const gold   = theme.palette.primary.main;

  const hairline = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)';

  const canNav = Boolean(activity.slug);
  const detailPath = canNav ? `${PATHS.ACTIVITIES}/${activity.slug}` : null;

  return (
    <Box
      component="article"
      sx={{
        height:        '100%',
        width:         '100%',
        display:       'flex',
        flexDirection: 'column',
        borderRadius:  '24px',
        overflow:      'hidden',
        border:        '1px solid',
        borderColor:   hairline,
        bgcolor:       'background.paper',
        boxShadow:     'none',
        p:             { xs: '26px 24px', md: '32px 28px' },
        gap:           1.5,
        transition:    'transform 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s ease',
        '&:hover': {
          transform:   'scale(1.02)',
          borderColor: alpha(gold, isDark ? 0.55 : 0.45),
        },
      }}
    >
        {/* Title only — extreme minimalism per the luxury rules */}
        <Typography
          variant="h6"
          component="h3"
          fontWeight={700}
          sx={{
            lineHeight:    1.3,
            letterSpacing: '-0.01em',
            color:         'text.primary',
          }}
        >
          {activity.title}
        </Typography>

        {detailPath ? (
          <Button
            component={Link}
            to={detailPath}
            variant="outlined"
            size="small"
            fullWidth
            endIcon={<ArrowForward sx={{ fontSize: 15 }} />}
            sx={{
              mt:            'auto',
              borderRadius:  '24px',
              fontWeight:    600,
              fontSize:      '0.85rem',
              textTransform: 'none',
              borderColor:   hairline,
              color:         'text.primary',
              py:            0.9,
              boxShadow:     'none',
              '&:hover': {
                borderColor: gold,
                color:       gold,
                bgcolor:     alpha(gold, isDark ? 0.10 : 0.06),
                boxShadow:   'none',
              },
            }}
          >
            Detayları Gör
          </Button>
        ) : (
          <Button
            variant="outlined"
            size="small"
            fullWidth
            disabled
            sx={{
              mt:            'auto',
              borderRadius:  '24px',
              fontWeight:    600,
              fontSize:      '0.85rem',
              textTransform: 'none',
              py:            0.9,
            }}
          >
            Yakında
          </Button>
        )}
    </Box>
  );
};

// ── Page-level showcase ──────────────────────────────────────────────────────
const ActivityShowcase = ({ activities = [] }) => (
  <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
    <Typography
      variant="h3"
      component="h1"
      align="center"
      sx={{
        fontWeight:    700,
        letterSpacing: '-0.02em',
        mb:            { xs: 5, md: 8 },
      }}
    >
      Faaliyet Alanlarımız
    </Typography>

    {activities.length === 0 ? (
      <Typography color="text.secondary" align="center">
        Şu anda listelenecek faaliyet bulunmuyor.
      </Typography>
    ) : (
      <Grid container spacing={3} alignItems="stretch">
        {activities.map((activity, idx) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}
            key={activity.slug || activity.id || idx}
            sx={{ display: 'flex' }}
          >
            <Fade in timeout={500} style={{ transitionDelay: `${idx * 100}ms` }}>
              <Box sx={{ width: '100%', display: 'flex' }}>
                <ActivityCard activity={activity} />
              </Box>
            </Fade>
          </Grid>
        ))}
      </Grid>
    )}
  </Container>
);

export default ActivityShowcase;
