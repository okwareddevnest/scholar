import React from 'react';
import Navbar from '../components/navbar'; // Import the Navbar component
import Hero from '../components/hero'; // Adjusted path
import About from '../components/about'; // Adjusted path
import Services from '../components/services'; // Adjusted path
import Solutions from '../components/solutions'; // Corrected path
import Features from '../components/features'; // Adjusted path
import Testimonials from '../components/testimonials'; // Adjusted path
import ContactForm from '../components/contact-form'; // Adjusted path
import PriceCalculator from '../components/PriceCalculator'; // Import the PriceCalculator component
import Footer from '../components/footer'; // Adjusted path
import Link from 'next/link'; // Import Link from next/link
import FAQ from '../components/FAQ'; // Import the FAQ component
import Chatbot from '../components/chatbot'; // Import the Chatbot component
import { Container, Box, Typography, Button, Grid } from '@mui/material'; // Import Material-UI components

const Home: React.FC = () => {
  return (
    <Container maxWidth={false} disableGutters>
      <Navbar /> {/* Include the Navbar at the top of the page */}
      <main>
        <Hero />
        <Box py={6}>
          <About />
        </Box>
        <Box py={6} bgcolor="background.paper">
          <Services />
        </Box>
        <Box py={6}>
          <Solutions />
        </Box>
        <Box py={6} bgcolor="background.paper">
          <Features />
        </Box>
        <Box py={6}>
          <Testimonials />
        </Box>
        <Box py={6} bgcolor="background.paper">
          <ContactForm />
        </Box>
        <Box py={6} bgcolor="background.paper">
          <PriceCalculator />
        </Box>
        <Grid container justifyContent="center" py={6}>
          <Grid item>
            <Link href="/feedback" passHref>
              <Button variant="contained" color="primary">
                Go to Feedback
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Box py={6} bgcolor="background.paper">
          <FAQ />
        </Box>
      </main>
      <Footer />
      <Chatbot />
    </Container>
  );
}

export default Home;