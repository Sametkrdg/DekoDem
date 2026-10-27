import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Switch,
  Avatar,
  Divider,
} from "@mui/material";
import {
  Save,
  Refresh,
  Title,
  Palette,
  Image,
  Code,
  WhatsApp,
  Search,
} from "@mui/icons-material";
import { AdminCard, FormSection, SectionHeader, SectionTitle } from "../shared";
import { hueSaturationToHex, updateThemeFromHex } from "../../styles/Theme";

const DEFAULT_THEME = { hue: 8, saturation: 72 };

const DEFAULT_SETTINGS = {
  title: "DEKODEM",
  color: hueSaturationToHex(DEFAULT_THEME),
  logoUrl: "",
  description: "Profesyonel yapı çözümleri",
  whatsappPhone: "",
  codeReviewEnabled: true,
  seoTitle: "",
  seoDescription: "",
  seoOgImage: "",
};

const normalizeColor = (v) =>
  typeof v === "string" && v.trim().startsWith("#") ? v.trim() : DEFAULT_SETTINGS.color;

const SettingsPanel = ({ settings, setSettings, showSnackbar }) => {
  const [title, setTitle] = useState(settings.title || "");
  const [color, setColor] = useState(normalizeColor(settings.color));
  const [logoUrl, setLogoUrl] = useState(settings.logoUrl || "");
  const [whatsappPhone, setWhatsappPhone] = useState(settings.whatsappPhone || "");
  const [codeReviewEnabled, setCodeReviewEnabled] = useState(
    settings.codeReviewEnabled ?? DEFAULT_SETTINGS.codeReviewEnabled
  );
  const [seoTitle, setSeoTitle] = useState(settings.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(settings.seoDescription || "");
  const [seoOgImage, setSeoOgImage] = useState(settings.seoOgImage || "");

  useEffect(() => {
    setTitle(settings.title ?? DEFAULT_SETTINGS.title);
    setColor(normalizeColor(settings.color));
    setLogoUrl(settings.logoUrl ?? "");
    setWhatsappPhone(settings.whatsappPhone ?? "");
    setCodeReviewEnabled(settings.codeReviewEnabled ?? DEFAULT_SETTINGS.codeReviewEnabled);
    setSeoTitle(settings.seoTitle ?? "");
    setSeoDescription(settings.seoDescription ?? "");
    setSeoOgImage(settings.seoOgImage ?? "");
  }, [settings]);

  useEffect(() => {
    updateThemeFromHex(color);
  }, [color]);

  const handleSave = () => {
    const next = { title, color, logoUrl, whatsappPhone, codeReviewEnabled, seoTitle, seoDescription, seoOgImage };
    setSettings(next);
    localStorage.setItem("siteSettings", JSON.stringify(next));
    showSnackbar("Ayarlar başarıyla kaydedildi!");
  };

  const handleReset = () => {
    const next = { ...settings, ...DEFAULT_SETTINGS };
    setTitle(DEFAULT_SETTINGS.title);
    setColor(DEFAULT_SETTINGS.color);
    setLogoUrl(DEFAULT_SETTINGS.logoUrl);
    setWhatsappPhone(DEFAULT_SETTINGS.whatsappPhone);
    setCodeReviewEnabled(DEFAULT_SETTINGS.codeReviewEnabled);
    setSeoTitle("");
    setSeoDescription("");
    setSeoOgImage("");
    setSettings(next);
    localStorage.setItem("siteSettings", JSON.stringify(next));
    showSnackbar("Ayarlar varsayılan değerlere sıfırlandı!");
  };

  const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: "12px" } };

  return (
    <Grid container spacing={3}>
      {/* Left column */}
      <Grid size={{ xs: 12, lg: 8 }}>
        {/* Site Title */}
        <AdminCard>
          <FormSection>
            <SectionHeader>
              <Title sx={{ color: "primary.main", fontSize: 28 }} />
              <SectionTitle variant="h5">Site Başlığı</SectionTitle>
            </SectionHeader>
            <TextField
              fullWidth
              label="Site Başlığı"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn: DEKODEM"
              sx={fieldSx}
            />
          </FormSection>
        </AdminCard>

        {/* Color */}
        <AdminCard>
          <FormSection>
            <SectionHeader>
              <Palette sx={{ color: "error.main", fontSize: 28 }} />
              <SectionTitle variant="h5">Renk Ayarları</SectionTitle>
            </SectionHeader>
            <Grid container spacing={3} alignItems="center">
              <Grid size={{ xs: 12, md: 8 }}>
                <TextField
                  fullWidth
                  label="Temel Renk (Hex)"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ width: 24, height: 24, borderRadius: "4px", bgcolor: color, border: "1px solid", borderColor: "divider", mr: 1 }} />
                    ),
                  }}
                  sx={fieldSx}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  style={{ width: "100%", height: 48, borderRadius: 8, border: "1px solid #ccc", cursor: "pointer" }}
                />
              </Grid>
            </Grid>
          </FormSection>
        </AdminCard>

        {/* Logo */}
        <AdminCard>
          <FormSection>
            <SectionHeader>
              <Image sx={{ color: "primary.dark", fontSize: 28 }} />
              <SectionTitle variant="h5">Logo Ayarları</SectionTitle>
            </SectionHeader>
            <TextField
              fullWidth
              label="Logo URL"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="https://example.com/logo.png"
              sx={fieldSx}
            />
          </FormSection>
        </AdminCard>

        {/* WhatsApp */}
        <AdminCard>
          <FormSection>
            <SectionHeader>
              <WhatsApp sx={{ color: "#25D366", fontSize: 28 }} />
              <SectionTitle variant="h5">WhatsApp Butonu</SectionTitle>
            </SectionHeader>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Sayfanın sol alt köşesinde görünen WhatsApp butonu için telefon numarası. Ülke kodu dahil, sadece rakam girin.
            </Typography>
            <TextField
              fullWidth
              label="WhatsApp Numarası"
              value={whatsappPhone}
              onChange={(e) => setWhatsappPhone(e.target.value)}
              placeholder="905551234567"
              helperText="Örnek: 905551234567 (başında + olmadan)"
              sx={fieldSx}
            />
          </FormSection>
        </AdminCard>

        {/* SEO */}
        <AdminCard>
          <FormSection>
            <SectionHeader>
              <Search sx={{ color: "#2196f3", fontSize: 28 }} />
              <SectionTitle variant="h5">SEO Ayarları</SectionTitle>
            </SectionHeader>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Arama motorlarına ve sosyal medya paylaşımlarına görünen başlık, açıklama ve resim bilgileri.
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Meta Başlık (SEO Title)"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder={title || "DEKODEM"}
                  inputProps={{ maxLength: 70 }}
                  helperText={`${seoTitle.length}/70 karakter`}
                  sx={fieldSx}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Meta Açıklama (SEO Description)"
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder="Profesyonel inşaat, tadilat ve yapı çözümleri..."
                  multiline
                  minRows={2}
                  inputProps={{ maxLength: 160 }}
                  helperText={`${seoDescription.length}/160 karakter`}
                  sx={fieldSx}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="OG Image URL (Sosyal Medya Görseli)"
                  value={seoOgImage}
                  onChange={(e) => setSeoOgImage(e.target.value)}
                  placeholder="https://example.com/og-image.jpg"
                  helperText="Önerilen boyut: 1200×630 px"
                  sx={fieldSx}
                />
              </Grid>
            </Grid>
          </FormSection>
        </AdminCard>

        {/* Code Review toggle */}
        <AdminCard>
          <FormSection>
            <SectionHeader>
              <Code sx={{ color: "primary.main", fontSize: 28 }} />
              <SectionTitle variant="h5">Kod İncelemesi Bölümü</SectionTitle>
            </SectionHeader>
            <FormControlLabel
              control={
                <Switch
                  checked={codeReviewEnabled}
                  onChange={(e) => setCodeReviewEnabled(e.target.checked)}
                  color="primary"
                />
              }
              label={codeReviewEnabled ? "Etkin — anasayfada görünür" : "Devre dışı"}
            />
          </FormSection>
        </AdminCard>

        {/* Action buttons */}
        <AdminCard>
          <FormSection>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<Save />}
                  onClick={handleSave}
                  sx={{ borderRadius: 2, py: 1.8, background: "linear-gradient(135deg,#27ae60,#2ecc71)", "&:hover": { background: "linear-gradient(135deg,#219a52,#27ae60)" } }}
                >
                  Ayarları Kaydet
                </Button>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  startIcon={<Refresh />}
                  onClick={handleReset}
                  color="error"
                  sx={{ borderRadius: 2, py: 1.8 }}
                >
                  Varsayılana Sıfırla
                </Button>
              </Grid>
            </Grid>
          </FormSection>
        </AdminCard>
      </Grid>

      {/* Right column — Preview */}
      <Grid size={{ xs: 12, lg: 4 }}>
        <AdminCard sx={{ position: { lg: "sticky" }, top: { lg: 24 } }}>
          <FormSection>
            <SectionHeader>
              <SectionTitle variant="h5">Önizleme</SectionTitle>
            </SectionHeader>

            <Divider sx={{ mb: 3 }} />

            {/* Title preview */}
            <Typography variant="overline" color="text.secondary">Site Başlığı</Typography>
            <Typography
              variant="h5"
              fontWeight={800}
              sx={{
                mb: 3,
                background: `linear-gradient(135deg, ${color}, #2ecc71)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {title || "Site Başlığı"}
            </Typography>

            {/* Color preview */}
            <Typography variant="overline" color="text.secondary">Seçilen Renk</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3, mt: 0.5 }}>
              <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: color, boxShadow: 2 }} />
              <Typography variant="body2" color="text.secondary">{color}</Typography>
            </Box>

            {/* Logo preview */}
            <Typography variant="overline" color="text.secondary">Logo Önizleme</Typography>
            <Box sx={{ mt: 1 }}>
              {logoUrl ? (
                <Avatar src={logoUrl} sx={{ width: 80, height: 80, boxShadow: 2 }} />
              ) : (
                <Typography variant="body2" color="text.disabled">Logo URL girilmemiş</Typography>
              )}
            </Box>
          </FormSection>
        </AdminCard>
      </Grid>
    </Grid>
  );
};

export default SettingsPanel;
