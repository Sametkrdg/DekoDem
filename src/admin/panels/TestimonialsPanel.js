/**
 * TestimonialsPanel
 *
 * Manages the Firestore `Testimonials` collection.
 * Schema: { clientName, Company, Comment }
 */
import React, { useCallback, useEffect, useState } from "react";
import {
  Box, Grid, TextField, Button, Typography, Avatar,
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, CircularProgress, Alert,
} from "@mui/material";
import { Add, Edit, Delete, FormatQuote } from "@mui/icons-material";
import { AdminCard, FormSection, SectionHeader, SectionTitle } from "../shared";
import {
  getCollectionItems, addCollectionItem,
  updateCollectionItem, deleteCollectionItem,
} from "../adminFirestore";

const COLLECTION = "Testimonials";

const EMPTY = { clientName: "", Company: "", Comment: "" };

const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: "12px" } };

const TestimonialsPanel = ({ showSnackbar }) => {
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
      showSnackbar("Referanslar yüklenemedi.", "error");
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  useEffect(() => { load(); }, [load]);

  const openNew  = () => { setEditItem(null); setForm(EMPTY); setDialogOpen(true); };
  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      clientName: item.clientName || "",
      Company:    item.Company    || "",
      Comment:    item.Comment    || "",
    });
    setDialogOpen(true);
  };

  const handleChange = (field, val) => setForm((p) => ({ ...p, [field]: val }));

  const handleSave = async () => {
    if (!form.clientName.trim()) { showSnackbar("Müşteri adı zorunludur.", "warning"); return; }
    if (!form.Comment.trim())    { showSnackbar("Yorum metni zorunludur.", "warning"); return; }
    setSaving(true);
    try {
      const payload = {
        clientName: form.clientName.trim(),
        Company:    form.Company.trim(),
        Comment:    form.Comment.trim(),
      };
      if (editItem) {
        await updateCollectionItem(COLLECTION, editItem.id, payload);
        showSnackbar("Referans güncellendi.");
      } else {
        await addCollectionItem(COLLECTION, payload);
        showSnackbar("Referans oluşturuldu.");
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
              <FormatQuote sx={{ color: "#8e44ad", fontSize: 28 }} />
              <SectionTitle variant="h5">Müşteri Yorumları</SectionTitle>
            </SectionHeader>
            <Button
              variant="contained" startIcon={<Add />} onClick={openNew}
              sx={{ borderRadius: 2, bgcolor: "#8e44ad", "&:hover": { bgcolor: "#7d3c98" } }}
            >
              Yeni Yorum
            </Button>
          </Box>

          <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
            Yorum kartları anasayfadaki "Müşteri Görüşleri" bölümünde döner.
          </Alert>

          {loading && <Box sx={{ textAlign: "center", py: 4 }}><CircularProgress /></Box>}
          {!loading && items.length === 0 && (
            <Alert severity="warning" sx={{ borderRadius: 2 }}>Henüz yorum eklenmedi. Statik veriler gösterilecek.</Alert>
          )}

          <Grid container spacing={2}>
            {items.map((item) => (
              <Grid item xs={12} sm={6} key={item.id}>
                <Box
                  sx={{
                    p: 2.5, borderRadius: 3, border: "1px solid", borderColor: "divider",
                    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                    "&:hover": { borderColor: "#8e44ad", bgcolor: "rgba(142,68,173,0.04)" },
                    transition: "all 0.2s",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1.5, flex: 1, minWidth: 0 }}>
                    <Avatar sx={{ width: 44, height: 44, bgcolor: "#8e44ad", flexShrink: 0 }}>
                      {item.clientName?.[0]?.toUpperCase() || "?"}
                    </Avatar>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="subtitle2" fontWeight={700}>{item.clientName}</Typography>
                      <Typography variant="caption" color="text.secondary">{item.Company || "—"}</Typography>
                      <Typography
                        variant="body2" color="text.secondary"
                        sx={{ mt: 0.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                      >
                        "{item.Comment}"
                      </Typography>
                    </Box>
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
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle fontWeight={700}>{editItem ? "Yorumu Düzenle" : "Yeni Müşteri Yorumu"}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label="Müşteri Adı * (clientName)" value={form.clientName}
                onChange={(e) => handleChange("clientName", e.target.value)}
                placeholder="Ahmet Yılmaz" sx={fieldSx}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label="Şirket (Company)" value={form.Company}
                onChange={(e) => handleChange("Company", e.target.value)}
                placeholder="Yılmaz Holding" sx={fieldSx}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Yorum (Comment) *" value={form.Comment}
                onChange={(e) => handleChange("Comment", e.target.value)}
                multiline minRows={5}
                placeholder="DEKODEM ile çalışmak..." sx={fieldSx}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDialogOpen(false)} disabled={saving}>İptal</Button>
          <Button
            variant="contained" onClick={handleSave} disabled={saving}
            startIcon={saving && <CircularProgress size={16} color="inherit" />}
            sx={{ borderRadius: 2, bgcolor: "#8e44ad", "&:hover": { bgcolor: "#7d3c98" } }}
          >
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle fontWeight={700}>Yorumu Sil</DialogTitle>
        <DialogContent>
          <Typography><strong>{deleteTarget?.clientName}</strong> yorumu kalıcı olarak silinecek.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteTarget(null)}>Vazgeç</Button>
          <Button variant="contained" color="error" onClick={handleDelete} sx={{ borderRadius: 2 }}>Sil</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TestimonialsPanel;
