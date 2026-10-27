/**
 * CloudinaryService.js — Centralised image upload & delivery service.
 *
 * Uses Cloudinary's unsigned upload API — no server-side signing proxy required.
 * All credentials are read from REACT_APP_* env variables at module load.
 *
 * Exports
 * ─────────────────────────────────────────────────────────────────────────────
 *   CLOUDINARY_CONFIG        — resolved config (isConfigured, uploadUrl, …)
 *   ALLOWED_IMAGE_TYPES      — ['image/jpeg','image/png','image/webp']
 *   MAX_UPLOAD_SIZE_MB       — 5  (client-side default)
 *   uploadImageToCloudinary  — upload a File → resolves with secure_url
 *   buildCloudinaryUrl       — transform a stored URL for optimised delivery
 *   getPublicIdFromUrl        — extract the Cloudinary public_id from a URL
 *
 * Setup (Cloudinary Dashboard)
 * ─────────────────────────────────────────────────────────────────────────────
 *   Settings → Upload → Upload presets → Add preset
 *   Signing mode : Unsigned
 *   Preset name  : must match REACT_APP_CLOUDINARY_UPLOAD_PRESET
 */

// ── Config ────────────────────────────────────────────────────────────────────

const _cloudName    = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const _uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

if (!_cloudName || !_uploadPreset) {
  console.warn(
    "[CloudinaryService] Missing env variables.\n" +
    "  REACT_APP_CLOUDINARY_CLOUD_NAME     : " + (_cloudName    || "⚠ NOT SET") + "\n" +
    "  REACT_APP_CLOUDINARY_UPLOAD_PRESET  : " + (_uploadPreset || "⚠ NOT SET") + "\n" +
    "Image uploads will fail until these are configured in .env"
  );
}

/** Resolved configuration — read by other modules for display/validation. */
export const CLOUDINARY_CONFIG = Object.freeze({
  cloudName:    _cloudName    || "",
  uploadPreset: _uploadPreset || "",
  uploadUrl:    _cloudName
    ? `https://api.cloudinary.com/v1_1/${_cloudName}/image/upload`
    : "",
  isConfigured: Boolean(_cloudName && _uploadPreset),
});

// ── Constants ─────────────────────────────────────────────────────────────────

/** Explicit MIME whitelist — reuse in ImageUploader for <input accept> + validation. */
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

/** Default client-side size cap. Pass opts.maxSizeMB to override per call. */
export const MAX_UPLOAD_SIZE_MB = 5;

// ── Error message mapper ──────────────────────────────────────────────────────

const _mapCloudinaryError = (rawMessage = "", httpStatus, uploadPreset) => {
  const msg = rawMessage.toLowerCase();

  if (msg.includes("unknown api key") || msg.includes("invalid api key")) {
    return (
      "Cloudinary API anahtarı geçersiz. " +
      "Lütfen upload preset'in imzasız (Unsigned) olduğunu Cloudinary Dashboard'dan doğrulayın."
    );
  }
  if (msg.includes("unknown upload preset") || msg.includes("upload preset not found")) {
    return (
      `Upload preset "${uploadPreset}" bulunamadı. ` +
      "Cloudinary Dashboard → Settings → Upload → Upload presets'ten bu preset'i oluşturun."
    );
  }
  if (msg.includes("file size too large") || msg.includes("exceeds the maximum")) {
    return "Dosya boyutu Cloudinary'nin izin verdiği limiti aşıyor.";
  }
  if (msg.includes("invalid image file")) {
    return "Geçersiz görsel dosyası — dosyanın bozuk olmadığını kontrol edin.";
  }
  if (rawMessage) return rawMessage;
  return `Yükleme başarısız (HTTP ${httpStatus}).`;
};

// ── Upload ────────────────────────────────────────────────────────────────────

/**
 * Upload a single File to Cloudinary via the unsigned upload API.
 *
 * @param {File}     file
 * @param {object}   [opts]
 * @param {string}   [opts.folder]       Cloudinary folder, e.g. "dekodem/projects"
 * @param {string[]} [opts.tags]         Optional tag array for asset organisation
 * @param {number}   [opts.maxSizeMB]    Override the default 5 MB limit
 * @param {function(number):void} [opts.onProgress]  Progress callback 0–100
 * @returns {Promise<string>}  Resolves with the HTTPS secure_url string
 * @throws  {Error}            Human-readable Turkish message
 */
export const uploadImageToCloudinary = (file, opts = {}) =>
  new Promise((resolve, reject) => {

    // ── Pre-flight checks ────────────────────────────────────────────────────

    if (!CLOUDINARY_CONFIG.isConfigured) {
      reject(new Error(
        "Cloudinary yapılandırması eksik — lütfen .env dosyasını kontrol edin " +
        "(REACT_APP_CLOUDINARY_CLOUD_NAME, REACT_APP_CLOUDINARY_UPLOAD_PRESET)."
      ));
      return;
    }

    if (!file) {
      reject(new Error("Lütfen bir dosya seçin."));
      return;
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      reject(new Error(
        `Desteklenmeyen dosya türü: "${file.type}". ` +
        "Yalnızca JPG, PNG ve WebP formatları kabul edilmektedir."
      ));
      return;
    }

    const maxBytes = (opts.maxSizeMB ?? MAX_UPLOAD_SIZE_MB) * 1024 * 1024;
    if (file.size > maxBytes) {
      const sizeMB = (file.size / 1024 / 1024).toFixed(1);
      reject(new Error(
        `Dosya boyutu (${sizeMB} MB) izin verilen limiti ` +
        `(${opts.maxSizeMB ?? MAX_UPLOAD_SIZE_MB} MB) aşıyor.`
      ));
      return;
    }

    // ── Build form data ──────────────────────────────────────────────────────

    const formData = new FormData();
    formData.append("file",           file);
    formData.append("upload_preset",  CLOUDINARY_CONFIG.uploadPreset);

    if (opts.folder) {
      formData.append("folder", opts.folder);
    }
    if (opts.tags) {
      formData.append(
        "tags",
        Array.isArray(opts.tags) ? opts.tags.join(",") : opts.tags
      );
    }

    // ── XHR — enables progress reporting ────────────────────────────────────

    const xhr = new XMLHttpRequest();

    if (typeof opts.onProgress === "function") {
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          opts.onProgress(Math.round((e.loaded / e.total) * 100));
        }
      });
    }

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          if (data.secure_url) {
            resolve(data.secure_url);
          } else {
            reject(new Error("Cloudinary yanıtında URL bulunamadı."));
          }
        } catch {
          reject(new Error("Cloudinary yanıtı ayrıştırılamadı."));
        }
      } else {
        let rawMsg = "";
        try {
          const err = JSON.parse(xhr.responseText);
          rawMsg = err?.error?.message || "";
        } catch { /* ignore */ }
        reject(new Error(
          _mapCloudinaryError(rawMsg, xhr.status, CLOUDINARY_CONFIG.uploadPreset)
        ));
      }
    });

    xhr.addEventListener("error",   () => reject(new Error("Ağ hatası — yükleme tamamlanamadı.")));
    xhr.addEventListener("abort",   () => reject(new Error("Yükleme iptal edildi.")));
    xhr.addEventListener("timeout", () => reject(new Error("Yükleme zaman aşımına uğradı (60 sn).")));

    xhr.timeout = 60_000;
    xhr.open("POST", CLOUDINARY_CONFIG.uploadUrl);
    xhr.send(formData);
  });

// ── Logo upload — Zero-Credential Unsigned Flow ───────────────────────────────

/**
 * uploadLogo — Cloudinary unsigned upload, strictly zero-credential.
 *
 * WHY credentials are stripped
 * ─────────────────────────────────────────────────────────────────────────────
 * Cloudinary's unsigned upload endpoint authenticates the request via the
 * upload_preset alone.  When an upload preset is set to "Unsigned" in the
 * Cloudinary Dashboard, appending api_key, api_secret, signature, or timestamp
 * to the FormData causes the server to attempt signed-upload validation — which
 * then fails with "Unknown API Key" because the preset was never registered for
 * signed use.  The fix is a zero-payload: only `file` + `upload_preset`.
 * Content-Type is intentionally NOT set; the browser sets it automatically to
 * multipart/form-data with the correct boundary when the body is a FormData.
 *
 * FormData audit — exactly two keys, nothing else:
 *   ✔  file          — the File / Blob to upload
 *   ✔  upload_preset — "dekodem" (unsigned preset, Cloudinary Dashboard)
 *   ✘  api_key       — REMOVED (triggers signed-flow validation)
 *   ✘  api_secret    — REMOVED (must never appear in client-side code)
 *   ✘  signature     — REMOVED (only valid for server-signed requests)
 *   ✘  timestamp     — REMOVED (only valid for server-signed requests)
 *
 * @param {File|Blob} file
 * @returns {Promise<string>}  Resolves with the HTTPS secure_url string
 * @throws  {Error}            Descriptive error on config failure or API rejection
 */
export const uploadLogo = async (file) => {
  // ── Environment guards ───────────────────────────────────────────────────────
  // Both variables are injected at build time by CRA. If either is absent the
  // dev server must be restarted after editing .env for the values to be picked
  // up — React does NOT hot-reload environment variables.
  const cloudName    = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName) {
    console.error(
      "[uploadLogo] REACT_APP_CLOUDINARY_CLOUD_NAME is not defined.\n" +
      "1. Add it to .env  2. Kill the dev server  3. Run `npm start` again."
    );
    throw new Error(
      "Cloudinary yapılandırması eksik — REACT_APP_CLOUDINARY_CLOUD_NAME tanımlı değil."
    );
  }

  if (!uploadPreset) {
    console.error(
      "[uploadLogo] REACT_APP_CLOUDINARY_UPLOAD_PRESET is not defined.\n" +
      "1. Add it to .env  2. Kill the dev server  3. Run `npm start` again.\n" +
      "The preset must be set to Unsigned in the Cloudinary Dashboard:\n" +
      "  Settings → Upload → Upload presets → Signing mode: Unsigned"
    );
    throw new Error(
      "Cloudinary yapılandırması eksik — REACT_APP_CLOUDINARY_UPLOAD_PRESET tanımlı değil."
    );
  }

  if (!file) {
    throw new Error("Yüklenecek dosya bulunamadı.");
  }

  // ── Zero-credential payload ──────────────────────────────────────────────────
  // Strictly two keys only. Do NOT append api_key, api_secret, signature,
  // or timestamp — see JSDoc above for the technical reason.
  const formData = new FormData();
  formData.append("file",          file);
  formData.append("upload_preset", uploadPreset); // read from REACT_APP_CLOUDINARY_UPLOAD_PRESET
  // Content-Type header is deliberately omitted from the fetch options so the
  // browser can set multipart/form-data with the correct boundary automatically.

  // ── Request ──────────────────────────────────────────────────────────────────
  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  let response;
  try {
    response = await fetch(endpoint, { method: "POST", body: formData });
  } catch {
    throw new Error(
      "Ağ hatası — logo yüklenemedi. İnternet bağlantınızı kontrol edin."
    );
  }

  // ── Response handling ────────────────────────────────────────────────────────
  // Always parse the JSON body first so we can surface Cloudinary's descriptive
  // error message instead of a raw HTTP status code.
  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error(`Cloudinary yanıtı ayrıştırılamadı (HTTP ${response.status}).`);
  }

  if (!response.ok) {
    // Cloudinary error shape: { error: { message: "..." } }
    const rawMsg = data?.error?.message ?? "";
    throw new Error(_mapCloudinaryError(rawMsg, response.status, "dekodem"));
  }

  if (!data.secure_url) {
    throw new Error("Cloudinary yanıtında güvenli URL bulunamadı.");
  }

  return data.secure_url;
};

// ── URL transformation ────────────────────────────────────────────────────────

/**
 * Crop modes that DO NOT crop the source — applying an aspect ratio to these
 * would be a no-op (or worse, produce inconsistent output across CDN edges),
 * so we skip the `ar_*` directive when one of these is in effect.
 */
const NON_CROPPING_MODES = new Set(["limit", "fit", "scale", "mfit", "lfit"]);

/**
 * Insert Cloudinary transformation parameters into a stored secure_url.
 * Non-Cloudinary URLs are returned unchanged.
 *
 * Luxury-grid defaults
 * ─────────────────────────────────────────────────────────────────────────────
 * To support the Dekodem Yapı "Equalizer" card grid, this builder now enforces
 * a strict 3:2 aspect ratio and high-fidelity output by default:
 *   - c_fill            crop to fill the requested frame
 *   - ar_3:2            uniform aspect ratio — every card image lands identical
 *   - g_auto            content-aware gravity so subjects stay centered
 *   - q_auto:best       luxury-tier perceptual quality
 *   - f_auto, dpr_auto  modern format + retina/HiDPI delivery
 *
 * Opt-outs (kept for hero, blog covers, lightbox originals, navbar logos):
 *   - Pass `crop: 'limit' | 'fit' | 'scale'`  → aspect ratio is skipped
 *   - Pass explicit `height`                  → overrides ar with exact h_
 *   - Pass `aspectRatio: null`                → suppresses the ar_ directive
 *
 * @param {string} url
 * @param {object} [opts]
 * @param {number}              [opts.width=1200]
 * @param {number}              [opts.height]              omit to let ar_ derive height
 * @param {string|null}         [opts.aspectRatio='3:2']   e.g. '3:2', '16:9', '1:1', or null
 * @param {string}              [opts.crop='fill']         Cloudinary c_ mode
 * @param {string}              [opts.gravity='auto']      Cloudinary g_ mode
 * @param {"good"|"best"|"eco"|"low"|number} [opts.quality='best']  q_auto tier or numeric
 * @returns {string}
 */
export const buildCloudinaryUrl = (url, opts = {}) => {
  if (!url || !url.includes("cloudinary.com")) return url;

  const {
    width        = 1200,
    height,
    aspectRatio  = "3:2",
    crop         = "fill",
    gravity      = "auto",
    quality      = "best",
  } = opts;

  const isCropping = !NON_CROPPING_MODES.has(crop);
  // Only emit ar_ when it is actually meaningful: a cropping mode, no explicit
  // height, and the caller hasn't suppressed it.
  const applyAspectRatio = isCropping && !height && Boolean(aspectRatio);

  const qualityToken = typeof quality === "number"
    ? `q_${quality}`
    : `q_auto:${quality}`;

  const transforms = [
    "f_auto",                                         // modern formats (WebP / AVIF)
    qualityToken,                                     // luxury-tier perceptual quality
    `c_${crop}`,
    ...(applyAspectRatio ? [`ar_${aspectRatio}`] : []),
    ...(isCropping ? [`g_${gravity}`] : []),          // content-aware gravity only when cropping
    `w_${width}`,
    ...(height ? [`h_${height}`] : []),
    "dpr_auto",                                       // retina / HiDPI displays
  ].join(",");

  // Insert after /upload/ — works with or without a version segment (v123456/)
  return url.replace("/upload/", `/upload/${transforms}/`);
};

// ── Public ID extraction ──────────────────────────────────────────────────────

/**
 * Extract the Cloudinary public_id from a secure_url.
 * Used for deletion, transformation, and tagging workflows.
 *
 * Example:
 *   "https://res.cloudinary.com/demo/image/upload/v1234/dekodem/projects/abc.jpg"
 *   → "dekodem/projects/abc"
 *
 * @param {string} url
 * @returns {string|null}
 */
export const getPublicIdFromUrl = (url) => {
  if (!url || !url.includes("cloudinary.com")) return null;
  // Strip version segment (v\d+/) if present, then strip extension
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-z]{2,4})?$/i);
  return match ? match[1] : null;
};
