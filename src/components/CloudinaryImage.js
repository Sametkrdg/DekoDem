/**
 * CloudinaryImage
 *
 * Smart frontend image delivery component.
 *
 * - Builds an optimised Cloudinary URL (f_auto, q_auto, responsive width,
 *   retina dpr_auto) before the request leaves the browser.
 * - Shows a Skeleton placeholder while the image is loading.
 * - Falls back to a neutral placeholder box if the URL is empty or broken.
 *
 * Props:
 *   src         {string}   Full Cloudinary secure_url from Firestore
 *   alt         {string}   Accessible alt text (required for SEO)
 *   width       {number}   Delivery width in px (default 800)
 *   height      {number}   Delivery height in px (optional — auto if omitted)
 *   crop        {string}   Cloudinary crop mode: "fill" | "scale" | "fit" (default "fill")
 *   aspectRatio {string}   CSS aspect-ratio string, e.g. "16/9" (default "16/9")
 *   borderRadius {string|number}  Border radius (default "12px")
 *   sx          {object}   Extra MUI sx props forwarded to the wrapper Box
 */

import React, { useState } from "react";
import { Box, Skeleton } from "@mui/material";
import { BrokenImage } from "@mui/icons-material";
import { alpha, useTheme } from "@mui/material/styles";
import { buildCloudinaryUrl } from "../services/cloudinary";

const CloudinaryImage = ({
  src,
  alt         = "",
  width       = 800,
  height,
  crop        = "fill",
  aspectRatio = "16/9",
  borderRadius= "12px",
  sx          = {},
  ...rest
}) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [loaded,  setLoaded]  = useState(false);
  const [errored, setErrored] = useState(false);

  // Build optimised URL — no-op for non-Cloudinary or empty src
  const optimisedSrc = src
    ? buildCloudinaryUrl(src, { width, height, crop })
    : "";

  const wrapperSx = {
    position:     "relative",
    width:        "100%",
    aspectRatio,
    borderRadius,
    overflow:     "hidden",
    bgcolor:      isDark ? "rgba(255,255,255,0.05)" : alpha(theme.palette.primary.main, 0.04),
    ...sx,
  };

  /* ── No source provided ── */
  if (!optimisedSrc) {
    return (
      <Box sx={wrapperSx} {...rest}>
        <Box
          sx={{
            position:       "absolute",
            inset:          0,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
          }}
        >
          <BrokenImage sx={{ fontSize: 36, color: "text.disabled", opacity: 0.4 }} />
        </Box>
      </Box>
    );
  }

  /* ── Load error ── */
  if (errored) {
    return (
      <Box sx={wrapperSx} {...rest}>
        <Box
          sx={{
            position:       "absolute",
            inset:          0,
            display:        "flex",
            flexDirection:  "column",
            alignItems:     "center",
            justifyContent: "center",
            gap:            0.5,
          }}
        >
          <BrokenImage sx={{ fontSize: 32, color: "text.disabled", opacity: 0.5 }} />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={wrapperSx} {...rest}>
      {/* Skeleton — visible until image fires onLoad */}
      {!loaded && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", borderRadius }}
        />
      )}

      <Box
        component="img"
        src={optimisedSrc}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => { setLoaded(true); setErrored(true); }}
        sx={{
          width:      "100%",
          height:     "100%",
          objectFit:  "cover",
          display:    "block",
          opacity:    loaded ? 1 : 0,
          transition: "opacity 0.35s ease",
          borderRadius,
        }}
      />
    </Box>
  );
};

export default CloudinaryImage;
