/**
 * ContentPanel.js — Gallery management (image-only, Cloudinary upload).
 *
 * Architecture
 * ─────────────────────────────────────────────────────────────────────────────
 * Firestore collection: Gallery
 * Document schema:      { url: string, createdAt: Timestamp }
 *
 * Flow
 *   1. User picks a file → local preview via URL.createObjectURL
 *   2. User clicks "Yükle" → upload to Cloudinary (unsigned preset)
 *   3. On success → addDoc to Gallery collection with { url, createdAt }
 *   4. onSnapshot listener keeps the grid in sync in real time
 *   5. Delete → deleteDoc removes the Firestore record
 *      (Cloudinary asset is abandoned — Direct URL Overwrite model)
 *
 * Image delivery: every URL in the grid passes through buildCloudinaryUrl
 * to get q_auto, f_auto, w_800 transformations applied automatically.
 */

import { useEffect, useRef, useState } from "react";
import {
  Box, Grid, Button, Typography, IconButton,
  Tooltip, CircularProgress, Alert, LinearProgress,
} from "@mui/material";
import {
  Collections, CloudUpload, Delete, AddPhotoAlternate,
} from "@mui/icons-material";
import { alpha, useTheme } from "@mui/material/styles";
import {
  collection, addDoc, deleteDoc, doc,
  onSnapshot, query, orderBy, serverTimestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "../../config/firebase";
import { AdminCard, FormSection, SectionHeader, SectionTitle } from "../shared";
import {
  uploadImageToCloudinary,
  buildCloudinaryUrl,
  ALLOWED_IMAGE_TYPES,
  MAX_UPLOAD_SIZE_MB,
} from "../../services/CloudinaryService";

const GALLERY_COL = "Gallery";

// ── Helpers ───────────────────────────────────────────────────────────────────

const formatBytes = (bytes) => {
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
};

// ── Sub-component: upload zone ────────────────────────────────────────────────

const UploadZone = ({ onUploaded, showSnackbar }) => {
  const theme    = useTheme();
  const isDark   = theme.palette.mode === "dark";
  const inputRef = useRef(null);

  const [file,       setFile]       = useState(null);   // selected File object
  const [preview,    setPreview]    = useState(null);   // object URL for thumbnail
  const [uploading,  setUploading]  = useState(false);
  const [progress,   setProgress]   = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Revoke the object URL when the component unmounts or the file changes
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  const pickFile = (picked) => {
    if (!picked) return;
    if (!ALLOWED_IMAGE_TYPES.includes(picked.type)) {
      showSnackbar?.("Yalnızca JPG, PNG veya WebP dosyaları yüklenebilir.", "error");
      return;
    }
    if (picked.size > MAX_UPLOAD_SIZE_MB * 1024 * 1024) {
      showSnackbar?.(`Dosya boyutu ${MAX_UPLOAD_SIZE_MB} MB limitini aşıyor.`, "error");
      return;
    }
    if (preview) URL.revokeObjectURL(preview);
    setFile(picked);
    // Instant local preview — no network call yet
    setPreview(URL.createObjectURL(picked));
  };

  const handleInputChange = (e) => pickFile(e.target.files?.[0]);

  const handleDragEnter = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
  const handleDragLeave = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget)) setIsDragging(false);
  };
  const handleDragOver  = (e) => { e.preventDefault(); e.stopPropagation(); };
  const handleDrop      = (e) => {
    e.preventDefault(); e.stopPropagation();
    setIsDragging(false);
    pickFile(e.dataTransfer.files?.[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setProgress(0);
    try {
      // Step 1 — upload to Cloudinary, receive secure_url string
      const url = await uploadImageToCloudinary(file, {
        folder:     "dekodem/gallery",
        onProgress: setProgress,
      });

      // Step 2 — persist to Firestore Gallery collection
      await addDoc(collection(db, GALLERY_COL), {
        url,
        createdAt: serverTimestamp(),
      });

      showSnackbar?.("Fotoğraf galeriye eklendi.", "success");
      onUploaded?.();
      // Reset upload zone
      setFile(null);
      setPreview(null);
      if (inputRef.current) inputRef.current.value = "";
    } catch (err) {
      showSnackbar?.(err.message || "Yükleme başarısız.", "error");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleClear = () => {
    setFile(null);
    if (preview) { URL.revokeObjectURL(preview); setPreview(null); }
    if (inputRef.current) inputRef.current.value = "";
  };

  const borderColor = isDragging
    ? theme.palette.primary.main
    : isDark ? "rgba(255,255,255,0.18)" : alpha(theme.palette.primary.main, 0.3);

  return (
    <Box>
      {/* Drop zone / preview */}
      <Box
        role="button"
        tabIndex={uploading ? -1 : 0}
        aria-label="Fotoğraf seç veya sürükle"
        onClick={() => !uploading && inputRef.current?.click()}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        sx={{
          position:    "relative",
          width:       "100%",
          aspectRatio: "16/7",
          borderRadius: "12px",
          border:      "2px dashed",
          borderColor,
          bgcolor:     preview ? "transparent"
            : isDragging ? alpha(theme.palette.primary.main, isDark ? 0.15 : 0.06)
            : isDark ? "rgba(255,255,255,0.03)" : alpha(theme.palette.primary.main, 0.02),
          overflow:    "hidden",
          cursor:      uploading ? "default" : "pointer",
          outline:     "none",
          transition:  "all 0.2s",
          boxShadow:   isDragging ? `0 0 0 3px ${alpha(theme.palette.primary.main, 0.2)}` : "none",
          "&:focus-visible": { boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.35)}` },
        }}
      >
        {/* Pre-upload thumbnail */}
        {preview && !uploading && (
          <Box
            component="img"
            src={preview}
            alt="önizleme"
            sx={{ width: "100%", height: "100%", objectFit: "contain", display: "block", p: 1 }}
          />
        )}

        {/* Empty hint */}
        {!preview && !uploading && (
          <Box
            sx={{
              position: "absolute", inset: 0, pointerEvents: "none",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 1,
            }}
          >
            <AddPhotoAlternate
              sx={{
                fontSize: 48, color: "primary.main",
                opacity:   isDragging ? 1 : 0.5,
                transform: isDragging ? "translateY(-4px)" : "none",
                transition: "all 0.2s",
              }}
            />
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {isDragging ? "Bırakın — önizleme hazırlanıyor" : "Tıkla veya sürükle bırak"}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              JPG, PNG, WebP — maks. {MAX_UPLOAD_SIZE_MB} MB
            </Typography>
          </Box>
        )}

        {/* Upload progress overlay */}
        {uploading && (
          <Box
            sx={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 2,
              bgcolor: isDark ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.9)",
              backdropFilter: "blur(4px)", p: 3,
            }}
          >
            <Typography variant="body2" fontWeight={700}>
              Cloudinary'ye yükleniyor… {progress}%
            </Typography>
            <LinearProgress
              variant="determinate" value={progress}
              sx={{ width: "80%", borderRadius: 4, height: 6 }}
            />
          </Box>
        )}
      </Box>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED_IMAGE_TYPES.join(",")}
        style={{ display: "none" }}
        onChange={handleInputChange}
        aria-hidden="true"
      />

      {/* File info + action buttons */}
      {file && !uploading && (
        <Box sx={{ mt: 1.5, display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
          <Typography variant="caption" color="text.secondary" sx={{ flexGrow: 1 }}>
            {file.name} · {formatBytes(file.size)}
          </Typography>
          <Button
            size="small"
            variant="outlined"
            color="inherit"
            onClick={handleClear}
            sx={{ borderRadius: "8px", textTransform: "none" }}
          >
            İptal
          </Button>
          <Button
            size="small"
            variant="contained"
            startIcon={<CloudUpload sx={{ fontSize: 16 }} />}
            onClick={handleUpload}
            sx={{ borderRadius: "8px", textTransform: "none" }}
          >
            Galeriye Yükle
          </Button>
        </Box>
      )}

      {!file && !uploading && (
        <Button
          variant="outlined"
          size="small"
          startIcon={<AddPhotoAlternate />}
          onClick={() => inputRef.current?.click()}
          fullWidth
          sx={{ mt: 1.5, borderRadius: "8px", textTransform: "none" }}
        >
          Fotoğraf Seç
        </Button>
      )}
    </Box>
  );
};

// ── Main panel ────────────────────────────────────────────────────────────────

const ContentPanel = ({ showSnackbar }) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [photos,   setPhotos]   = useState([]);   // { id, url, createdAt }
  const [loading,  setLoading]  = useState(true);
  const [deleting, setDeleting] = useState(null); // doc id being deleted

  // ── Real-time listener ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!isFirebaseConfigured || !db) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, GALLERY_COL),
      orderBy("createdAt", "desc")
    );

    // onSnapshot fires immediately with cached data, then on every write.
    // The gallery grid stays in sync without a page refresh.
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setPhotos(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        console.error("[ContentPanel] Gallery listener error:", err);
        setLoading(false);
      }
    );

    return unsubscribe; // cleanup on unmount
  }, []);

  // ── Delete ─────────────────────────────────────────────────────────────────

  const handleDelete = async (photoId) => {
    setDeleting(photoId);
    try {
      await deleteDoc(doc(db, GALLERY_COL, photoId));
      showSnackbar?.("Fotoğraf silindi.");
    } catch (err) {
      showSnackbar?.(err.message || "Silinemedi.", "error");
    } finally {
      setDeleting(null);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <Box>
      {/* ── Upload zone ─────────────────────────────────────────────── */}
      <AdminCard>
        <FormSection>
          <SectionHeader>
            <AddPhotoAlternate sx={{ color: "primary.main", fontSize: 28 }} />
            <SectionTitle variant="h5">Galeriye Fotoğraf Ekle</SectionTitle>
          </SectionHeader>

          {!isFirebaseConfigured && (
            <Alert severity="warning" sx={{ mb: 2, borderRadius: 2 }}>
              Firebase yapılandırması eksik — yükleme devre dışı.
            </Alert>
          )}

          <UploadZone showSnackbar={showSnackbar} />
        </FormSection>
      </AdminCard>

      {/* ── Gallery grid ────────────────────────────────────────────── */}
      <AdminCard>
        <FormSection>
          <SectionHeader>
            <Collections sx={{ color: "primary.main", fontSize: 28 }} />
            <SectionTitle variant="h5">
              Galeri Fotoğrafları
              {!loading && (
                <Typography
                  component="span"
                  variant="caption"
                  sx={{ ml: 1, color: "text.disabled", fontWeight: 400 }}
                >
                  ({photos.length} fotoğraf)
                </Typography>
              )}
            </SectionTitle>
          </SectionHeader>

          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {!loading && photos.length === 0 && (
            <Alert severity="info" sx={{ borderRadius: 2 }}>
              Galeride henüz fotoğraf yok. Yukarıdan ilk fotoğrafı ekleyin.
            </Alert>
          )}

          {!loading && photos.length > 0 && (
            <Grid container spacing={1.5}>
              {photos.map((photo) => {
                // Pass through Cloudinary transformations for optimised delivery
                const displayUrl = buildCloudinaryUrl(photo.url, {
                  width: 400,
                  height: 300,
                  crop: "fill",
                });

                return (
                  <Grid item xs={6} sm={4} md={3} key={photo.id}>
                    <Box
                      sx={{
                        position:     "relative",
                        aspectRatio:  "4/3",
                        borderRadius: "10px",
                        overflow:     "hidden",
                        border:       "1px solid",
                        borderColor:  isDark ? "rgba(255,255,255,0.1)" : alpha(theme.palette.primary.main, 0.1),
                        bgcolor:      isDark ? "rgba(255,255,255,0.04)" : alpha(theme.palette.primary.main, 0.02),
                        // Hover — reveal delete button
                        "&:hover .delete-btn":  { opacity: 1 },
                        "&:hover img":          { transform: "scale(1.05)", filter: "brightness(0.75)" },
                        "& img": { transition: "transform 0.3s ease, filter 0.3s ease" },
                      }}
                    >
                      <Box
                        component="img"
                        src={displayUrl}
                        alt={`Galeri fotoğrafı`}
                        loading="lazy"
                        sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />

                      {/* Delete overlay */}
                      <Box
                        sx={{
                          position:       "absolute",
                          inset:          0,
                          display:        "flex",
                          alignItems:     "center",
                          justifyContent: "center",
                        }}
                      >
                        {deleting === photo.id ? (
                          <CircularProgress size={28} sx={{ color: "#fff" }} />
                        ) : (
                          <Tooltip title="Fotoğrafı Sil">
                            <IconButton
                              className="delete-btn"
                              size="small"
                              onClick={() => handleDelete(photo.id)}
                              sx={{
                                opacity:  0,
                                bgcolor:  "rgba(0,0,0,0.6)",
                                color:    "#fff",
                                transition: "opacity 0.2s",
                                "&:hover": { bgcolor: "error.main" },
                              }}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </FormSection>
      </AdminCard>
    </Box>
  );
};

export default ContentPanel;
