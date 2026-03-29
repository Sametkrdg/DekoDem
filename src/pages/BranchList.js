import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CircularProgress, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { getBranches } from '../services/firestore';
import { Phone, Email, LocationOn } from '@mui/icons-material';

const BranchList = () => {
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const data = await getBranches();
                setBranches(data);
            } catch (error) {
                console.error("Şubeler yüklenirken hata:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBranches();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
                Şubelerimiz
            </Typography>

            <Grid container spacing={4}>
                {branches.map((branch) => (
                    <Grid item key={branch.id} xs={12} md={6}>
                        <Card sx={{ height: '100%', p: 2 }}>
                            <CardContent>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    {branch.name}
                                </Typography>

                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 3 }}>
                                    <LocationOn color="primary" sx={{ mr: 2 }} />
                                    <Typography variant="body1">
                                        {branch.address}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Phone color="primary" sx={{ mr: 2 }} />
                                    <Typography variant="body1">
                                        {branch.phone}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <Email color="primary" sx={{ mr: 2 }} />
                                    <Typography variant="body1">
                                        {branch.email}
                                    </Typography>
                                </Box>

                                <Button
                                    component={Link}
                                    to={`/subeler/${branch.id}`}
                                    variant="outlined"
                                    fullWidth
                                >
                                    Detayları Gör
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}

                {branches.length === 0 && (
                    <Grid item xs={12}>
                        <Typography variant="h6" color="text.secondary" align="center">
                            Henüz şube bilgisi girilmemiştir.
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default BranchList;
