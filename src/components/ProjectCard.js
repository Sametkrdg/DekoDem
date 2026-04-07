/**
 * ProjectCard.js — Clean listing card for the Projects page.
 *
 * Props:
 *   project   { id, name, summary }
 *   imageUrl  pre-transformed Cloudinary URL (or null for placeholder)
 *   onSelect  () => void — navigate to detail page
 */
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { ArrowForward, Apartment } from "@mui/icons-material";

const ProjectCard = ({ project, imageUrl, onSelect }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === "dark";
  const orange = theme.palette.secondary?.main ?? theme.palette.primary.main;
  const navy   = theme.palette.primary.main;

  const name    = project?.name    || "Proje";
  const summary = project?.summary || "";

  return (
    <Box
      component="article"
      sx={{
        height:        "100%",
        display:       "flex",
        flexDirection: "column",
        borderRadius:  "16px",
        overflow:      "hidden",
        border:        "1px solid",
        borderColor:   isDark ? "rgba(255,255,255,0.08)" : alpha(navy, 0.12),
        bgcolor:       isDark ? "rgba(255,255,255,0.03)" : "#fff",
        transition:    "transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease",
        // Orange accent strip at top
        "&::before": {
          content:  "\"\"",
          display:  "block",
          height:   "3px",
          background: `linear-gradient(90deg, ${navy}, ${orange})`,
        },
        "&:hover": {
          transform:   "translateY(-5px)",
          borderColor: alpha(orange, isDark ? 0.4 : 0.3),
          boxShadow:   isDark
            ? `0 18px 44px rgba(0,0,0,0.55)`
            : `0 14px 38px ${alpha(navy, 0.13)}`,
        },
      }}
    >
      {/* ── Cover image ──────────────────────────────────────────────────── */}
      <Box
        sx={{
          height:   "200px",
          flexShrink: 0,
          overflow: "hidden",
          position: "relative",
          bgcolor:  isDark ? alpha(navy, 0.2) : alpha(navy, 0.06),
        }}
      >
        {imageUrl ? (
          <Box
            component="img"
            src={imageUrl}
            alt={name}
            loading="lazy"
            sx={{
              width:      "100%",
              height:     "100%",
              objectFit:  "cover",
              display:    "block",
              transition: "transform 0.45s ease",
              "article:hover &": { transform: "scale(1.06)" },
            }}
          />
        ) : (
          <Box
            sx={{
              width:          "100%",
              height:         "100%",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              background:     `linear-gradient(135deg, ${alpha(navy, 0.55)}, ${alpha(orange, 0.35)})`,
            }}
          >
            <Apartment sx={{ fontSize: 52, color: "rgba(255,255,255,0.5)" }} />
          </Box>
        )}
      </Box>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <Box
        sx={{
          p:             "22px 24px",
          flexGrow:      1,
          display:       "flex",
          flexDirection: "column",
          gap:           1.5,
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          fontWeight={700}
          sx={{ lineHeight: 1.3, color: "text.primary" }}
        >
          {name}
        </Typography>

        {summary && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              lineHeight:          1.7,
              flexGrow:            1,
              display:             "-webkit-box",
              WebkitLineClamp:     3,
              WebkitBoxOrient:     "vertical",
              overflow:            "hidden",
            }}
          >
            {summary}
          </Typography>
        )}

        {!summary && <Box sx={{ flexGrow: 1 }} />}

        <Button
          variant="outlined"
          size="small"
          fullWidth
          endIcon={<ArrowForward sx={{ fontSize: 15 }} />}
          onClick={onSelect}
          sx={{
            mt:            0.5,
            borderRadius:  "10px",
            fontWeight:    700,
            fontSize:      "0.82rem",
            textTransform: "none",
            borderColor:   alpha(orange, 0.45),
            color:         orange,
            py:            0.8,
            "&:hover": {
              borderColor: orange,
              bgcolor:     alpha(orange, 0.06),
            },
          }}
        >
          Projeyi Gör
        </Button>
      </Box>
    </Box>
  );
};

export default ProjectCard;
