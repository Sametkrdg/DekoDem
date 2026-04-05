import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Box, Container, Typography, Grid, Paper, Chip, Stack,
  Breadcrumbs, Button, CircularProgress, Divider,
} from "@mui/material";
import {
  Home, NavigateNext, LocationOn, CalendarMonth,
  SquareFoot, CheckCircle, ArrowBack,
} from "@mui/icons-material";
import defaultProjects from "../data/projects";
import { useSite } from "../context/SiteContext";

const STATUS_COLOR = {
  "Tamamlandı": "success",
  "Devam Ediyor": "warning",
  "Planlama": "info",
};

const InfoRow = ({ icon, label, value }) => (
  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 2 }}>
    <Box sx={{ color: "primary.main", mt: 0.2, flexShrink: 0 }}>{icon}</Box>
    <Box>
      <Typography variant="caption" color="text.secondary" display="block">
        {label}
      </Typography>
      <Typography variant="body1" fontWeight={500}>
        {value}
      </Typography>
    </Box>
  </Box>
);

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { siteContent } = useSite();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Look in Firestore-backed projects first, fall back to static data
    const allProjects =
      siteContent?.projects?.length ? siteContent.projects : defaultProjects;

    const found = allProjects.find(
      (p) => (p.slug || p.permalink) === slug
    );

    setProject(found || null);
    setLoading(false);
  }, [slug, siteContent]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 16 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!project) {
    return (
      <Container maxWidth="md" sx={{ py: 12, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom fontWeight={700}>
          Proje Bulunamadı
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Aradığınız proje mevcut değil veya kaldırılmış olabilir.
        </Typography>
        <Button variant="contained" component={Link} to="/projeler" startIcon={<ArrowBack />}>
          Projelere Dön
        </Button>
      </Container>
    );
  }

  const statusColor = STATUS_COLOR[project.durum] || "default";

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh" }}>
      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1a365d 0%, #2d6a4f 100%)",
          color: "#fff",
          pt: { xs: 8, md: 12 },
          pb: { xs: 6, md: 10 },
        }}
      >
        <Container maxWidth="lg">
          {/* Breadcrumb */}
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" sx={{ color: "rgba(255,255,255,0.5)" }} />}
            aria-label="breadcrumb"
            sx={{ mb: 4 }}
          >
            <Link to="/" style={{ display: "flex", alignItems: "center", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
              <Home sx={{ mr: 0.5, fontSize: 18 }} />
              Anasayfa
            </Link>
            <Link to="/projeler" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
              Projeler
            </Link>
            <Typography sx={{ color: "#fff", fontSize: "0.875rem" }}>
              {project.ad}
            </Typography>
          </Breadcrumbs>

          <Chip
            label={project.durum}
            color={statusColor}
            size="small"
            sx={{ mb: 2, fontWeight: 600 }}
          />

          <Typography
            variant="h2"
            component="h1"
            sx={{ fontWeight: 800, fontSize: { xs: "2rem", md: "3.2rem" }, mb: 2 }}
          >
            {project.icon && `${project.icon} `}{project.ad}
          </Typography>

          <Typography
            variant="h6"
            sx={{ color: "rgba(255,255,255,0.8)", maxWidth: 680, lineHeight: 1.7, fontWeight: 400 }}
          >
            {project.aciklama}
          </Typography>
        </Container>
      </Box>

      {/* ─── Content ───────────────────────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Grid container spacing={4}>
          {/* Left: Overview + Services */}
          <Grid item xs={12} md={8}>
            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, mb: 3 }}>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                Proje Özeti
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9 }}>
                {project.overview || project.aciklama}
              </Typography>
            </Paper>

            {project.services?.length > 0 && (
              <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3 }}>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  Sağlanan Hizmetler
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Stack spacing={1.5}>
                  {project.services.map((service, i) => (
                    <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                      <CheckCircle sx={{ color: "success.main", mt: 0.3, flexShrink: 0, fontSize: 20 }} />
                      <Typography variant="body1" color="text.secondary">
                        {service}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            )}
          </Grid>

          {/* Right: Specs */}
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, position: "sticky", top: 100 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Proje Bilgileri
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <InfoRow icon={<LocationOn />} label="Konum" value={project.yer || "—"} />
              <InfoRow icon={<CalendarMonth />} label="Yıl" value={project.yıl || "—"} />
              <InfoRow icon={<SquareFoot />} label="Alan" value={project.alan || "—"} />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                <Box sx={{ color: "primary.main", flexShrink: 0 }}>
                  <CheckCircle />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Durum
                  </Typography>
                  <Chip
                    label={project.durum || "—"}
                    color={statusColor}
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Button
                variant="contained"
                fullWidth
                component={Link}
                to="/iletisim"
                sx={{ mb: 1.5, fontWeight: 600 }}
              >
                Bu Proje Hakkında Bilgi Al
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate(-1)}
                startIcon={<ArrowBack />}
              >
                Geri Dön
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProjectDetailPage;
