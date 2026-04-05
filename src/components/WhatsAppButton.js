import React, { useState } from "react";
import { Box, Fab, Tooltip, Collapse, Paper, Typography, IconButton } from "@mui/material";
import { Close, WhatsApp } from "@mui/icons-material";
import { useSite } from "../context/SiteContext";

const WhatsAppButton = () => {
  const [open, setOpen] = useState(false);
  const { settings } = useSite();

  // Pull phone from settings or fall back to the default number
  const rawPhone = settings?.whatsappPhone || "905374667172";
  const phone = rawPhone.replace(/\D/g, "");
  const waUrl = `https://wa.me/${phone}`;
  const prefilledText = encodeURIComponent(
    "Merhaba, DEKODEM hakkında bilgi almak istiyorum."
  );

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: { xs: 80, sm: 96 }, // sits above BackToTop
        left: { xs: 16, sm: 32 },
        zIndex: 1200,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 1,
      }}
    >
      {/* Popup bubble */}
      <Collapse in={open} unmountOnExit>
        <Paper
          elevation={4}
          sx={{
            p: 2,
            borderRadius: 2,
            maxWidth: 240,
            mb: 0.5,
            position: "relative",
          }}
        >
          <IconButton
            size="small"
            onClick={() => setOpen(false)}
            aria-label="Kapat"
            sx={{ position: "absolute", top: 4, right: 4 }}
          >
            <Close fontSize="small" />
          </IconButton>

          <Typography variant="subtitle2" fontWeight={700} sx={{ pr: 3, mb: 0.5 }}>
            WhatsApp ile Yazın
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1.5 }}>
            Sorularınızı hızlıca yanıtlayalım!
          </Typography>

          <Box
            component="a"
            href={`${waUrl}?text=${prefilledText}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "#25D366",
              color: "#fff",
              borderRadius: 2,
              px: 2,
              py: 1,
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.875rem",
              transition: "opacity 0.2s",
              "&:hover": { opacity: 0.88 },
            }}
          >
            <WhatsApp fontSize="small" />
            Sohbet Başlat
          </Box>
        </Paper>
      </Collapse>

      {/* Main FAB */}
      <Tooltip title={open ? "" : "WhatsApp ile iletişim"} placement="right">
        <Fab
          onClick={() => setOpen((p) => !p)}
          aria-label="WhatsApp ile iletişime geç"
          aria-expanded={open}
          sx={{
            bgcolor: "#25D366",
            color: "#fff",
            width: 56,
            height: 56,
            "&:hover": { bgcolor: "#1DA851" },
            boxShadow: "0 4px 20px rgba(37,211,102,0.5)",
          }}
        >
          {open ? <Close /> : <WhatsApp sx={{ fontSize: 30 }} />}
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default WhatsAppButton;
