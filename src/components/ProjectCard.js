/**
 * ProjectCard.js — Text-only luxury listing card for the Projects page.
 *
 * Props (unchanged for caller compatibility):
 *   project   { id, name, summary? }
 *   imageUrl  IGNORED — kept in the signature so existing call sites don't break.
 *             Project photos are now shown only on the Detail page.
 *   onSelect  () => void — navigate to detail page
 *
 * Design rules applied:
 *   - Text-only: no Vault, no image, no Cloudinary call in the card
 *   - "The Equalizer": flex column, height:100%, CTA pinned via mt:auto
 *   - 24px radius, 1px hairline border, no heavy shadows
 *   - Hover: scale(1.02) + Champagne Gold border shift
 */
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { ArrowForward } from "@mui/icons-material";

// eslint-disable-next-line no-unused-vars
const ProjectCard = ({ project, imageUrl, onSelect }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === "dark";
  const gold   = theme.palette.primary.main;

  const name = project?.name || "Proje";

  const hairline = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";

  return (
    <Box
      component="article"
      sx={{
        height:        "100%",
        width:         "100%",
        display:       "flex",
        flexDirection: "column",
        borderRadius:  "24px",
        overflow:      "hidden",
        border:        "1px solid",
        borderColor:   hairline,
        bgcolor:       "background.paper",
        boxShadow:     "none",
        p:             { xs: "26px 24px", md: "32px 28px" },
        transition:    "transform 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s ease",
        "&:hover": {
          transform:   "scale(1.02)",
          borderColor: alpha(gold, isDark ? 0.55 : 0.45),
        },
      }}
    >
      {/* ── Title only — extreme minimalism per the luxury rules ─────────── */}
      <Typography
        variant="h6"
        component="h3"
        fontWeight={700}
        sx={{
          lineHeight:    1.3,
          letterSpacing: "-0.01em",
          color:         "text.primary",
        }}
      >
        {name}
      </Typography>

      {/* ── CTA — pinned to the bottom by Equalizer rule (mt:auto) ──────── */}
      <Button
        variant="outlined"
        size="small"
        fullWidth
        endIcon={<ArrowForward sx={{ fontSize: 15 }} />}
        onClick={onSelect}
        sx={{
          mt:            "auto",
          borderRadius:  "24px",
          fontWeight:    600,
          fontSize:      "0.85rem",
          textTransform: "none",
          borderColor:   hairline,
          color:         "text.primary",
          py:            0.9,
          boxShadow:     "none",
          "&:hover": {
            borderColor: gold,
            color:       gold,
            bgcolor:     alpha(gold, isDark ? 0.10 : 0.06),
            boxShadow:   "none",
          },
        }}
      >
        Projeyi Gör
      </Button>
    </Box>
  );
};

export default ProjectCard;
