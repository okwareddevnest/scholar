import React, { useState } from 'react';
import { Button, TextField, Typography, Grid, Link } from '@mui/material';
import { useRouter } from 'next/router';
import GoogleIcon from '@mui/icons-material/Google';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Specify the type for error
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push('/student-dashboard');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <Grid 
      container 
      justifyContent="center" 
      alignItems="center" 
      className="login-container" // Placeholder for styles
    >
      <Grid item>
        <Typography variant="h5" align="center" gutterBottom>
          Sign in to your account
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email or phone"
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
          {error && (
            <Typography variant="body2" color="error" align="center" gutterBottom>
              {error}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            style={{ marginTop: '16px' }}
          >
            Sign in
          </Button>
          <Grid container justifyContent="space-between" style={{ marginTop: '16px' }}>
            <Link href="/signup" style={{ textDecoration: 'none', color: '#4285F4' }}>
              Create account
            </Link>
            <Link href="/recover" style={{ textDecoration: 'none', color: '#4285F4' }}>
              Recover password
            </Link>
          </Grid>
          <Button
            variant="contained"
            fullWidth
            style={{
              marginTop: '16px',
              backgroundColor: '#4285F4',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <GoogleIcon style={{ marginRight: '8px' }} />
            Continue with Google
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
