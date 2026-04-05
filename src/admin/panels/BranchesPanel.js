import React, { useCallback, useEffect, useState } from "react";
import {
  Box, Grid, TextField, Button, Typography, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, CircularProgress, Alert, FormControlLabel, Switch,
} from "@mui/material";
import { Add, Edit, Delete, LocationOn } from "@mui/icons-material";
import { AdminCard, FormSection, SectionHeader, SectionTitle } from "../shared";
import { getCollectionItems, addCollectionItem, updateCollectionItem, deleteCollectionItem } from "../adminFirestore";

const COLLECTION = "branches";

const EMPTY = {
  name: "", address: "", phone: "", email: "",
  hours: "", lat: "", lng: "", isActive: true,
};

const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: "12px" } };

const BranchesPanel = ({ showSnackbar }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCollectionItems(COLLECTION);
      setItems(data.sort((a, b) => (a.name || "").localeCompare(b.name || "", "tr")));
    } catch {
      showSnackbar("Şubeler yüklenemedi.", "error");
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  useEffect(() => { load(); }, [load]);

  const openNew = () => { setEditItem(null); setForm(EMPTY); setDialogOpen(true); };
  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      name: item.name || "",
      address: item.address || "",
      phone: item.phone || "",
      email: item.email || "",
      hours: item.hours || "",
      lat: item.lat ?? "",
      lng: item.lng ?? "",
      isActive: item.isActive ?? true,
    });
    setDialogOpen(true);
  };

  const handleChange = (field, val) => setForm((p) => ({ ...p, [field]: val }));

  const handleSave = async () => {
    if (!form.name.trim()) { showSnackbar("Şube adı zorunludur.", "warning"); return; }
    setSaving(true);
    try {
      const payload = {
        ...form,
        lat: form.lat !== "" ? parseFloat(form.lat) : null,
        lng: form.lng !== "" ? parseFloat(form.lng) : null,
      };
      if (editItem) {
        await updateCollectionItem(COLLECTION, editItem.id, payload);
        showSnackbar("Şube güncellendi.");
      } else {
        await addCollectionItem(COLLECTION, payload);
        showSnackbar("Şube oluşturuldu.");
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
      showSnackbar("Şube silindi.");
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
              <LocationOn sx={{ color: "#16a085", fontSize: 28 }} />
              <SectionTitle variant="h5">Şube Yönetimi</SectionTitle>
            </SectionHeader>
            <Button variant="contained" startIcon={<Add />} onClick={openNew} sx={{ borderRadius: 2, bgcolor: "#16a085", "&:hover": { bgcolor: "#138d75" } }}>
              Yeni Şube
            </Button>
          </Box>

          {loading && <Box sx={{ textAlign: "center", py: 4 }}><CircularProgress /></Box>}
          {!loading && items.length === 0 && (
            <Alert severity="info" sx={{ borderRadius: 2 }}>Henüz şube eklenmedi.</Alert>
          )}

          <Grid container spacing={2}>
            {items.map((item) => (
              <Grid item xs={12} sm={6} key={item.id}>
                <Box
                  sx={{
                    p: 2.5, borderRadius: 3, border: "1px solid", borderColor: "divider",
                    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                    "&:hover": { borderColor: "#16a085", bgcolor: "rgba(22,160,133,0.04)" },
                    transition: "all 0.2s",
                  }}
                >
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                      <Typography variant="subtitle1" fontWeight={700}>{item.name}</Typography>
                      <Chip size="small" label={item.isActive ? "Aktif" : "Pasif"} color={item.isActive ? "success" : "default"} variant="outlined" />
                    </Box>
                    <Typography variant="body2" color="text.secondary">{item.address}</Typography>
                    {item.phone && <Typography variant="body2" color="text.secondary">{item.phone}</Typography>}
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
        <DialogTitle fontWeight={700}>{editItem ? "Şubeyi Düzenle" : "Yeni Şube"}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Şube Adı *" value={form.name} onChange={(e) => handleChange("name", e.target.value)} sx={fieldSx} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Adres" value={form.address} onChange={(e) => handleChange("address", e.target.value)} multiline minRows={2} sx={fieldSx} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Telefon" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="+90 555 123 45 67" sx={fieldSx} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="E-posta" value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="sube@example.com" sx={fieldSx} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Çalışma Saatleri" value={form.hours} onChange={(e) => handleChange("hours", e.target.value)} placeholder="Hafta içi 09:00 – 18:00" sx={fieldSx} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Enlem (Lat)" type="number" value={form.lat} onChange={(e) => handleChange("lat", e.target.value)} placeholder="41.0082" sx={fieldSx} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Boylam (Lng)" type="number" value={form.lng} onChange={(e) => handleChange("lng", e.target.value)} placeholder="28.9784" sx={fieldSx} />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch checked={form.isActive} onChange={(e) => handleChange("isActive", e.target.checked)} color="success" />}
                label="Aktif (sitede görünsün)"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDialogOpen(false)} disabled={saving}>İptal</Button>
          <Button
            variant="contained" onClick={handleSave} disabled={saving}
            startIcon={saving && <CircularProgress size={16} color="inherit" />}
            sx={{ borderRadius: 2, bgcolor: "#16a085", "&:hover": { bgcolor: "#138d75" } }}
          >
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle fontWeight={700}>Şubeyi Sil</DialogTitle>
        <DialogContent>
          <Typography><strong>{deleteTarget?.name}</strong> şubesi kalıcı olarak silinecek.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteTarget(null)}>Vazgeç</Button>
          <Button variant="contained" color="error" onClick={handleDelete} sx={{ borderRadius: 2 }}>Sil</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BranchesPanel;
