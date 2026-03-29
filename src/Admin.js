import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Alert,
  Snackbar,
  Avatar,
  CircularProgress,
  FormControlLabel,
  Switch,
} from "@mui/material";
import {
  Settings,
  Save,
  Palette,
  Title,
  Image,
  Preview,
  Refresh,
  VideoLibrary,
  Collections,
  Article,
  CloudUpload,
  CloudSync,
  Add,
  Delete,
  Code,
  ExitToApp,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { signOut } from "firebase/auth";
import { auth } from "./config/firebase";
import { saveSiteContent, fetchSiteContent } from "./services/contentService";
import { isFirebaseConfigured } from "./config/firebase";
import { hueSaturationToHex, updateThemeFromHex } from "./styles/Theme";
import { useSite } from "./context/SiteContext";

// Admin özel styled components
const AdminContainer = styled(Container)(() => ({
  paddingTop: "40px",
  paddingBottom: "40px",
  minHeight: "100vh",
  background: "var(--gradient-surface)",
}));

const AdminCard = styled(Card)(() => ({
  marginBottom: "24px",
  borderRadius: "16px",
  boxShadow: "0 8px 32px var(--shadow-color)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 48px var(--shadow-strong)",
  },
}));

const AdminHeader = styled(Box)(() => ({
  background: "linear-gradient(135deg, var(--primary-400) 0%, var(--primary-700) 100%)",
  color: "#var(--white)",
  padding: "32px",
  borderRadius: "16px 16px 0 0",
  textAlign: "center",
  marginBottom: 0,
}));

const FormSection = styled(CardContent)(() => ({
  padding: "32px",
}));

const SectionHeader = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "24px",
  gap: "12px",
}));

const SectionTitle = styled(Typography)(() => ({
  fontSize: "1.3rem",
  fontWeight: "600",
  color: "var(--text-primary)",
  display: "flex",
  alignItems: "center",
  gap: "8px",
}));

const PreviewBox = styled(Box)(() => ({
  padding: "20px",
  border: "2px dashed var(--border)",
  borderRadius: "12px",
  textAlign: "center",
  background: "var(--panel-bg)",
  minHeight: "120px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
}));

const ColorPreview = styled(Box)(({ color }) => ({
  width: "100px",
  height: "40px",
  borderRadius: "8px",
  background: color || "var(--primary-500)",
  border: "2px solid var(--white)",
  boxShadow: "0 4px 12px var(--shadow-strong)",
  margin: "0 auto",
}));

const DEFAULT_THEME = { hue: 8, saturation: 72 };

const DEFAULT_SETTINGS = {
  title: "Sedat Demir Yapı",
  color: hueSaturationToHex(DEFAULT_THEME),
  logoUrl: "",
  description: "Profesyonel yapı çözümleri",
  codeReviewEnabled: true,
};

const slugify = (value = "") =>
  value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const normalizeColor = (value) =>
  typeof value === "string" && value.trim().startsWith("#")
    ? value.trim()
    : DEFAULT_SETTINGS.color;

function Admin({
  settings,
  setSettings,
  siteContent,
  setSiteContent,
  refreshSiteContent,
}) {
  const { triggerSeed } = useSite();
  // Local state admin formu için
  const [title, setTitle] = useState(settings.title || "");
  const [color, setColor] = useState(normalizeColor(settings.color));
  const [logoUrl, setLogoUrl] = useState(settings.logoUrl || "");
  const [codeReviewEnabled, setCodeReviewEnabled] = useState(
    settings.codeReviewEnabled ?? DEFAULT_SETTINGS.codeReviewEnabled
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [videos, setVideos] = useState(siteContent?.homepageVideos || []);
  const [photos, setPhotos] = useState(siteContent?.galleryPhotos || []);
  const [projects, setProjects] = useState(siteContent?.projects || []);
  const [isSavingContent, setIsSavingContent] = useState(false);
  const [isRefreshingContent, setIsRefreshingContent] = useState(false);

  // Ayarları kaydetme fonksiyonu
  useEffect(() => {
    setTitle(settings.title ?? DEFAULT_SETTINGS.title);
    setColor(normalizeColor(settings.color));
    setLogoUrl(settings.logoUrl ?? DEFAULT_SETTINGS.logoUrl);
    setCodeReviewEnabled(
      settings.codeReviewEnabled ?? DEFAULT_SETTINGS.codeReviewEnabled
    );
  }, [settings]);

  useEffect(() => {
    updateThemeFromHex(color);
  }, [color]);

  const saveSettings = () => {
    const newSettings = { title, color, logoUrl, codeReviewEnabled };
    setSettings(newSettings);
    localStorage.setItem("siteSettings", JSON.stringify(newSettings));
    setSnackbarSeverity("success");
    setSnackbarMessage("Ayarlar başarıyla kaydedildi!");
    setSnackbarOpen(true);
  };

  // Ayarları sıfırlama fonksiyonu
  const resetSettings = () => {
    const newSettings = { ...settings, ...DEFAULT_SETTINGS };

    setTitle(DEFAULT_SETTINGS.title);
    setColor(DEFAULT_SETTINGS.color);
    setLogoUrl(DEFAULT_SETTINGS.logoUrl);
    setCodeReviewEnabled(DEFAULT_SETTINGS.codeReviewEnabled);
    setSettings(newSettings);
    localStorage.setItem("siteSettings", JSON.stringify(newSettings));
    setSnackbarSeverity("success");
    setSnackbarMessage("Ayarlar varsayılan değerlere sıfırlandı!");
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    setVideos(siteContent?.homepageVideos || []);
    setPhotos(siteContent?.galleryPhotos || []);
    setProjects(siteContent?.projects || []);
  }, [siteContent]);

  const handleVideoChange = (index, field, value) => {
    setVideos((prev) =>
      prev.map((video, videoIndex) =>
        videoIndex === index ? { ...video, [field]: value } : video
      )
    );
  };

  const handleAddVideo = () => {
    setVideos((prev) => [...prev, { title: "", url: "" }]);
  };

  const handleRemoveVideo = (index) => {
    setVideos((prev) => prev.filter((_, videoIndex) => videoIndex !== index));
  };

  const handlePhotoChange = (index, field, value) => {
    setPhotos((prev) =>
      prev.map((photo, photoIndex) =>
        photoIndex === index ? { ...photo, [field]: value } : photo
      )
    );
  };

  const handleAddPhoto = () => {
    setPhotos((prev) => [
      ...prev,
      { id: `photo-${prev.length + 1}`, title: "", url: "", description: "" },
    ]);
  };

  const handleRemovePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, photoIndex) => photoIndex !== index));
  };

  const handleProjectChange = (index, field, value) => {
    setProjects((prev) => {
      const nextProjects = prev.map((project, projectIndex) =>
        projectIndex === index ? { ...project, [field]: value } : project
      );

      if (field === "ad" && !nextProjects[index].slug) {
        nextProjects[index].slug = slugify(value);
      }

      return nextProjects;
    });
  };

  const handleAddProject = () => {
    setProjects((prev) => [
      ...prev,
      {
        ad: "",
        slug: "",
        aciklama: "",
        yer: "",
        yıl: "",
        durum: "",
        alan: "",
        icon: "🏗️",
        imageUrl: "",
      },
    ]);
  };

  const handleRemoveProject = (index) => {
    setProjects((prev) =>
      prev.filter((_, projectIndex) => projectIndex !== index)
    );
  };

  const sanitizeVideos = () =>
    videos
      .map((video, index) => ({
        title: video?.title?.trim() || `Video ${index + 1}`,
        url: (video?.url || video?.id || "").trim(),
      }))
      .filter((video) => video.url);

  const sanitizePhotos = () =>
    photos
      .map((photo, index) => {
        const title = photo?.title?.trim() || `Fotoğraf ${index + 1}`;
        const url = (photo?.url || "").trim();
        const description = photo?.description?.trim() || "";
        const id = photo?.id?.trim() || slugify(title) || `photo-${index + 1}`;

        return url
          ? {
            id,
            title,
            url,
            description,
          }
          : null;
      })
      .filter(Boolean);

  const sanitizeProjects = () =>
    projects
      .map((project, index) => {
        const title =
          project?.ad?.trim() || project?.title?.trim() || `Proje ${index + 1}`;
        const slug = project?.slug?.trim() || slugify(title);

        if (!title || !slug) {
          return null;
        }

        const sanitizedYear = project?.yıl
          ? Number(project.yıl) || project.yıl
          : "";

        return {
          ad: title,
          slug,
          aciklama:
            project?.aciklama?.trim() || project?.description?.trim() || "",
          yer: project?.yer?.trim() || project?.location?.trim() || "",
          yıl: sanitizedYear,
          durum:
            project?.durum?.trim() || project?.status?.trim() || "Devam Ediyor",
          alan: project?.alan?.trim() || project?.area?.trim() || "",
          icon: project?.icon?.trim() || project?.emoji || "🏗️",
          imageUrl:
            project?.imageUrl?.trim() || project?.coverImage?.trim() || "",
        };
      })
      .filter(Boolean);

  const handleSaveContent = async () => {
    const sanitizedVideos = sanitizeVideos();
    const sanitizedPhotos = sanitizePhotos();
    const sanitizedProjects = sanitizeProjects();

    setIsSavingContent(true);

    try {
      const payload = {
        homepageVideos: sanitizedVideos,
        galleryPhotos: sanitizedPhotos,
        projects: sanitizedProjects,
      };

      await saveSiteContent(payload);
      if (setSiteContent) {
        setSiteContent((previous) => ({ ...previous, ...payload }));
      }
      setSnackbarSeverity("success");
      setSnackbarMessage("İçerik başarıyla kaydedildi!");
    } catch (error) {
      console.error("İçerik kaydedilirken hata oluştu:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage(
        error.message ||
        "İçerik kaydedilemedi. Lütfen daha sonra tekrar deneyin."
      );
    } finally {
      setSnackbarOpen(true);
      setIsSavingContent(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Çıkış yapılırken hata oluştu:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Çıkış yapılamadı.");
      setSnackbarOpen(true);
    }
  };

  const handleRefreshContent = async () => {
    setIsRefreshingContent(true);

    try {
      if (refreshSiteContent) {
        await refreshSiteContent();
      } else {
        const latest = await fetchSiteContent();
        if (setSiteContent) {
          setSiteContent(latest);
        }
      }

      setSnackbarSeverity("success");
      setSnackbarMessage("İçerik Firebase'den güncellendi.");
    } catch (error) {
      console.error("İçerik yenilenirken hata oluştu:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage(
        error.message ||
        "İçerik yenilenemedi. Lütfen daha sonra tekrar deneyin."
      );
    } finally {
      setSnackbarOpen(true);
      setIsRefreshingContent(false);
    }
  };

  return (
    <AdminContainer maxWidth="lg">
      {/* Header */}
      <AdminCard>
        <AdminHeader sx={{ position: "relative" }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleSignOut}
            startIcon={<ExitToApp />}
            sx={{ position: "absolute", top: 16, right: 16, boxShadow: 2 }}
          >
            Çıkış Yap
          </Button>
          <Settings sx={{ fontSize: 40, mb: 2 }} />
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            Admin Panel
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Site ayarlarını buradan yönetebilirsiniz
          </Typography>
          {/* Seed Button */}
          <Button
            variant="contained"
            color="secondary"
            onClick={triggerSeed}
            sx={{ mt: 2 }}
          >
            Verileri Yükle (Seed)
          </Button>
        </AdminHeader>
      </AdminCard>

      <Grid container spacing={3}>
        {/* Sol Kolon - Ayarlar */}
        <Grid item xs={12} lg={8}>
          {/* Site Başlığı */}
          <AdminCard>
            <FormSection>
              <SectionHeader>
                <Title sx={{ color: "var(--primary-500)", fontSize: 28 }} />
                <SectionTitle variant="h5">Site Başlığı</SectionTitle>
              </SectionHeader>

              <TextField
                fullWidth
                label="Site Başlığı"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Örn: Sedat Demir Yapı"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
            </FormSection>
          </AdminCard>

          {/* Renk Ayarları */}
          <AdminCard>
            <FormSection>
              <SectionHeader>
                <Palette sx={{ color: "var(--danger)", fontSize: 28 }} />
                <SectionTitle variant="h5">Renk Ayarları</SectionTitle>
              </SectionHeader>

              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    label="Temel Renk"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="{DEFAULT_SETTINGS.color}"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: "4px",
                            background: color,
                            border: "1px solid var(--border)",
                            mr: 1,
                          }}
                        />
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="admin-color-picker_input"
                  />
                </Grid>
              </Grid>
            </FormSection>
          </AdminCard>

          {/* Logo Ayarları */}
          <AdminCard>
            <FormSection>
              <SectionHeader>
                <Image sx={{ color: "var(--primry-600)", fontSize: 28 }} />
                <SectionTitle variant="h5">Logo Ayarları</SectionTitle>
              </SectionHeader>

              <TextField
                fullWidth
                label="Logo URL"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="https://example.com/logo.png"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
            </FormSection>
          </AdminCard>

          {/* Kod İncelemesi Ayarları */}
          <AdminCard>
            <FormSection>
              <SectionHeader>
                <Code sx={{ color: "var(--priamry-500)", fontSize: 28 }} />
                <SectionTitle variant="h5">Kod İncelemesi</SectionTitle>
              </SectionHeader>

              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Kod incelemesi bölümünü etkinleştirerek yazılım kalitesi,
                güvenlik kontrolleri ve optimizasyon önerileri hakkında
                bilgilendirici içerikleri ziyaretçilere sunabilirsiniz.
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={codeReviewEnabled}
                    onChange={(event) =>
                      setCodeReviewEnabled(event.target.checked)
                    }
                    color="primary"
                  />
                }
                label={
                  codeReviewEnabled
                    ? "Kod incelemesi etkin"
                    : "Kod incelemesi devre dışı"
                }
              />
            </FormSection>
          </AdminCard>

          {/* Video Yönetimi */}
          <AdminCard>
            <FormSection>
              <SectionHeader>
                <VideoLibrary sx={{ color: "var(--primary-700)", fontSize: 28 }} />
                <SectionTitle variant="h5">Anasayfa Videoları</SectionTitle>
              </SectionHeader>

              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                YouTube bağlantılarını buradan güncelleyebilirsiniz. Video
                URL'sini veya sadece video ID'sini girebilirsiniz.
              </Typography>

              <Grid container spacing={3}>
                {videos.length === 0 && (
                  <Grid item xs={12}>
                    <Alert severity="info" sx={{ borderRadius: "12px" }}>
                      Henüz video eklenmedi. Yeni videolar eklediğinizde
                      anasayfadaki video alanı otomatik olarak güncellenecektir.
                    </Alert>
                  </Grid>
                )}

                {videos.map((video, index) => (
                  <Grid item xs={12} key={`video-${index}`}>
                    <Card
                      variant="outlined"
                      sx={{
                        borderRadius: "16px",
                        borderColor: "var(--primary-alpha-20)",
                        background: "var(--primary-alpha-04)",
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={5}>
                            <TextField
                              fullWidth
                              label="Video Başlığı"
                              value={video?.title || ""}
                              onChange={(event) =>
                                handleVideoChange(
                                  index,
                                  "title",
                                  event.target.value
                                )
                              }
                              placeholder="Örn: Proje Tanıtımı"
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: "12px",
                                },
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} md={7}>
                            <TextField
                              fullWidth
                              label="YouTube URL veya Video ID"
                              value={video?.url || video?.id || ""}
                              onChange={(event) =>
                                handleVideoChange(
                                  index,
                                  "url",
                                  event.target.value
                                )
                              }
                              placeholder="https://www.youtube.com/watch?v=..."
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: "12px",
                                },
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              color="error"
                              startIcon={<Delete />}
                              onClick={() => handleRemoveVideo(index)}
                            >
                              Videoyu Kaldır
                            </Button>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={handleAddVideo}
                    sx={{ borderRadius: "12px" }}
                  >
                    Video Ekle
                  </Button>
                </Grid>
              </Grid>
            </FormSection>
          </AdminCard>

          {/* Fotoğraf Yönetimi */}
          <AdminCard>
            <FormSection>
              <SectionHeader>
                <Collections sx={{ color: "#16a085", fontSize: 28 }} />
                <SectionTitle variant="h5">Site Fotoğrafları</SectionTitle>
              </SectionHeader>

              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Sitede kullanılan görselleri buradan güncelleyebilirsiniz.
                Fotoğraf URL'si doğrudan görsele ait olmalıdır.
              </Typography>

              <Grid container spacing={3}>
                {photos.length === 0 && (
                  <Grid item xs={12}>
                    <Alert severity="info" sx={{ borderRadius: "12px" }}>
                      Henüz fotoğraf eklenmedi. Fotoğraf eklediğinizde ilgili
                      bölümlerde otomatik olarak görünecektir.
                    </Alert>
                  </Grid>
                )}

                {photos.map((photo, index) => (
                  <Grid item xs={12} key={`photo-${index}`}>
                    <Card
                      variant="outlined"
                      sx={{
                        borderRadius: "16px",
                        borderColor: "rgba(22, 160, 133, 0.2)",
                        background: "rgba(22, 160, 133, 0.04)",
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Grid container spacing={2} alignItems="stretch">
                          <Grid item xs={12} md={4}>
                            <Box
                              sx={{
                                width: "100%",
                                paddingTop: "65%",
                                borderRadius: "12px",
                                background: photo?.url
                                  ? `url(${photo.url}) center/cover no-repeat`
                                  : "linear-gradient(135deg, #16a085, #1abc9c)",
                                position: "relative",
                                overflow: "hidden",
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} md={8}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={6}>
                                <TextField
                                  fullWidth
                                  label="Fotoğraf Başlığı"
                                  value={photo?.title || ""}
                                  onChange={(event) =>
                                    handlePhotoChange(
                                      index,
                                      "title",
                                      event.target.value
                                    )
                                  }
                                  placeholder="Örn: Modern Konutlar"
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: "12px",
                                    },
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <TextField
                                  fullWidth
                                  label="Fotoğraf ID"
                                  value={photo?.id || ""}
                                  onChange={(event) =>
                                    handlePhotoChange(
                                      index,
                                      "id",
                                      event.target.value
                                    )
                                  }
                                  placeholder="ör. modern-konutlar"
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: "12px",
                                    },
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  fullWidth
                                  label="Fotoğraf URL'si"
                                  value={photo?.url || ""}
                                  onChange={(event) =>
                                    handlePhotoChange(
                                      index,
                                      "url",
                                      event.target.value
                                    )
                                  }
                                  placeholder="https://..."
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: "12px",
                                    },
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  fullWidth
                                  label="Açıklama"
                                  value={photo?.description || ""}
                                  onChange={(event) =>
                                    handlePhotoChange(
                                      index,
                                      "description",
                                      event.target.value
                                    )
                                  }
                                  placeholder="Fotoğrafla ilgili kısa açıklama"
                                  multiline
                                  minRows={2}
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: "12px",
                                    },
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <Button
                                  color="error"
                                  startIcon={<Delete />}
                                  onClick={() => handleRemovePhoto(index)}
                                >
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
                  <Button
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={handleAddPhoto}
                    sx={{ borderRadius: "12px" }}
                  >
                    Fotoğraf Ekle
                  </Button>
                </Grid>
              </Grid>
            </FormSection>
          </AdminCard>

          {/* Proje / Makale Yönetimi */}
          <AdminCard>
            <FormSection>
              <SectionHeader>
                <Article sx={{ color: "#d35400", fontSize: 28 }} />
                <SectionTitle variant="h5">Projeler ve Makaleler</SectionTitle>
              </SectionHeader>

              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Proje kartlarında gösterilecek bilgileri düzenleyin. Slug alanı
                yönlendirme için kullanılır ve benzersiz olmalıdır.
              </Typography>

              {projects.length === 0 && (
                <Alert severity="info" sx={{ mb: 3, borderRadius: "12px" }}>
                  Henüz proje eklenmedi. Yeni bir proje eklediğinizde projeler
                  sayfasındaki kartlar otomatik güncellenir.
                </Alert>
              )}

              {projects.map((project, index) => (
                <Box
                  key={`project-${index}`}
                  sx={{
                    mb: 3,
                    p: 3,
                    borderRadius: "16px",
                    background: "rgba(211, 84, 0, 0.05)",
                    border: "1px solid rgba(211, 84, 0, 0.2)",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Proje Başlığı"
                        value={project?.ad || ""}
                        onChange={(event) =>
                          handleProjectChange(index, "ad", event.target.value)
                        }
                        placeholder="Örn: Modern Konutlar"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Slug"
                        value={project?.slug || ""}
                        onChange={(event) =>
                          handleProjectChange(index, "slug", event.target.value)
                        }
                        placeholder="modern-konutlar"
                        helperText="URL'de kullanılacak kısa isim"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Konum"
                        value={project?.yer || ""}
                        onChange={(event) =>
                          handleProjectChange(index, "yer", event.target.value)
                        }
                        placeholder="Örn: İstanbul"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        label="Yıl"
                        value={project?.yıl || ""}
                        type="number"
                        onChange={(event) =>
                          handleProjectChange(index, "yıl", event.target.value)
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        label="Durum"
                        value={project?.durum || ""}
                        onChange={(event) =>
                          handleProjectChange(
                            index,
                            "durum",
                            event.target.value
                          )
                        }
                        placeholder="Örn: Tamamlandı"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Alan"
                        value={project?.alan || ""}
                        onChange={(event) =>
                          handleProjectChange(index, "alan", event.target.value)
                        }
                        placeholder="Örn: 15.000 m²"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Simge (emoji)"
                        value={project?.icon || ""}
                        onChange={(event) =>
                          handleProjectChange(index, "icon", event.target.value)
                        }
                        placeholder="Örn: 🏠"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Kısa Açıklama"
                        value={project?.aciklama || ""}
                        onChange={(event) =>
                          handleProjectChange(
                            index,
                            "aciklama",
                            event.target.value
                          )
                        }
                        multiline
                        minRows={3}
                        placeholder="Proje hakkında kısa açıklama"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Kapak Görseli URL'si"
                        value={project?.imageUrl || ""}
                        onChange={(event) =>
                          handleProjectChange(
                            index,
                            "imageUrl",
                            event.target.value
                          )
                        }
                        placeholder="https://..."
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        color="error"
                        startIcon={<Delete />}
                        onClick={() => handleRemoveProject(index)}
                      >
                        Projeyi Kaldır
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              ))}

              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={handleAddProject}
                sx={{ borderRadius: "12px" }}
              >
                Proje Ekle
              </Button>
            </FormSection>
          </AdminCard>

          {/* Aksiyon Butonları */}
          <AdminCard>
            <FormSection>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={saveSettings}
                    startIcon={<Save />}
                    sx={{
                      borderRadius: "12px",
                      padding: "16px",
                      fontSize: "1.1rem",
                      background: "linear-gradient(135deg, #27ae60, #2ecc71)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #219a52, #27ae60)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 20px rgba(39, 174, 96, 0.4)",
                      },
                    }}
                  >
                    Ayarları Kaydet
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="large"
                    onClick={resetSettings}
                    startIcon={<Refresh />}
                    sx={{
                      borderRadius: "12px",
                      padding: "16px",
                      fontSize: "1.1rem",
                      borderColor: "#e74c3c",
                      color: "#e74c3c",
                      "&:hover": {
                        borderColor: "#c0392b",
                        color: "#c0392b",
                        background: "rgba(231, 76, 60, 0.1)",
                      },
                    }}
                  >
                    Sıfırla
                  </Button>
                </Grid>
              </Grid>
            </FormSection>
          </AdminCard>

          {/* İçerik Aksiyonları */}
          <AdminCard>
            <FormSection>
              <SectionHeader>
                <CloudUpload sx={{ color: "#2980b9", fontSize: 28 }} />
                <SectionTitle variant="h5">İçerik İşlemleri</SectionTitle>
              </SectionHeader>

              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Firebase üzerinden gelen site içeriğini kaydedebilir veya
                yenileyebilirsiniz.
              </Typography>

              {!isFirebaseConfigured && (
                <Alert severity="warning" sx={{ mb: 3, borderRadius: "12px" }}>
                  Firebase yapılandırması yapılmadığı için içerik kaydetme
                  işlemleri şu anda devre dışı. Lütfen proje kök dizinine .env
                  dosyası ekleyerek Firebase bilgilerinizi tanımlayın.
                </Alert>
              )}

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={
                      isSavingContent ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <CloudUpload />
                      )
                    }
                    onClick={handleSaveContent}
                    disabled={isSavingContent || !isFirebaseConfigured}
                    sx={{
                      borderRadius: "12px",
                      padding: "16px",
                      fontSize: "1.05rem",
                    }}
                  >
                    İçeriği Kaydet
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="large"
                    startIcon={
                      isRefreshingContent ? (
                        <CircularProgress size={20} />
                      ) : (
                        <CloudSync />
                      )
                    }
                    onClick={handleRefreshContent}
                    disabled={isRefreshingContent}
                    sx={{
                      borderRadius: "12px",
                      padding: "16px",
                      fontSize: "1.05rem",
                    }}
                  >
                    Firebase'den Yenile
                  </Button>
                </Grid>
              </Grid>
            </FormSection>
          </AdminCard>
        </Grid>

        {/* Sağ Kolon - Önizleme */}
        <Grid item xs={12} lg={4}>
          <AdminCard>
            <FormSection>
              <SectionHeader>
                <Preview sx={{ color: "#f39c12", fontSize: 28 }} />
                <SectionTitle variant="h5">Önizleme</SectionTitle>
              </SectionHeader>

              {/* Başlık Önizleme */}
              <PreviewBox sx={{ mb: 3 }}>
                <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>
                  Site Başlığı
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    background: `linear-gradient(135deg, ${color}, #2ecc71)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {title || "Site Başlığı"}
                </Typography>
              </PreviewBox>

              {/* Renk Önizleme */}
              <PreviewBox sx={{ mb: 3 }}>
                <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
                  Seçilen Renk
                </Typography>
                <ColorPreview color={color} />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 1 }}
                >
                  {color}
                </Typography>
              </PreviewBox>

              {/* Logo Önizleme */}
              <PreviewBox>
                <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
                  Logo Önizleme
                </Typography>
                {logoUrl ? (
                  <Avatar
                    src={logoUrl}
                    sx={{
                      width: 80,
                      height: 80,
                      mx: "auto",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    }}
                  />
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    Logo URL'si girilmemiş
                  </Typography>
                )}
              </PreviewBox>
            </FormSection>
          </AdminCard>
        </Grid>
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{
            width: "100%",
            borderRadius: "12px",
            "& .MuiAlert-icon": {
              fontSize: 24,
            },
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </AdminContainer>
  );
}

export default Admin;
