/**
 * ValueCard.jsx — Reusable "trust pillar" card component.
 *
 * Used on the homepage (AboutSection right column) and About page
 * to communicate DEKODEM's four core value propositions without
 * relying on inflated vanity metrics.
 *
 * Props
 * ─────────────────────────────────────────────────────────────────────────────
 *   icon        {React.Element}  MUI SvgIcon element
 *   title       {string}         Short heading (≤ 5 words)
 *   description {string}         Supporting text (1–2 sentences)
 *   accentColor {string}         Optional hex override; defaults to primary
 *   compact     {boolean}        Smaller padding for tight layouts (default false)
 *   sx          {object}         Extra MUI sx props for the outer Box
 */

import React from "react";
import { Box, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

const ValueCard = ({
  icon,
  title       = "",
  description = "",
  accentColor,
  compact     = false,
  sx          = {},
}) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === "dark";

  const color  = accentColor || theme.palette.primary.main;
  const p      = compact ? 2.5 : 3;

  return (
    <Box
      sx={{
        p,
        height:               "100%",
        borderRadius:         "18px",
        border:               "1px solid",
        // Light mode: white card with a clear 1px accent border — WCAG AA compliant
        // Dark mode:  glass surface with subtle border
        borderColor:          isDark
          ? theme.glass.border
          : alpha(color, 0.28),
        background:           isDark
          ? theme.glass.bgSubtle
          : "#ffffff",
        backdropFilter:       isDark ? theme.glass.blur : "none",
        WebkitBackdropFilter: isDark ? theme.glass.blur : "none",
        // Enforce equal height regardless of content length
        display:              "flex",
        flexDirection:        "column",
        alignItems:           "flex-start",
        gap:                  1.5,
        // Left accent stripe for visual anchoring in light mode
        borderLeft:           isDark ? undefined : `4px solid ${color}`,
        transition:           "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
        "&:hover": {
          borderColor: isDark
            ? alpha(color, 0.45)
            : color,
          transform:   "translateY(-5px)",
          boxShadow:   isDark
            ? `0 14px 36px rgba(0,0,0,0.55), 0 0 0 1px ${alpha(color, 0.18)}`
            : `0 12px 30px ${alpha(color, 0.15)}`,
        },
        ...sx,
      }}
    >
      {/* Icon bubble */}
      <Box
        aria-hidden="true"
        sx={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          width:          52,
          height:         52,
          borderRadius:   "14px",
          bgcolor:        isDark
              ? alpha(color, 0.18)
              : alpha(color, 0.1),
          color,
          flexShrink:     0,
          "& svg": { fontSize: 26 },
        }}
      >
        {icon}
      </Box>

      {/* Title */}
      <Typography
        variant="subtitle1"
        component="h3"
        fontWeight={700}
        sx={{
          lineHeight:   1.25,
          // WCAG AA: text.primary is #1e293b on white — contrast ratio ~14:1
          color:        "text.primary",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </Typography>

      {/* Description */}
      {description && (
        <Typography
          variant="body2"
          sx={{
            lineHeight: 1.7,
            mt:         "auto",
            // WCAG AA: MUI text.secondary is #64748b on white — contrast 4.6:1 ✓
            color:      "text.secondary",
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default ValueCard;
