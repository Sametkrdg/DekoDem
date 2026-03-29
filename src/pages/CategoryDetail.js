import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress, Button, Breadcrumbs } from '@mui/material';
import { getCategoryBySlug } from '../services/firestore';
import { Home, NavigateNext } from '@mui/icons-material';

const CategoryDetail = () => {
    const { slug } = useParams();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const data = await getCategoryBySlug(slug);
                setCategory(data);
            } catch (error) {
                console.error("Kategori detayı yüklenirken hata:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [slug]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!category) {
        return (
            <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Kategori Bulunamadı
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    Aradığınız kategori mevcut değil veya kaldırılmış olabilir.
                </Typography>
                <Button variant="contained" component={Link} to="/kategoriler">
                    Kategorilere Dön
                </Button>
            </Container>
        );
    }

    return (
        <React.Fragment>
            {/* Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    height: '400px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    overflow: 'hidden',
                }}
            >
                <Box
                    component="img"
                    src={category.coverImageUrl || 'https://source.unsplash.com/random/1600x900?modern-building'}
                    alt={category.name}
                    fetchpriority="high"
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 0,
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7))',
                        zIndex: 1,
                    }}
                />
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                    <Typography variant="h2" component="h1" fontWeight="bold" textAlign="center">
                        {category.name}
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg" component="section" sx={{ py: 6 }}>
                <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 4 }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}>
                        <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                        Anasayfa
                    </Link>
                    <Link to="/kategoriler" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Faaliyet Alanları
                    </Link>
                    <Typography color="text.primary">{category.name}</Typography>
                </Breadcrumbs>

                <Box sx={{ typography: 'body1', fontSize: '1.1rem', lineHeight: 1.8 }}>
                    {/* Description could be markdown in future, simple text for now */}
                    {category.description}
                </Box>

                {/* Placeholder for future projects in this category */}
                <Box sx={{ mt: 8 }}>
                    <Typography variant="h4" gutterBottom>
                        Bu Alandaki Projelerimiz
                    </Typography>
                    <Typography color="text.secondary">
                        Yakında eklenecek...
                    </Typography>
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default CategoryDetail;
