import React from "react";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { Home, ArrowBack, Construction } from "@mui/icons-material";

const NotFound = () => {
  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f8fafc",
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: "center", py: 8 }}>
          {/* Icon */}
          <Construction
            sx={{ fontSize: 80, color: "primary.main", mb: 2, opacity: 0.8 }}
          />

          {/* 404 number */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "6rem", md: "9rem" },
              fontWeight: 900,
              lineHeight: 1,
              color: "primary.main",
              opacity: 0.15,
              mb: 0,
            }}
          >
            404
          </Typography>

          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 700, mb: 2, mt: -3 }}
          >
            Sayfa Bulunamadı
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 5, lineHeight: 1.8 }}
          >
            Aradığınız sayfa mevcut değil, taşınmış ya da geçici olarak
            kullanılamıyor olabilir. Ana sayfaya dönerek devam edebilirsiniz.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/"
              startIcon={<Home />}
              sx={{ fontWeight: 600 }}
            >
              Ana Sayfaya Dön
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/iletisim"
              startIcon={<ArrowBack />}
              sx={{ fontWeight: 600 }}
            >
              Bize Ulaşın
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;
