/**
 * ProjectsPanel — 5-field Firestore admin form.
 * Schema: { Name, Summary, Description, Services (array), PhotoUrl }
 * Photo upload: CloudinaryService via ImageUploadField (unsigned preset).
 */
import React, { useCallback, useEffect, useState } from "react";
import {
  Box, Grid, TextField, Button, Typography,
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, CircularProgress, Alert, Avatar,
} from "@mui/material";
import { Add, Edit, Delete, Business } from "@mui/icons-material";
import { AdminCard, FormSection, SectionHeader, SectionTitle } from "../shared";
import {
  getCollectionItems, addCollectionItem,
  updateCollectionItem, deleteCollectionItem,
} from "../adminFirestore";
import ImageUploadField from "../../components/ImageUploadField";

const COLLECTION = "Projects";

const EMPTY = { Name: "", Summary: "", Description: "", Services: "", PhotoUrl: "" };

// "Taşıyıcı Sistem, İzolasyon" ↔ ["Taşıyıcı Sistem","İzolasyon"]
const arrayToInput = (arr) => (Array.isArray(arr) ? arr.join(", ") : arr ?? "");
const inputToArray = (str) =>
  str.split(",").map((s) => s.trim()).filter(Boolean);

const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: "12px" } };

const ProjectsPanel = ({ showSnackbar }) => {
  const [items,        setItems]        = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [saving,       setSaving]       = useState(false);
  const [dialogOpen,   setDialogOpen]   = useState(false);
  const [editItem,     setEditItem]     = useState(null);
  const [form,         setForm]         = useState(EMPTY);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCollectionItems(COLLECTION);
      setItems(data);
    } catch {
      showSnackbar("Projeler yüklenemedi.", "error");
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  useEffect(() => { load(); }, [load]);

  const openNew  = () => { setEditItem(null); setForm(EMPTY); setDialogOpen(true); };
  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      Name:        item.Name        || "",
      Summary:     item.Summary     || "",
      Description: item.Description || "",
      Services:    arrayToInput(item.Services),
      PhotoUrl:    item.PhotoUrl    || "",
    });
    setDialogOpen(true);
  };

  const handleChange = (field, val) => setForm((p) => ({ ...p, [field]: val }));

  const handleSave = async () => {
    if (!form.Name.trim()) { showSnackbar("Proje adı zorunludur.", "warning"); return; }
    setSaving(true);
    try {
      const payload = {
        Name:        form.Name.trim(),
        Summary:     form.Summary.trim(),
        Description: form.Description.trim(),
        Services:    inputToArray(form.Services),
        PhotoUrl:    form.PhotoUrl.trim(),
      };
      if (editItem) {
        await updateCollectionItem(COLLECTION, editItem.id, payload);
        showSnackbar("Proje güncellendi.");
      } else {
        await addCollectionItem(COLLECTION, payload);
        showSnackbar("Proje oluşturuldu.");
      }
      setDialogOpen(false);
      load();
    } catch (err) {
      showSnackbar(err.message || "Kayıt başarısız.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteCollectionItem(COLLECTION, deleteTarget.id);
      showSnackbar("Proje silindi.");
      setDeleteTarget(null);
      load();
    } catch (err) {
      showSnackbar(err.message || "Silinemedi.", "error");
    }
  };

  return (
    <Box>
      <AdminCard>
        <FormSection>
          {/* ── Header ────────────────────────────────────────────────── */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <SectionHeader sx={{ mb: 0 }}>
              <Business sx={{ color: "#d35400", fontSize: 28 }} />
              <SectionTitle variant="h5">Projeler</SectionTitle>
            </SectionHeader>
            <Button variant="contained" startIcon={<Add />} onClick={openNew} sx={{ borderRadius: 2 }}>
              Yeni Proje
            </Button>
          </Box>

          {loading && (
            <Box sx={{ textAlign: "center", py: 4 }}><CircularProgress /></Box>
          )}
          {!loading && items.length === 0 && (
            <Alert severity="info" sx={{ borderRadius: 2 }}>Henüz proje eklenmedi.</Alert>
          )}

          {/* ── List ──────────────────────────────────────────────────── */}
          <Grid container spacing={2}>
            {items.map((item) => (
              <Grid item xs={12} sm={6} key={item.id}>
                <Box
                  sx={{
                    p: 2.5, borderRadius: 3, border: "1px solid", borderColor: "divider",
                    display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1.5,
                    "&:hover": { borderColor: "#d35400", bgcolor: "rgba(211,84,0,0.03)" },
                    transition: "all 0.2s",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1.5, flex: 1, minWidth: 0 }}>
                    {item.PhotoUrl ? (
                      <Avatar
                        src={item.PhotoUrl}
                        variant="rounded"
                        sx={{ width: 52, height: 52, flexShrink: 0 }}
                      />
                    ) : (
                      <Avatar
                        variant="rounded"
                        sx={{ width: 52, height: 52, bgcolor: "#d35400", flexShrink: 0 }}
                      >
                        {item.Name?.[0]?.toUpperCase() || "P"}
                      </Avatar>
                    )}
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="subtitle2" fontWeight={700} noWrap>
                        {item.Name}
                      </Typography>
                      {item.Summary && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {item.Summary}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", gap: 0.5, flexShrink: 0 }}>
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

      {/* ── Create / Edit Dialog ──────────────────────────────────────────── */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle fontWeight={700}>
          {editItem ? "Projeyi Düzenle" : "Yeni Proje"}
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={2} sx={{ pt: 1 }}>

            {/* 1 — Project Name */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Proje Adı *"
                value={form.Name}
                onChange={(e) => handleChange("Name", e.target.value)}
                placeholder="Modern Fabrika Yapısı"
                sx={fieldSx}
              />
            </Grid>

            {/* 2 — Summary */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Kısa Özet"
                value={form.Summary}
                onChange={(e) => handleChange("Summary", e.target.value)}
                multiline
                minRows={2}
                placeholder="Kart üzerinde görünecek kısa açıklama…"
                sx={fieldSx}
                helperText="Proje listesinde kartın altında gösterilir."
              />
            </Grid>

            {/* 3 — Services */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Verilen Hizmetler"
                value={form.Services}
                onChange={(e) => handleChange("Services", e.target.value)}
                placeholder="Taşıyıcı Sistem, İzolasyon, Elektrik Altyapısı"
                sx={fieldSx}
                helperText="Virgülle ayırın — kaydederken otomatik olarak diziye dönüştürülür."
              />
            </Grid>

            {/* 4 — Photo via Cloudinary */}
            <Grid item xs={12}>
              <ImageUploadField
                label="Proje Fotoğrafı"
                value={form.PhotoUrl}
                onChange={(url) => handleChange("PhotoUrl", url)}
                folder="dekodem/projects"
                showSnackbar={showSnackbar}
                aspectRatio="16/9"
              />
            </Grid>

            {/* 5 — Detailed Info */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Detaylı Bilgi"
                value={form.Description}
                onChange={(e) => handleChange("Description", e.target.value)}
                multiline
                minRows={5}
                placeholder="Proje hakkında ayrıntılı açıklama — detay sayfasında görüntülenir."
                sx={fieldSx}
              />
            </Grid>

          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDialogOpen(false)} disabled={saving}>
            İptal
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saving}
            startIcon={saving && <CircularProgress size={16} color="inherit" />}
            sx={{ borderRadius: 2 }}
          >
            {saving ? "Kaydediliyor…" : "Kaydet"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Delete Confirm ────────────────────────────────────────────────── */}
      <Dialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle fontWeight={700}>Projeyi Sil</DialogTitle>
        <DialogContent>
          <Typography>
            <strong>{deleteTarget?.Name}</strong> projesi kalıcı olarak silinecek.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteTarget(null)}>Vazgeç</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            sx={{ borderRadius: 2 }}
          >
            Sil
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectsPanel;
