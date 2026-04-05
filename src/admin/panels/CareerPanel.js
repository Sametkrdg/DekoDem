/**
 * CareerPanel
 *
 * Manages the Firestore `Career` collection.
 * Schema: { Position, Department, IsActive (bool), Requirements (string[]) }
 *
 * Requirements are edited as a chip-tag input — press Enter or comma to add,
 * click the × on a chip to remove.
 */
import React, { useCallback, useEffect, useState } from "react";
import {
  Box, Grid, TextField, Button, Typography,
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, CircularProgress, Alert, FormControlLabel,
  Switch, Chip, Stack,
} from "@mui/material";
import { Add, Edit, Delete, Work } from "@mui/icons-material";
import { AdminCard, FormSection, SectionHeader, SectionTitle } from "../shared";
import {
  getCollectionItems, addCollectionItem,
  updateCollectionItem, deleteCollectionItem,
} from "../adminFirestore";

const COLLECTION = "Career";

const EMPTY = { Position: "", Department: "", IsActive: true, Requirements: [] };

const fieldSx = { "& .MuiOutlinedInput-root": { borderRadius: "12px" } };

// ── Chip array input ──────────────────────────────────────────────────────────
const RequirementsInput = ({ value = [], onChange }) => {
  const [draft, setDraft] = useState("");

  const addItem = () => {
    const trimmed = draft.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setDraft("");
  };

  const removeItem = (item) => onChange(value.filter((v) => v !== item));

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 1, mb: 1.5 }}>
        <TextField
          fullWidth size="small"
          label="Gereksinim ekle (Enter ile onayla)"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Üniversite mezunu, 2+ yıl deneyim..."
          sx={fieldSx}
        />
        <Button variant="outlined" onClick={addItem} sx={{ borderRadius: 2, flexShrink: 0 }}>
          Ekle
        </Button>
      </Box>
      {value.length > 0 && (
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {value.map((req) => (
            <Chip
              key={req}
              label={req}
              size="small"
              onDelete={() => removeItem(req)}
              variant="outlined"
              sx={{ borderRadius: "8px" }}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};

// ── Panel ─────────────────────────────────────────────────────────────────────
const CareerPanel = ({ showSnackbar }) => {
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
      setItems(data.sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0)));
    } catch {
      showSnackbar("İş ilanları yüklenemedi.", "error");
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  useEffect(() => { load(); }, [load]);

  const openNew  = () => { setEditItem(null); setForm(EMPTY); setDialogOpen(true); };
  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      Position:    item.Position    || "",
      Department:  item.Department  || "",
      IsActive:    item.IsActive    ?? true,
      Requirements: Array.isArray(item.Requirements) ? item.Requirements : [],
    });
    setDialogOpen(true);
  };

  const handleChange = (field, val) => setForm((p) => ({ ...p, [field]: val }));

  const handleSave = async () => {
    if (!form.Position.trim()) { showSnackbar("Pozisyon adı zorunludur.", "warning"); return; }
    setSaving(true);
    try {
      const payload = {
        Position:     form.Position.trim(),
        Department:   form.Department.trim(),
        IsActive:     Boolean(form.IsActive),
        Requirements: form.Requirements,
      };
      if (editItem) {
        await updateCollectionItem(COLLECTION, editItem.id, payload);
        showSnackbar("İş ilanı güncellendi.");
      } else {
        await addCollectionItem(COLLECTION, payload);
        showSnackbar("İş ilanı oluşturuldu.");
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
      showSnackbar("İş ilanı silindi.");
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
              <Work sx={{ color: "#c0392b", fontSize: 28 }} />
              <SectionTitle variant="h5">İş İlanları</SectionTitle>
            </SectionHeader>
            <Button
              variant="contained" startIcon={<Add />} onClick={openNew}
              sx={{ borderRadius: 2, bgcolor: "#c0392b", "&:hover": { bgcolor: "#a93226" } }}
            >
              Yeni İlan
            </Button>
          </Box>

          {loading && <Box sx={{ textAlign: "center", py: 4 }}><CircularProgress /></Box>}
          {!loading && items.length === 0 && (
            <Alert severity="info" sx={{ borderRadius: 2 }}>
              Henüz iş ilanı eklenmedi. Kariyer sayfasında otomatik bildirim gösterilecektir.
            </Alert>
          )}

          <Grid container spacing={2}>
            {items.map((item) => (
              <Grid item xs={12} sm={6} key={item.id}>
                <Box
                  sx={{
                    p: 2.5, borderRadius: 3, border: "1px solid", borderColor: "divider",
                    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                    opacity: item.IsActive ? 1 : 0.55,
                    "&:hover": { borderColor: "#c0392b", bgcolor: "rgba(192,57,43,0.03)" },
                    transition: "all 0.2s",
                  }}
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5, flexWrap: "wrap" }}>
                      <Typography variant="subtitle1" fontWeight={700}>{item.Position}</Typography>
                      {!item.IsActive && <Chip size="small" label="Pasif" color="default" />}
                    </Box>
                    <Typography variant="body2" color="text.secondary">{item.Department || "—"}</Typography>
                    {Array.isArray(item.Requirements) && item.Requirements.length > 0 && (
                      <Typography variant="caption" color="text.disabled">
                        {item.Requirements.length} gereksinim
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
        <DialogTitle fontWeight={700}>{editItem ? "İlanı Düzenle" : "Yeni İş İlanı"}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Pozisyon Adı * (Position)" value={form.Position}
                onChange={(e) => handleChange("Position", e.target.value)}
                placeholder="Proje Yöneticisi" sx={fieldSx}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Departman (Department)" value={form.Department}
                onChange={(e) => handleChange("Department", e.target.value)}
                placeholder="İnşaat, Tasarım, İdari..." sx={fieldSx}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
                Gereksinimler (Requirements)
              </Typography>
              <RequirementsInput
                value={form.Requirements}
                onChange={(val) => handleChange("Requirements", val)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={form.IsActive}
                    onChange={(e) => handleChange("IsActive", e.target.checked)}
                    color="error"
                  />
                }
                label="Aktif (IsActive) — kariyer sayfasında görünsün"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDialogOpen(false)} disabled={saving}>İptal</Button>
          <Button
            variant="contained" onClick={handleSave} disabled={saving}
            startIcon={saving && <CircularProgress size={16} color="inherit" />}
            sx={{ borderRadius: 2, bgcolor: "#c0392b", "&:hover": { bgcolor: "#a93226" } }}
          >
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle fontWeight={700}>İlanı Sil</DialogTitle>
        <DialogContent>
          <Typography><strong>{deleteTarget?.Position}</strong> ilanı kalıcı olarak silinecek.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteTarget(null)}>Vazgeç</Button>
          <Button variant="contained" color="error" onClick={handleDelete} sx={{ borderRadius: 2 }}>Sil</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CareerPanel;
