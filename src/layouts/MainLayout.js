import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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
            <Navbar settings={settings} />

            <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
            </Box>

            <Footer settings={settings} />
        </Box>
    );
};

export default MainLayout;
