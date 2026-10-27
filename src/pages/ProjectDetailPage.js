/**
 * ProjectDetailPage.js — Firestore-driven project detail.
 *
 * Header: compact inline flex — logo (max-height 50px, contain) beside H1 title.
 *         No hero banner. Body: text left, PhotoUrl cover right (contain, no crop).
 *
 * Schema: { Name, Summary, Description, Services[], PhotoUrl, LogoUrl }
 */
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Box, Container, Typography, Button,
  Breadcrumbs, CircularProgress,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import {
  Home, NavigateNext, ArrowBack, ArrowForward,
  CheckCircle, Build,
} from "@mui/icons-material";
import { getDoc, doc } from "firebase/firestore";
import { db, isFirebaseConfigured } from "../config/firebase";
import { buildCloudinaryUrl } from "../services/cloudinary";
import { useSite } from "../context/SiteContext";
import { PATHS } from "../constants/navigation";

// ── Data fetch & normalise ────────────────────────────────────────────────────
const fetchProject = async (id) => {
  if (!isFirebaseConfigured || !db || !id) return null;
  const snap = await getDoc(doc(db, "Projects", id));
  if (!snap.exists()) return null;
  const d = snap.data();
  return {
    id:          snap.id,
    name:        d.Name        ?? "",
    summary:     d.Summary     ?? "",
    description: d.Description ?? "",
    services:    Array.isArray(d.Services) ? d.Services : [],
    photoUrl:    d.PhotoUrl    ?? "",
    logoUrl:     d.LogoUrl     ?? "",
  };
};

// ── Component ─────────────────────────────────────────────────────────────────
const ProjectDetailPage = () => {
  const { slug }   = useParams();
  const navigate   = useNavigate();
  const theme      = useTheme();
  const orange     = theme.palette.secondary?.main ?? theme.palette.primary.main;
  const navy       = theme.palette.primary.main;
  const { contactSettings } = useSite();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setLoading(true);
    fetchProject(slug)
      .then(setProject)
      .catch((err) => console.error("[ProjectDetailPage]", err))
      .finally(() => setLoading(false));
  }, [slug]);

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  // ── 404 ──────────────────────────────────────────────────────────────────
  if (!project) {
    return (
      <Container maxWidth="sm" sx={{ py: 14, textAlign: "center" }}>
        <Build sx={{ fontSize: 64, color: "text.disabled", mb: 2 }} />
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Proje Bulunamadı
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 5 }}>
          Aradığınız proje mevcut değil veya kaldırılmış olabilir.
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to={PATHS.PROJECTS}
          startIcon={<ArrowBack />}
          sx={{ borderRadius: "50px", fontWeight: 700 }}
        >
          Tüm Projelere Dön
        </Button>
      </Container>
    );
  }

  // Detail page: full image, no CDN-side crop (`crop:'limit'` keeps aspect ratio)
  const photoUrl = project.photoUrl
    ? buildCloudinaryUrl(project.photoUrl, { width: 1400, crop: "limit" })
    : null;

  const phoneHref = contactSettings?.Phone
    ? `tel:${contactSettings.Phone.replace(/\s/g, "")}`
    : null;

  return (
    <>
      {/* ── Compact page header ──────────────────────────────────────────── */}
      <Box
        sx={{
          bgcolor:      "background.default",
          pt:           { xs: 10, md: 13 },
          pb:           { xs: 3,  md: 4  },
          borderBottom: "1px solid",
          borderColor:  "divider",
        }}
      >
        <Container maxWidth="lg">
          {/* Breadcrumbs */}
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ mb: 2.5, "& .MuiBreadcrumbs-separator": { color: "text.disabled" } }}
          >
            <Box
              component={Link}
              to={PATHS.HOME}
              sx={{ display: "flex", alignItems: "center", color: "text.secondary", textDecoration: "none", "&:hover": { color: "text.primary" }, fontSize: "0.875rem" }}
            >
              <Home sx={{ mr: 0.5, fontSize: 16 }} />
              Anasayfa
            </Box>
            <Box
              component={Link}
              to={PATHS.PROJECTS}
              sx={{ color: "text.secondary", textDecoration: "none", fontSize: "0.875rem", "&:hover": { color: "text.primary" } }}
            >
              Projeler
            </Box>
            <Typography sx={{ color: "text.primary", fontSize: "0.875rem" }} noWrap>
              {project.name}
            </Typography>
          </Breadcrumbs>

          {/* Inline logo + title */}
          <Box
            sx={{
              display:        "flex",
              flexDirection:  { xs: "column", md: "row" },
              alignItems:     { xs: "flex-start", md: "center" },
              justifyContent: "flex-start",
              gap:            "20px",
            }}
          >
            {project.logoUrl && (
              <Box
                component="img"
                src={project.logoUrl}
                alt={`${project.name} logosu`}
                sx={{
                  height:     { xs: "40px", md: "50px" },
                  width:      "auto",
                  maxHeight:  "50px",
                  maxWidth:   "160px",
                  objectFit:  "contain",
                  flexShrink: 0,
                }}
              />
            )}
            <Typography
              variant="h2"
              component="h1"
              fontWeight={800}
              sx={{
                lineHeight: 1.15,
                fontSize:   { xs: "1.9rem", md: "2.75rem" },
                color:      "text.primary",
              }}
            >
              {project.name}
            </Typography>
          </Box>

          {project.summary && (
            <Typography
              color="text.secondary"
              sx={{ mt: 1.5, maxWidth: 620, lineHeight: 1.75 }}
            >
              {project.summary}
            </Typography>
          )}
        </Container>
      </Box>

      {/* ── Body — text left, cover photo right (top on mobile) ───────────── */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box
          sx={{
            display:       "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            alignItems:    "flex-start",
            gap:           { xs: 5, md: "48px" },
          }}
        >
        <Box sx={{ flex: photoUrl ? { md: "55 1 0" } : undefined, maxWidth: photoUrl ? "none" : "680px", width: "100%", minWidth: 0 }}>
          <Button
            component={Link}
            to={PATHS.PROJECTS}
            startIcon={<ArrowBack />}
            sx={{ mb: 4, borderRadius: "50px", textTransform: "none", fontWeight: 600, color: "text.secondary", "&:hover": { color: "primary.main" } }}
          >
            Tüm Projeler
          </Button>

          {/* Orange accent title */}
          <Box sx={{ borderLeft: `4px solid ${orange}`, pl: 3, mb: 4, py: 0.5 }}>
            <Typography
              variant="h4"
              component="h2"
              fontWeight={800}
              sx={{ lineHeight: 1.25, fontSize: { xs: "1.6rem", md: "2rem" } }}
            >
              {project.name}
            </Typography>
          </Box>

          {/* Services list */}
          {project.services.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="overline"
                sx={{ color: orange, fontWeight: 700, letterSpacing: "0.1em", display: "block", mb: 2 }}
              >
                Verilen Hizmetler
              </Typography>
              <Box
                component="ul"
                sx={{ listStyle: "none", p: 0, m: 0, display: "flex", flexDirection: "column", gap: 1.25 }}
              >
                {project.services.map((service, i) => (
                  <Box key={i} component="li" sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                    <CheckCircle sx={{ fontSize: 20, color: orange, flexShrink: 0, mt: "2px" }} aria-hidden="true" />
                    <Typography variant="body1" fontWeight={500} sx={{ lineHeight: 1.6 }}>
                      {service}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* Description */}
          {project.description && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.95, fontSize: { xs: "1rem", md: "1.05rem" } }}
            >
              {project.description}
            </Typography>
          )}

          {/* CTAs */}
          <Box sx={{ mt: 5, display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to={PATHS.CONTACT}
              endIcon={<ArrowForward />}
              sx={{
                borderRadius: "50px",
                fontWeight:   700,
                bgcolor:      orange,
                boxShadow:    `0 8px 28px ${alpha(orange, 0.4)}`,
                "&:hover":    { bgcolor: theme.palette.secondary?.dark ?? alpha(orange, 0.85), transform: "translateY(-2px)" },
                transition:   "all 0.2s ease",
              }}
            >
              Teklif Al
            </Button>
            {phoneHref && (
              <Button
                variant="outlined"
                size="large"
                component="a"
                href={phoneHref}
                sx={{ borderRadius: "50px", fontWeight: 600, borderColor: alpha(navy, 0.4) }}
              >
                {contactSettings.Phone}
              </Button>
            )}
          </Box>
        </Box>

        {/* Cover photo — full image, no crop (contain), hairline frame */}
        {photoUrl && (
          <Box
            sx={{
              flex:     { md: "45 1 0" },
              width:    "100%",
              minWidth: 0,
              position: { md: "sticky" },
              top:      { md: "130px" },
            }}
          >
            <Box
              component="img"
              src={photoUrl}
              alt={project.name}
              loading="eager"
              sx={{
                display:      "block",
                width:        "100%",
                height:       "auto",
                objectFit:    "contain",
                borderRadius: "24px",
                border:       "1px solid",
                borderColor:  "divider",
                boxShadow:    "none",
              }}
            />
          </Box>
        )}
        </Box>
      </Container>

      {/* ── Bottom CTA banner ────────────────────────────────────────────── */}
      <Box
        component="section"
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${navy} 100%)`,
          color:      "#fff",
          py:         { xs: 7, md: 9 },
          textAlign:  "center",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Benzer projeler için iletişime geçin
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.8)", mb: 4 }}>
            Ekibimiz sizin için de aynı standartta çalışmaya hazır.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
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
                boxShadow:    `0 8px 28px ${alpha(orange, 0.45)}`,
                "&:hover":    { bgcolor: theme.palette.secondary?.dark ?? alpha(orange, 0.85), transform: "translateY(-2px)" },
                transition:   "all 0.2s ease",
              }}
            >
              Teklif Al
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate(PATHS.PROJECTS)}
              startIcon={<ArrowBack />}
              sx={{
                color:        "#fff",
                borderColor:  "rgba(255,255,255,0.45)",
                borderRadius: "50px",
                px:           4,
                "&:hover":    { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.08)" },
              }}
            >
              Tüm Projeler
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProjectDetailPage;
