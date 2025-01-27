import React from 'react';
import { Box, Typography, Grid, Rating } from '@mui/material';

const UserReviews: React.FC = () => {
  const reviews = [
    {
      name: "John Doe",
      review: "This service helped me improve my grades significantly!",
      rating: 5,
    },
    {
      name: "Jane Smith",
      review: "Excellent writing quality and timely delivery.",
      rating: 4,
    },
    {
      name: "Alice Johnson",
      review: "Highly recommend for anyone needing academic assistance.",
      rating: 5,
    },
  ];

  return (
    <Box py={6} bgcolor="#f5f5f5">
      <Typography variant="h4" align="center" gutterBottom>
        User Reviews
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {reviews.map((review, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box 
              component="div"
              border={1} 
              borderRadius={8} 
              p={3} 
              bgcolor="#fff" 
              boxShadow={3} 
              sx={{ '&:hover': { transform: 'scale(1.05)', transition: 'transform 0.3s' } }}
            >
              <Typography variant="h6" fontWeight="bold">{review.name}</Typography>
              <Rating name="read-only" value={review.rating} readOnly />
              <Typography variant="body1" mt={1}>{review.review}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserReviews;
