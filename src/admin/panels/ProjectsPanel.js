/**
 * ProjectsPanel
 *
 * Manages the Firestore `Projects` collection.
 * Schema: { Id, Name, Description, category, PhotoUrl, IsCompleted (bool) }
 */
import React, { useCallback, useEffect, useState } from "react";
import {
  Box, Grid, TextField, Button, Typography,
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, CircularProgress, Alert, FormControlLabel,
  Checkbox, Chip, Avatar,
} from "@mui/material";
import { Add, Edit, Delete, Business, CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import { AdminCard, FormSection, SectionHeader, SectionTitle } from "../shared";
import {
  getCollectionItems, addCollectionItem,
  updateCollectionItem, deleteCollectionItem,
} from "../adminFirestore";
import ImageUploadField from "../../components/ImageUploadField";

const COLLECTION = "Projects";

const EMPTY = {
  Id: "", Name: "", Description: "", category: "", PhotoUrl: "", IsCompleted: false,
};

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
      setItems(data.sort((a, b) => String(a.Id || "").localeCompare(String(b.Id || ""))));
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
      Id:          item.Id          || "",
      Name:        item.Name        || "",
      Description: item.Description || "",
      category:    item.category    || "",
      PhotoUrl:    item.PhotoUrl    || "",
      IsCompleted: item.IsCompleted ?? false,
    });
    setDialogOpen(true);
  };

  const handleChange = (field, val) => setForm((p) => ({ ...p, [field]: val }));

  const handleSave = async () => {
    if (!form.Name.trim()) { showSnackbar("Proje adı zorunludur.", "warning"); return; }
    setSaving(true);
    try {
      const payload = {
        Id:          form.Id.trim(),
        Name:        form.Name.trim(),
        Description: form.Description.trim(),
        category:    form.category.trim(),
        PhotoUrl:    form.PhotoUrl.trim(),
        IsCompleted: Boolean(form.IsCompleted),
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
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <SectionHeader sx={{ mb: 0 }}>
              <Business sx={{ color: "#d35400", fontSize: 28 }} />
              <SectionTitle variant="h5">Projeler</SectionTitle>
            </SectionHeader>
            <Button variant="contained" startIcon={<Add />} onClick={openNew} sx={{ borderRadius: 2 }}>
              Yeni Proje
            </Button>
          </Box>

          {loading && <Box sx={{ textAlign: "center", py: 4 }}><CircularProgress /></Box>}
          {!loading && items.length === 0 && (
            <Alert severity="info" sx={{ borderRadius: 2 }}>Henüz proje eklenmedi.</Alert>
          )}

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
                      <Avatar src={item.PhotoUrl} variant="rounded" sx={{ width: 52, height: 52, flexShrink: 0 }} />
                    ) : (
                      <Avatar variant="rounded" sx={{ width: 52, height: 52, bgcolor: "#d35400", flexShrink: 0 }}>
                        {item.Name?.[0]?.toUpperCase() || "P"}
                      </Avatar>
                    )}
                    <Box sx={{ minWidth: 0 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                        <Typography variant="subtitle2" fontWeight={700} noWrap>{item.Name}</Typography>
                        <Chip
                          size="small"
                          icon={item.IsCompleted ? <CheckCircle /> : <RadioButtonUnchecked />}
                          label={item.IsCompleted ? "Tamamlandı" : "Devam Ediyor"}
                          color={item.IsCompleted ? "success" : "warning"}
                          variant="outlined"
                          sx={{ height: 20, fontSize: "0.7rem" }}
                        />
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {[item.category, item.Id ? `#${item.Id}` : null].filter(Boolean).join(" · ")}
                      </Typography>
                    </Box>
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
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle fontWeight={700}>{editItem ? "Projeyi Düzenle" : "Yeni Proje"}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth label="Proje ID" value={form.Id}
                onChange={(e) => handleChange("Id", e.target.value)}
                placeholder="PRJ-001" sx={fieldSx}
                helperText="Benzersiz tanımlayıcı"
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth label="Proje Adı *" value={form.Name}
                onChange={(e) => handleChange("Name", e.target.value)}
                placeholder="Modern Fabrika Yapısı" sx={fieldSx}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Kategori (category)" value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                placeholder="Endüstriyel, Ticari, Ofis..." sx={fieldSx}
              />
            </Grid>
            <Grid item xs={12}>
              <ImageUploadField
                label="Fotoğraf (PhotoUrl)"
                value={form.PhotoUrl}
                onChange={(url) => handleChange("PhotoUrl", url)}
                folder="dekodem/projects"
                showSnackbar={showSnackbar}
                aspectRatio="16/9"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Açıklama (Description)" value={form.Description}
                onChange={(e) => handleChange("Description", e.target.value)}
                multiline minRows={4} sx={fieldSx}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.IsCompleted}
                    onChange={(e) => handleChange("IsCompleted", e.target.checked)}
                    color="success"
                  />
                }
                label="Tamamlandı (IsCompleted)"
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
        <DialogTitle fontWeight={700}>Projeyi Sil</DialogTitle>
        <DialogContent>
          <Typography><strong>{deleteTarget?.Name}</strong> projesi kalıcı olarak silinecek.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteTarget(null)}>Vazgeç</Button>
          <Button variant="contained" color="error" onClick={handleDelete} sx={{ borderRadius: 2 }}>Sil</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectsPanel;
