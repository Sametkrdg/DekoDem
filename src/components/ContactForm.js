// components/ContactForm.js
import React, { useEffect, useRef, useState } from "react";
import { Box, TextField, MenuItem, Alert, CircularProgress } from "@mui/material";
import { Send } from "@mui/icons-material";
import emailjs from "@emailjs/browser";
import {
  ServiceCard,
  SectionTitle,
  CTAButton,
} from "../styles/StyledComponents";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const resetTimerRef = useRef(null);

  const subjects = [
    "Genel Bilgi",
    "Proje Teklifi",
    "Teknik Destek",
    "İş Birliği",
    "Diğer",
  ];

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      );
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === "email" && value.trim() !== "") {
      if (!validateEmail(value)) {
        setFieldErrors((prev) => ({ ...prev, email: "Geçerli bir e-posta adresi giriniz." }));
      } else {
        setFieldErrors((prev) => ({ ...prev, email: "" }));
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    if (name === "phone") {
      // Remove any character that is not a digit or the plus sign
      sanitizedValue = value.replace(/[^\d+]/g, "");
    }

    setFormData({
      ...formData,
      [name]: sanitizedValue,
    });

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");
    setShowSuccess(false);
    setShowError(false);

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setValidationError("Lütfen zorunlu tüm alanları doldurun.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setValidationError("Lütfen geçerli bir e-posta adresi girin.");
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,          // Maps to {{name}}
          from_name: formData.name,     // Maps to {{from_name}}
          from_email: formData.email,   // Maps to {{from_email}}
          reply_to: formData.email,     // Fallback standard usage
          phone: formData.phone,        // Maps to {{phone}} (User needs to add this to template)
          subject: formData.subject,    // Maps to {{subject}} (User needs to add this to template)
          message: formData.message,    // Maps to {{message}}
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      setShowSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
      resetTimerRef.current = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(
    () => () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    },
    []
  );

  return (
    <ServiceCard>
      <SectionTitle
        variant="h5"
        sx={{
          fontSize: "1.5rem",
          marginBottom: "30px",
          color: "#2c3e50",
          textAlign: "center",
        }}
      >
        Bize Ulaşın
      </SectionTitle>

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
        <Alert
          severity="success"
          sx={{
            marginBottom: "25px",
            "& .MuiAlert-message": {
              fontWeight: "500",
            },
          }}
        >
          Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <TextField
          name="name"
          label="Ad Soyad"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "primary.main",
            },
          }}
        />

        <TextField
          name="email"
          label="E-posta"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!fieldErrors.email}
          helperText={fieldErrors.email}
          required
          fullWidth
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "primary.main",
            },
          }}
        />

        <TextField
          name="phone"
          label="Telefon"
          value={formData.phone}
          onChange={handleChange}
          inputProps={{ inputMode: "numeric" }}
          fullWidth
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "primary.main",
            },
          }}
        />

        <TextField
          name="subject"
          label="Konu"
          select
          value={formData.subject}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          SelectProps={{
            displayEmpty: true,
            renderValue: (value) => value || "Konu Seçin",
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "primary.main",
            },
          }}
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
          label="Mesajınız"
          multiline
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "primary.main",
            },
          }}
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

export default ContactForm;
