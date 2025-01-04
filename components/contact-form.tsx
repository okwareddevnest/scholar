"use client";

import { useState } from 'react';
import { TextField, Button, Box, Typography, Grid, Paper } from '@mui/material';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    // Assume submission logic here
    setSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <Box maxWidth="lg" mx="auto" p={3}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>Contact Us</Typography>
            {submitted && (
              <Typography 
                variant="body1" 
                color="success.main" 
                sx={{ mb: 2, transition: 'opacity 0.5s ease-in', animation: 'fadeIn 0.5s forwards' }}
              >
                Thank you for your message!
              </Typography>
            )}
            <form onSubmit={handleSubmit}>
              <Box mb={3}>
                <TextField 
                  fullWidth 
                  label="Your Name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </Box>
              <Box mb={3}>
                <TextField 
                  fullWidth 
                  type="email" 
                  label="Your Email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </Box>
              <Box mb={3}>
                <TextField 
                  fullWidth 
                  label="Your Message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  multiline 
                  rows={4} 
                />
              </Box>
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} fullWidth>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Grid>
          <Grid item xs={12} md={6} sx={{ bgcolor: 'background.default', p: 3, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>Connect with Us</Typography>
            <Typography variant="body1">Email: discounthomeworkhelper@gmail.com</Typography>
            <Typography variant="body1">Phone: +92 340 1258059</Typography>
            <Typography variant="body1" gutterBottom>Follow us on social media!</Typography>
            <Typography variant="body2" color="textSecondary">We are here to help you!</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}