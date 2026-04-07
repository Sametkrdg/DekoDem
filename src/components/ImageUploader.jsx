/**
 * ImageUploader.jsx — Reusable image upload widget for admin forms.
 *
 * Model: Direct URL Overwrite
 *   Upload to Cloudinary → receive secure_url string → caller stores it in Firestore.
 *   No deletion or publicId tracking.  When a user replaces an image the new URL
 *   simply overwrites the old one; the previous Cloudinary asset is abandoned
 *   (acceptable given current infrastructure constraints).
 *
 * Props
 * ─────────────────────────────────────────────────────────────────────────────
 *   value        {string}                  Current URL from Firestore (or "")
 *   onChange     {(url: string) => void}   Called with new secure_url on upload;
 *                                          called with "" when the user removes
 *   folder       {string}                  Cloudinary folder (default "dekodem")
 *   label        {string}                  Field label
 *   showSnackbar {function}               Shared snackbar callback
 *   aspectRatio  {string}                 CSS aspect-ratio (default "16/9")
 *   maxSizeMB    {number}                 Client-side size cap in MB (default 5)
 *   disabled     {boolean}
 */

import { useCallback, useRef, useState } from "react";
import {
  Box, Button, Typography, LinearProgress,
  IconButton, Tooltip,
} from "@mui/material";
import {
  CloudUpload, DeleteOutline, OpenInNew,
  CheckCircleOutline, InsertDriveFileOutlined,
} from "@mui/icons-material";
import { alpha, useTheme } from "@mui/material/styles";
import {
  uploadImageToCloudinary,
  ALLOWED_IMAGE_TYPES,
  MAX_UPLOAD_SIZE_MB,
} from "../services/CloudinaryService";

// ── Helpers ───────────────────────────────────────────────────────────────────

const formatBytes = (bytes) => {
  if (bytes < 1024)       return `${bytes} B`;
  if (bytes < 1024 ** 2)  return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
};

const mimeToLabel = (mime) =>
  mime.replace("image/", "").replace("jpeg", "JPG").toUpperCase();

const ACCEPT_ATTR = ALLOWED_IMAGE_TYPES.join(",");

// ── Component ─────────────────────────────────────────────────────────────────

const ImageUploader = ({
  value       = "",
  onChange,
  folder      = "dekodem",
  label       = "Görsel",
  showSnackbar,
  aspectRatio = "16/9",
  maxSizeMB   = MAX_UPLOAD_SIZE_MB,
  disabled    = false,
}) => {
  const theme  = useTheme();
  const isDark = theme.palette.mode === "dark";
  const inputRef = useRef(null);

  const [uploading,  setUploading]  = useState(false);
  const [progress,   setProgress]   = useState(0);
  const [imgError,   setImgError]   = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fileInfo,   setFileInfo]   = useState(null);

  // ── Upload ─────────────────────────────────────────────────────────────────

  const uploadFile = useCallback(async (file) => {
    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      showSnackbar?.(
        `Desteklenmeyen dosya türü: ${mimeToLabel(file.type)}. ` +
        "Yalnızca JPG, PNG ve WebP yüklenebilir.", "error"
      );
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      showSnackbar?.(
        `Dosya boyutu (${formatBytes(file.size)}) izin verilen ` +
        `${maxSizeMB} MB limitini aşıyor.`, "error"
      );
      return;
    }

    setFileInfo({ name: file.name, size: file.size });
    setImgError(false);
    setUploading(true);
    setProgress(0);

    try {
      // Upload and receive the secure_url string directly
      const url = await uploadImageToCloudinary(file, {
        folder,
        maxSizeMB,
        onProgress: setProgress,
      });
      onChange(url);
      showSnackbar?.("Görsel başarıyla yüklendi.", "success");
    } catch (err) {
      showSnackbar?.(err.message || "Görsel yüklenemedi.", "error");
    } finally {
      setUploading(false);
      setProgress(0);
      setFileInfo(null);
      if (inputRef.current) inputRef.current.value = "";
    }
  }, [folder, maxSizeMB, onChange, showSnackbar]);

  // ── Remove — clears the URL in the parent; Cloudinary asset is abandoned ───

  const handleRemove = () => {
    onChange("");
    setImgError(false);
  };

  // ── Drag-and-drop handlers ──────────────────────────────────────────────────

  const handleDragEnter = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (!disabled && !uploading) setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget)) setIsDragging(false);
  };
  const handleDragOver  = (e) => { e.preventDefault(); e.stopPropagation(); };
  const handleDrop      = (e) => {
    e.preventDefault(); e.stopPropagation();
    setIsDragging(false);
    if (disabled || uploading) return;
    uploadFile(e.dataTransfer.files?.[0]);
  };

  // ── Derived state ───────────────────────────────────────────────────────────

  const hasImage = Boolean(value) && !imgError;

  const zoneBorderColor = isDragging
    ? theme.palette.primary.main
    : hasImage ? "transparent"
    : isDark ? "rgba(255,255,255,0.18)" : alpha(theme.palette.primary.main, 0.3);

  const zoneBgColor = isDragging
    ? alpha(theme.palette.primary.main, isDark ? 0.15 : 0.06)
    : hasImage ? "transparent"
    : isDark ? "rgba(255,255,255,0.03)" : alpha(theme.palette.primary.main, 0.02);

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <Box>
      {/* Label */}
      <Typography
        variant="caption" fontWeight={600}
        sx={{ color: "text.secondary", mb: 0.75, display: "block", letterSpacing: "0.04em" }}
      >
        {label}
      </Typography>

      {/* Drop zone */}
      <Box
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={`${label} yükle`}
        onClick={() => !uploading && !disabled && inputRef.current?.click()}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !uploading && !disabled)
            inputRef.current?.click();
        }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        sx={{
          position:    "relative",
          width:       "100%",
          aspectRatio,
          borderRadius: "12px",
          border:      "2px dashed",
          borderColor:  zoneBorderColor,
          bgcolor:      zoneBgColor,
          overflow:    "hidden",
          cursor:      (uploading || disabled) ? "default" : "pointer",
          outline:     "none",
          transition:  "border-color 0.2s, background-color 0.2s, box-shadow 0.2s",
          boxShadow:   isDragging
            ? `0 0 0 3px ${alpha(theme.palette.primary.main, 0.2)}`
            : "none",
          "&:hover": (!uploading && !disabled && !hasImage)
            ? {
                borderColor: "primary.main",
                bgcolor:     isDark ? "rgba(255,255,255,0.06)" : alpha(theme.palette.primary.main, 0.05),
              }
            : {},
          "&:focus-visible": {
            boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.35)}`,
          },
          opacity: disabled ? 0.55 : 1,
        }}
      >
        {/* ── Image preview ── */}
        {hasImage && (
          <>
            <Box
              component="img"
              src={value}
              alt="önizleme"
              onError={() => setImgError(true)}
              sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />

            {/* Hover action overlay */}
            <Box
              sx={{
                position:  "absolute", inset: 0,
                bgcolor:   "rgba(0,0,0,0)",
                display:   "flex", alignItems: "center", justifyContent: "center", gap: 1,
                transition: "background-color 0.2s",
                "&:hover": { bgcolor: "rgba(0,0,0,0.48)" },
                "& .action-btn": { opacity: 0, transition: "opacity 0.2s" },
                "&:hover .action-btn": { opacity: 1 },
              }}
            >
              <Tooltip title="Görseli Değiştir">
                <IconButton
                  className="action-btn" size="small" disabled={disabled}
                  onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                  sx={{ bgcolor: "rgba(255,255,255,0.92)", "&:hover": { bgcolor: "#fff" } }}
                >
                  <CloudUpload fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Yeni Sekmede Aç">
                <IconButton
                  className="action-btn" size="small"
                  component="a" href={value} target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  sx={{ bgcolor: "rgba(255,255,255,0.92)", "&:hover": { bgcolor: "#fff" } }}
                >
                  <OpenInNew fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Görseli Kaldır">
                <IconButton
                  className="action-btn" size="small" disabled={disabled}
                  onClick={(e) => { e.stopPropagation(); handleRemove(); }}
                  sx={{ bgcolor: "rgba(255,255,255,0.92)", color: "error.main", "&:hover": { bgcolor: "#fff" } }}
                >
                  <DeleteOutline fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            {/* Cloudinary badge */}
            <Box
              sx={{
                position: "absolute", bottom: 8, left: 8,
                display: "flex", alignItems: "center", gap: 0.4,
                bgcolor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)",
                borderRadius: "6px", px: 1, py: 0.3,
              }}
            >
              <CheckCircleOutline sx={{ fontSize: 13, color: "#4caf50" }} />
              <Typography variant="caption" sx={{ color: "#fff", fontSize: "0.68rem" }}>
                Cloudinary
              </Typography>
            </Box>
          </>
        )}

        {/* ── Empty / drag-hint ── */}
        {!hasImage && !uploading && (
          <Box
            sx={{
              position: "absolute", inset: 0, pointerEvents: "none",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 1, p: 2,
            }}
          >
            <CloudUpload
              sx={{
                fontSize: 40, color: "primary.main",
                opacity:   isDragging ? 1 : 0.55,
                transform: isDragging ? "translateY(-4px)" : "none",
                transition: "transform 0.2s, opacity 0.2s",
              }}
            />
            <Typography variant="body2" color="text.secondary" fontWeight={500} textAlign="center">
              {isDragging ? "Bırakın — yükleniyor" : "Tıkla veya sürükle bırak"}
            </Typography>
            <Typography variant="caption" color="text.disabled" textAlign="center">
              JPG, PNG, WebP — maks. {maxSizeMB} MB
            </Typography>
          </Box>
        )}

        {/* ── Upload progress ── */}
        {uploading && (
          <Box
            sx={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 2,
              bgcolor: isDark ? "rgba(0,0,0,0.72)" : "rgba(255,255,255,0.88)",
              backdropFilter: "blur(4px)", p: 3,
            }}
          >
            {fileInfo && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <InsertDriveFileOutlined sx={{ fontSize: 18, color: "text.secondary" }} />
                <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: 220 }}>
                  {fileInfo.name} · {formatBytes(fileInfo.size)}
                </Typography>
              </Box>
            )}
            <Typography variant="body2" fontWeight={700} color="text.primary">
              Yükleniyor… {progress}%
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
        accept={ACCEPT_ATTR}
        disabled={disabled}
        style={{ display: "none" }}
        onChange={(e) => uploadFile(e.target.files?.[0])}
        aria-hidden="true"
      />

      {/* CTA button — shown when no image */}
      {!hasImage && !uploading && (
        <Button
          variant="outlined" size="small" startIcon={<CloudUpload />}
          disabled={disabled}
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

export default ImageUploader;
