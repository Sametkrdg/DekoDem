import React, { useState } from "react";
import { Box, Container, Typography, ImageList, ImageListItem, Skeleton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

/**
 * Photo gallery section with masonry-style grid and fullscreen lightbox.
 *
 * Props:
 *   photos — array of { url, title?, description? }
 */
const GallerySection = ({ photos = [] }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!photos.length) return null;

  const slides = photos.map((p) => ({
    src: p.url,
    title: p.title || "",
    description: p.description || "",
  }));

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        // Transparent in dark (body gradient shows through); off-white in light
        ...theme.mixins.sectionSurface,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        {/* Header — aligned with AboutSection / ActivitiesSection pattern */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="overline"
            sx={{ color: "primary.main", letterSpacing: "0.14em", display: "block", mb: 1 }}
          >
            GALERİ
          </Typography>
          <Typography variant="h3" component="h2" fontWeight={800} sx={{ mt: 1, mb: 2 }}>
            Projelerimizden Kareler
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 500, mx: "auto", lineHeight: 1.75 }}>
            Tamamladığımız ve devam eden projelerden seçme fotoğraflar.
          </Typography>
        </Box>

        {/* Grid */}
        <ImageList
          variant="masonry"
          cols={3}
          gap={12}
          sx={{
            columnCount: { xs: "1 !important", sm: "2 !important", md: "3 !important" },
          }}
        >
          {photos.map((photo, i) => (
            <ImageListItem
              key={i}
              onClick={() => { setIndex(i); setOpen(true); }}
              sx={{
                cursor:       "pointer",
                overflow:     "hidden",
                borderRadius: "16px",
                border:       `1px solid ${theme.glass.border}`,
                transition:   "box-shadow 0.3s ease",
                "&:hover": {
                  boxShadow: `0 12px 32px rgba(0,0,0,${theme.palette.mode === 'dark' ? 0.55 : 0.14})`,
                },
                "& img": {
                  borderRadius: "16px",
                  transition:   "transform 0.35s ease, filter 0.35s ease",
                },
                "&:hover img": {
                  transform: "scale(1.04)",
                  filter:    "brightness(0.85)",
                },
              }}
            >
              <Box
                component="img"
                src={photo.url}
                alt={photo.title || `Galeri fotoğrafı ${i + 1}`}
                loading="lazy"
                decoding="async"
                sx={{ width: "100%", display: "block", borderRadius: 2 }}
              />
            </ImageListItem>
          ))}
        </ImageList>

        {/* Lightbox */}
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={slides}
          plugins={[Captions, Zoom]}
          captions={{ showToggle: true }}
          zoom={{ maxZoomPixelRatio: 3 }}
          styles={{ root: { "--yarl__color_backdrop": "rgba(0, 0, 0, 0.92)" } }}
        />
      </Container>
    </Box>
  );
};

/** Skeleton shown while photos are loading */
export const GallerySkeleton = () => (
  <Box sx={{ py: { xs: 8, md: 12 } }}>
    <Container maxWidth="lg">
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Skeleton width={120} height={20} sx={{ mx: "auto", mb: 1 }} />
        <Skeleton width={300} height={40} sx={{ mx: "auto", mb: 1 }} />
        <Skeleton width={400} height={20} sx={{ mx: "auto" }} />
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1.5 }}>
        {[240, 180, 220, 200, 260, 190].map((h, i) => (
          <Skeleton key={i} variant="rounded" height={h} sx={{ borderRadius: 2 }} />
        ))}
      </Box>
    </Container>
  </Box>
);

export default GallerySection;
