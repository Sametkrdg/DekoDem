import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress, Button, Grid, Paper, Breadcrumbs } from '@mui/material';
import { getBranchById } from '../services/firestore';
import { Home, NavigateNext, Phone, Email, LocationOn } from '@mui/icons-material';

const BranchDetail = () => {
    const { id } = useParams();
    const [branch, setBranch] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBranch = async () => {
            try {
                const data = await getBranchById(id);
                setBranch(data);
            } catch (error) {
                console.error("Şube detayı yüklenirken hata:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBranch();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!branch) {
        return (
            <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Şube Bulunamadı
                </Typography>
                <Button variant="contained" component={Link} to="/subeler">
                    Şubelere Dön
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 4 }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}>
                    <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                    Anasayfa
                </Link>
                <Link to="/subeler" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Şubelerimiz
                </Link>
                <Typography color="text.primary">{branch.name}</Typography>
            </Breadcrumbs>

            <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                {branch.name}
            </Typography>

            <Grid container spacing={4} sx={{ mt: 2 }}>
                <Grid item xs={12} md={5}>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                            İletişim Bilgileri
                        </Typography>

                        <Box sx={{ display: 'flex', mb: 3 }}>
                            <LocationOn color="primary" sx={{ mr: 2, mt: 0.5 }} />
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Adres
                                </Typography>
                                <Typography variant="body1">
                                    {branch.address}
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', mb: 3 }}>
                            <Phone color="primary" sx={{ mr: 2, mt: 0.5 }} />
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Telefon
                                </Typography>
                                <Typography variant="body1">
                                    {branch.phone}
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', mb: 3 }}>
                            <Email color="primary" sx={{ mr: 2, mt: 0.5 }} />
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    E-posta
                                </Typography>
                                <Typography variant="body1">
                                    {branch.email}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={7}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 0,
                            borderRadius: 2,
                            height: '400px',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: '#f0f0f0'
                        }}
                    >
                        {/* Map Placeholder */}
                        <Box textAlign="center">
                            <LocationOn sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.5 }} />
                            <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                                Harita Görünümü
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                (Google Maps entegrasyonu gelecek)
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default BranchDetail;
