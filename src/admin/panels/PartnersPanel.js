/**
 * PartnersPanel — manages the Firestore `References` collection.
 *
 * Schema: { BrandName: string, LogoUrl: string }
 *   LogoUrl — Cloudinary secure_url stored as a plain string.
 *   On image replace the new URL simply overwrites the old one.
 */
import React, { useState } from "react";
import {
  Box, Grid, TextField, Button, Typography,
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, CircularProgress, Alert,
} from "@mui/material";
import { Add, Edit, Delete, Handshake } from "@mui/icons-material";
import { AdminCard, FormSection, SectionHeader, SectionTitle } from "../shared";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import ImageUploader from "../../components/ImageUploader.jsx";

const COLLECTION = "References";
const EMPTY      = { BrandName: "", LogoUrl: "" };
const fieldSx    = { "& .MuiOutlinedInput-root": { borderRadius: "12px" } };

// Sort references alphabetically by brand name
const SORT_FN = (a, b) => (a.BrandName || "").localeCompare(b.BrandName || "");

const PartnersPanel = ({ showSnackbar }) => {
  const { items, loading, error, save, remove } =
    useFirestoreCollection(COLLECTION, { sort: SORT_FN });

  const [saving,       setSaving]       = useState(false);
  const [dialogOpen,   setDialogOpen]   = useState(false);
  const [editItem,     setEditItem]     = useState(null);
  const [form,         setForm]         = useState(EMPTY);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // ── Notify on collection fetch error ──────────────────────────────────────

  if (error) {
    showSnackbar?.("Referanslar yüklenemedi.", "error");
  }

  // ── Dialog helpers ────────────────────────────────────────────────────────

  const openNew = () => {
    setEditItem(null);
    setForm(EMPTY);
    setDialogOpen(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setForm({ BrandName: item.BrandName || "", LogoUrl: item.LogoUrl || "" });
    setDialogOpen(true);
  };

  const closeDialog = () => setDialogOpen(false);

  const handleChange = (field, val) => setForm((p) => ({ ...p, [field]: val }));

  // ── Save ──────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    if (!form.BrandName.trim()) {
      showSnackbar?.("Marka adı zorunludur.", "warning");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        BrandName: form.BrandName.trim(),
        LogoUrl:   form.LogoUrl || "",
      };
      await save(editItem?.id ?? null, payload);
      showSnackbar?.(editItem ? "Referans güncellendi." : "Referans eklendi.");
      closeDialog();
    } catch (err) {
      showSnackbar?.(err.message || "Kayıt başarısız.", "error");
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await remove(deleteTarget.id);
      showSnackbar?.("Referans silindi.");
      setDeleteTarget(null);
    } catch (err) {
      showSnackbar?.(err.message || "Silinemedi.", "error");
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <Box>
      <AdminCard>
        <FormSection>
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <SectionHeader sx={{ mb: 0 }}>
              <Handshake sx={{ color: "#27ae60", fontSize: 28 }} />
              <SectionTitle variant="h5">Marka Referansları</SectionTitle>
            </SectionHeader>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={openNew}
              sx={{ borderRadius: 2, bgcolor: "#27ae60", "&:hover": { bgcolor: "#229954" } }}
            >
              Yeni Referans
            </Button>
          </Box>

          <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
            Kayıtlar anasayfadaki marka şeridinde (marquee) görüntülenir.
            Firestore koleksiyonu: <code>References</code>.
          </Alert>

          {loading && <Box sx={{ textAlign: "center", py: 4 }}><CircularProgress /></Box>}
          {!loading && items.length === 0 && (
            <Alert severity="warning" sx={{ borderRadius: 2 }}>
              Henüz referans eklenmedi. Statik veriler gösterilecek.
            </Alert>
          )}

          <Grid container spacing={2}>
            {items.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Box
                  sx={{
                    p: 2, borderRadius: 3, border: "1px solid", borderColor: "divider",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    "&:hover": { borderColor: "#27ae60", bgcolor: "rgba(39,174,96,0.04)" },
                    transition: "all 0.2s",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
                    {item.LogoUrl ? (
                      <Box
                        component="img"
                        src={item.LogoUrl}
                        alt={item.BrandName}
                        sx={{ height: 36, maxWidth: 72, objectFit: "contain", flexShrink: 0 }}
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: 36, height: 36, borderRadius: 1,
                          bgcolor: "#27ae6022",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Typography variant="caption" fontWeight={700} color="#27ae60">
                          {item.BrandName?.[0]?.toUpperCase() || "B"}
                        </Typography>
                      </Box>
                    )}
                    <Typography variant="subtitle2" fontWeight={700} noWrap>
                      {item.BrandName}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 0.5, flexShrink: 0, ml: 1 }}>
                    <IconButton size="small" onClick={() => openEdit(item)} color="primary">
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => setDeleteTarget(item)} color="error">
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </FormSection>
      </AdminCard>

      {/* ── Edit / New Dialog ── */}
      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle fontWeight={700}>
          {editItem ? "Referansı Düzenle" : "Yeni Marka Referansı"}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ pt: 1 }}>
            {/* Brand name */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Marka Adı * (BrandName)"
                value={form.BrandName}
                onChange={(e) => handleChange("BrandName", e.target.value)}
                placeholder="Hyundai, Algida, Magna..."
                inputProps={{ maxLength: 100 }}
                sx={fieldSx}
              />
            </Grid>

            {/* Logo — Cloudinary upload */}
            <Grid item xs={12}>
              <ImageUploader
                label="Marka Logosu (LogoUrl)"
                value={form.LogoUrl}
                onChange={(url) => handleChange("LogoUrl", url)}
                folder="dekodem/references"
                showSnackbar={showSnackbar}
                aspectRatio="2/1"
                maxSizeMB={5}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={closeDialog} disabled={saving}>İptal</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saving}
            startIcon={saving && <CircularProgress size={16} color="inherit" />}
            sx={{ borderRadius: 2, bgcolor: "#27ae60", "&:hover": { bgcolor: "#229954" } }}
          >
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Delete confirm ── */}
      <Dialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle fontWeight={700}>Referansı Sil</DialogTitle>
        <DialogContent>
          <Typography>
            <strong>{deleteTarget?.BrandName}</strong> referansı kalıcı olarak silinecek.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteTarget(null)}>Vazgeç</Button>
          <Button variant="contained" color="error" onClick={handleDelete} sx={{ borderRadius: 2 }}>
            Sil
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PartnersPanel;
