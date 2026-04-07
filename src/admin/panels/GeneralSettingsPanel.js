/**
 * GeneralSettingsPanel
 *
 * Manages two Firestore singleton documents:
 *   Settings/main  → { Address, Email, Phone, InstaUrl, LogoUrl }
 *   About/main     → { AboutShort, AboutLong }
 *
 * Also manages the admin UI colour/title (localStorage).
 */
import React, { useEffect, useState } from "react";
import {
  Box, Grid, TextField, Button, Typography,
  CircularProgress, Alert,
} from "@mui/material";
import { Save, Settings, Info, Palette } from "@mui/icons-material";
import { AdminCard, FormSection, SectionHeader, SectionTitle } from "../shared";
import { setDocument, getDocument } from "../adminFirestore";
import { isFirebaseConfigured } from "../../config/firebase";
import { hueSaturationToHex, updateThemeFromHex } from "../../styles/Theme";
import ImageUploader from "../../components/ImageUploader.jsx";

const DEFAULT_THEME = { hue: 8, saturation: 72 };

const EMPTY_CONTACT = { Phone: "", Email: "", Address: "", InstaUrl: "", LogoUrl: "" };
const EMPTY_ABOUT   = { AboutShort: "", AboutLong: "" };

const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: "12px" } };

const GeneralSettingsPanel = ({ settings, setSettings, showSnackbar }) => {
  // ── Contact settings (Settings/main) ──────────────────────────────────
  const [contact, setContact]   = useState(EMPTY_CONTACT);
  const [loadingC, setLoadingC] = useState(true);
  const [savingC,  setSavingC]  = useState(false);

  // ── About content (About/main) ────────────────────────────────────────
  const [about,    setAbout]    = useState(EMPTY_ABOUT);
  const [loadingA, setLoadingA] = useState(true);
  const [savingA,  setSavingA]  = useState(false);

  // ── Admin UI colour (localStorage) ────────────────────────────────────
  const [color, setColor] = useState(
    settings?.color || hueSaturationToHex(DEFAULT_THEME)
  );
  const [title, setTitle] = useState(settings?.title || "DEKODEM");

  // ── Effects ───────────────────────────────────────────────────────────
  useEffect(() => {
    updateThemeFromHex(color);
  }, [color]);

  useEffect(() => {
    setColor(settings?.color || hueSaturationToHex(DEFAULT_THEME));
    setTitle(settings?.title || "DEKODEM");
  }, [settings]);

  useEffect(() => {
    (async () => {
      const data = await getDocument("Settings", "main");
      if (data) setContact((p) => ({ ...EMPTY_CONTACT, ...data }));
      setLoadingC(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await getDocument("About", "main");
      if (data) setAbout((p) => ({ ...EMPTY_ABOUT, ...data }));
      setLoadingA(false);
    })();
  }, []);

  // ── Handlers ─────────────────────────────────────────────────────────
  const handleContactChange = (field, val) =>
    setContact((p) => ({ ...p, [field]: val }));

  const handleAboutChange = (field, val) =>
    setAbout((p) => ({ ...p, [field]: val }));

  const saveContact = async () => {
    if (!isFirebaseConfigured) {
      showSnackbar("Firebase yapılandırması eksik.", "error");
      return;
    }
    setSavingC(true);
    try {
      await setDocument("Settings", "main", contact);
      showSnackbar("İletişim bilgileri kaydedildi!");
    } catch (err) {
      showSnackbar(err.message || "Kayıt başarısız.", "error");
    } finally {
      setSavingC(false);
    }
  };

  const saveAbout = async () => {
    if (!isFirebaseConfigured) {
      showSnackbar("Firebase yapılandırması eksik.", "error");
      return;
    }
    setSavingA(true);
    try {
      await setDocument("About", "main", about);
      showSnackbar("Hakkımızda içeriği kaydedildi!");
    } catch (err) {
      showSnackbar(err.message || "Kayıt başarısız.", "error");
    } finally {
      setSavingA(false);
    }
  };

  const saveAdminUI = () => {
    const next = { ...settings, title, color };
    setSettings(next);
    localStorage.setItem("siteSettings", JSON.stringify(next));
    showSnackbar("Arayüz ayarları kaydedildi!");
  };

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <Box>

      {/* ── Contact / Settings doc ────────────────────────────────────── */}
      <AdminCard>
        <FormSection>
          <SectionHeader>
            <Settings sx={{ color: "primary.main", fontSize: 28 }} />
            <SectionTitle variant="h5">İletişim Bilgileri</SectionTitle>
          </SectionHeader>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Firestore <code>Settings/main</code> dokümanı — tüm sayfalardaki iletişim bilgilerini bu formdan yönetin.
          </Typography>

          {!isFirebaseConfigured && (
            <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
              Firebase yapılandırması eksik — kayıt devre dışı.
            </Alert>
          )}

          {loadingC ? (
            <Box sx={{ textAlign: "center", py: 4 }}><CircularProgress /></Box>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth label="Telefon" value={contact.Phone}
                  onChange={(e) => handleContactChange("Phone", e.target.value)}
                  placeholder="+90 537 466 71 72" sx={fieldSx}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth label="E-posta" value={contact.Email}
                  onChange={(e) => handleContactChange("Email", e.target.value)}
                  placeholder="info@dekodem.com.tr" sx={fieldSx}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth label="Adres" value={contact.Address}
                  onChange={(e) => handleContactChange("Address", e.target.value)}
                  placeholder="Organize Sanayi Bölgesi, İzmit / Kocaeli" sx={fieldSx}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth label="Instagram URL" value={contact.InstaUrl}
                  onChange={(e) => handleContactChange("InstaUrl", e.target.value)}
                  placeholder="https://www.instagram.com/dekodem.com.tr/" sx={fieldSx}
                />
              </Grid>
              <Grid item xs={12}>
                <ImageUploader
                  label="Firma Logosu (LogoUrl)"
                  value={contact.LogoUrl}
                  onChange={(url) => handleContactChange("LogoUrl", url)}
                  folder="dekodem/brand"
                  showSnackbar={showSnackbar}
                  aspectRatio="3/1"
                  maxSizeMB={5}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained" startIcon={savingC ? <CircularProgress size={18} color="inherit" /> : <Save />}
                  onClick={saveContact} disabled={savingC || !isFirebaseConfigured}
                  sx={{ borderRadius: 2, py: 1.4 }}
                >
                  {savingC ? "Kaydediliyor..." : "İletişim Bilgilerini Kaydet"}
                </Button>
              </Grid>
            </Grid>
          )}
        </FormSection>
      </AdminCard>

      {/* ── About content ────────────────────────────────────────────── */}
      <AdminCard>
        <FormSection>
          <SectionHeader>
            <Info sx={{ color: "#2980b9", fontSize: 28 }} />
            <SectionTitle variant="h5">Hakkımızda İçeriği</SectionTitle>
          </SectionHeader>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Firestore <code>About/main</code> dokümanı — anasayfada <strong>AboutShort</strong>, Hakkımızda sayfasında <strong>AboutLong</strong> kullanılır.
          </Typography>

          {loadingA ? (
            <Box sx={{ textAlign: "center", py: 4 }}><CircularProgress /></Box>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth label="Kısa Açıklama (AboutShort)"
                  value={about.AboutShort}
                  onChange={(e) => handleAboutChange("AboutShort", e.target.value)}
                  multiline minRows={3}
                  inputProps={{ maxLength: 300 }}
                  helperText={`${about.AboutShort.length}/300 karakter — anasayfa hero ve footer`}
                  sx={fieldSx}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth label="Uzun Açıklama (AboutLong)"
                  value={about.AboutLong}
                  onChange={(e) => handleAboutChange("AboutLong", e.target.value)}
                  multiline minRows={8}
                  helperText="Hakkımızda sayfasında görüntülenir. HTML etiketleri kullanılabilir."
                  sx={fieldSx}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained" startIcon={savingA ? <CircularProgress size={18} color="inherit" /> : <Save />}
                  onClick={saveAbout} disabled={savingA || !isFirebaseConfigured}
                  sx={{ borderRadius: 2, py: 1.4, bgcolor: "#2980b9", "&:hover": { bgcolor: "#2471a3" } }}
                >
                  {savingA ? "Kaydediliyor..." : "Hakkımızda İçeriğini Kaydet"}
                </Button>
              </Grid>
            </Grid>
          )}
        </FormSection>
      </AdminCard>

      {/* ── Admin UI colour / title ───────────────────────────────────── */}
      <AdminCard>
        <FormSection>
          <SectionHeader>
            <Palette sx={{ color: "error.main", fontSize: 28 }} />
            <SectionTitle variant="h5">Arayüz Ayarları</SectionTitle>
          </SectionHeader>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Yalnızca tarayıcıda (localStorage) saklanır. Tema rengi ve panel başlığı.
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label="Site Başlığı" value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="DEKODEM" sx={fieldSx}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth label="Tema Rengi (Hex)" value={color}
                onChange={(e) => setColor(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ width: 20, height: 20, borderRadius: "4px", bgcolor: color, border: "1px solid", borderColor: "divider", mr: 1 }} />
                  ),
                }}
                sx={fieldSx}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <input
                type="color" value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{ width: "100%", height: 52, borderRadius: 8, border: "1px solid #ccc", cursor: "pointer" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained" startIcon={<Save />}
                onClick={saveAdminUI}
                sx={{ borderRadius: 2, py: 1.4, background: "linear-gradient(135deg,#27ae60,#2ecc71)", "&:hover": { background: "linear-gradient(135deg,#219a52,#27ae60)" } }}
              >
                Arayüz Ayarlarını Kaydet
              </Button>
            </Grid>
          </Grid>
        </FormSection>
      </AdminCard>
    </Box>
  );
};

export default GeneralSettingsPanel;
