/**
 * ValueCard.jsx — "Değer Önerileri" pillar card.
 *
 * Applies the Phase 1 luxury rules:
 *   - 24px radius
 *   - 1px hairline border, no shadow
 *   - Equalizer: flex column, height 100%
 *   - Hover: scale(1.02) + Champagne Gold border, no shadow
 *
 * Props
 * ─────────────────────────────────────────────────────────────────────────────
 *   icon        {React.Element}  MUI SvgIcon element
 *   title       {string}         Short heading (≤ 5 words)
 *   description {string}         Supporting text (1–2 sentences)
 *   accentColor {string}         Optional hex override; defaults to primary (gold)
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

  const gold     = accentColor || theme.palette.primary.main;
  const hairline = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";
  const p        = compact ? 2.5 : 3.5;

  return (
    <Box
      sx={{
        p,
        width:         "100%",
        height:        "100%",
        display:       "flex",
        flexDirection: "column",
        alignItems:    "flex-start",
        gap:           1.5,
        borderRadius:  "24px",
        border:        "1px solid",
        borderColor:   hairline,
        bgcolor:       "background.paper",
        boxShadow:     "none",
        transition:    "transform 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s ease",
        "&:hover": {
          transform:   "scale(1.02)",
          borderColor: alpha(gold, isDark ? 0.55 : 0.45),
        },
        ...sx,
      }}
    >
      {/* Icon bubble — gold tint, no shadow */}
      <Box
        aria-hidden="true"
        sx={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          width:          52,
          height:         52,
          borderRadius:   "14px",
          bgcolor:        alpha(gold, isDark ? 0.18 : 0.10),
          color:          gold,
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
          lineHeight:    1.25,
          letterSpacing: "-0.01em",
          color:         "text.primary",
        }}
      >
        {title}
      </Typography>

      {/* Description — WCAG-AA via theme text.secondary */}
      {description && (
        <Typography
          variant="body2"
          sx={{
            lineHeight: 1.6,
            mt:         "auto",
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
