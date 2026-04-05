/**
 * BlogPanel
 *
 * Manages the Firestore `Blogs` collection.
 * Schema: { Name, Content, CoverImg, Date (timestamp) }
 */
import React, { useCallback, useEffect, useState } from "react";
import {
  Box, Grid, TextField, Button, Typography, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, CircularProgress, Alert,
} from "@mui/material";
import { Add, Edit, Delete, Article } from "@mui/icons-material";
import { AdminCard, FormSection, SectionHeader, SectionTitle } from "../shared";
import {
  getCollectionItems, addCollectionItem,
  updateCollectionItem, deleteCollectionItem,
} from "../adminFirestore";
import ImageUploadField from "../../components/ImageUploadField";

const COLLECTION = "Blogs";

const EMPTY = { Name: "", Content: "", CoverImg: "", Date: "" };

const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: "12px" } };

const formatDate = (val) => {
  if (!val) return "";
  if (typeof val === "string") return val.slice(0, 10);
  if (val?.seconds) return new Date(val.seconds * 1000).toISOString().slice(0, 10);
  return "";
};

const BlogPanel = ({ showSnackbar }) => {
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
      setItems(
        data.sort((a, b) => {
          const aT = a.Date?.seconds ?? (a.Date ? new Date(a.Date).getTime() / 1000 : 0);
          const bT = b.Date?.seconds ?? (b.Date ? new Date(b.Date).getTime() / 1000 : 0);
          return bT - aT;
        })
      );
    } catch {
      showSnackbar("Blog yazıları yüklenemedi.", "error");
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  useEffect(() => { load(); }, [load]);

  const openNew  = () => { setEditItem(null); setForm(EMPTY); setDialogOpen(true); };
  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      Name:     item.Name     || "",
      Content:  item.Content  || "",
      CoverImg: item.CoverImg || "",
      Date:     formatDate(item.Date),
    });
    setDialogOpen(true);
  };

  const handleChange = (field, val) => setForm((p) => ({ ...p, [field]: val }));

  const handleSave = async () => {
    if (!form.Name.trim()) { showSnackbar("Blog başlığı zorunludur.", "warning"); return; }
    setSaving(true);
    try {
      const payload = {
        Name:     form.Name.trim(),
        Content:  form.Content.trim(),
        CoverImg: form.CoverImg.trim(),
        Date:     form.Date ? new Date(form.Date) : new Date(),
      };
      if (editItem) {
        await updateCollectionItem(COLLECTION, editItem.id, payload);
        showSnackbar("Blog yazısı güncellendi.");
      } else {
        await addCollectionItem(COLLECTION, payload);
        showSnackbar("Blog yazısı oluşturuldu.");
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
      showSnackbar("Blog yazısı silindi.");
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
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <SectionHeader sx={{ mb: 0 }}>
              <Article sx={{ color: "#2980b9", fontSize: 28 }} />
              <SectionTitle variant="h5">Blog Yazıları</SectionTitle>
            </SectionHeader>
            <Button variant="contained" startIcon={<Add />} onClick={openNew} sx={{ borderRadius: 2 }}>
              Yeni Yazı
            </Button>
          </Box>

          {loading && <Box sx={{ textAlign: "center", py: 4 }}><CircularProgress /></Box>}
          {!loading && items.length === 0 && (
            <Alert severity="info" sx={{ borderRadius: 2 }}>Henüz blog yazısı eklenmedi.</Alert>
          )}

          <Grid container spacing={2}>
            {items.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Box
                  sx={{
                    p: 2.5, borderRadius: 3, border: "1px solid", borderColor: "divider",
                    display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2,
                    "&:hover": { borderColor: "#2980b9", bgcolor: "rgba(41,128,185,0.03)" },
                    transition: "all 0.2s",
                  }}
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle1" fontWeight={700} noWrap>{item.Name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(item.Date)
                        ? new Date(formatDate(item.Date)).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })
                        : "Tarih belirtilmedi"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 0.5, flexShrink: 0 }}>
                    <IconButton size="small" onClick={() => openEdit(item)} color="primary"><Edit fontSize="small" /></IconButton>
                    <IconButton size="small" onClick={() => setDeleteTarget(item)} color="error"><Delete fontSize="small" /></IconButton>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </FormSection>
      </AdminCard>

      {/* Edit / New Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle fontWeight={700}>{editItem ? "Yazıyı Düzenle" : "Yeni Blog Yazısı"}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth label="Başlık (Name) *" value={form.Name}
                onChange={(e) => handleChange("Name", e.target.value)} sx={fieldSx}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth label="Yayın Tarihi (Date)" type="date" value={form.Date}
                onChange={(e) => handleChange("Date", e.target.value)}
                InputLabelProps={{ shrink: true }} sx={fieldSx}
              />
            </Grid>
            <Grid item xs={12}>
              <ImageUploadField
                label="Kapak Görseli (CoverImg)"
                value={form.CoverImg}
                onChange={(url) => handleChange("CoverImg", url)}
                folder="dekodem/blogs"
                showSnackbar={showSnackbar}
                aspectRatio="2/1"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth label="İçerik (Content)" value={form.Content}
                onChange={(e) => handleChange("Content", e.target.value)}
                multiline minRows={10}
                helperText="Düz metin veya HTML içerik"
                sx={fieldSx}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDialogOpen(false)} disabled={saving}>İptal</Button>
          <Button
            variant="contained" onClick={handleSave} disabled={saving}
            startIcon={saving && <CircularProgress size={16} color="inherit" />}
            sx={{ borderRadius: 2 }}
          >
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle fontWeight={700}>Yazıyı Sil</DialogTitle>
        <DialogContent>
          <Typography><strong>{deleteTarget?.Name}</strong> başlıklı yazı kalıcı olarak silinecek.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteTarget(null)}>Vazgeç</Button>
          <Button variant="contained" color="error" onClick={handleDelete} sx={{ borderRadius: 2 }}>Sil</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BlogPanel;
