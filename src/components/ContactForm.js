// components/ContactForm.js
//
// Contact form — EmailJS delivery, optional reCAPTCHA v3 verification.
//
// Required env vars (loaded at build time by CRA):
//   REACT_APP_EMAILJS_SERVICE_ID
//   REACT_APP_EMAILJS_TEMPLATE_ID
//   REACT_APP_EMAILJS_PUBLIC_KEY
//   REACT_APP_RECAPTCHA_SITE_KEY   (optional but recommended)
//
// If the reCAPTCHA "invalid domain for site key" error appears in production:
//   1. The site key must be created in Google reCAPTCHA admin
//      (https://www.google.com/recaptcha/admin) as a v3 key.
//   2. The exact production domain (e.g. dekodem.com.tr) MUST be listed in the
//      key's allowed domains — including www.dekodem.com.tr if used.
//   3. After updating the admin console, hard-refresh; no rebuild is needed.
//   4. The .env file then needs the matching site key. After editing .env you
//      MUST restart `npm start` — CRA does not hot-reload env vars.

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Alert,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import emailjs from "@emailjs/browser";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import {
  ServiceCard,
  SectionTitle,
  CTAButton,
} from "../styles/StyledComponents";

// ─── Env vars (resolved once at module load) ───────────────────────────────────
const EMAILJS_SERVICE_ID  = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const RECAPTCHA_SITE_KEY  = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

const EMAILJS_CONFIGURED  = Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);
const RECAPTCHA_CONFIGURED = Boolean(RECAPTCHA_SITE_KEY);

// Surface misconfiguration loudly during development so it doesn't manifest
// as a cryptic Google error in production.
if (!EMAILJS_CONFIGURED) {
  // eslint-disable-next-line no-console
  console.warn(
    "[ContactForm] EmailJS environment variables are missing. " +
    "Submissions will fail until REACT_APP_EMAILJS_SERVICE_ID, " +
    "REACT_APP_EMAILJS_TEMPLATE_ID, and REACT_APP_EMAILJS_PUBLIC_KEY " +
    "are set in .env (and the dev server restarted)."
  );
}
if (!RECAPTCHA_CONFIGURED) {
  // eslint-disable-next-line no-console
  console.warn(
    "[ContactForm] REACT_APP_RECAPTCHA_SITE_KEY not set — submitting without reCAPTCHA verification."
  );
}

// ─── Rate limiting ─────────────────────────────────────────────────────────────
const RATE_LIMIT_KEY = "sdyapi_form_last_submit";
const RATE_LIMIT_SECONDS = 60;

const isRateLimited = () => {
  try {
    const last = localStorage.getItem(RATE_LIMIT_KEY);
    if (!last) return false;
    return (Date.now() - parseInt(last, 10)) < RATE_LIMIT_SECONDS * 1000;
  } catch {
    return false;
  }
};

const recordSubmission = () => {
  try {
    localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
  } catch { /* storage blocked */ }
};

// ─── Form fields config ────────────────────────────────────────────────────────
const subjects = [
  "Genel Bilgi",
  "Proje Teklifi",
  "Teknik Destek",
  "İş Birliği",
  "Diğer",
];

const INITIAL_FORM = { name: "", email: "", phone: "", subject: "", message: "" };

const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

// ─── Inner form (lives inside GoogleReCaptchaProvider when reCAPTCHA is on) ───
const ContactFormInner = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  // Snackbar feedback: severity ∈ "success" | "error" | "warning"
  const [snack, setSnack] = useState({ open: false, severity: "success", message: "" });
  const resetTimerRef = useRef(null);

  // useGoogleReCaptcha returns { executeRecaptcha: undefined } when no provider
  // is in the tree — safe to call from either branch.
  const { executeRecaptcha } = useGoogleReCaptcha();

  const showSnack = useCallback((severity, message) => {
    setSnack({ open: true, severity, message });
  }, []);

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === "email" && value.trim() !== "") {
      setFieldErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? "" : "Geçerli bir e-posta adresi giriniz.",
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitized = name === "phone" ? value.replace(/[^\d+]/g, "") : value;
    setFormData((prev) => ({ ...prev, [name]: sanitized }));
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setValidationError("");

      // Hard guard — EmailJS env not configured
      if (!EMAILJS_CONFIGURED) {
        showSnack(
          "error",
          "Form servisi şu anda yapılandırılmamış. Lütfen telefon veya e-posta ile iletişime geçin."
        );
        return;
      }

      // Rate limiting
      if (isRateLimited()) {
        setValidationError(
          `Çok fazla istek gönderildi. Lütfen ${RATE_LIMIT_SECONDS} saniye bekleyip tekrar deneyin.`
        );
        return;
      }

      // Field validation
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        setValidationError("Lütfen zorunlu tüm alanları doldurun.");
        return;
      }
      if (!validateEmail(formData.email)) {
        setValidationError("Lütfen geçerli bir e-posta adresi girin.");
        return;
      }
      if (formData.name.length > 100 || formData.email.length > 254 ||
          formData.phone.length > 20  || formData.message.length > 2000) {
        setValidationError("Bir veya daha fazla alan izin verilen uzunluğu aşıyor.");
        return;
      }

      setIsSubmitting(true);

      // ── 1. reCAPTCHA v3 token (skipped if not configured) ──────────────────
      let recaptchaToken = "";
      if (RECAPTCHA_CONFIGURED) {
        if (typeof executeRecaptcha !== "function") {
          // Provider hasn't initialized — common cause: site key invalid for
          // this domain. Surface a clear message instead of silently failing.
          setIsSubmitting(false);
          showSnack(
            "error",
            "Doğrulama servisi yüklenemedi. Lütfen sayfayı yenileyin veya bizi doğrudan arayın."
          );
          // eslint-disable-next-line no-console
          console.error(
            "[ContactForm] executeRecaptcha is not a function. " +
            "Likely cause: REACT_APP_RECAPTCHA_SITE_KEY is invalid, or the " +
            "current domain is not whitelisted in the Google reCAPTCHA admin console."
          );
          return;
        }
        try {
          recaptchaToken = await executeRecaptcha("contact_form");
        } catch (recaptchaErr) {
          setIsSubmitting(false);
          showSnack(
            "error",
            "Güvenlik doğrulaması başarısız oldu. Lütfen sayfayı yenileyip tekrar deneyin."
          );
          // eslint-disable-next-line no-console
          console.error("[ContactForm] reCAPTCHA execute failed:", recaptchaErr);
          return;
        }
        if (!recaptchaToken) {
          setIsSubmitting(false);
          showSnack(
            "error",
            "Güvenlik doğrulama belirteci alınamadı. Lütfen tekrar deneyin."
          );
          return;
        }
      }

      // ── 2. EmailJS delivery ────────────────────────────────────────────────
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            name: formData.name,
            from_name: formData.name,
            from_email: formData.email,
            reply_to: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
            recaptcha_token: recaptchaToken,
          },
          EMAILJS_PUBLIC_KEY
        );

        recordSubmission();
        setFormData(INITIAL_FORM);
        showSnack(
          "success",
          "Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız."
        );

        if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("[ContactForm] EmailJS error:", error);
        showSnack(
          "error",
          "Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin veya bizi doğrudan arayın."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, executeRecaptcha, showSnack]
  );

  useEffect(
    () => () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    },
    []
  );

  const closeSnack = (_e, reason) => {
    if (reason === "clickaway") return;
    setSnack((prev) => ({ ...prev, open: false }));
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": { borderColor: "primary.main" },
      "&.Mui-focused fieldset": { borderColor: "primary.main" },
    },
    "& .MuiInputLabel-root.Mui-focused": { color: "primary.main" },
  };

  return (
    <ServiceCard>
      <SectionTitle
        variant="h5"
        sx={{ fontSize: "1.5rem", marginBottom: "30px", color: "#2c3e50", textAlign: "center" }}
      >
        Bize Ulaşın
      </SectionTitle>

      {/* Inline validation — stays visible while the user fixes the field */}
      <div aria-live="polite" aria-atomic="true">
        {validationError && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            {validationError}
          </Alert>
        )}
      </div>

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <TextField
          name="name"
          label="Ad Soyad *"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          inputProps={{ "aria-required": "true", maxLength: 100 }}
          sx={fieldSx}
        />

        <TextField
          name="email"
          label="E-posta *"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!fieldErrors.email}
          helperText={fieldErrors.email}
          required
          fullWidth
          variant="outlined"
          inputProps={{
            "aria-required": "true",
            "aria-invalid": fieldErrors.email ? "true" : undefined,
            "aria-describedby": fieldErrors.email ? "email-error" : undefined,
            maxLength: 254,
          }}
          FormHelperTextProps={{ id: "email-error" }}
          sx={fieldSx}
        />

        <TextField
          name="phone"
          label="Telefon"
          value={formData.phone}
          onChange={handleChange}
          inputProps={{ inputMode: "numeric", maxLength: 20 }}
          fullWidth
          variant="outlined"
          sx={fieldSx}
        />

        <TextField
          name="subject"
          label="Konu *"
          select
          value={formData.subject}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          SelectProps={{ displayEmpty: true, renderValue: (v) => v || "Konu Seçin" }}
          inputProps={{ "aria-required": "true" }}
          sx={fieldSx}
        >
          <MenuItem value="" disabled>
            <em>Konu Seçin</em>
          </MenuItem>
          {subjects.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          name="message"
          label="Mesajınız *"
          multiline
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          inputProps={{ "aria-required": "true", maxLength: 2000 }}
          helperText={`${formData.message.length}/2000`}
          sx={fieldSx}
        />

        <CTAButton
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <Send />}
          sx={{ alignSelf: "center", minWidth: "200px" }}
        >
          {isSubmitting ? "Gönderiliyor..." : "Mesaj Gönder"}
        </CTAButton>
      </Box>

      {/* Minimal MUI Snackbar — auto-dismisses, replaces the previous Alert blocks */}
      <Snackbar
        open={snack.open}
        autoHideDuration={snack.severity === "success" ? 5000 : 7000}
        onClose={closeSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={closeSnack}
          severity={snack.severity}
          variant="filled"
          sx={{
            borderRadius: "24px",
            boxShadow:    "none",
            fontWeight:   500,
            alignItems:   "center",
          }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </ServiceCard>
  );
};

// ─── Public export — only mounts GoogleReCaptchaProvider when the site key
// ─── is actually configured. Mounting it with a placeholder key was the root
// ─── cause of the "invalid domain for site key" error in production.
const ContactForm = () => {
  if (!RECAPTCHA_CONFIGURED) {
    return <ContactFormInner />;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={RECAPTCHA_SITE_KEY}
      scriptProps={{ async: true, defer: true, appendTo: "head" }}
    >
      <ContactFormInner />
    </GoogleReCaptchaProvider>
  );
};

export default ContactForm;
