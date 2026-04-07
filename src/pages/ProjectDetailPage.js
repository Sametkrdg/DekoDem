/**
 * ProjectDetailPage.js — Firestore-driven project detail.
 *
 * Layout:
 *   Desktop (md+): two-column row   — text LEFT (7 cols) | image RIGHT (5 cols, sticky)
 *   Mobile  (xs):  flex-col-reverse — image TOP, text BOTTOM
 *
 * Data: getDoc(doc(db, 'Projects', id))
 * Image: buildCloudinaryUrl(PhotoUrl, { width: 1000, crop: "limit" })
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
  CheckCircle, Build, Image as ImageIcon,
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
  };
};

// ── Component ─────────────────────────────────────────────────────────────────
const ProjectDetailPage = () => {
  const { slug }   = useParams();
  const navigate   = useNavigate();
  const theme      = useTheme();
  const isDark     = theme.palette.mode === "dark";
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

  const heroImageUrl = project.photoUrl
    ? buildCloudinaryUrl(project.photoUrl, { width: 1000, crop: "limit" })
    : null;

  const phoneHref = contactSettings.Phone
    ? `tel:${contactSettings.Phone.replace(/\s/g, "")}`
    : null;

  return (
    <>
      {/* ── Hero banner ──────────────────────────────────────────────────── */}
      <Box
        component="header"
        sx={{
          background: isDark
            ? "linear-gradient(135deg, #0d1117 0%, #1a2235 50%, #0d2137 100%)"
            : `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${navy} 60%, ${alpha(theme.palette.primary.light, 0.85)} 100%)`,
          color:    "#fff",
          pt:       { xs: 10, md: 13 },
          pb:       { xs: 6,  md: 8  },
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content:    "\"\"",
            position:   "absolute",
            inset:      0,
            background: "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(255,255,255,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          },
        }}
      >
        <Container maxWidth="lg">
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" sx={{ color: "rgba(255,255,255,0.5)" }} />}
            aria-label="breadcrumb"
            sx={{ mb: 3 }}
          >
            <Box
              component={Link}
              to={PATHS.HOME}
              sx={{ display: "flex", alignItems: "center", color: "rgba(255,255,255,0.7)", textDecoration: "none", "&:hover": { color: "#fff" } }}
            >
              <Home sx={{ mr: 0.5, fontSize: 18 }} />
              Anasayfa
            </Box>
            <Box
              component={Link}
              to={PATHS.PROJECTS}
              sx={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.875rem", "&:hover": { color: "#fff" } }}
            >
              Projeler
            </Box>
            <Typography sx={{ color: "#fff", fontSize: "0.875rem" }} noWrap>
              {project.name}
            </Typography>
          </Breadcrumbs>

          <Typography
            variant="h2"
            component="h1"
            fontWeight={800}
            sx={{ lineHeight: 1.15, fontSize: { xs: "1.9rem", md: "2.75rem" }, maxWidth: 720 }}
          >
            {project.name}
          </Typography>

          {project.summary && (
            <Typography
              sx={{ color: "rgba(255,255,255,0.8)", fontWeight: 400, maxWidth: 620, lineHeight: 1.7, mt: 1.5 }}
            >
              {project.summary}
            </Typography>
          )}
        </Container>
      </Box>

      {/* ── Split body ───────────────────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box
          sx={{
            display:        "flex",
            flexDirection:  { xs: "column-reverse", md: "row" },
            gap:            { xs: 5, md: 8 },
            alignItems:     "flex-start",
          }}
        >
          {/* ── LEFT: text column ────────────────────────────────────── */}
          <Box sx={{ flex: "0 0 auto", width: { xs: "100%", md: "58%" } }}>
            <Button
              component={Link}
              to={PATHS.PROJECTS}
              startIcon={<ArrowBack />}
              sx={{ mb: 4, borderRadius: "50px", textTransform: "none", fontWeight: 600, color: "text.secondary", "&:hover": { color: "primary.main" } }}
            >
              Tüm Projeler
            </Button>

            {/* Title accent */}
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

            {/* Services — icon bulleted list */}
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
                      <CheckCircle
                        sx={{ fontSize: 20, color: orange, flexShrink: 0, mt: "2px" }}
                        aria-hidden="true"
                      />
                      <Typography variant="body1" fontWeight={500} sx={{ lineHeight: 1.6 }}>
                        {service}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {/* Detailed description */}
            {project.description && (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.95, fontSize: { xs: "1rem", md: "1.05rem" } }}
              >
                {project.description}
              </Typography>
            )}

            {/* CTA row */}
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

          {/* ── RIGHT: image column ──────────────────────────────────── */}
          <Box
            sx={{
              flex:     "1 1 auto",
              width:    { xs: "100%", md: "auto" },
              position: { md: "sticky" },
              top:      { md: "90px" },
            }}
          >
            {heroImageUrl ? (
              <Box
                component="img"
                src={heroImageUrl}
                alt={project.name}
                loading="eager"
                sx={{
                  display:      "block",
                  width:        "100%",
                  aspectRatio:  "4 / 3",
                  objectFit:    "cover",
                  borderRadius: "20px",
                  boxShadow:    isDark
                    ? `0 20px 56px rgba(0,0,0,0.55), 0 0 0 1px ${alpha(navy, 0.25)}`
                    : `0 16px 48px ${alpha(navy, 0.18)}, 0 4px 12px ${alpha(navy, 0.08)}`,
                  transition:   "transform 0.4s ease, box-shadow 0.4s ease",
                  "&:hover": {
                    transform:  "translateY(-4px) scale(1.01)",
                    boxShadow:  isDark
                      ? `0 28px 68px rgba(0,0,0,0.65), 0 0 0 1px ${alpha(orange, 0.3)}`
                      : `0 24px 60px ${alpha(navy, 0.22)}, 0 0 0 2px ${alpha(orange, 0.35)}`,
                  },
                }}
              />
            ) : (
              <Box
                sx={{
                  width:          "100%",
                  aspectRatio:    "4 / 3",
                  borderRadius:   "20px",
                  border:         "1px solid",
                  borderColor:    isDark ? "rgba(255,255,255,0.08)" : alpha(navy, 0.1),
                  bgcolor:        isDark ? "rgba(255,255,255,0.04)" : alpha(navy, 0.04),
                  display:        "flex",
                  flexDirection:  "column",
                  alignItems:     "center",
                  justifyContent: "center",
                  gap:            1.5,
                  color:          "text.disabled",
                }}
              >
                <ImageIcon sx={{ fontSize: 56 }} />
                <Typography variant="caption" fontWeight={600}>Görsel eklenmemiş</Typography>
              </Box>
            )}

            {/* Orange underline accent */}
            <Box
              aria-hidden="true"
              sx={{
                mt:           1.5,
                mx:           "auto",
                width:        "60%",
                height:       3,
                borderRadius: "2px",
                background:   `linear-gradient(90deg, ${alpha(orange, 0)}, ${orange}, ${alpha(orange, 0)})`,
                opacity:      0.7,
              }}
            />
          </Box>
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
                bgcolor:    orange,
                color:      "#fff",
                fontWeight: 700,
                borderRadius:"50px",
                px:         4,
                boxShadow:  `0 8px 28px ${alpha(orange, 0.45)}`,
                "&:hover":  { bgcolor: theme.palette.secondary?.dark ?? alpha(orange, 0.85), transform: "translateY(-2px)" },
                transition: "all 0.2s ease",
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
                color:       "#fff",
                borderColor: "rgba(255,255,255,0.45)",
                borderRadius:"50px",
                px:          4,
                "&:hover":   { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.08)" },
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
