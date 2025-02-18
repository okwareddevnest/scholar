"use client";

import { Box, Container, Typography, Button } from '@mui/material';
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useAuth } from '@/providers/auth-provider';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  const { isAuthenticated } = useAuth();

  return (
    <Box
      sx={{
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        color: 'white',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                mb: 2,
              }}
            >
              Your Academic Success Starts Here
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 400,
                mb: 4,
                opacity: 0.9,
              }}
            >
              Manage assignments, track progress, and excel in your studies
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
              {isAuthenticated ? (
                <Button
                  component={Link}
                  href="/dashboard"
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{ color: 'white' }}
                >
                  Go to Dashboard
                </Button>
              ) : (
                <>
                  <LoginLink>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      sx={{ color: 'white' }}
                    >
                      Get Started
                    </Button>
                  </LoginLink>
                  <RegisterLink>
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{ color: 'white', borderColor: 'white' }}
                    >
                      Learn More
                    </Button>
                  </RegisterLink>
                </>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
              height: { xs: '300px', md: '400px' },
            }}
          >
            <Image
              src="/images/hero-illustration.svg"
              alt="Students studying together"
              width={500}
              height={400}
              style={{
                objectFit: 'contain',
              }}
              priority
            />
          </Box>
        </Box>
      </Container>
      <Box
        sx={{
          position: 'absolute',
          bottom: -2,
          left: 0,
          width: '100%',
          height: '100px',
          background: 'white',
          transform: 'skewY(-3deg)',
          transformOrigin: 'bottom left',
        }}
      />
    </Box>
  );
}
