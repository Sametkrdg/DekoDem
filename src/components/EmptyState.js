import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { InboxOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

/**
 * Reusable empty-state placeholder.
 *
 * Props:
 *  icon        — MUI SvgIcon element (defaults to InboxOutlined)
 *  title       — heading text
 *  description — subtext
 *  action      — { label, to, href, onClick } — renders a CTA button
 *  sx          — extra sx on the wrapper
 */
const EmptyState = ({
  icon,
  title = "Henüz içerik yok",
  description,
  action,
  sx = {},
}) => {
  const Icon = icon || <InboxOutlined sx={{ fontSize: 64, color: "text.disabled" }} />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        py: 12,
        px: 3,
        border: "2px dashed",
        borderColor: "divider",
        borderRadius: 3,
        ...sx,
      }}
    >
      {icon ? React.cloneElement(icon, { sx: { fontSize: 64, color: "text.disabled", ...icon.props?.sx } }) : Icon}

      <Typography variant="h6" fontWeight={700} sx={{ mt: 2, mb: 1 }}>
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 380, mb: action ? 3 : 0, lineHeight: 1.7 }}>
          {description}
        </Typography>
      )}

      {action && (
        action.to ? (
          <Button variant="contained" component={Link} to={action.to} sx={{ fontWeight: 600 }}>
            {action.label}
          </Button>
        ) : action.href ? (
          <Button variant="contained" component="a" href={action.href} sx={{ fontWeight: 600 }}>
            {action.label}
          </Button>
        ) : (
          <Button variant="contained" onClick={action.onClick} sx={{ fontWeight: 600 }}>
            {action.label}
          </Button>
        )
      )}
    </Box>
  );
};

export default EmptyState;
