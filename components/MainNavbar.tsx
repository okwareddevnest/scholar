'use client';

import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { Logo } from './logo'; // Import the Logo component
import Link from 'next/link';
import { LoginLink, RegisterLink, LogoutLink, getKindeManageURL } from "@kinde-oss/kinde-auth-nextjs/components";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '@/providers/auth-provider';
import { useRouter } from 'next/navigation';

const MainNavbar: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = async () => {
    handleMenuClose();
    const manageURL = await getKindeManageURL();
    if (manageURL) {
      window.location.href = manageURL;
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
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
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link href="/contact" passHref>
            <Button variant="contained" color="secondary">Get in Touch</Button>
          </Link>
          
          {isAuthenticated ? (
            <>
              <IconButton onClick={handleMenuClick} color="inherit">
                {user?.picture ? (
                  <Avatar src={user.picture} sx={{ width: 32, height: 32 }} />
                ) : (
                  <AccountCircleIcon />
                )}
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleProfileClick}>
                  Profile Settings
                </MenuItem>
                <MenuItem>
                  <LogoutLink>Logout</LogoutLink>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <LoginLink>
                <Button variant="contained" color="secondary">
                  Sign In
                </Button>
              </LoginLink>
              <RegisterLink>
                <Button variant="outlined" color="secondary" sx={{ color: 'white', borderColor: 'white' }}>
                  Sign Up
                </Button>
              </RegisterLink>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavbar;
