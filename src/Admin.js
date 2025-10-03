import React, { useState } from "react";
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
} from "@mui/material";
import {
  Settings,
  Save,
  Palette,
  Title,
  Image,
  Preview,
  Refresh,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

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

function Admin({ settings, setSettings }) {
  // Local state admin formu için
  const [title, setTitle] = useState(settings.title || "");
  const [color, setColor] = useState(settings.color || "#1976d2");
  const [logoUrl, setLogoUrl] = useState(settings.logoUrl || "");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Ayarları kaydetme fonksiyonu
  const saveSettings = () => {
    const newSettings = { title, color, logoUrl };
    setSettings(newSettings);
    localStorage.setItem("siteSettings", JSON.stringify(newSettings));
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
    setSnackbarMessage("Ayarlar varsayılan değerlere sıfırlandı!");
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
          severity="success"
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
