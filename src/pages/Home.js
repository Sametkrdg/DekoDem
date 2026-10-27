// React
import React, { useEffect } from 'react';

// MUI
import { Box, Container, Typography, Button } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Components
import VisuallyHidden      from "../components/VisuallyHidden";
import AboutSection        from "../components/AboutSection";
import ActivitiesSection   from "../components/ActivitiesSection";
import GallerySection      from "../components/GallerySection";
import TestimonialsSection from "../components/TestimonialsSection";
import PartnersSection     from "../components/PartnersSection";
import ScrollReveal        from "../components/ScrollReveal";

// Context, constants & services
import { useSite }            from "../context/SiteContext";
import { brand }              from "../constants/siteContent";
import { PATHS }              from "../constants/navigation";
import { buildCloudinaryUrl } from "../services/cloudinary";

// ── Fallback hero — shown until the admin uploads a custom image ──────────────
// Swap this out for a local /public/assets/default-hero.jpg if you prefer an
// offline-capable fallback that doesn't depend on Unsplash.
const HERO_FALLBACK =
  "https://images.unsplash.com/photo-1726572628579-1158bbcc3b43" +
  "?auto=format&fit=crop&w=1600&q=85";

// ── HomeHero ──────────────────────────────────────────────────────────────────
const HomeHero = ({ siteTitle, tagline, heroImageUrl }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === "dark";
  const orange = theme.palette.secondary?.main ?? theme.palette.primary.main;

  // In dark mode fade to the page background instead of white
  const fadeTarget = isDark ? "#000000" : "#ffffff";
  const bgImage    = heroImageUrl || HERO_FALLBACK;

  // ── LCP optimisation — inject <link rel="preload"> into <head> ────────────
  // CSS background-image URLs are discovered only after CSSOM is built.
  // Adding a preload hint lets the browser fetch the image in parallel with
  // HTML/CSS parsing, dramatically improving the LCP score.
  useEffect(() => {
    document.getElementById('hero-img-preload')?.remove();

    const link = document.createElement('link');
    link.id   = 'hero-img-preload';
    link.rel  = 'preload';
    link.as   = 'image';
    link.href = bgImage;
    link.setAttribute('fetchpriority', 'high');
    document.head.appendChild(link);

    return () => document.getElementById('hero-img-preload')?.remove();
  }, [bgImage]);

  return (
    <Box
      component="section"
      aria-label="Hero"
      sx={{
        position: "relative",
        width:    "100%",
        height:   { xs: 420, sm: 520, md: 620 },
        overflow: "hidden",
      }}
    >
      {/* ── Hero image ────────────────────────────────────────────────────────
          Rendered as <img> rather than a CSS background so the browser can
          register it as the LCP candidate.  fetchPriority="high" (React 19
          camelCase → HTML fetchpriority) skips the default low-priority queue
          for images below the fold.  aria-hidden keeps screen-readers away
          from a purely decorative asset. */}
      <Box
        component="img"
        src={bgImage}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        sx={{
          position:       "absolute",
          inset:          0,
          width:          "100%",
          height:         "100%",
          objectFit:      "cover",
          objectPosition: "center 35%",
          display:        "block",
          userSelect:     "none",
          pointerEvents:  "none",
        }}
      />

      {/* Gradient overlay ─────────────────────────────────────────────────────
          Two-stop dark overlay at the top ensures white text stays legible
          against any dynamically uploaded image (critical for dark mode where
          an uploaded bright image would otherwise destroy contrast).
          Bottom half fades to the page background for a seamless transition. */}
      <Box
        aria-hidden="true"
        sx={{
          position:   "absolute",
          inset:      0,
          background: `linear-gradient(
            to bottom,
            rgba(0,0,0,${isDark ? 0.42 : 0.24})  0%,
            rgba(0,0,0,0.12)                      45%,
            ${alpha(fadeTarget, 0.60)}             72%,
            ${fadeTarget}                         100%
          )`,
          zIndex: 1,
        }}
      />

      {/* Text content */}
      <Container
        maxWidth="lg"
        sx={{
          position:       "relative",
          zIndex:         2,
          height:         "100%",
          display:        "flex",
          flexDirection:  "column",
          justifyContent: "center",
          pt:             { xs: 10, md: 12 },
          pb:             { xs: 8,  md: 6  },
        }}
      >
        {/* Eyebrow */}
        <Typography
          variant="overline"
          sx={{
            color:         alpha(orange, 0.95),
            fontWeight:    700,
            letterSpacing: "0.2em",
            display:       "block",
            mb:            1.5,
            textShadow:    "0 1px 6px rgba(0,0,0,0.35)",
          }}
        >
          {tagline}
        </Typography>

        {/* Main headline */}
        <Typography
          variant="h1"
          component="span"
          fontWeight={900}
          sx={{
            display:    "block",
            lineHeight: 1.1,
            fontSize:   { xs: "2.4rem", sm: "3.2rem", md: "4rem" },
            color:      "#fff",
            textShadow: "0 2px 16px rgba(0,0,0,0.45)",
            maxWidth:   680,
            mb:         1.5,
          }}
        >
          {siteTitle}
        </Typography>

        {/* Sub-headline */}
        <Typography
          variant="h6"
          component="p"
          sx={{
            color:      "rgba(255,255,255,0.88)",
            fontWeight: 400,
            lineHeight: 1.65,
            maxWidth:   480,
            mb:         3.5,
            textShadow: "0 1px 8px rgba(0,0,0,0.4)",
            fontSize:   { xs: "1rem", md: "1.15rem" },
          }}
        >
          Yapı, dekorasyon ve iç mimarlıkta anahtar teslim çözümler.
        </Typography>

        {/* CTA */}
        <Box>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to={PATHS.CONTACT}
            endIcon={<ArrowForward />}
            sx={{
              bgcolor:       orange,
              color:         "#fff",
              fontWeight:    700,
              borderRadius:  "50px",
              px:            4,
              py:            1.4,
              fontSize:      "0.95rem",
              boxShadow:     `0 8px 28px ${alpha(orange, 0.5)}`,
              textTransform: "none",
              "&:hover": {
                bgcolor:   theme.palette.secondary?.dark ?? alpha(orange, 0.85),
                transform: "translateY(-2px)",
                boxShadow: `0 12px 36px ${alpha(orange, 0.55)}`,
              },
              transition: "all 0.22s ease",
            }}
          >
            Ücretsiz Keşif Talep Et
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────
function Home() {
  const { settings, contactSettings } = useSite();
  const siteTitle = settings?.title   || brand.name;
  const tagline   = settings?.tagline || brand.tagline;

  // Build a Cloudinary-optimised hero URL (f_auto + q_auto are injected by
  // buildCloudinaryUrl).  w_1920 + c_limit avoids upscaling smaller uploads
  // while still delivering a full-bleed image on retina displays.
  // Falls back to HERO_FALLBACK (Unsplash) when the admin hasn't set one yet.
  const rawHeroUrl   = contactSettings?.HeroImageUrl || null;
  const heroImageUrl = rawHeroUrl
    ? buildCloudinaryUrl(rawHeroUrl, { width: 1920, crop: 'limit' })
    : null;

  return (
    <>
      {/* Visually-hidden H1 for screen readers (hero span carries the visual) */}
      <VisuallyHidden component="h1">{siteTitle} — Profesyonel Yapı Çözümleri</VisuallyHidden>

      {/* 1. Full-bleed hero — dynamic Cloudinary image, LCP-optimised.
             Not wrapped in ScrollReveal: it's the LCP element above the fold. */}
      <HomeHero siteTitle={siteTitle} tagline={tagline} heroImageUrl={heroImageUrl} />

      {/* 2. About / company intro */}
      <ScrollReveal><AboutSection /></ScrollReveal>

      {/* 3. Service categories grid */}
      <ScrollReveal><ActivitiesSection /></ScrollReveal>

      {/* 4. Photo gallery — data fetched internally via Firestore */}
      <ScrollReveal><GallerySection /></ScrollReveal>

      {/* 5. Testimonials */}
      <ScrollReveal><TestimonialsSection /></ScrollReveal>

      {/* 6. Partners / clients logo strip */}
      <ScrollReveal><PartnersSection /></ScrollReveal>
    </>
  );
}

export default Home;
