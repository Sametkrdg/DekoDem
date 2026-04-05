import { styled } from "@mui/material/styles";
import { Box, Card, CardContent, Typography } from "@mui/material";

export const AdminCard = styled(Card)(() => ({
  marginBottom: "24px",
  borderRadius: "16px",
  boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
  transition: "box-shadow 0.2s ease",
  "&:hover": {
    boxShadow: "0 8px 32px rgba(0,0,0,0.11)",
  },
}));

export const FormSection = styled(CardContent)(() => ({
  padding: "32px",
  "&:last-child": { paddingBottom: "32px" },
}));

export const SectionHeader = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "24px",
  gap: "12px",
}));

export const SectionTitle = styled(Typography)(() => ({
  fontSize: "1.25rem",
  fontWeight: 700,
}));

/** Convert a Turkish/special string to a URL-safe slug. */
export const slugify = (value = "") =>
  value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
