// React
import React from 'react';

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

// Context & constants
import { useSite }  from "../context/SiteContext";
import { brand }    from "../constants/siteContent";
import { PATHS }    from "../constants/navigation";

// ── Unsplash hero image ───────────────────────────────────────────────────────
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1726572628579-1158bbcc3b43" +
  "?auto=format&fit=crop&w=1600&q=85";

// ── HomeHero ──────────────────────────────────────────────────────────────────
const HomeHero = ({ siteTitle, tagline }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === "dark";
  const orange = theme.palette.secondary?.main ?? theme.palette.primary.main;

  // In dark mode fade to the page background colour instead of white
  const fadeTarget = isDark ? "#0d1117" : "#ffffff";

  return (
    <Box
      component="section"
      aria-label="Hero"
      sx={{
        position:   "relative",
        width:      "100%",
        height:     { xs: 420, sm: 520, md: 620 },
        overflow:   "hidden",
        // Forest photo
        backgroundImage:    `url('${HERO_IMAGE}')`,
        backgroundSize:     "cover",
        backgroundPosition: "center 35%",  // keep canopy visible
        backgroundRepeat:   "no-repeat",
      }}
    >
      {/* Gradient overlay — fades image to page bg at the bottom */}
      <Box
        aria-hidden="true"
        sx={{
          position:   "absolute",
          inset:      0,
          background: `linear-gradient(
            to bottom,
            rgba(0,0,0,0.18)  0%,
            rgba(0,0,0,0.10) 45%,
            ${alpha(fadeTarget, 0.55)} 72%,
            ${fadeTarget}            100%
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
              bgcolor:      orange,
              color:        "#fff",
              fontWeight:   700,
              borderRadius: "50px",
              px:           4,
              py:           1.4,
              fontSize:     "0.95rem",
              boxShadow:    `0 8px 28px ${alpha(orange, 0.5)}`,
              textTransform:"none",
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
  const { settings } = useSite();
  const siteTitle    = settings?.title   || brand.name;
  const tagline      = settings?.tagline || brand.tagline;

  return (
    <>
      {/* Visually-hidden H1 for screen readers (hero span carries the visual) */}
      <VisuallyHidden component="h1">{siteTitle} — Profesyonel Yapı Çözümleri</VisuallyHidden>

      {/* 1. Full-bleed forest hero with fade-to-white gradient */}
      <HomeHero siteTitle={siteTitle} tagline={tagline} />

      {/* 2. About / company intro */}
      <AboutSection />

      {/* 3. Service categories grid */}
      <ActivitiesSection />

      {/* 4. Photo gallery — data fetched internally via Firestore */}
      <GallerySection />

      {/* 5. Testimonials */}
      <TestimonialsSection />

      {/* 6. Partners / clients logo strip */}
      <PartnersSection />
    </>
  );
}

export default Home;
