"use client";

import { useState } from 'react';
import { TextField, Button, Box, Typography, Grid, Paper } from '@mui/material';
import './contact-form.css'; // Import the CSS file

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

    try {
      const response = await fetch('/api/submitContact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box className="contact-container">
      <Paper className="contact-paper" elevation={3}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography className="contact-title" gutterBottom>Contact Us</Typography>
            {submitted && (
              <Typography 
                variant="body1" 
                color="success.main" 
                sx={{ mb: 2, transition: 'opacity 0.5s ease-in', animation: 'fadeIn 0.5s forwards' }}
              >
                Thank you for your message!
              </Typography>
            )}
            <form onSubmit={handleSubmit} className="contact-form">
              <Box mb={3}>
                <TextField 
                  className="contact-input"
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
                  className="contact-input"
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
                  className="contact-input"
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
              <Button type="submit" className="contact-button" disabled={isSubmitting} fullWidth>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Grid>
          <Grid item xs={12} md={6} className="contact-info">
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
