/**
 * StatsSection.js — Working Principles strip (used in Projects page).
 *
 * Previously showed fabricated vanity metrics ("50+", "15 Yıl", "100K+ m²", "98%").
 * Now displays DEKODEM's actual working principles from whyUs in siteContent.js.
 */

import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { alpha, useTheme } from '@mui/material/styles';

import { whyUs } from '../constants/siteContent';

const StatsSection = () => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const color  = theme.palette.primary.main;

  return (
    <Box
      component="section"
      aria-label="Çalışma prensipleri"
      sx={{
        py:       { xs: 6, md: 8 },
        bgcolor:  isDark ? alpha(color, 0.05) : alpha(color, 0.03),
        border:   '1px solid',
        borderColor: alpha(color, 0.1),
        borderRadius: 3,
        my:       { xs: 5, md: 7 },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="overline"
          sx={{
            display:       'block',
            textAlign:     'center',
            color:         'primary.main',
            fontWeight:    700,
            letterSpacing: '0.1em',
            mb:            4,
          }}
        >
          NEDEN DEKODEM?
        </Typography>

        <Grid
          container
          spacing={2}
          component="ul"
          sx={{ listStyle: 'none', p: 0, m: 0 }}
          justifyContent="center"
        >
          {whyUs.map((principle) => (
            <Grid item xs={12} sm={6} md={4} key={principle} component="li">
              <Box
                sx={{
                  display:    'flex',
                  alignItems: 'center',
                  gap:        1.25,
                  py:         1,
                }}
              >
                <CheckCircle
                  aria-hidden="true"
                  sx={{ color, fontSize: 20, flexShrink: 0 }}
                />
                <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.5 }}>
                  {principle}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default StatsSection;
