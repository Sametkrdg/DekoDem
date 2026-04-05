/**
 * ImageUploadField
 *
 * Reusable admin image upload widget.
 *
 * Props:
 *   value      {string}            Current URL (shown as preview, e.g. from Firestore)
 *   onChange   {(url: string) => void}  Called with the new Cloudinary URL after upload
 *   folder     {string}            Cloudinary folder to organise uploads (optional)
 *   label      {string}            Field label shown above the widget
 *   showSnackbar {function}        Shared snackbar from the panel
 *   aspectRatio {string}           CSS aspect-ratio for preview box, default "16/9"
 */

import React, { useRef, useState } from "react";
import {
  Box, Button, Typography, LinearProgress, IconButton, Tooltip,
} from "@mui/material";
import {
  CloudUpload, DeleteOutline, OpenInNew, CheckCircleOutline,
} from "@mui/icons-material";
import { alpha, useTheme } from "@mui/material/styles";
import { uploadImageToCloudinary } from "../services/cloudinary";

const ImageUploadField = ({
  value        = "",
  onChange,
  folder       = "dekodem",
  label        = "Görsel",
  showSnackbar,
  aspectRatio  = "16/9",
}) => {
  const theme     = useTheme();
  const isDark    = theme.palette.mode === "dark";
  const inputRef  = useRef(null);

  const [uploading, setUploading] = useState(false);
  const [progress,  setProgress]  = useState(0);
  const [imgError,  setImgError]  = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset error state for new attempt
    setImgError(false);
    setUploading(true);
    setProgress(0);

    try {
      const url = await uploadImageToCloudinary(file, {
        folder,
        onProgress: setProgress,
      });
      onChange(url);
      showSnackbar?.("Görsel başarıyla yüklendi.", "success");
    } catch (err) {
      showSnackbar?.(err.message || "Görsel yüklenemedi.", "error");
    } finally {
      setUploading(false);
      setProgress(0);
      // Clear input so the same file can be re-selected after an error
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleRemove = () => {
    onChange("");
    setImgError(false);
  };

  const hasImage = Boolean(value) && !imgError;

  return (
    <Box>
      {/* Label */}
      <Typography
        variant="caption"
        fontWeight={600}
        sx={{ color: "text.secondary", mb: 0.75, display: "block", letterSpacing: "0.04em" }}
      >
        {label}
      </Typography>

      {/* Preview / drop zone */}
      <Box
        onClick={() => !uploading && inputRef.current?.click()}
        sx={{
          position:     "relative",
          width:        "100%",
          aspectRatio,
          borderRadius: "12px",
          border:       "2px dashed",
          borderColor:  hasImage
            ? "transparent"
            : isDark ? "rgba(255,255,255,0.18)" : alpha(theme.palette.primary.main, 0.3),
          bgcolor:      hasImage
            ? "transparent"
            : isDark ? "rgba(255,255,255,0.03)" : alpha(theme.palette.primary.main, 0.02),
          overflow:     "hidden",
          cursor:       uploading ? "default" : "pointer",
          transition:   "border-color 0.2s, background-color 0.2s",
          "&:hover":    !uploading && !hasImage
            ? {
                borderColor: "primary.main",
                bgcolor:     isDark
                  ? "rgba(255,255,255,0.06)"
                  : alpha(theme.palette.primary.main, 0.05),
              }
            : {},
        }}
      >
        {/* ── Existing / uploaded image ── */}
        {hasImage && (
          <>
            <Box
              component="img"
              src={value}
              alt="önizleme"
              onError={() => setImgError(true)}
              sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            {/* Overlay shown on hover */}
            <Box
              sx={{
                position:   "absolute",
                inset:      0,
                bgcolor:    "rgba(0,0,0,0)",
                transition: "background-color 0.2s",
                display:    "flex",
                alignItems: "center",
                justifyContent: "center",
                gap:        1,
                "&:hover":  { bgcolor: "rgba(0,0,0,0.45)" },
                "& .action-btn": { opacity: 0, transition: "opacity 0.2s" },
                "&:hover .action-btn": { opacity: 1 },
              }}
            >
              <Tooltip title="Görseli Değiştir">
                <IconButton
                  className="action-btn"
                  size="small"
                  onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                  sx={{ bgcolor: "rgba(255,255,255,0.9)", "&:hover": { bgcolor: "#fff" } }}
                >
                  <CloudUpload fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Yeni Sekmede Aç">
                <IconButton
                  className="action-btn"
                  size="small"
                  component="a"
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  sx={{ bgcolor: "rgba(255,255,255,0.9)", "&:hover": { bgcolor: "#fff" } }}
                >
                  <OpenInNew fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Görseli Kaldır">
                <IconButton
                  className="action-btn"
                  size="small"
                  onClick={(e) => { e.stopPropagation(); handleRemove(); }}
                  sx={{ bgcolor: "rgba(255,255,255,0.9)", color: "error.main", "&:hover": { bgcolor: "#fff" } }}
                >
                  <DeleteOutline fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            {/* Uploaded badge */}
            <Box
              sx={{
                position: "absolute",
                bottom: 8,
                left: 8,
                display: "flex",
                alignItems: "center",
                gap: 0.4,
                bgcolor: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(4px)",
                borderRadius: "6px",
                px: 1,
                py: 0.3,
              }}
            >
              <CheckCircleOutline sx={{ fontSize: 13, color: "#4caf50" }} />
              <Typography variant="caption" sx={{ color: "#fff", fontSize: "0.68rem" }}>
                Cloudinary
              </Typography>
            </Box>
          </>
        )}

        {/* ── Empty state / drop hint ── */}
        {!hasImage && !uploading && (
          <Box
            sx={{
              position:       "absolute",
              inset:          0,
              display:        "flex",
              flexDirection:  "column",
              alignItems:     "center",
              justifyContent: "center",
              gap:            1,
              p:              2,
            }}
          >
            <CloudUpload sx={{ fontSize: 36, color: "primary.main", opacity: 0.6 }} />
            <Typography variant="body2" color="text.secondary" textAlign="center">
              Tıkla veya sürükle
            </Typography>
            <Typography variant="caption" color="text.disabled" textAlign="center">
              PNG, JPG, WebP — maks. 10 MB
            </Typography>
          </Box>
        )}

        {/* ── Upload progress overlay ── */}
        {uploading && (
          <Box
            sx={{
              position:       "absolute",
              inset:          0,
              display:        "flex",
              flexDirection:  "column",
              alignItems:     "center",
              justifyContent: "center",
              gap:            2,
              bgcolor:        isDark ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.85)",
              backdropFilter: "blur(4px)",
              p:              3,
            }}
          >
            <Typography variant="body2" fontWeight={600} color="text.primary">
              Yükleniyor… {progress}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ width: "80%", borderRadius: 4, height: 6 }}
            />
          </Box>
        )}
      </Box>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Upload button — shown below when no image is present */}
      {!hasImage && !uploading && (
        <Button
          variant="outlined"
          size="small"
          startIcon={<CloudUpload />}
          onClick={() => inputRef.current?.click()}
          sx={{ mt: 1.5, borderRadius: "10px", textTransform: "none" }}
          fullWidth
        >
          Görsel Seç & Yükle
        </Button>
      )}
    </Box>
  );
};

export default ImageUploadField;
