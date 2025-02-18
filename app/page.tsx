'use client';

import React from 'react';
import Link from 'next/link';
import { Button, Box, Container, Typography } from '@mui/material';
import { useAuth } from '@/providers/auth-provider';
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import MainNavbar from '@/components/MainNavbar';
import Hero from '@/components/hero';
import About from '@/components/about';
import Services from '@/components/services';
import FAQ from '@/components/FAQ';
import Footer from '@/components/footer';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography>Loading...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <>
      <MainNavbar />
      <main>
        <Hero />
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 4,
              py: 8,
            }}
          >
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to Scholar
            </Typography>
            <Typography variant="h5" component="h2" color="text.secondary" gutterBottom>
              Your intelligent academic assistant
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Manage your assignments, track your progress, and improve your academic performance
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              {isAuthenticated ? (
                <Button
                  component={Link}
                  href="/dashboard"
                  variant="contained"
                  size="large"
                >
                  Go to Dashboard
                </Button>
              ) : (
                <>
                  <LoginLink>
                    <Button variant="contained" size="large">
                      Sign In
                    </Button>
                  </LoginLink>
                  <RegisterLink>
                    <Button variant="outlined" size="large">
                      Sign Up
                    </Button>
                  </RegisterLink>
                </>
              )}
            </Box>
          </Box>
        </Container>
        <About />
        <Services />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
