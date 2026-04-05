/**
 * PartnersPanel
 *
 * Manages the Firestore `References` collection.
 * Schema: { BrandName, LogoUrl }
 */
import React, { useCallback, useEffect, useState } from "react";
import {
  Box, Grid, TextField, Button, Typography,
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, CircularProgress, Alert,
} from "@mui/material";
import { Add, Edit, Delete, Handshake } from "@mui/icons-material";
import { AdminCard, FormSection, SectionHeader, SectionTitle } from "../shared";
import {
  getCollectionItems, addCollectionItem,
  updateCollectionItem, deleteCollectionItem,
} from "../adminFirestore";

const COLLECTION = "References";

const EMPTY = { BrandName: "", LogoUrl: "" };

const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: "12px" } };

const PartnersPanel = ({ showSnackbar }) => {
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
      setItems(data.sort((a, b) => (a.BrandName || "").localeCompare(b.BrandName || "")));
    } catch {
      showSnackbar("Referanslar yüklenemedi.", "error");
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  useEffect(() => { load(); }, [load]);

  const openNew  = () => { setEditItem(null); setForm(EMPTY); setDialogOpen(true); };
  const openEdit = (item) => {
    setEditItem(item);
    setForm({ BrandName: item.BrandName || "", LogoUrl: item.LogoUrl || "" });
    setDialogOpen(true);
  };

  const handleChange = (field, val) => setForm((p) => ({ ...p, [field]: val }));

  const handleSave = async () => {
    if (!form.BrandName.trim()) { showSnackbar("Marka adı zorunludur.", "warning"); return; }
    setSaving(true);
    try {
      const payload = { BrandName: form.BrandName.trim(), LogoUrl: form.LogoUrl.trim() };
      if (editItem) {
        await updateCollectionItem(COLLECTION, editItem.id, payload);
        showSnackbar("Referans güncellendi.");
      } else {
        await addCollectionItem(COLLECTION, payload);
        showSnackbar("Referans eklendi.");
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
      showSnackbar("Referans silindi.");
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
              <Handshake sx={{ color: "#27ae60", fontSize: 28 }} />
              <SectionTitle variant="h5">Marka Referansları</SectionTitle>
            </SectionHeader>
            <Button
              variant="contained" startIcon={<Add />} onClick={openNew}
              sx={{ borderRadius: 2, bgcolor: "#27ae60", "&:hover": { bgcolor: "#229954" } }}
            >
              Yeni Referans
            </Button>
          </Box>

          <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
            Kayıtlar anasayfadaki marka şeridinde (marquee) görüntülenir. Firestore koleksiyonu: <code>References</code>.
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
                        sx={{ width: 36, height: 36, borderRadius: 1, bgcolor: "#27ae6022", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                      >
                        <Typography variant="caption" fontWeight={700} color="#27ae60">
                          {item.BrandName?.[0]?.toUpperCase() || "B"}
                        </Typography>
                      </Box>
                    )}
                    <Typography variant="subtitle2" fontWeight={700} noWrap>{item.BrandName}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 0.5, flexShrink: 0, ml: 1 }}>
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
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle fontWeight={700}>{editItem ? "Referansı Düzenle" : "Yeni Marka Referansı"}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Marka Adı * (BrandName)" value={form.BrandName}
                onChange={(e) => handleChange("BrandName", e.target.value)}
                placeholder="XELLA, Saint-Gobain..." sx={fieldSx}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Logo URL (LogoUrl)" value={form.LogoUrl}
                onChange={(e) => handleChange("LogoUrl", e.target.value)}
                placeholder="https://example.com/logo.png" sx={fieldSx}
              />
            </Grid>
            {form.LogoUrl && (
              <Grid item xs={12}>
                <Box sx={{ textAlign: "center", p: 1.5, borderRadius: 2, bgcolor: "grey.50", border: "1px solid", borderColor: "divider" }}>
                  <Box
                    component="img" src={form.LogoUrl} alt="önizleme"
                    sx={{ height: 48, maxWidth: "100%", objectFit: "contain" }}
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                </Box>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDialogOpen(false)} disabled={saving}>İptal</Button>
          <Button
            variant="contained" onClick={handleSave} disabled={saving}
            startIcon={saving && <CircularProgress size={16} color="inherit" />}
            sx={{ borderRadius: 2, bgcolor: "#27ae60", "&:hover": { bgcolor: "#229954" } }}
          >
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle fontWeight={700}>Referansı Sil</DialogTitle>
        <DialogContent>
          <Typography><strong>{deleteTarget?.BrandName}</strong> referansı kalıcı olarak silinecek.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteTarget(null)}>Vazgeç</Button>
          <Button variant="contained" color="error" onClick={handleDelete} sx={{ borderRadius: 2 }}>Sil</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PartnersPanel;
