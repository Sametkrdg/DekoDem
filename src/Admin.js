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
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { saveSiteContent, fetchSiteContent } from "./services/contentService";
import { isFirebaseConfigured } from "./firebase/config";

// Admin özel styled components
const AdminContainer = styled(Container)(({ theme }) => ({
  paddingTop: "40px",
  paddingBottom: "40px",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
}));

const AdminCard = styled(Card)(({ theme }) => ({
  marginBottom: "24px",
  borderRadius: "16px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 48px rgba(0,0,0,0.15)",
  },
}));

const AdminHeader = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "#fff",
  padding: "32px",
  borderRadius: "16px 16px 0 0",
  textAlign: "center",
  marginBottom: 0,
}));

const FormSection = styled(CardContent)(({ theme }) => ({
  padding: "32px",
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "24px",
  gap: "12px",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.3rem",
  fontWeight: "600",
  color: "#2c3e50",
  display: "flex",
  alignItems: "center",
  gap: "8px",
}));

const PreviewBox = styled(Box)(({ theme }) => ({
  padding: "20px",
  border: "2px dashed #e0e0e0",
  borderRadius: "12px",
  textAlign: "center",
  background: "#f8f9fa",
  minHeight: "120px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
}));

const ColorPreview = styled(Box)(({ theme, color }) => ({
  width: "100px",
  height: "40px",
  borderRadius: "8px",
  background: color || "#1976d2",
  border: "2px solid #fff",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  margin: "0 auto",
}));

const DEFAULT_SETTINGS = {
  title: "Sedat Demir Yapı",
  color: "#1976d2",
  logoUrl: "",
  description: "Profesyonel yapı çözümleri",
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

function Admin({
  settings,
  setSettings,
  siteContent,
  setSiteContent,
  refreshSiteContent,
}) {
  // Local state admin formu için
  const [title, setTitle] = useState(settings.title || "");
  const [color, setColor] = useState(settings.color || "#1976d2");
  const [logoUrl, setLogoUrl] = useState(settings.logoUrl || "");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [videos, setVideos] = useState(siteContent?.homepageVideos || []);
  const [photos, setPhotos] = useState(siteContent?.galleryPhotos || []);
  const [projects, setProjects] = useState(siteContent?.projects || []);
  const [isSavingContent, setIsSavingContent] = useState(false);
  const [isRefreshingContent, setIsRefreshingContent] = useState(false);

  // Ayarları kaydetme fonksiyonu
  const saveSettings = () => {
    const newSettings = { title, color, logoUrl };
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
        <AdminHeader>
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
        </AdminHeader>
      </AdminCard>

      <Grid container spacing={3}>
        {/* Sol Kolon - Ayarlar */}
        <Grid item xs={12} lg={8}>
          {/* Site Başlığı */}
          <AdminCard>
            <FormSection>
              <SectionHeader>
                <Title sx={{ color: "#3498db", fontSize: 28 }} />
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
                <Palette sx={{ color: "#e74c3c", fontSize: 28 }} />
                <SectionTitle variant="h5">Renk Ayarları</SectionTitle>
              </SectionHeader>

              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    label="Temel Renk"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="#1976d2"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: "4px",
                            background: color,
                            border: "1px solid #ccc",
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
                    style={{
                      width: "100%",
                      height: "56px",
                      border: "none",
                      borderRadius: "12px",
                      cursor: "pointer",
                      background: color,
                    }}
                  />
                </Grid>
              </Grid>
            </FormSection>
          </AdminCard>

          {/* Logo Ayarları */}
          <AdminCard>
            <FormSection>
              <SectionHeader>
                <Image sx={{ color: "#9b59b6", fontSize: 28 }} />
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

          {/* Video Yönetimi */}
          <AdminCard>
            <FormSection>
              <SectionHeader>
                <VideoLibrary sx={{ color: "#8e44ad", fontSize: 28 }} />
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
                        borderColor: "rgba(142, 68, 173, 0.2)",
                        background: "rgba(142, 68, 173, 0.04)",
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
