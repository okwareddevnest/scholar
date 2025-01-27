import React from 'react';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import GoogleIcon from '@mui/icons-material/Google'; // Import Google icon
import styles from './signup.module.css'; // Import CSS module

const Signup: React.FC = () => {
  const router = useRouter();

  const handleGoogleSignup = () => {
    // Logic for Google signup
    window.open('/api/auth/google', '_self'); // Adjust the URL as needed
  };

  return (
    <div className={styles.container}>
      <Typography variant="h4" className={styles.title}>Log In</Typography>
      <Button 
        variant="contained" 
        color="primary" 
        fullWidth 
        onClick={handleGoogleSignup}
        className={styles.google} // Add class for styling
      >
        <GoogleIcon /> {/* Add Google icon */}
        Continue with Google
      </Button>
    </div>
  );
};

export default Signup;
