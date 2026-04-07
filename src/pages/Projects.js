/**
 * Projects.js — Dynamic listing page.
 * Real-time Firestore `Projects` collection via onSnapshot.
 * Schema: { Name, Summary, PhotoUrl, Description, Services[] }
 */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Container, Grid, Typography, CircularProgress,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db, isFirebaseConfigured } from "../config/firebase";
import { buildCloudinaryUrl } from "../services/cloudinary";
import ProjectCard from "../components/ProjectCard";
import { PATHS } from "../constants/navigation";

// ── Shape: Firestore doc → card prop ─────────────────────────────────────────
const fromDoc = (snap) => {
  const d = snap.data();
  return {
    id:       snap.id,
    name:     d.Name     ?? "",
    summary:  d.Summary  ?? "",
    photoUrl: d.PhotoUrl ?? "",
    slug:     snap.id,
  };
};

// ── Page ──────────────────────────────────────────────────────────────────────
const Projects = () => {
  const theme    = useTheme();
  const isDark   = theme.palette.mode === "dark";
  const orange   = theme.palette.secondary?.main ?? theme.palette.primary.main;
  const navigate = useNavigate();

  const [projects, setProjects] = useState(null); // null = loading

  useEffect(() => {
    if (!isFirebaseConfigured || !db) {
      setProjects([]);
      return;
    }

    const q     = query(collection(db, "Projects"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => setProjects(snap.docs.map(fromDoc)),
      (err)  => {
        console.error("[Projects] onSnapshot error:", err);
        setProjects([]);
      }
    );
    return unsub;
  }, []);

  const loading = projects === null;

  return (
    <>
      {/* ── Hero banner ──────────────────────────────────────────────────── */}
      <Box
        component="header"
        sx={{
          background: isDark
            ? "linear-gradient(135deg, #0d1117 0%, #1a2235 60%, #0d2137 100%)"
            : `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          color:    "#fff",
          pt:       { xs: 12, md: 15 },
          pb:       { xs: 7,  md: 9  },
          textAlign:"center",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content:    "\"\"",
            position:   "absolute",
            inset:      0,
            background: "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(255,255,255,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          },
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="overline"
            sx={{
              color: alpha(orange, 0.9), fontWeight: 700,
              letterSpacing: "0.14em", display: "block", mb: 1,
            }}
          >
            PORTFÖYÜMÜz
          </Typography>
          <Typography
            variant="h2"
            component="h1"
            fontWeight={800}
            sx={{ lineHeight: 1.15, fontSize: { xs: "2rem", md: "3rem" } }}
          >
            Projelerimiz
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.75)", mt: 2,
              maxWidth: 540, mx: "auto", lineHeight: 1.75,
            }}
          >
            Kaliteli tasarım ve mükemmel işçilikle hayata geçirdiğimiz projeleri keşfedin.
          </Typography>
        </Container>
      </Box>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 } }}>

        {/* Loading */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Empty state */}
        {!loading && projects.length === 0 && (
          <Box sx={{ textAlign: "center", py: 12 }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Henüz proje eklenmedi
            </Typography>
            <Typography color="text.secondary">
              Admin panelinden yeni proje oluşturun.
            </Typography>
          </Box>
        )}

        {/* Grid */}
        {!loading && projects.length > 0 && (
          <Grid container spacing={3}>
            {projects.map((project, idx) => (
              <Grid item xs={12} sm={6} lg={4} key={project.id}>
                <Box
                  sx={{
                    height:            "100%",
                    animationName:     "fadeUp",
                    animationDuration: "0.4s",
                    animationDelay:    `${idx * 0.06}s`,
                    animationFillMode: "both",
                    "@keyframes fadeUp": {
                      from: { opacity: 0, transform: "translateY(18px)" },
                      to:   { opacity: 1, transform: "translateY(0)"    },
                    },
                  }}
                >
                  <ProjectCard
                    project={project}
                    imageUrl={
                      project.photoUrl
                        ? buildCloudinaryUrl(project.photoUrl, { width: 600, height: 400, crop: "fill" })
                        : null
                    }
                    onSelect={() => navigate(`${PATHS.PROJECTS}/${project.slug}`)}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Projects;
