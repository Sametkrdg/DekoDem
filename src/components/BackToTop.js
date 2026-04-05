import React, { useState, useEffect } from "react";
import { Fab, Zoom, Tooltip } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";

const SHOW_THRESHOLD = 320; // px scrolled before button appears

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <Zoom in={visible}>
      <Tooltip title="Yukarı çık" placement="left">
        <Fab
          onClick={handleClick}
          size="medium"
          aria-label="Sayfanın başına dön"
          sx={{
            position: "fixed",
            bottom: { xs: 80, sm: 32 }, // lifted on mobile to stay above cookie banner
            right: { xs: 16, sm: 32 },
            zIndex: 1200,
            bgcolor: "primary.main",
            color: "#fff",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          <KeyboardArrowUp />
        </Fab>
      </Tooltip>
    </Zoom>
  );
};

export default BackToTop;
