'use client';

import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

interface AuthModalsProps {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  onLoginClose: () => void;
  onRegisterClose: () => void;
  onSwitchToRegister: () => void;
  onSwitchToLogin: () => void;
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 400 },
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export const AuthModals: React.FC<AuthModalsProps> = ({
  isLoginOpen,
  isRegisterOpen,
  onLoginClose,
  onRegisterClose,
  onSwitchToRegister,
  onSwitchToLogin,
}) => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        onLoginClose();
        router.push('/dashboard');
        router.refresh();
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      if (response.ok) {
        onRegisterClose();
        onSwitchToLogin();
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { 
        callbackUrl: '/student-dashboard',
        redirect: true 
      });
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  return (
    <>
      {/* Login Modal */}
      <Dialog open={isLoginOpen} onClose={onLoginClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Sign in to your account</Typography>
            <IconButton onClick={onLoginClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleLogin}>
            <TextField
              label="Email or phone"
              variant="outlined"
              fullWidth
              margin="normal"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
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
              sx={{ mt: 2 }}
            >
              Sign in
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={handleGoogleSignIn}
              sx={{
                mt: 2,
                bgcolor: '#4285F4',
                '&:hover': { bgcolor: '#357ABD' },
              }}
            >
              <GoogleIcon sx={{ mr: 1 }} />
              Continue with Google
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button onClick={onSwitchToRegister} color="primary">
                Don't have an account? Sign up
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>

      {/* Register Modal */}
      <Dialog open={isRegisterOpen} onClose={onRegisterClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Create an account</Typography>
            <IconButton onClick={onRegisterClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleRegister}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={registerData.username}
              onChange={(e) =>
                setRegisterData({ ...registerData, username: e.target.value })
              }
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
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
              sx={{ mt: 2 }}
            >
              Sign up
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={handleGoogleSignIn}
              sx={{
                mt: 2,
                bgcolor: '#4285F4',
                '&:hover': { bgcolor: '#357ABD' },
              }}
            >
              <GoogleIcon sx={{ mr: 1 }} />
              Continue with Google
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button onClick={onSwitchToLogin} color="primary">
                Already have an account? Sign in
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}; 