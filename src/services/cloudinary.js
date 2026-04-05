/**
 * cloudinary.js — Image upload service
 *
 * Uses Cloudinary's unsigned upload endpoint so no server-side
 * signing proxy is required. Credentials are read exclusively from
 * REACT_APP_* environment variables — never hard-coded.
 *
 * Prerequisites (Cloudinary Dashboard):
 *   Settings → Upload → Upload presets → Add preset
 *   Signing mode: Unsigned
 *   Preset name:  dekodem_unsigned  (must match REACT_APP_CLOUDINARY_UPLOAD_PRESET)
 */

const CLOUD_NAME    = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

if (!CLOUD_NAME || !UPLOAD_PRESET) {
  console.warn(
    "[Cloudinary] REACT_APP_CLOUDINARY_CLOUD_NAME or " +
    "REACT_APP_CLOUDINARY_UPLOAD_PRESET is not set in .env"
  );
}

const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

/**
 * Upload a single File object to Cloudinary.
 *
 * @param {File}   file           - The File from <input type="file" />
 * @param {object} [opts]
 * @param {string} [opts.folder]  - Optional Cloudinary folder (e.g. "activities")
 * @param {function(number):void} [opts.onProgress] - Progress callback 0-100
 * @returns {Promise<string>}     - Resolves with the secure HTTPS URL
 * @throws  {Error}               - Descriptive message shown via showSnackbar
 */
export const uploadImageToCloudinary = (file, opts = {}) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("Lütfen bir dosya seçin."));
      return;
    }

    const MAX_MB = 10;
    if (file.size > MAX_MB * 1024 * 1024) {
      reject(new Error(`Dosya boyutu ${MAX_MB} MB'ı geçemez.`));
      return;
    }

    if (!file.type.startsWith("image/")) {
      reject(new Error("Yalnızca görsel dosyalar yüklenebilir."));
      return;
    }

    const formData = new FormData();
    formData.append("file",           file);
    formData.append("upload_preset",  UPLOAD_PRESET);
    if (opts.folder) {
      formData.append("folder", opts.folder);
    }

    // Use XMLHttpRequest so we can report upload progress
    const xhr = new XMLHttpRequest();

    if (opts.onProgress) {
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
          reject(new Error("Cloudinary yanıtı işlenemedi."));
        }
      } else {
        let message = `Yükleme başarısız (HTTP ${xhr.status}).`;
        try {
          const err = JSON.parse(xhr.responseText);
          if (err?.error?.message) message = err.error.message;
        } catch { /* ignore */ }
        reject(new Error(message));
      }
    });

    xhr.addEventListener("error",  () => reject(new Error("Ağ hatası — yükleme tamamlanamadı.")));
    xhr.addEventListener("abort",  () => reject(new Error("Yükleme iptal edildi.")));
    xhr.addEventListener("timeout",() => reject(new Error("Yükleme zaman aşımına uğradı.")));

    xhr.timeout = 60_000; // 60 s
    xhr.open("POST", UPLOAD_URL);
    xhr.send(formData);
  });
};

/**
 * Build an optimised Cloudinary delivery URL from any stored secure_url.
 *
 * Inserts transformation parameters directly into the URL path so no
 * extra SDK dependency is needed.
 *
 * @param {string} url        - Full https://res.cloudinary.com/... URL
 * @param {object} [opts]
 * @param {number} [opts.width=800]
 * @param {number} [opts.height]   - omit for auto height
 * @param {"fill"|"crop"|"scale"|"fit"} [opts.crop="fill"]
 * @returns {string}          - Transformed URL
 */
export const buildCloudinaryUrl = (url, opts = {}) => {
  if (!url || !url.includes("cloudinary.com")) return url;

  const { width = 800, height, crop = "fill" } = opts;

  const transforms = [
    `f_auto`,           // auto format (WebP/AVIF where supported)
    `q_auto:good`,      // adaptive quality
    `c_${crop}`,
    `w_${width}`,
    ...(height ? [`h_${height}`] : []),
    `dpr_auto`,         // retina support
  ].join(",");

  // Insert after "/upload/" — preserving any existing version segment
  return url.replace("/upload/", `/upload/${transforms}/`);
};
