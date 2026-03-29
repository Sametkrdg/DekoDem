import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, CardActionArea, CircularProgress, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/firestore';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error("Kategoriler yüklenirken hata:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
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
                Faaliyet Alanlarımız
            </Typography>

            <Grid container spacing={4}>
                {categories.map((category) => (
                    <Grid item key={category.id} xs={12} sm={6} md={4}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardActionArea component={Link} to={`/kategoriler/${category.slug}`} sx={{ height: '100%' }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={category.coverImageUrl || 'https://source.unsplash.com/random/800x600?construction'}
                                    alt={category.name}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {category.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {category.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}

                {categories.length === 0 && (
                    <Grid item xs={12}>
                        <Typography variant="h6" color="text.secondary" align="center">
                            Henüz kategori bulunmamaktadır.
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default CategoryList;
