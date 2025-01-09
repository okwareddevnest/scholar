import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

const BlogPosts: React.FC = () => {
  const posts = [
    {
      title: "How to Write a Great Thesis",
      excerpt: "Tips and tricks for writing a compelling thesis.",
    },
    {
      title: "Understanding Academic Integrity",
      excerpt: "What you need to know about plagiarism and citations.",
    },
    {
      title: "Effective Study Techniques",
      excerpt: "Strategies to enhance your study habits.",
    },
  ];

  return (
    <Box py={6}>
      <Typography variant="h4" align="center" gutterBottom>
        Recent Blog Posts
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {posts.map((post, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{post.title}</Typography>
                <Typography variant="body2">{post.excerpt}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BlogPosts;
