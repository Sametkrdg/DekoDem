/**
 * About.js — "Hakkımızda" page
 *
 * Structure (semantic HTML):
 *   <article>
 *     <section> Hero banner
 *     <section> Full about text + references card
 *     <section> Work process steps  (tinted bg — contrasts with About section)
 *     <section> Founders' vision (Sedat Demir & Arda Demir)
 *     <section> Technical standards / fact sheet
 *     <section> Quality claims strip
 *     <section> ValuesSection (core pillars)
 *     <section> ContactSection CTA
 *   </article>
 *
 * All corporate strings come from siteContent.js (single source of truth).
 */

import React from 'react';

import {
  Box, Container, Typography, Grid, Paper,
  Chip, Divider, Button, Fade,
} from '@mui/material';
import {
  CheckCircleOutline, Bolt, FormatQuote, ArrowForward,
  VerifiedUser, Shield,
} from '@mui/icons-material';
import { alpha, useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

import ValuesSection  from '../components/ValueSection';
import ContactSection from '../components/ContactSection';
import ScrollReveal   from '../components/ScrollReveal';

import {
  brand, about, references, workProcess,
  founders, technicalStandards, qualityClaims,
} from '../constants/siteContent';
import { PATHS } from '../constants/navigation';
import { useSite } from '../context/SiteContext';

// ── Work process step card ────────────────────────────────────────────────────
const ProcessCard = ({ step, label }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const color  = theme.palette.primary.main;

  return (
    <Box sx={{ textAlign: 'center', py: 1.5 }}>
      <Box
        aria-hidden="true"
        sx={{
          display:        'inline-flex',
          alignItems:     'center',
          justifyContent: 'center',
          width:  48,
          height: 48,
          borderRadius:   '50%',
          border:         '2px solid',
          borderColor:    alpha(color, isDark ? 0.5 : 0.4),
          bgcolor:        alpha(color, isDark ? 0.12 : 0.07),
          color,
          fontWeight:     800,
          fontSize:       '1.1rem',
          mb:             1.25,
        }}
      >
        {step}
      </Box>
      <Typography variant="body2" fontWeight={600} color="text.primary" sx={{ lineHeight: 1.4 }}>
        {label}
      </Typography>
    </Box>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────
const About = () => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { aboutContent } = useSite();
  const color  = theme.palette.primary.main;

  return (
    <Box component="article" sx={{ bgcolor: 'background.default' }}>

      {/* ── Hero Banner ──────────────────────────────────────────────────────── */}
      <Box
        component="section"
        aria-label="Sayfa başlığı"
        sx={{
          background: isDark
            ? '#000000'
            : 'linear-gradient(135deg, #1a365d 0%, #2c5282 100%)',
          color: '#fff',
          py: { xs: 9, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse 60% 60% at 80% 50%, ${alpha(color, 0.25)}, transparent)`,
            pointerEvents: 'none',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Typography
            variant="overline"
            component="p"
            sx={{ color: alpha('#fff', 0.65), letterSpacing: 3 }}
          >
            Hakkımızda
          </Typography>
          <Typography
            variant="h2"
            component="h1"
            fontWeight={800}
            sx={{ mt: 1, mb: 2, maxWidth: 680 }}
          >
            {brand.name}
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: alpha('#fff', 0.75), fontWeight: 400, maxWidth: 560, lineHeight: 1.7, mb: 3 }}
          >
            {brand.tagline}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip label="Kocaeli / İzmit" size="small" sx={{ bgcolor: alpha('#fff', 0.15), color: '#fff', border: '1px solid rgba(255,255,255,0.25)', fontWeight: 600 }} />
            <Chip label="200+ Kurumsal Proje" size="small" sx={{ bgcolor: alpha('#fff', 0.15), color: '#fff', border: '1px solid rgba(255,255,255,0.25)', fontWeight: 600 }} />
            <Chip label="Anahtar Teslim" size="small" sx={{ bgcolor: alpha('#fff', 0.15), color: '#fff', border: '1px solid rgba(255,255,255,0.25)', fontWeight: 600 }} />
          </Box>
        </Container>
      </Box>

      {/* ── Main Content: About text + References ────────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 } }} component="section" aria-label="Firma hakkında">
        <Grid container spacing={6} alignItems="flex-start">

          {/* Left — full about text */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                mb: 4, p: 3,
                borderRadius: 3, border: '1px solid', borderColor: 'divider',
                bgcolor: 'background.paper',
                display: 'inline-flex', alignItems: 'center', gap: 2,
              }}
            >
              <Box
                component="img"
                src={brand.logoSrc}
                alt={brand.logoAlt}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                sx={{ height: 52, objectFit: 'contain' }}
              />
              <Typography variant="h5" fontWeight={800} color="primary.main">
                {brand.name}
              </Typography>
            </Box>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.9, mb: 3 }}
            >
              {aboutContent.AboutLong || about.fullText}
            </Typography>

            <Box
              component="ul"
              aria-label="Öne çıkan özellikler"
              sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 0, listStyle: 'none', mb: 4 }}
            >
              {about.highlights.map((h) => (
                <Box key={h} component="li" sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <CheckCircleOutline
                    sx={{ color: 'primary.main', mt: 0.25, flexShrink: 0 }}
                    fontSize="small"
                    aria-hidden="true"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {h}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* CTA — drives to contact */}
            <Button
              variant="contained"
              component={RouterLink}
              to={PATHS.CONTACT}
              endIcon={<ArrowForward />}
              sx={{ borderRadius: '50px', fontWeight: 700, px: 3.5 }}
            >
              Ücretsiz Keşif Talep Et
            </Button>
          </Grid>

          {/* Right — references card */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              component="aside"
              aria-label="Referans markalarımız"
              sx={{
                p: { xs: 3, md: 4 },
                border: '1px solid', borderColor: 'divider', borderRadius: '24px',
                boxShadow: 'none',
                // Apple-system dark surface — Midnight card, no glass tint
                bgcolor:   isDark ? '#1C1C1E' : 'background.paper',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box
                  sx={{ p: 1, borderRadius: 2, bgcolor: alpha(color, 0.1), color: 'primary.main', display: 'flex' }}
                  aria-hidden="true"
                >
                  <Bolt />
                </Box>
                <Box>
                  <Typography variant="overline" color="primary.main" fontWeight={700} sx={{ lineHeight: 1 }}>
                    Referanslarımız
                  </Typography>
                  <Typography variant="h6" fontWeight={700}>
                    Güvenilen Markalar
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Box
                component="ul"
                sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, p: 0, listStyle: 'none', mb: 3 }}
              >
                {references.map((ref) => (
                  <Box component="li" key={ref.name}>
                    <Chip
                      label={ref.name}
                      title={ref.description}
                      variant="outlined"
                      sx={{
                        fontWeight: 700, fontSize: '0.9rem',
                        px: 1, py: 2.5, borderRadius: '10px',
                        borderColor: alpha(color, 0.4), color: 'primary.main',
                        bgcolor: alpha(color, isDark ? 0.1 : 0.04),
                        '&:hover': { bgcolor: alpha(color, isDark ? 0.18 : 0.08), borderColor: 'primary.main' },
                      }}
                    />
                  </Box>
                ))}
              </Box>

              <Box
                sx={{
                  p: 2.5, borderRadius: 2,
                  bgcolor: alpha(color, isDark ? 0.12 : 0.05),
                  border: '1px solid', borderColor: alpha(color, 0.2),
                }}
              >
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  Sektörün önde gelen markalarıyla kurduğumuz uzun soluklu iş birlikleri,{' '}
                  <Typography component="span" variant="body2" color="primary.main" fontWeight={700}>
                    kalite ve güvenilirliğimizin
                  </Typography>{' '}
                  en somut göstergesidir. Her projede kurumsal standartta sonuçlar teslim etmeyi taahhüt ediyoruz.
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* CTA — drives to projects */}
              <Button
                variant="outlined"
                component={RouterLink}
                to={PATHS.PROJECTS}
                endIcon={<ArrowForward />}
                fullWidth
                sx={{ borderRadius: '50px', fontWeight: 600 }}
              >
                Projelerimizi İnceleyin
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* ── Work Process strip ───────────────────────────────────────────────── */}
      <Box
        component="section"
        aria-label="Çalışma sürecimiz"
        sx={{
          // Apple-system dark canvas — strictly Pure Black in dark mode
          bgcolor:      isDark ? '#000000' : alpha(color, 0.04),
          borderTop:    '1px solid',
          borderBottom: '1px solid',
          borderColor:  'divider',
          py: { xs: 7, md: 9 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 6 } }}>
            <Typography
              variant="overline"
              sx={{
                display:       'block',
                color:         'primary.main',
                fontWeight:    700,
                letterSpacing: '0.1em',
                mb:            1,
              }}
            >
              ÇALIŞMA SÜRECİMİZ
            </Typography>
            <Typography variant="h5" fontWeight={700}>
              Projeden Teslimata
            </Typography>
          </Box>
          <Grid container spacing={{ xs: 3, md: 2 }} justifyContent="center" component="ol" sx={{ listStyle: 'none', p: 0, m: 0 }}>
            {workProcess.map((proc) => (
              <Grid size={{ xs: 6, sm: 4, md: 2 }} key={proc.step} component="li">
                <ProcessCard step={proc.step} label={proc.label} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── Founder Vision ───────────────────────────────────────────────────── */}
      <Box
        component="section"
        aria-label="Kurucu vizyonu"
        sx={{
          // Apple-system dark canvas — strictly Pure Black in dark mode
          bgcolor:      isDark ? '#000000' : alpha(color, 0.03),
          borderTop:    '1px solid',
          borderBottom: '1px solid',
          borderColor:  'divider',
          py: { xs: 7, md: 10 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="overline" color="primary.main" fontWeight={700} letterSpacing={3}>
              Kurucu Vizyonu
            </Typography>
            <Typography variant="h4" fontWeight={800} sx={{ mt: 0.5, letterSpacing: '-0.02em' }}>
              Kurucularımız
            </Typography>
          </Box>

          {/* Equalizer: both founder cards stretch to the taller one */}
          <Grid container spacing={3} alignItems="stretch">
            {founders.map((person, idx) => (
              <Grid size={{ xs: 12, md: 6 }} key={person.name} sx={{ display: 'flex' }}>
                <Fade in timeout={500} style={{ transitionDelay: `${idx * 100}ms` }}>
                  <Paper
                    elevation={0}
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      p: { xs: 3.5, md: '44px 40px' },
                      borderRadius: '24px',
                      border: '1px solid',
                      borderColor: isDark ? 'rgba(255,255,255,0.10)' : alpha(color, 0.15),
                      boxShadow: 'none',
                      position: 'relative',
                      // Apple-system Midnight card — no glass tint
                      bgcolor: isDark ? '#1C1C1E' : 'background.paper',
                      transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s ease',
                      '&:hover': {
                        transform:   'scale(1.02)',
                        borderColor: alpha(color, isDark ? 0.55 : 0.45),
                      },
                    }}
                  >
                    <FormatQuote
                      aria-hidden="true"
                      sx={{
                        fontSize: 56,
                        color: alpha(color, 0.2),
                        position: 'absolute',
                        top: 16, left: { xs: 16, md: 20 },
                        transform: 'scaleX(-1)',
                      }}
                    />

                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                      <Typography variant="h5" component="h3" fontWeight={800} sx={{ letterSpacing: '-0.01em' }}>
                        {person.name}
                      </Typography>
                      <Typography variant="body2" color="primary.main" fontWeight={700} sx={{ mt: 0.5 }}>
                        {person.title}
                      </Typography>
                    </Box>

                    <Typography
                      variant="h6"
                      color="text.primary"
                      sx={{
                        fontStyle: 'italic',
                        lineHeight: 1.8,
                        fontWeight: 500,
                        fontSize: { xs: '1.02rem', md: '1.1rem' },
                        textAlign: 'center',
                      }}
                    >
                      {person.vision}
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ lineHeight: 1.8, textAlign: 'center', mt: 'auto' }}
                    >
                      {person.bio}
                    </Typography>
                  </Paper>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── Technical Standards Fact Sheet ───────────────────────────────────── */}
      <Container maxWidth="lg" component="section" aria-label="Teknik standartlar" sx={{ py: { xs: 7, md: 10 } }}>
        <Grid container spacing={6} alignItems="flex-start">

          {/* Left: Quality claims */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Box
                aria-hidden="true"
                sx={{ p: 1.25, borderRadius: 2, bgcolor: alpha(color, 0.1), color: 'primary.main', display: 'flex' }}
              >
                <VerifiedUser />
              </Box>
              <Box>
                <Typography variant="overline" color="primary.main" fontWeight={700} sx={{ lineHeight: 1 }}>
                  Kalite Güvencesi
                </Typography>
                <Typography variant="h5" fontWeight={700}>
                  Neden DEKODEM?
                </Typography>
              </Box>
            </Box>

            <Box
              component="ul"
              sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 0, listStyle: 'none', mb: 4 }}
            >
              {qualityClaims.map((claim) => (
                <Box
                  key={claim}
                  component="li"
                  sx={{
                    display: 'flex', alignItems: 'flex-start', gap: 1.5,
                    p: 2, borderRadius: '12px',
                    border: '1px solid',
                    borderColor: isDark ? 'rgba(255,255,255,0.08)' : alpha(color, 0.1),
                    // Apple-system Midnight card (no gold tint)
                    bgcolor:     isDark ? '#1C1C1E' : alpha(color, 0.03),
                  }}
                >
                  <CheckCircleOutline
                    sx={{ color: 'primary.main', mt: '2px', flexShrink: 0, fontSize: 20 }}
                    aria-hidden="true"
                  />
                  <Typography variant="body2" fontWeight={500} sx={{ lineHeight: 1.6 }}>
                    {claim}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* CTA */}
            <Button
              variant="contained"
              component={RouterLink}
              to={PATHS.ACTIVITIES}
              endIcon={<ArrowForward />}
              sx={{ borderRadius: '50px', fontWeight: 700, px: 3.5 }}
            >
              Faaliyet Alanlarımız
            </Button>
          </Grid>

          {/* Right: Technical standards */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                border: '1px solid', borderColor: 'divider', borderRadius: '24px',
                boxShadow: 'none',
                // Apple-system Midnight card — no glass tint
                bgcolor:   isDark ? '#1C1C1E' : 'background.paper',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box
                  aria-hidden="true"
                  sx={{ p: 1.25, borderRadius: 2, bgcolor: alpha(color, 0.1), color: 'primary.main', display: 'flex' }}
                >
                  <Shield />
                </Box>
                <Box>
                  <Typography variant="overline" color="primary.main" fontWeight={700} sx={{ lineHeight: 1 }}>
                    Standartlar
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    Uygulanan Teknik Normlar
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Box component="dl" sx={{ m: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {technicalStandards.map((std) => (
                  <Box
                    key={std.code}
                    sx={{
                      display: 'flex', alignItems: 'flex-start', gap: 2,
                      p: 2, borderRadius: '12px',
                      // Inner tiles use the elevated Midnight tone for hierarchy on Apple-system dark
                      bgcolor:     isDark ? '#161617' : alpha(color, 0.03),
                      border:      '1px solid',
                      borderColor: isDark ? 'rgba(255,255,255,0.08)' : alpha(color, 0.08),
                    }}
                  >
                    <Box sx={{ flexShrink: 0 }}>
                      <Chip
                        component="dt"
                        label={std.code}
                        size="small"
                        sx={{
                          fontFamily: 'monospace', fontWeight: 700, fontSize: '0.72rem',
                          bgcolor: alpha(color, 0.12), color: 'primary.main',
                          border: '1px solid', borderColor: alpha(color, 0.25),
                        }}
                      />
                    </Box>
                    <Typography
                      component="dd"
                      variant="body2"
                      color="text.secondary"
                      sx={{ m: 0, lineHeight: 1.6, pt: '2px' }}
                    >
                      {std.desc}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 3 }} />
              <Typography variant="caption" color="text.disabled" sx={{ display: 'block', lineHeight: 1.6 }}>
                Tüm projelerimiz ilgili Türk Standartları (TS) ve Avrupa Normları (EN) çerçevesinde
                projelendirilir ve uygulanır. Standart belgelerine talep halinde ulaşabilirsiniz.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* ── Values Section (core pillars + full process) ─────────────────────── */}
      <ScrollReveal><ValuesSection /></ScrollReveal>

      {/* ── Contact CTA ────────────────────────────────────────────────────── */}
      <ScrollReveal><ContactSection /></ScrollReveal>

    </Box>
  );
};

export default About;
