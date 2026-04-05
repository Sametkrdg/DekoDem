// components/ContactForm.js
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Box, TextField, MenuItem, Alert, CircularProgress } from "@mui/material";
import { Send } from "@mui/icons-material";
import emailjs from "@emailjs/browser";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import {
  ServiceCard,
  SectionTitle,
  CTAButton,
} from "../styles/StyledComponents";

// ─── Rate limiting ─────────────────────────────────────────────────────────────
const RATE_LIMIT_KEY = "sdyapi_form_last_submit";
const RATE_LIMIT_SECONDS = 60;

const isRateLimited = () => {
  const last = localStorage.getItem(RATE_LIMIT_KEY);
  if (!last) return false;
  return (Date.now() - parseInt(last, 10)) < RATE_LIMIT_SECONDS * 1000;
};

const recordSubmission = () => {
  localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
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

// ─── Inner form (needs to be inside GoogleReCaptchaProvider) ──────────────────
const ContactFormInner = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const resetTimerRef = useRef(null);

  const { executeRecaptcha } = useGoogleReCaptcha();
  const recaptchaEnabled = Boolean(process.env.REACT_APP_RECAPTCHA_SITE_KEY);

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
      setShowSuccess(false);
      setShowError(false);

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

      try {
        // reCAPTCHA v3 token (skipped gracefully if key not configured)
        let recaptchaToken = "";
        if (recaptchaEnabled && executeRecaptcha) {
          recaptchaToken = await executeRecaptcha("contact_form");
        }

        await emailjs.send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
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
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        );

        recordSubmission();
        setShowSuccess(true);
        setFormData(INITIAL_FORM);

        if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
        resetTimerRef.current = setTimeout(() => setShowSuccess(false), 5000);
      } catch (error) {
        console.error("EmailJS Error:", error);
        setShowError(true);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, executeRecaptcha, recaptchaEnabled]
  );

  useEffect(
    () => () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    },
    []
  );

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

      {/* aria-live="polite" announces status changes to screen readers */}
      <div aria-live="polite" aria-atomic="true">
        {validationError && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            {validationError}
          </Alert>
        )}

        {showError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            Şu an teknik bir sorun var, lütfen bizi arayın.
          </Alert>
        )}

        {showSuccess && (
          <Alert severity="success" sx={{ mb: 3, "& .MuiAlert-message": { fontWeight: 500 } }}>
            Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
          </Alert>
        )}
      </div>

      <Box
        component="form"
        onSubmit={handleSubmit}
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
    </ServiceCard>
  );
};

// ─── Public export — wraps the form in reCAPTCHA provider ─────────────────────
const ContactForm = () => {
  const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    // reCAPTCHA not configured yet — render form without it
    return (
      <GoogleReCaptchaProvider reCaptchaKey="placeholder" useEnterprise={false}>
        <ContactFormInner />
      </GoogleReCaptchaProvider>
    );
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
      <ContactFormInner />
    </GoogleReCaptchaProvider>
  );
};

export default ContactForm;
