import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { TextField, Grid } from '@mui/material';

const StartExcelling: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-20 bg-gradient-to-b from-blue-100 to-white">
      <Typography variant="h2" className="text-center mb-4 text-3xl md:text-5xl font-bold text-blue-600">
        Start Excelling Today
      </Typography>
      <Typography variant="h5" className="text-center mb-8 text-lg md:text-xl text-gray-700">
        Join us to enhance your academic journey with expert support and guidance.
      </Typography>
      <div className="flex justify-center mb-8">
        <Button variant="contained" color="primary" size="large">
          Sign Up Now
        </Button>
      </div>
      <Typography variant="h6" className="mb-4 text-xl font-semibold text-blue-600">
        Why Choose Us?
      </Typography>
      <Grid container spacing={2} className="mb-8">
        <Grid item xs={12} md={6}>
          <Card className="bg-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent>
              <Typography variant="h6">Expert Tutors</Typography>
              <Typography>Available 24/7 to assist you with your academic needs.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="bg-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent>
              <Typography variant="h6">Personalized Learning</Typography>
              <Typography>Tailored learning plans to suit your individual requirements.</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Typography variant="h6" className="mb-4 text-xl font-semibold text-blue-600">
        What Our Users Say:
      </Typography>
      <blockquote className="border-l-4 border-blue-600 pl-4 italic mb-4 text-gray-600">
        "This service has transformed my academic performance!" - A satisfied user
      </blockquote>
      <Typography variant="h6" className="mb-4 text-xl font-semibold text-blue-600">
        Frequently Asked Questions
      </Typography>
      <div className="mb-8 text-gray-600">
        <Typography variant="body1" className="font-semibold">Q: How does the service work?</Typography>
        <Typography variant="body2">A: You fill out an order form, and we match you with an expert tutor.</Typography>
      </div>
      <div className="mb-8 text-gray-600">
        <Typography variant="body1" className="font-semibold">Q: What subjects do you cover?</Typography>
        <Typography variant="body2">A: We cover a wide range of subjects, including math, science, and humanities.</Typography>
      </div>
      <Typography variant="h6" className="mb-4 text-xl font-semibold text-blue-600">
        Contact Us
      </Typography>
      <Grid container spacing={2} className="mb-8">
        <Grid item xs={12} md={6}>
          <TextField label="Your Name" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Your Email" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Your Message" variant="outlined" multiline rows={4} fullWidth />
        </Grid>
      </Grid>
      <div className="flex justify-center">
        <Button variant="contained" color="primary" size="large">
          Send Message
        </Button>
      </div>
    </div>
  );
};

export default StartExcelling;
