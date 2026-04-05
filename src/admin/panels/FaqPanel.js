import React, { useCallback, useEffect, useState } from "react";
import {
  Box, Grid, TextField, Button, Typography,
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, CircularProgress, Alert, FormControlLabel, Switch,
} from "@mui/material";
import { Add, Edit, Delete, QuestionAnswer } from "@mui/icons-material";
import { AdminCard, FormSection, SectionHeader, SectionTitle } from "../shared";
import { getCollectionItems, addCollectionItem, updateCollectionItem, deleteCollectionItem } from "../adminFirestore";

const COLLECTION = "faq";

const EMPTY = {
  question: "", answer: "", category: "",
  sortOrder: 0, isActive: true,
};

const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: "12px" } };

const FaqPanel = ({ showSnackbar }) => {
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
      setItems(data.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)));
    } catch {
      showSnackbar("SSS yüklenemedi.", "error");
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  useEffect(() => { load(); }, [load]);

  const openNew = () => { setEditItem(null); setForm({ ...EMPTY, sortOrder: items.length }); setDialogOpen(true); };
  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      question: item.question || "",
      answer: item.answer || "",
      category: item.category || "",
      sortOrder: item.sortOrder ?? 0,
      isActive: item.isActive ?? true,
    });
    setDialogOpen(true);
  };

  const handleChange = (field, val) => setForm((p) => ({ ...p, [field]: val }));

  const handleSave = async () => {
    if (!form.question.trim()) { showSnackbar("Soru alanı zorunludur.", "warning"); return; }
    if (!form.answer.trim()) { showSnackbar("Cevap alanı zorunludur.", "warning"); return; }
    setSaving(true);
    try {
      const payload = { ...form, sortOrder: Number(form.sortOrder) || 0 };
      if (editItem) {
        await updateCollectionItem(COLLECTION, editItem.id, payload);
        showSnackbar("Soru güncellendi.");
      } else {
        await addCollectionItem(COLLECTION, payload);
        showSnackbar("Soru oluşturuldu.");
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
      showSnackbar("Soru silindi.");
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
              <QuestionAnswer sx={{ color: "#f39c12", fontSize: 28 }} />
              <SectionTitle variant="h5">Sık Sorulan Sorular (SSS)</SectionTitle>
            </SectionHeader>
            <Button variant="contained" startIcon={<Add />} onClick={openNew} sx={{ borderRadius: 2, bgcolor: "#f39c12", "&:hover": { bgcolor: "#d68910" } }}>
              Yeni Soru
            </Button>
          </Box>

          <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
            Buraya eklenen sorular, SSS sayfasında statik verilerle birlikte görüntülenir. sortOrder değeri küçük olan önce gelir.
          </Alert>

          {loading && <Box sx={{ textAlign: "center", py: 4 }}><CircularProgress /></Box>}
          {!loading && items.length === 0 && (
            <Alert severity="warning" sx={{ borderRadius: 2 }}>Henüz soru eklenmedi.</Alert>
          )}

          <Grid container spacing={1.5}>
            {items.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Box
                  sx={{
                    p: 2, borderRadius: 2.5, border: "1px solid", borderColor: "divider",
                    display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2,
                    opacity: item.isActive ? 1 : 0.5,
                    "&:hover": { borderColor: "#f39c12", bgcolor: "rgba(243,156,18,0.04)" },
                    transition: "all 0.2s",
                  }}
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                      {item.question}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {item.answer}
                    </Typography>
                    {item.category && (
                      <Typography variant="caption" color="text.disabled" sx={{ mt: 0.5, display: "block" }}>
                        {item.category} · Sıra: {item.sortOrder}
                      </Typography>
                    )}
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
        <DialogTitle fontWeight={700}>{editItem ? "Soruyu Düzenle" : "Yeni Soru"}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Soru *" value={form.question} onChange={(e) => handleChange("question", e.target.value)} sx={fieldSx} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Cevap *" value={form.answer} onChange={(e) => handleChange("answer", e.target.value)} multiline minRows={4} sx={fieldSx} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField fullWidth label="Kategori" value={form.category} onChange={(e) => handleChange("category", e.target.value)} placeholder="Genel, Projeler, Fiyatlandırma..." sx={fieldSx} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Sıra (sortOrder)" type="number" value={form.sortOrder} onChange={(e) => handleChange("sortOrder", e.target.value)} sx={fieldSx} />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch checked={form.isActive} onChange={(e) => handleChange("isActive", e.target.checked)} color="warning" />}
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
            sx={{ borderRadius: 2, bgcolor: "#f39c12", "&:hover": { bgcolor: "#d68910" } }}
          >
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle fontWeight={700}>Soruyu Sil</DialogTitle>
        <DialogContent>
          <Typography>Bu soru kalıcı olarak silinecek. Devam etmek istiyor musunuz?</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteTarget(null)}>Vazgeç</Button>
          <Button variant="contained" color="error" onClick={handleDelete} sx={{ borderRadius: 2 }}>Sil</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FaqPanel;
