import React, { useEffect, useState } from "react";
import {
  Container, Typography, Grid, Card, CardContent, CardActionArea,
  Box, Chip, Breadcrumbs, Fade,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { Article, Home, NavigateNext, CalendarMonth } from "@mui/icons-material";
import { getBlogs as getPosts } from "../services/firestore";
import { BlogGridSkeleton } from "../components/Skeletons";
import EmptyState from "../components/EmptyState";
import { PATHS } from "../constants/navigation";

const formatDate = (ts) => {
  if (!ts) return "";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" });
};

const Blog = () => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then((data) =>
        setPosts(
          (data || []).map((b) => ({
            id:          b._docId ?? b.id,        // getBlogs() returns _docId
            slug:        b._docId ?? b.id,        // doc id used as URL slug
            title:       b.Name        ?? '',
            body:        b.Content     ?? '',
            coverImage:  b.CoverImg    ?? '',
            publishedAt: b.Date        ?? null,
            category:    b.category    ?? '',
            excerpt:     b.excerpt     ?? '',
          }))
        )
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "60vh" }}>
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      {/* Pure Black in dark mode (matches every other page hero) — navy gradient in light. */}
      <Box
        sx={{
          background:   isDark ? "#000000" : "linear-gradient(135deg, #1a365d 0%, #2c5282 100%)",
          color:        "#fff",
          py:           { xs: 8, md: 11 },
          borderBottom: isDark ? "1px solid" : "none",
          borderColor:  "divider",
        }}
      >
        <Container maxWidth="lg">
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" sx={{ color: "rgba(255,255,255,0.5)" }} />}
            aria-label="breadcrumb"
            sx={{ mb: 3 }}
          >
            <Link to="/" style={{ display: "flex", alignItems: "center", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
              <Home sx={{ mr: 0.5, fontSize: 18 }} />
              Anasayfa
            </Link>
            <Typography sx={{ color: "#fff", fontSize: "0.875rem" }}>Haberler</Typography>
          </Breadcrumbs>

          <Article sx={{ fontSize: 48, mb: 1, opacity: 0.9 }} />
          <Typography variant="h3" component="h1" fontWeight={800} sx={{ mb: 1.5 }}>
            Haberler & Blog
          </Typography>
          <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.75)", fontWeight: 400, maxWidth: 560 }}>
            Sektörden güncel haberler, proje güncellemeleri ve inşaat dünyasından içgörüler.
          </Typography>
        </Container>
      </Box>

      {/* ─── List ─────────────────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
        {loading ? (
          <BlogGridSkeleton count={6} />
        ) : posts.length === 0 ? (
          <EmptyState
            icon={<Article />}
            title="Henüz haber yok"
            description="Yeni içerikler yakında eklenecek. Takipte kalın!"
          />
        ) : (
          <Grid container spacing={4} alignItems="stretch">
            {posts.map((post, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post.id} sx={{ display: "flex" }}>
                <Fade in timeout={500} style={{ transitionDelay: `${idx * 100}ms` }}>
                <Card
                  elevation={0}
                  sx={{
                    width:         "100%",
                    height:        "100%",
                    display:       "flex",
                    flexDirection: "column",
                    bgcolor:       "background.paper",
                    border:        "1px solid",
                    borderColor:   "divider",
                    borderRadius:  "24px",
                    boxShadow:     "none",
                    transition:    "transform 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s ease",
                    "&:hover":     {
                      transform:   "scale(1.02)",
                      borderColor: "primary.main",
                    },
                  }}
                >
                  <CardActionArea
                    component={Link}
                    to={`${PATHS.BLOG}/${post.slug}`}
                    sx={{
                      height:        "100%",
                      display:       "flex",
                      flexDirection: "column",
                      alignItems:    "stretch",
                    }}
                  >
                    <CardContent
                      sx={{
                        flex:          1,
                        p:             { xs: 3, md: 3.5 },
                        display:       "flex",
                        flexDirection: "column",
                      }}
                    >
                      {post.category && (
                        <Chip label={post.category} size="small" color="primary" variant="outlined" sx={{ mb: 1.5, alignSelf: "flex-start" }} />
                      )}
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        gutterBottom
                        sx={{ lineHeight: 1.4, letterSpacing: "-0.01em" }}
                      >
                        {post.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb:              2,
                          lineHeight:      1.6,
                          display:         "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 4,
                          overflow:        "hidden",
                        }}
                      >
                        {post.excerpt || post.body?.slice(0, 160) + "…"}
                      </Typography>
                      {/* Equalizer: meta row pinned to bottom */}
                      <Box sx={{ mt: "auto", display: "flex", alignItems: "center", gap: 0.5, color: "text.disabled" }}>
                        <CalendarMonth sx={{ fontSize: 16 }} />
                        <Typography variant="caption">{formatDate(post.publishedAt)}</Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Blog;
