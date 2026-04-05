import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  VideoLibrary,
  Collections,
  CloudUpload,
  CloudSync,
  Add,
  Delete,
} from "@mui/icons-material";
import { AdminCard, FormSection, SectionHeader, SectionTitle, slugify } from "../shared";
import { saveSiteContent, fetchSiteContent } from "../../services/contentService";
import { isFirebaseConfigured } from "../../config/firebase";

const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: "12px" } };

const ContentPanel = ({ siteContent, setSiteContent, refreshSiteContent, showSnackbar }) => {
  const [videos, setVideos] = useState(siteContent?.homepageVideos || []);
  const [photos, setPhotos] = useState(siteContent?.galleryPhotos || []);
  const [isSaving, setIsSaving] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setVideos(siteContent?.homepageVideos || []);
    setPhotos(siteContent?.galleryPhotos || []);
  }, [siteContent]);

  // ── Video handlers ──────────────────────────────────────────────────
  const handleVideoChange = (i, field, val) =>
    setVideos((prev) => prev.map((v, idx) => (idx === i ? { ...v, [field]: val } : v)));

  const handleAddVideo = () => setVideos((p) => [...p, { title: "", url: "" }]);

  const handleRemoveVideo = (i) => setVideos((p) => p.filter((_, idx) => idx !== i));

  // ── Photo handlers ──────────────────────────────────────────────────
  const handlePhotoChange = (i, field, val) =>
    setPhotos((prev) => prev.map((p, idx) => (idx === i ? { ...p, [field]: val } : p)));

  const handleAddPhoto = () =>
    setPhotos((p) => [...p, { id: `photo-${p.length + 1}`, title: "", url: "", description: "" }]);

  const handleRemovePhoto = (i) => setPhotos((p) => p.filter((_, idx) => idx !== i));

  // ── Sanitize ────────────────────────────────────────────────────────
  const sanitizeVideos = () =>
    videos
      .map((v, i) => ({ title: v?.title?.trim() || `Video ${i + 1}`, url: (v?.url || "").trim() }))
      .filter((v) => v.url);

  const sanitizePhotos = () =>
    photos
      .map((p, i) => {
        const title = p?.title?.trim() || `Fotoğraf ${i + 1}`;
        const url = (p?.url || "").trim();
        return url
          ? { id: p?.id?.trim() || slugify(title) || `photo-${i + 1}`, title, url, description: p?.description?.trim() || "" }
          : null;
      })
      .filter(Boolean);

  // ── Save / Refresh ──────────────────────────────────────────────────
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = { homepageVideos: sanitizeVideos(), galleryPhotos: sanitizePhotos() };
      await saveSiteContent(payload);
      setSiteContent?.((prev) => ({ ...prev, ...payload }));
      showSnackbar("İçerik başarıyla kaydedildi!");
    } catch (err) {
      showSnackbar(err.message || "İçerik kaydedilemedi.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      if (refreshSiteContent) {
        await refreshSiteContent();
      } else {
        const latest = await fetchSiteContent();
        setSiteContent?.(latest);
      }
      showSnackbar("İçerik Firebase'den güncellendi.");
    } catch (err) {
      showSnackbar(err.message || "İçerik yenilenemedi.", "error");
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Box>
      {/* ── Videos ───────────────────────────────────────────────── */}
      <AdminCard>
        <FormSection>
          <SectionHeader>
            <VideoLibrary sx={{ color: "primary.dark", fontSize: 28 }} />
            <SectionTitle variant="h5">Anasayfa Videoları</SectionTitle>
          </SectionHeader>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            YouTube bağlantısını veya yalnızca video ID'sini girebilirsiniz.
          </Typography>

          <Grid container spacing={2}>
            {videos.length === 0 && (
              <Grid item xs={12}>
                <Alert severity="info" sx={{ borderRadius: 2 }}>
                  Henüz video eklenmedi.
                </Alert>
              </Grid>
            )}

            {videos.map((video, i) => (
              <Grid item xs={12} key={i}>
                <Card variant="outlined" sx={{ borderRadius: 3, borderColor: "primary.light", bgcolor: "primary.50" }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={5}>
                        <TextField
                          fullWidth
                          label="Video Başlığı"
                          value={video?.title || ""}
                          onChange={(e) => handleVideoChange(i, "title", e.target.value)}
                          placeholder="Örn: Proje Tanıtımı"
                          sx={fieldSx}
                        />
                      </Grid>
                      <Grid item xs={12} md={7}>
                        <TextField
                          fullWidth
                          label="YouTube URL veya Video ID"
                          value={video?.url || video?.id || ""}
                          onChange={(e) => handleVideoChange(i, "url", e.target.value)}
                          placeholder="https://www.youtube.com/watch?v=..."
                          sx={fieldSx}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button color="error" startIcon={<Delete />} onClick={() => handleRemoveVideo(i)}>
                          Videoyu Kaldır
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Button variant="outlined" startIcon={<Add />} onClick={handleAddVideo} sx={{ borderRadius: 2 }}>
                Video Ekle
              </Button>
            </Grid>
          </Grid>
        </FormSection>
      </AdminCard>

      {/* ── Photos ───────────────────────────────────────────────── */}
      <AdminCard>
        <FormSection>
          <SectionHeader>
            <Collections sx={{ color: "#16a085", fontSize: 28 }} />
            <SectionTitle variant="h5">Galeri Fotoğrafları</SectionTitle>
          </SectionHeader>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Sitede kullanılan görselleri buradan güncelleyebilirsiniz.
          </Typography>

          <Grid container spacing={2}>
            {photos.length === 0 && (
              <Grid item xs={12}>
                <Alert severity="info" sx={{ borderRadius: 2 }}>
                  Henüz fotoğraf eklenmedi.
                </Alert>
              </Grid>
            )}

            {photos.map((photo, i) => (
              <Grid item xs={12} key={i}>
                <Card variant="outlined" sx={{ borderRadius: 3, borderColor: "rgba(22,160,133,0.25)", bgcolor: "rgba(22,160,133,0.04)" }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Grid container spacing={2} alignItems="stretch">
                      {/* Preview thumbnail */}
                      <Grid item xs={12} md={3}>
                        <Box
                          sx={{
                            width: "100%",
                            paddingTop: "65%",
                            borderRadius: 2,
                            background: photo?.url
                              ? `url(${photo.url}) center/cover no-repeat`
                              : "linear-gradient(135deg,#16a085,#1abc9c)",
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <Grid container spacing={1.5}>
                          <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Başlık" value={photo?.title || ""} onChange={(e) => handlePhotoChange(i, "title", e.target.value)} sx={fieldSx} />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="ID" value={photo?.id || ""} onChange={(e) => handlePhotoChange(i, "id", e.target.value)} placeholder="modern-konutlar" sx={fieldSx} />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField fullWidth label="URL" value={photo?.url || ""} onChange={(e) => handlePhotoChange(i, "url", e.target.value)} placeholder="https://..." sx={fieldSx} />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Açıklama"
                              value={photo?.description || ""}
                              onChange={(e) => handlePhotoChange(i, "description", e.target.value)}
                              multiline
                              minRows={2}
                              sx={fieldSx}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Button color="error" startIcon={<Delete />} onClick={() => handleRemovePhoto(i)}>
                              Fotoğrafı Kaldır
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Button variant="outlined" startIcon={<Add />} onClick={handleAddPhoto} sx={{ borderRadius: 2, borderColor: "#16a085", color: "#16a085" }}>
                Fotoğraf Ekle
              </Button>
            </Grid>
          </Grid>
        </FormSection>
      </AdminCard>

      {/* ── Save / Refresh ────────────────────────────────────────── */}
      <AdminCard>
        <FormSection>
          <SectionHeader>
            <CloudUpload sx={{ color: "#2980b9", fontSize: 28 }} />
            <SectionTitle variant="h5">İçerik İşlemleri</SectionTitle>
          </SectionHeader>

          {!isFirebaseConfigured && (
            <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
              Firebase yapılandırması eksik — içerik kayıt işlemleri devre dışı.
            </Alert>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <CloudUpload />}
                onClick={handleSave}
                disabled={isSaving || !isFirebaseConfigured}
                sx={{ borderRadius: 2, py: 1.8 }}
              >
                İçeriği Kaydet
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                variant="outlined"
                size="large"
                startIcon={isRefreshing ? <CircularProgress size={20} /> : <CloudSync />}
                onClick={handleRefresh}
                disabled={isRefreshing}
                sx={{ borderRadius: 2, py: 1.8 }}
              >
                Firebase'den Yenile
              </Button>
            </Grid>
          </Grid>
        </FormSection>
      </AdminCard>
    </Box>
  );
};

export default ContentPanel;
