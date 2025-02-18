"use client";

import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

const services = [
  {
    title: 'One-on-One Tutoring',
    description: 'Get personalized attention from expert tutors in your subject area.',
    image: '/tutoring.jpg',
    price: '$50/hour',
  },
  {
    title: 'Group Study Sessions',
    description: 'Join collaborative learning groups to share knowledge and insights.',
    image: '/group-study.jpg',
    price: '$30/session',
  },
  {
    title: 'Exam Preparation',
    description: 'Comprehensive prep materials and strategies for academic success.',
    image: '/exam-prep.jpg',
    price: '$75/session',
  },
  {
    title: 'Writing Assistance',
    description: 'Expert guidance for essays, research papers, and academic writing.',
    image: '/writing.jpg',
    price: '$45/hour',
  },
];

export default function Services() {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Our Services
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              mb: 6,
            }}
          >
            Discover our range of academic support services designed to help you excel
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={service.image}
                  alt={service.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h3"
                    sx={{ fontWeight: 600 }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {service.description}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: 600 }}
                  >
                    {service.price}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ mt: 2 }}
                    fullWidth
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
