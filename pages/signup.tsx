// filepath: /c:/Users/Admin/Downloads/Telegram Desktop/sc/scholar/pages/signup.tsx
import React, { useState } from 'react';
import { Button, TextField, Typography, Grid } from '@mui/material';
import { useRouter } from 'next/router';
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
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            onClick={() => console.log('Google Signup')} // Replace with actual Google OAuth logic
            style={{
              backgroundColor: '#4285F4', // Google Blue
              color: 'white',
              marginTop: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ marginRight: '8px' }}>G</span>
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