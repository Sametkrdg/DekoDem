/**
 * ValueSection.js — "Neden DEKODEM?" section.
 *
 * Renders two sub-sections:
 *   1. Core Value Pillars (4× ValueCard) — replaces fabricated numeric counters
 *   2. Work Process (5-step horizontal stepper) — Çalışma Sürecimiz
 *
 * All strings come from siteContent.js (single source of truth).
 * Fully theme-aware: works in both light and dark mode.
 */

import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import {
  Search, Schedule, Engineering, FavoriteBorder,
} from "@mui/icons-material";
import { alpha, useTheme } from "@mui/material/styles";

import ValueCard      from "./ValueCard.jsx";
import { coreValues, workProcess } from "../constants/siteContent";

// ── Icon registry ─────────────────────────────────────────────────────────────
// Maps the string stored in siteContent to an actual MUI icon element.
// Keeping icons here (presentation layer) rather than in constants (data layer).
const ICON_MAP = {
  Search:        <Search />,
  Schedule:      <Schedule />,
  Engineering:   <Engineering />,
  FavoriteBorder:<FavoriteBorder />,
};

// ── Work Process step ─────────────────────────────────────────────────────────
const ProcessStep = ({ step, label, isLast }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === "dark";
  const color  = theme.palette.primary.main;

  return (
    <Box
      sx={{
        display:    "flex",
        flexDirection: { xs: "row", md: "column" },
        alignItems: { xs: "flex-start", md: "center" },
        gap:        { xs: 1.5, md: 1 },
        flex:       1,
        position:   "relative",
        // Connector line between steps (desktop only)
        "&:not(:last-child)::after": {
          content:  '""',
          display:  { xs: "none", md: "block" },
          position: "absolute",
          top:      24,
          left:     "calc(50% + 22px)",
          right:    "calc(-50% + 22px)",
          height:   2,
          bgcolor:  alpha(color, isDark ? 0.25 : 0.18),
        },
      }}
    >
      {/* Step number bubble */}
      <Box
        aria-hidden="true"
        sx={{
          width:          44,
          height:         44,
          borderRadius:   "50%",
          flexShrink:     0,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          fontWeight:     800,
          fontSize:       "1rem",
          color,
          border:         "2px solid",
          borderColor:    alpha(color, isDark ? 0.5 : 0.35),
          bgcolor:        alpha(color, isDark ? 0.14 : 0.06),
          zIndex:         1,
        }}
      >
        {step}
      </Box>

      {/* Step label */}
      <Typography
        variant="body2"
        fontWeight={600}
        sx={{
          textAlign:  { xs: "left", md: "center" },
          lineHeight: 1.4,
          color:      isDark ? "rgba(255,255,255,0.82)" : "text.primary",
          mt:         { xs: 0, md: 0.75 },
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────

const ValueSection = () => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      component="section"
      aria-label="Neden DEKODEM ve Çalışma Sürecimiz"
      sx={{
        py:       { xs: 9, md: 13 },
        ...theme.mixins.sectionSurface,
        position: "relative",
        overflow: "hidden",
        // Subtle radial decoration
        "&::before": {
          content:    '""',
          position:   "absolute",
          bottom:     "-10%",
          left:       "-5%",
          width:      "50%",
          height:     "70%",
          background: `radial-gradient(ellipse at center, ${alpha(theme.palette.primary.main, isDark ? 0.06 : 0.04)} 0%, transparent 70%)`,
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg">

        {/* ── Section header ── */}
        <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
          <Typography
            variant="overline"
            sx={{ color: "primary.main", fontWeight: 700, letterSpacing: "0.12em", display: "block", mb: 1 }}
          >
            NEDEN DEKODEM?
          </Typography>
          <Typography
            variant="h3"
            component="h2"
            fontWeight={800}
            sx={{
              fontSize:             { xs: "1.9rem", md: "2.4rem" },
              lineHeight:           1.2,
              mb:                   2,
              background:           isDark
                ? `linear-gradient(135deg, #fff 30%, ${alpha(theme.palette.primary.light, 0.85)} 100%)`
                : `linear-gradient(135deg, ${theme.palette.text.primary} 30%, ${theme.palette.primary.main} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor:  "transparent",
            }}
          >
            Değer Önerilerimiz
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 560, mx: "auto", lineHeight: 1.8 }}
          >
            İşletmelere değer katacak projelerde birlikte çalışmaktan memnuniyet duyarız.
            İşte bizi tercih etmeniz için dört somut neden:
          </Typography>
        </Box>

        {/* ── Core Value Pillars (4-up grid) ── */}
        <Grid
          container
          spacing={3}
          alignItems="stretch"
          component="ul"
          aria-label="Değer önerileri"
          sx={{ listStyle: "none", p: 0, mb: { xs: 8, md: 11 } }}
        >
          {coreValues.map((val) => (
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}
              key={val.id}
              component="li"
              sx={{ display: "flex" }}
            >
              <ValueCard
                icon={ICON_MAP[val.icon] ?? <Engineering />}
                title={val.title}
                description={val.description}
              />
            </Grid>
          ))}
        </Grid>

        {/* ── Work Process ── */}
        <Box>
          <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}>
            <Typography
              variant="overline"
              sx={{ color: "primary.main", fontWeight: 700, letterSpacing: "0.12em", display: "block", mb: 1 }}
            >
              ÇALIŞMA SÜRECİMİZ
            </Typography>
            <Typography
              variant="h4"
              component="h2"
              fontWeight={800}
              sx={{ fontSize: { xs: "1.5rem", md: "1.9rem" } }}
            >
              5 Adımda Anahtar Teslim
            </Typography>
          </Box>

          {/* Steps */}
          <Box
            component="ol"
            aria-label="Çalışma süreci adımları"
            sx={{
              listStyle: "none",
              p:         0,
              display:   "flex",
              flexDirection: { xs: "column", md: "row" },
              gap:       { xs: 3, md: 0 },
            }}
          >
            {workProcess.map((proc, idx) => (
              <ProcessStep
                key={proc.step}
                step={proc.step}
                label={proc.label}
                isLast={idx === workProcess.length - 1}
              />
            ))}
          </Box>
        </Box>

      </Container>
    </Box>
  );
};

export default ValueSection;
