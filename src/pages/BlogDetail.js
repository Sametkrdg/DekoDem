import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container, Typography, Box, CircularProgress, Breadcrumbs,
  Chip, Button, Divider, Paper,
} from "@mui/material";
import { Home, NavigateNext, CalendarMonth, ArrowBack } from "@mui/icons-material";
import { getBlogs } from "../services/firestore";

const formatDate = (ts) => {
  if (!ts) return "";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" });
};

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs()
      .then((data) => {
        const raw = (data || []).find((b) => b.id === slug);
        if (!raw) { setPost(null); return; }
        setPost({
          id:          raw.id,
          title:       raw.Name        ?? '',
          body:        raw.Content     ?? '',
          coverImage:  raw.CoverImg    ?? '',
          publishedAt: raw.Date        ?? null,
          category:    raw.category    ?? '',
        });
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 16 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!post) {
    return (
      <Container maxWidth="md" sx={{ py: 12, textAlign: "center" }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Haber Bulunamadı
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Aradığınız haber mevcut değil veya yayından kaldırılmış olabilir.
        </Typography>
        <Button variant="contained" component={Link} to="/haberler" startIcon={<ArrowBack />}>
          Haberlere Dön
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh" }}>
      {/* ─── Hero ────────────────────────────────────────────────── */}
      {post.coverImage ? (
        <Box sx={{ position: "relative", height: { xs: 280, md: 420 }, overflow: "hidden" }}>
          <Box
            component="img"
            src={post.coverImage}
            alt={post.title}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <Box
            sx={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.65))",
            }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            background: "linear-gradient(135deg, #1a365d 0%, #2c5282 100%)",
            py: { xs: 10, md: 14 },
          }}
        />
      )}

      {/* ─── Article ─────────────────────────────────────────────── */}
      <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ mb: 4 }}
        >
          <Link to="/" style={{ display: "flex", alignItems: "center", color: "inherit", textDecoration: "none" }}>
            <Home sx={{ mr: 0.5, fontSize: 18 }} />
            Anasayfa
          </Link>
          <Link to="/haberler" style={{ color: "inherit", textDecoration: "none" }}>
            Haberler
          </Link>
          <Typography color="text.primary" noWrap sx={{ maxWidth: 200 }}>
            {post.title}
          </Typography>
        </Breadcrumbs>

        <Paper elevation={0} sx={{ borderRadius: 3, p: { xs: 3, md: 6 } }}>
          {post.category && (
            <Chip label={post.category} color="primary" variant="outlined" size="small" sx={{ mb: 2 }} />
          )}

          <Typography variant="h3" component="h1" fontWeight={800} sx={{ lineHeight: 1.25, mb: 2 }}>
            {post.title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, color: "text.secondary", mb: 4 }}>
            <CalendarMonth sx={{ fontSize: 18 }} />
            <Typography variant="body2">{formatDate(post.publishedAt)}</Typography>
            {post.author && (
              <>
                <Typography variant="body2" sx={{ mx: 1 }}>·</Typography>
                <Typography variant="body2">{post.author}</Typography>
              </>
            )}
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Body — simple whitespace-preserving render; upgrade to markdown later */}
          <Typography
            variant="body1"
            component="div"
            sx={{ lineHeight: 1.9, color: "text.primary", whiteSpace: "pre-wrap" }}
          >
            {post.body}
          </Typography>

          <Divider sx={{ mt: 6, mb: 4 }} />

          <Button variant="outlined" component={Link} to="/haberler" startIcon={<ArrowBack />}>
            Tüm Haberler
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default BlogDetail;
