import React, { useEffect, useState } from "react";
import {
  Container, Typography, Grid, Card, CardContent, CardActionArea,
  Box, Chip, Breadcrumbs,
} from "@mui/material";
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
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "60vh" }}>
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1a365d 0%, #2c5282 100%)",
          color: "#fff",
          py: { xs: 8, md: 11 },
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
          <Grid container spacing={4}>
            {posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                    transition: "box-shadow 0.2s, transform 0.2s",
                    "&:hover": { boxShadow: 6, transform: "translateY(-4px)" },
                  }}
                >
                  <CardActionArea
                    component={Link}
                    to={`${PATHS.BLOG}/${post.slug}`}
                    sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start" }}
                  >
                    {/* Cover image */}
                    {post.coverImage && (
                      <Box
                        component="img"
                        src={post.coverImage}
                        alt={post.title}
                        loading="lazy"
                        sx={{ width: "100%", height: 200, objectFit: "cover", borderRadius: "12px 12px 0 0" }}
                      />
                    )}

                    <CardContent sx={{ flex: 1, p: 3 }}>
                      {post.category && (
                        <Chip label={post.category} size="small" color="primary" variant="outlined" sx={{ mb: 1.5 }} />
                      )}
                      <Typography variant="h6" fontWeight={700} gutterBottom sx={{ lineHeight: 1.4 }}>
                        {post.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
                        {post.excerpt || post.body?.slice(0, 120) + "…"}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "text.disabled" }}>
                        <CalendarMonth sx={{ fontSize: 16 }} />
                        <Typography variant="caption">{formatDate(post.publishedAt)}</Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Blog;
