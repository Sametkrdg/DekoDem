/**
 * BlogDetail.js — Single blog post / news article page.
 *
 * Routes to /haberler/:slug where slug === Firestore document id.
 *
 * Features:
 *   • Full-bleed hero image with gradient overlay and title overlay
 *   • Clean article body (pre-wrap, 1.9 line-height, max-width prose column)
 *   • Reading-time estimate
 *   • "Recent Posts" footer strip (3 cards, same visual DNA as Blog list)
 *   • Professional "Post Not Found" fallback with navigation options
 *   • Breadcrumbs + Back button
 *   • BreadcrumbList JSON-LD for SEO
 */

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container, Typography, Box, CircularProgress, Breadcrumbs,
  Chip, Button, Divider, Card, CardActionArea, CardContent, Grid,
} from "@mui/material";
import {
  Home, NavigateNext, CalendarMonth, ArrowBack,
  Article as ArticleIcon, AccessTime, SentimentDissatisfied,
} from "@mui/icons-material";
import { alpha, useTheme } from "@mui/material/styles";
import { getDoc, doc } from "firebase/firestore";
import { db, isFirebaseConfigured } from "../config/firebase";
import { getBlogs } from "../services/firestore";
import { buildCloudinaryUrl } from "../services/cloudinary";
import { PATHS } from "../constants/navigation";

// ── Utilities ─────────────────────────────────────────────────────────────────

const formatDate = (ts) => {
  if (!ts) return "";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" });
};

const readingMinutes = (text = "") => {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};

// Works for both getDoc shape ({ id, Name, ... }) and getBlogs() shape ({ _docId, Name, ... })
const normalise = (raw) => ({
  id:          raw.id ?? raw._docId,
  title:       raw.Name     ?? "",
  body:        raw.Content  ?? "",
  coverImage:  raw.CoverImg ?? "",
  publishedAt: raw.Date     ?? null,
  category:    raw.category ?? "",
  excerpt:     raw.excerpt  ?? "",
});

// True if the string contains HTML markup (used to choose plain-text vs innerHTML rendering)
const looksLikeHtml = (str = "") => /<[a-z][\s\S]*?>/i.test(str);

// ── Recent Post Card ──────────────────────────────────────────────────────────

const RecentCard = ({ post }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Card
      elevation={0}
      sx={{
        height:      "100%",
        border:      "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        transition:  "box-shadow 0.2s, transform 0.2s",
        "&:hover":   { boxShadow: 6, transform: "translateY(-3px)" },
        ...(isDark && {
          background:    theme.glass?.bgSubtle,
          backdropFilter: "blur(12px)",
        }),
      }}
    >
      <CardActionArea
        component={Link}
        to={`${PATHS.BLOG}/${post.id}`}
        sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start" }}
      >
        <CardContent sx={{ flex: 1, p: 2.5, width: "100%", display: "flex", flexDirection: "column" }}>
          {post.category && (
            <Chip label={post.category} size="small" color="primary" variant="outlined" sx={{ mb: 1 }} />
          )}
          <Typography variant="subtitle2" fontWeight={700} sx={{ lineHeight: 1.4, mb: 1 }}>
            {post.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "text.disabled" }}>
            <CalendarMonth sx={{ fontSize: 14 }} />
            <Typography variant="caption">{formatDate(post.publishedAt)}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

// ── Not Found state ───────────────────────────────────────────────────────────

const NotFound = ({ recentPosts }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "70vh" }}>
      {/* Gradient banner */}
      <Box
        sx={{
          background: isDark
            ? "#000000"
            : "linear-gradient(135deg, #1a365d 0%, #2c5282 100%)",
          py: { xs: 10, md: 14 },
        }}
      />

      <Container maxWidth="md" sx={{ py: { xs: 7, md: 10 }, textAlign: "center" }}>
        <SentimentDissatisfied
          sx={{ fontSize: 72, color: "text.disabled", mb: 2, opacity: 0.5 }}
        />
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Haber Bulunamadı
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 5, maxWidth: 440, mx: "auto", lineHeight: 1.8 }}>
          Aradığınız haber mevcut değil veya yayından kaldırılmış olabilir.
          Diğer haberlere göz atabilirsiniz.
        </Typography>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mb: recentPosts.length ? 8 : 0 }}>
          <Button
            variant="contained"
            component={Link}
            to={PATHS.BLOG}
            startIcon={<ArrowBack />}
            sx={{ borderRadius: "50px", fontWeight: 700 }}
          >
            Tüm Haberler
          </Button>
          <Button
            variant="outlined"
            component={Link}
            to={PATHS.HOME}
            sx={{ borderRadius: "50px" }}
          >
            Anasayfaya Dön
          </Button>
        </Box>

        {recentPosts.length > 0 && (
          <>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 3, textAlign: "left" }}>
              Son Haberler
            </Typography>
            <Grid container spacing={3}>
              {recentPosts.map((p) => (
                <Grid size={{ xs: 12, sm: 4 }} key={p.id}>
                  <RecentCard post={p} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
};

// ── Main page ─────────────────────────────────────────────────────────────────

const BlogDetail = () => {
  const { slug } = useParams();
  const theme    = useTheme();
  const isDark   = theme.palette.mode === "dark";

  const [post,        setPost]        = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading,     setLoading]     = useState(true);

  useEffect(() => {
    // Scroll to top instantly on every navigation to a post
    window.scrollTo({ top: 0, behavior: "instant" });

    setLoading(true);
    setPost(null);

    // Fetch the specific post directly by doc ID (O(1) vs O(n) collection scan)
    const fetchPost = (isFirebaseConfigured && db)
      ? getDoc(doc(db, "Blogs", slug))
          .then((snap) => snap.exists() ? normalise({ id: snap.id, ...snap.data() }) : null)
          .catch(() => null)
      : Promise.resolve(null);

    // Fetch recent posts for the sidebar / Not Found state
    const fetchRecent = getBlogs()
      .then((raw) => (raw || []).map(normalise))
      .catch(() => []);

    Promise.all([fetchPost, fetchRecent])
      .then(([found, all]) => {
        setPost(found);
        setRecentPosts(all.filter((b) => b.id !== slug).slice(0, 3));
      })
      .finally(() => setLoading(false));
  }, [slug]);

  // JSON-LD BreadcrumbList
  useEffect(() => {
    if (!post) return;
    const origin = window.location.origin;
    const schema = {
      "@context": "https://schema.org",
      "@type":    "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Anasayfa",  item: origin + PATHS.HOME },
        { "@type": "ListItem", position: 2, name: "Haberler",  item: origin + PATHS.BLOG },
        { "@type": "ListItem", position: 3, name: post.title,  item: origin + PATHS.BLOG + "/" + post.id },
      ],
    };
    document.getElementById("ld-blog-breadcrumb")?.remove();
    const script = document.createElement("script");
    script.id          = "ld-blog-breadcrumb";
    script.type        = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { document.getElementById("ld-blog-breadcrumb")?.remove(); };
  }, [post]);

  // ── Loading ───────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 18 }}>
        <CircularProgress />
      </Box>
    );
  }

  // ── 404 ───────────────────────────────────────────────────────────────────
  if (!post) return <NotFound recentPosts={recentPosts} />;

  const minutes = readingMinutes(post.body);

  return (
    <Box
      component="article"
      sx={{ bgcolor: "background.default", minHeight: "100vh" }}
    >

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <Box
        component="header"
        sx={{
          position: "relative",
          height:   { xs: 300, sm: 400, md: 520 },
          overflow: "hidden",
          bgcolor:  isDark ? "#000000" : "#1a365d",
        }}
      >
        {post.coverImage && (
          <Box
            component="img"
            src={buildCloudinaryUrl(post.coverImage, { width: 1600, crop: "limit" })}
            alt={post.title}
            fetchpriority="high"
            sx={{
              position:  "absolute",
              inset:     0,
              width:     "100%",
              height:    "100%",
              objectFit: "cover",
            }}
          />
        )}

        {/* Gradient overlay — always shown; deeper without a photo */}
        <Box
          aria-hidden="true"
          sx={{
            position:   "absolute",
            inset:      0,
            background: post.coverImage
              ? "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.72) 100%)"
              : "linear-gradient(135deg, #1a365d 0%, #2c5282 100%)",
          }}
        />

        {/* Title overlay */}
        <Container
          maxWidth="md"
          sx={{
            position:      "absolute",
            bottom:        0,
            left:          "50%",
            transform:     "translateX(-50%)",
            pb:            { xs: 4, md: 6 },
            width:         "100%",
          }}
        >
          {post.category && (
            <Chip
              label={post.category}
              size="small"
              sx={{
                mb:         1.5,
                bgcolor:    alpha(theme.palette.primary.main, 0.85),
                color:      "#fff",
                fontWeight: 700,
                fontSize:   "0.7rem",
                letterSpacing: "0.06em",
              }}
            />
          )}
          <Typography
            variant="h2"
            component="h1"
            fontWeight={800}
            sx={{
              color:      "#fff",
              lineHeight: 1.2,
              fontSize:   { xs: "1.6rem", sm: "2rem", md: "2.6rem" },
              textShadow: "0 2px 12px rgba(0,0,0,0.4)",
            }}
          >
            {post.title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1.5, flexWrap: "wrap" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, color: "rgba(255,255,255,0.75)" }}>
              <CalendarMonth sx={{ fontSize: 16 }} aria-hidden="true" />
              <Typography variant="caption" sx={{ fontSize: "0.82rem" }}>
                {formatDate(post.publishedAt)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, color: "rgba(255,255,255,0.75)" }}>
              <AccessTime sx={{ fontSize: 16 }} aria-hidden="true" />
              <Typography variant="caption" sx={{ fontSize: "0.82rem" }}>
                {minutes} dk okuma
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── Article body ─────────────────────────────────────────────────── */}
      <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>

        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          aria-label="Sayfa konumu"
          sx={{ mb: 4 }}
        >
          <Box
            component={Link}
            to={PATHS.HOME}
            sx={{
              display:        "flex",
              alignItems:     "center",
              color:          "text.secondary",
              textDecoration: "none",
              fontSize:       "0.875rem",
              "&:hover":      { color: "primary.main" },
            }}
          >
            <Home sx={{ mr: 0.5, fontSize: 17 }} aria-hidden="true" />
            Anasayfa
          </Box>
          <Box
            component={Link}
            to={PATHS.BLOG}
            sx={{
              color:          "text.secondary",
              textDecoration: "none",
              fontSize:       "0.875rem",
              "&:hover":      { color: "primary.main" },
            }}
          >
            Haberler
          </Box>
          <Typography color="text.primary" noWrap sx={{ maxWidth: 240, fontSize: "0.875rem" }}>
            {post.title}
          </Typography>
        </Breadcrumbs>

        {/* Prose wrapper */}
        <Box
          sx={{
            p:              { xs: 3, md: "48px 56px" },
            borderRadius:   3,
            border:         "1px solid",
            borderColor:    "divider",
            bgcolor:        "background.paper",
            ...(isDark && {
              background:          theme.glass?.bgSubtle,
              backdropFilter:      "blur(16px)",
              WebkitBackdropFilter:"blur(16px)",
            }),
          }}
        >
          {/* Body text — plain text or HTML (admin-entered only) */}
          {post.body ? (
            looksLikeHtml(post.body) ? (
              // HTML content: render markup as-is (content is admin-entered, not user-submitted)
              <Box
                component="div"
                dangerouslySetInnerHTML={{ __html: post.body }}
                sx={{
                  lineHeight: 1.9,
                  fontSize:   "1.05rem",
                  color:      "text.primary",
                  wordBreak:  "break-word",
                  // Prose-level spacing for block elements generated by the rich-text editor
                  "& p":          { mb: 2 },
                  "& h1,& h2,& h3,& h4": { mt: 4, mb: 1.5, fontWeight: 700 },
                  "& ul,& ol":    { pl: 3, mb: 2 },
                  "& li":         { mb: 0.75 },
                  "& a":          { color: "primary.main" },
                  "& img":        { maxWidth: "100%", borderRadius: "8px", my: 2 },
                  "& blockquote": {
                    borderLeft: "4px solid",
                    borderColor: "primary.main",
                    pl: 2, my: 2,
                    color: "text.secondary",
                    fontStyle: "italic",
                  },
                }}
              />
            ) : (
              // Plain text: preserve newlines
              <Typography
                variant="body1"
                component="div"
                sx={{
                  lineHeight: 1.9,
                  fontSize:   "1.05rem",
                  color:      "text.primary",
                  whiteSpace: "pre-wrap",
                  wordBreak:  "break-word",
                }}
              >
                {post.body}
              </Typography>
            )
          ) : (
            <Typography color="text.disabled" fontStyle="italic">
              İçerik henüz girilmemiş.
            </Typography>
          )}

          <Divider sx={{ mt: 6, mb: 4 }} />

          <Button
            variant="outlined"
            component={Link}
            to={PATHS.BLOG}
            startIcon={<ArrowBack />}
            sx={{ borderRadius: "50px", fontWeight: 600 }}
          >
            Tüm Haberler
          </Button>
        </Box>
      </Container>

      {/* ── Recent posts ─────────────────────────────────────────────────── */}
      {recentPosts.length > 0 && (
        <Box
          component="aside"
          aria-label="Son haberler"
          sx={{
            borderTop:   "1px solid",
            borderColor: "divider",
            py:          { xs: 7, md: 9 },
            bgcolor:     isDark
              ? alpha(theme.palette.primary.main, 0.04)
              : alpha(theme.palette.primary.main, 0.02),
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4 }}>
              <ArticleIcon sx={{ color: "primary.main" }} aria-hidden="true" />
              <Typography variant="h5" fontWeight={700}>
                Son Haberler
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {recentPosts.map((p) => (
                <Grid size={{ xs: 12, sm: 4 }} key={p.id}>
                  <RecentCard post={p} />
                </Grid>
              ))}
            </Grid>

            <Box sx={{ textAlign: "center", mt: 5 }}>
              <Button
                variant="outlined"
                component={Link}
                to={PATHS.BLOG}
                sx={{ borderRadius: "50px", px: 4 }}
              >
                Tüm Haberleri Gör
              </Button>
            </Box>
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default BlogDetail;
