import React from 'react';

import Navbar from '../components/navbar';
import Hero from '../components/hero';
import About from '../components/about';
import Services from '../components/services';
import Solutions from '../components/solutions';
import Features from '../components/features';
import Testimonials from '../components/testimonials';
import ContactForm from '../components/contact-form';
import PriceCalculator from '../components/PriceCalculator';
import Footer from '../components/footer';
import Link from 'next/link';
import FAQ from '../components/FAQ';
import Chatbot from '../components/chatbot';
import { Container, Box, Typography, Button, Grid } from '@mui/material';
import ContactUs from '../components/ContactUs';
import UserReviews from '../components/UserReviews';

const Home: React.FC = () => {
  return (
    <Container maxWidth={false} disableGutters>
      <Navbar className="bg-white shadow-md" />
      <main>
        <Hero />
        <Box py={6}>
          
        </Box>
        <UserReviews />
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
            <Link href="/blogs" passHref>
              <Button variant="contained" color="primary">
                View All Blogs
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Box py={6} bgcolor="background.paper">
          <FAQ />
        </Box>
        <ContactUs />
      </main>
      <Footer />
      <Chatbot />
    </Container>
  );
}

export default Home;
