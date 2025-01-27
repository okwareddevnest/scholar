import React from 'react';
import Hero from '../components/hero';
import About from '../components/about';
import Services from '../components/services';
import FAQ from '../components/FAQ'; // Import the FAQ component
import Link from 'next/link'; // Use next/link for navigation
import { Button, Box } from '@mui/material'; // Import Material-UI Button and Box
import Chatbot from '../components/chatbot'; // Import the Chatbot component
import Footer from '../components/footer'; // Import the Footer component
import MainNavbar from '../components/MainNavbar'; // Use the new MainNavbar

const HomePage = () => {
  return (
    <div>
      <MainNavbar />
      <Hero />
      <About />
      <Services />
      <Box py={6} bgcolor="background.paper">
        <FAQ /> {/* Add the FAQ component here */}
      </Box>
      <div className="text-center mt-4">
        <Link href="/faq" className="text-blue-500 hover:underline">
          Frequently Asked Questions
        </Link>
      </div>
      <div className="text-center mt-4">
        <h3>Reach out to us on WhatsApp</h3>
        <Button 
          variant="contained" 
          color="primary" 
          href="https://wa.me/923401258059" // Updated with the provided WhatsApp number
          target="_blank"
        >
          Contact Us on WhatsApp
        </Button>
      </div>
      <Chatbot /> {/* Add the Chatbot component here */}
      <Footer /> {/* Ensure the footer is included here */}
    </div>
  );
};

export default HomePage;
