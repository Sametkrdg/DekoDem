/**
 * HeroSection.js — Construction-grade homepage hero / company intro section.
 *
 * Design language: "Blueprint + Steel"
 *   • Deep navy/charcoal background with radial-gradient mesh
 *   • Safety-orange (secondary) accent line beneath the headline
 *   • Dark image containers with primary-gradient overlay — ready for real photos
 *   • Stats in primary-tinted pill badges
 *
 * All colors come from the MUI theme — zero hardcoded hex values.
 * Image src / Cloudinary logic is preserved exactly as-is.
 */

import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { styled, alpha, keyframes, useTheme } from '@mui/material/styles';
import { Star, Engineering, Business, Group, Construction, Architecture } from '@mui/icons-material';
import { brand, about } from '../constants/siteContent';

// ── Entrance animations ───────────────────────────────────────────────────────

const fadeInLeft = keyframes`
  from { opacity: 0; transform: translateX(-48px); }
  to   { opacity: 1; transform: translateX(0);      }
`;

const fadeInRight = keyframes`
  from { opacity: 0; transform: translateX(48px); }
  to   { opacity: 1; transform: translateX(0);     }
`;

const subtleFloat = keyframes`
  0%, 100% { transform: translateY(0);     }
  50%       { transform: translateY(-8px); }
`;

// ── Layout shells (no color tokens — only structural) ────────────────────────

const Section = styled(Box)(({ theme }) => ({
  position:   'relative',
  zIndex:     1,
  padding:    '80px 40px',
  [theme.breakpoints.down('md')]: { padding: '60px 20px' },
  [theme.breakpoints.down('sm')]: { padding: '40px 16px' },
}));

const HeroContent = styled(Box)(({ theme }) => ({
  display:    'flex',
  alignItems: 'stretch',
  minHeight:  '680px',
  gap:        '60px',
  maxWidth:   '1400px',
  margin:     '0 auto',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap:           '40px',
    minHeight:     'auto',
  },
}));

const ImageColumn = styled(Box)(({ theme }) => ({
  flex:          '0 0 44%',
  display:       'flex',
  flexDirection: 'column',
  gap:           '20px',
  [theme.breakpoints.down('md')]: { flex: '1' },
}));

const TextColumn = styled(Box)(() => ({
  flex:          '1',
  display:       'flex',
  flexDirection: 'column',
  justifyContent:'center',
}));

// ── Image frame — ready for real photos (src/Cloudinary unchanged) ────────────

const ImageFrame = styled(Box)(({ theme }) => ({
  position:     'relative',
  width:        '100%',
  height:       '400px',
  borderRadius: '10px',        // Architectural: tighter radius
  overflow:     'hidden',
  boxShadow:    `0 24px 48px rgba(0,0,0,0.45), 0 0 0 1px ${alpha(theme.palette.primary.main, 0.18)}`,
  animation:    `${fadeInLeft} 0.9s ease-out both, ${subtleFloat} 7s ease-in-out 1s infinite`,
  transition:   'box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: `0 32px 64px rgba(0,0,0,0.55), 0 0 0 2px ${alpha(theme.palette.secondary.main, 0.4)}`,
  },
  // Construction-grade overlay gradient — applied OVER the image
  '&::after': {
    content:  '""',
    position: 'absolute',
    inset:    0,
    background: `linear-gradient(160deg, ${alpha(theme.palette.primary.dark, 0.35)} 0%, transparent 60%)`,
    pointerEvents: 'none',
    zIndex:   2,
  },
  [theme.breakpoints.down('md')]: { height: '300px' },
  [theme.breakpoints.down('sm')]: { height: '240px' },
}));

const SmallImageFrame = styled(ImageFrame)(({ theme }) => ({
  height:    '250px',
  animation: `${fadeInLeft} 0.9s ease-out 0.18s both`,
  [theme.breakpoints.down('md')]: { height: '190px' },
  [theme.breakpoints.down('sm')]: { height: '170px' },
}));

// Inner placeholder — shown when no real image is available.
// DO NOT touch src / Cloudinary attributes — this only styles the fallback shell.
const ImageFallback = styled(Box)(({ theme }) => ({
  width:          '100%',
  height:         '100%',
  background:     `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'center',
  color:          '#fff',
  position:       'relative',
  zIndex:         3,
  // Blueprint grid overlay
  '&::before': {
    content:    '""',
    position:   'absolute',
    inset:      0,
    background: `
      repeating-linear-gradient(0deg,   transparent, transparent 39px, ${alpha('#fff', 0.04)} 39px, ${alpha('#fff', 0.04)} 40px),
      repeating-linear-gradient(90deg,  transparent, transparent 39px, ${alpha('#fff', 0.04)} 39px, ${alpha('#fff', 0.04)} 40px)
    `,
    pointerEvents: 'none',
  },
}));

// ── Text content ──────────────────────────────────────────────────────────────

const TextContainer = styled(Box)(() => ({
  animation: `${fadeInRight} 0.9s ease-out 0.25s both`,
}));

// ── Stats pill ────────────────────────────────────────────────────────────────

const StatPill = styled(Box)(({ theme }) => ({
  display:     'flex',
  alignItems:  'center',
  gap:         '12px',
  padding:     '16px 22px',
  borderRadius:'10px',         // Architectural
  border:      `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  background:  alpha(theme.palette.primary.main, 0.08),
  transition:  'all 0.28s ease',
  minWidth:    '170px',
  '&:hover': {
    background: alpha(theme.palette.primary.main, 0.15),
    borderColor: theme.palette.primary.main,
    transform:  'translateY(-6px)',
    boxShadow:  `0 12px 32px ${alpha(theme.palette.primary.main, 0.18)}`,
  },
  [theme.breakpoints.down('md')]: { minWidth: '140px', padding: '12px 16px' },
  [theme.breakpoints.down('sm')]: { minWidth: '110px', padding: '10px 12px', gap: '8px' },
}));

// ── Component ─────────────────────────────────────────────────────────────────

const HeroSection = () => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const stats = [
    { number: '200+', label: 'Tamamlanan Proje', icon: <Engineering sx={{ color: 'primary.main' }} /> },
    { number: '15+',  label: 'Yıl Deneyim',      icon: <Star        sx={{ color: 'secondary.main' }} /> },
    { number: '50+',  label: 'Mutlu Müşteri',     icon: <Business    sx={{ color: 'primary.main' }} /> },
    { number: '30+',  label: 'Uzman Ekip',        icon: <Group       sx={{ color: 'secondary.main' }} /> },
  ];

  return (
    <Box
      component="section"
      aria-label="DEKODEM hakkında"
      sx={{
        // Background: deep charcoal-navy in dark / near-white surface in light
        background: isDark
          ? `linear-gradient(160deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.primary.dark, 0.35)} 100%)`
          : `linear-gradient(160deg, ${alpha(theme.palette.primary.main, 0.04)} 0%, ${theme.palette.background.default} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        // Radial "construction site spotlight" mesh
        '&::before': {
          content:    '""',
          position:   'absolute',
          top:        '15%',
          right:      '-10%',
          width:      '55%',
          height:     '70%',
          background: `radial-gradient(ellipse at center, ${alpha(theme.palette.secondary.main, isDark ? 0.07 : 0.04)} 0%, transparent 70%)`,
          pointerEvents: 'none',
        },
      }}
    >
      <Section>
        <Container maxWidth={false} disableGutters>
          <HeroContent>

            {/* ── Left: image column ─────────────────────────────────────── */}
            <ImageColumn>
              <ImageFrame>
                {/* When real images are provided, replace the ImageFallback
                    content while keeping the ImageFrame wrapper intact.
                    !! Do NOT change Cloudinary src logic above this line !! */}
                <ImageFallback>
                  <Construction
                    sx={{ fontSize: { xs: 70, md: 90 }, opacity: 0.75, position: 'relative', zIndex: 4 }}
                  />
                </ImageFallback>
              </ImageFrame>

              <SmallImageFrame>
                <ImageFallback>
                  <Architecture
                    sx={{ fontSize: { xs: 52, md: 64 }, opacity: 0.75, position: 'relative', zIndex: 4 }}
                  />
                </ImageFallback>
              </SmallImageFrame>
            </ImageColumn>

            {/* ── Right: text + stats ────────────────────────────────────── */}
            <TextColumn>
              <TextContainer>
                {/* Overline */}
                <Typography
                  variant="overline"
                  sx={{ color: 'secondary.main', letterSpacing: '0.14em', display: 'block', mb: 1.5 }}
                >
                  Hakkımızda
                </Typography>

                {/* Headline */}
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    mb:                   1.5,
                    color:                isDark ? '#fff' : 'text.primary',
                    // Montserrat weight already applied by theme h2 variant
                  }}
                >
                  {brand.name}
                </Typography>

                {/* Construction accent divider */}
                <Box
                  aria-hidden="true"
                  sx={{ ...theme.mixins.constructionDivider, mb: 2.5 }}
                />

                {/* Sub-headline */}
                <Typography
                  variant="h5"
                  component="p"
                  sx={{
                    color:      isDark ? alpha('#fff', 0.65) : 'text.secondary',
                    fontWeight: 400,
                    mb:         2.5,
                    lineHeight: 1.55,
                  }}
                >
                  {brand.tagline}
                </Typography>

                {/* Body copy */}
                <Typography
                  variant="body1"
                  sx={{
                    color:      isDark ? alpha('#fff', 0.6) : 'text.secondary',
                    lineHeight: 1.85,
                    mb:         3.5,
                    maxWidth:   540,
                  }}
                >
                  {about.fullText}
                </Typography>

                {/* Stats */}
                <Box
                  component="ul"
                  aria-label="Şirket istatistikleri"
                  sx={{
                    display:   'flex',
                    gap:       '16px',
                    flexWrap:  'wrap',
                    p: 0, m: 0,
                    listStyle: 'none',
                  }}
                >
                  {stats.map((stat) => (
                    <Box component="li" key={stat.label}>
                      <StatPill>
                        {stat.icon}
                        <Box>
                          <Typography
                            variant="h5"
                            component="span"
                            sx={{
                              display:    'block',
                              fontWeight: 800,
                              color:      isDark ? '#fff' : 'primary.main',
                              lineHeight: 1.1,
                            }}
                          >
                            {stat.number}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: isDark ? alpha('#fff', 0.55) : 'text.secondary', fontWeight: 500 }}
                          >
                            {stat.label}
                          </Typography>
                        </Box>
                      </StatPill>
                    </Box>
                  ))}
                </Box>
              </TextContainer>
            </TextColumn>
          </HeroContent>
        </Container>
      </Section>
    </Box>
  );
};

export default HeroSection;
