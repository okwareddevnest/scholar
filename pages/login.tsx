import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Grid, Link } from '@mui/material';
import { useRouter } from 'next/router';
import GoogleIcon from '@mui/icons-material/Google';
import { signIn, useSession } from 'next-auth/react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      }
    } catch (error) {
      setError('An unexpected error occurred');
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  if (status === 'loading') {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Typography>Loading...</Typography>
      </Grid>
    );
  }

  if (session) {
    return null;
  }

  return (
    <Grid 
      container 
      justifyContent="center" 
      alignItems="center" 
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={11} sm={6} md={4} lg={3}>
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
            onClick={handleGoogleSignIn}
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
