import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Logo } from './logo'; // Import the Logo component
import Link from 'next/link';

const MainNavbar: React.FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'blue' }}>
      <Toolbar>
        <Logo />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link href="/" passHref>
            <Button color="inherit">Home</Button>
          </Link>
          <Link href="/about" passHref>
            <Button color="inherit">About</Button>
          </Link>
          <Link href="/services" passHref>
            <Button color="inherit">Services</Button>
          </Link>
        </div>
        <div style={{ marginLeft: 'auto' }}>
<Link href="/contact" passHref target="_blank" rel="noopener noreferrer">
  <Button sx={{ backgroundColor: 'blue', color: 'white', marginRight: '10px' }}>Get in Touch</Button>
</Link>
          <Link href="/login" passHref>
            <Button sx={{ backgroundColor: 'green', color: 'white' }}>Login</Button>
          </Link>
          <Link href="/signup" passHref target="_blank">
            <Button sx={{ backgroundColor: 'grey', color: 'white' }}>Signup</Button>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavbar;
