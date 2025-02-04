import React, { useState } from 'react';
import { Button, TextField, Typography, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import styles from './signup.module.css';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      router.push('/login');
    } else {
      const errorData = await response.json();
      console.error('Signup failed:', errorData);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signIn('google', { callbackUrl: '/dashboard' });
    } catch (error) {
      console.error('Error during Google signup:', error);
    }
  };

  return (
    <Grid 
      container 
      justifyContent="center" 
      alignItems="center" 
      className={styles.container}
    >
      <Grid 
        item 
        xs={12} 
        sm={8} 
        md={6} 
        lg={4} 
        className={styles.formContainer}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSignup}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            className={styles.submitButton}
          >
            Sign Up
          </Button>
          <Button
            variant="contained"
            fullWidth
            className={styles.googleButton}
            onClick={handleGoogleSignup}
            style={{
              backgroundColor: '#fff', // White background
              color: '#000', // Black text
              marginTop: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #ddd', // Light border
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow
            }}
          >
            {/* Google Logo SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="24"
              height="24"
              style={{ marginRight: '8px' }}
            >
              <path
                fill="#4285F4"
                d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
              />
              <path
                fill="#34A853"
                d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
              />
              <path
                fill="#FBBC05"
                d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
              />
              <path
                fill="#EA4335"
                d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
              />
            </svg>
            Continue with Google
          </Button>
          <Typography
            variant="body2"
            align="center"
            className={styles.terms}
          >
            By signing up you agree to the{' '}
            <a href="/terms-of-service" className={styles.link}>Terms of Service</a>{' '}
            and{' '}
            <a href="/privacy-policy" className={styles.link}>Privacy Policy</a>.
          </Typography>
          <Typography
            variant="body2"
            align="center"
            className={styles.loginLink}
          >
            Already have an account?{' '}
            <a href="/login" className={styles.link}>Log In</a>
          </Typography>
        </form>
      </Grid>
    </Grid>
  );
};

export default Signup;