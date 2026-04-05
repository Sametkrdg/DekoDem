import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import { useSite } from '../context/SiteContext';

const MainLayout = ({ children }) => {
    const { settings } = useSite();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            {/* ── Skip navigation link (visible on keyboard focus) ── */}
            <Box
                component="a"
                href="#main-content"
                sx={{
                    position: "absolute",
                    top: "-100px",
                    left: 16,
                    zIndex: 9999,
                    bgcolor: "primary.main",
                    color: "#fff",
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    fontWeight: 700,
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    transition: "top 0.15s ease",
                    "&:focus": {
                        top: "16px",
                        outline: "3px solid #fff",
                        outlineOffset: "2px",
                    },
                }}
            >
                İçeriğe geç
            </Box>

            <Navbar settings={settings} />

            <Box component="main" id="main-content" sx={{ flexGrow: 1 }}>
                <PageTransition>
                    {children}
                </PageTransition>
            </Box>

            <Footer />
        </Box>
    );
};

export default MainLayout;
