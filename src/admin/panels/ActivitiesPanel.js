/**
 * ActivitiesPanel
 *
 * Manages the Firestore `Activities` collection.
 * Schema: { Id (int64), Name, Description, PhotoUrl }
 */
import React, { useCallback, useEffect, useState } from "react";
import {
  Box, Grid, TextField, Button, Typography,
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, CircularProgress, Alert, Avatar,
} from "@mui/material";
import { Add, Edit, Delete, Bolt } from "@mui/icons-material";
import { AdminCard, FormSection, SectionHeader, SectionTitle } from "../shared";
import {
  getCollectionItems, addCollectionItem,
  updateCollectionItem, deleteCollectionItem,
} from "../adminFirestore";
import ImageUploadField from "../../components/ImageUploadField";

const COLLECTION = "Activities";

const EMPTY = { Id: "", Name: "", Description: "", PhotoUrl: "" };

const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: "12px" } };

const ActivitiesPanel = ({ showSnackbar }) => {
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
      setItems(data.sort((a, b) => (a.Id ?? 0) - (b.Id ?? 0)));
    } catch {
      showSnackbar("Faaliyetler yüklenemedi.", "error");
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  useEffect(() => { load(); }, [load]);

  const openNew  = () => { setEditItem(null); setForm({ ...EMPTY, Id: items.length + 1 }); setDialogOpen(true); };
  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      Id:          item.Id          ?? "",
      Name:        item.Name        || "",
      Description: item.Description || "",
      PhotoUrl:    item.PhotoUrl    || "",
    });
    setDialogOpen(true);
  };

  const handleChange = (field, val) => setForm((p) => ({ ...p, [field]: val }));

  const handleSave = async () => {
    if (!form.Name.trim()) { showSnackbar("Faaliyet adı zorunludur.", "warning"); return; }
    setSaving(true);
    try {
      const payload = {
        Id:          form.Id !== "" ? Number(form.Id) : items.length + 1,
        Name:        form.Name.trim(),
        Description: form.Description.trim(),
        PhotoUrl:    form.PhotoUrl.trim(),
      };
      if (editItem) {
        await updateCollectionItem(COLLECTION, editItem.id, payload);
        showSnackbar("Faaliyet güncellendi.");
      } else {
        await addCollectionItem(COLLECTION, payload);
        showSnackbar("Faaliyet oluşturuldu.");
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
      showSnackbar("Faaliyet silindi.");
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
              <Bolt sx={{ color: "primary.main", fontSize: 28 }} />
              <SectionTitle variant="h5">Faaliyet Alanları</SectionTitle>
            </SectionHeader>
            <Button variant="contained" startIcon={<Add />} onClick={openNew} sx={{ borderRadius: 2 }}>
              Yeni Faaliyet
            </Button>
          </Box>

          <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
            Anasayfadaki ve faaliyet listesindeki kartlar bu koleksiyondan beslenir.
          </Alert>

          {loading && <Box sx={{ textAlign: "center", py: 4 }}><CircularProgress /></Box>}
          {!loading && items.length === 0 && (
            <Alert severity="warning" sx={{ borderRadius: 2 }}>Henüz faaliyet eklenmedi. Statik veriler gösterilecek.</Alert>
          )}

          <Grid container spacing={2}>
            {items.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Box
                  sx={{
                    p: 2.5, borderRadius: 3, border: "1px solid", borderColor: "divider",
                    display: "flex", alignItems: "flex-start", gap: 1.5,
                    "&:hover": { borderColor: "primary.main", bgcolor: "primary.50" },
                    transition: "all 0.2s",
                  }}
                >
                  {item.PhotoUrl && (
                    <Avatar
                      src={item.PhotoUrl} variant="rounded"
                      sx={{ width: 52, height: 52, flexShrink: 0 }}
                    />
                  )}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle2" fontWeight={700} noWrap>
                      {item.Id ? `#${item.Id} — ` : ""}{item.Name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {item.Description || "—"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, flexShrink: 0 }}>
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
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle fontWeight={700}>{editItem ? "Faaliyeti Düzenle" : "Yeni Faaliyet Alanı"}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth label="Sıra No (Id)" type="number" value={form.Id}
                onChange={(e) => handleChange("Id", e.target.value)}
                helperText="Sıralama için" sx={fieldSx}
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                fullWidth label="Faaliyet Adı *" value={form.Name}
                onChange={(e) => handleChange("Name", e.target.value)}
                placeholder="İç Mimari & Tasarım" sx={fieldSx}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Açıklama (Description)" value={form.Description}
                onChange={(e) => handleChange("Description", e.target.value)}
                multiline minRows={4}
                placeholder="Bu faaliyet alanı hakkında kısa açıklama..."
                sx={fieldSx}
              />
            </Grid>
            <Grid item xs={12}>
              <ImageUploadField
                label="Fotoğraf (PhotoUrl)"
                value={form.PhotoUrl}
                onChange={(url) => handleChange("PhotoUrl", url)}
                folder="dekodem/activities"
                showSnackbar={showSnackbar}
                aspectRatio="4/3"
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
        <DialogTitle fontWeight={700}>Faaliyeti Sil</DialogTitle>
        <DialogContent>
          <Typography><strong>{deleteTarget?.Name}</strong> faaliyeti kalıcı olarak silinecek.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteTarget(null)}>Vazgeç</Button>
          <Button variant="contained" color="error" onClick={handleDelete} sx={{ borderRadius: 2 }}>Sil</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ActivitiesPanel;
