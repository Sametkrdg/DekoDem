import React from 'react';
import { Grid, Container, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ActivityShowcase = ({ activities }) => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        sx={{ fontWeight: 700, mb: { xs: 5, md: 7 } }}
      >
        Faaliyet Alanlarımız
      </Typography>

      <Grid container spacing={4}>
        {activities.map((activity) => (
          <Grid item xs={12} md={6} lg={4} key={activity.slug}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              }}
            >
              <CardMedia
                component="img"
                height="220"
                image={activity.heroImage}
                alt={activity.title}
                onError={(event) => {
                  event.currentTarget.src = '/images/placeholder.jpg';
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 1.5 }}>
                  {activity.title}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                  {activity.summary}
                </Typography>
                <Button variant="contained" onClick={() => navigate(`/${activity.slug}`)}>
                  Detayları Gör
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ActivityShowcase;