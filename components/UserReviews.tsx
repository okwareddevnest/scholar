import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const UserReviews: React.FC = () => {
  const reviews = [
    {
      name: "John Doe",
      review: "This service helped me improve my grades significantly!",
    },
    {
      name: "Jane Smith",
      review: "Excellent writing quality and timely delivery.",
    },
    {
      name: "Alice Johnson",
      review: "Highly recommend for anyone needing academic assistance.",
    },
  ];

  return (
    <Box py={6}>
      <Typography variant="h4" align="center" gutterBottom>
        User Reviews
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {reviews.map((review, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box border={1} borderRadius={4} p={2}>
              <Typography variant="h6">{review.name}</Typography>
              <Typography variant="body1">{review.review}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserReviews;
