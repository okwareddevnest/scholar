'use client';

import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { Logo } from './logo'; // Import the Logo component
import Link from 'next/link';
import { AuthModals } from './modals/AuthModals';
import { UserProfileModal } from './modals/UserProfileModal';
import { useSession, signOut } from 'next-auth/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const MainNavbar: React.FC = () => {
  const { data: session } = useSession();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    setIsProfileOpen(true);
  };

  const handleLogout = () => {
    handleMenuClose();
    signOut();
  };

  return (
    <>
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
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link href="/contact" passHref>
              <Button sx={{ backgroundColor: 'blue', color: 'white' }}>Get in Touch</Button>
            </Link>
            
            {session ? (
              <>
                <IconButton onClick={handleMenuClick} color="inherit">
                  {session.user?.image ? (
                    <Avatar src={session.user.image} sx={{ width: 32, height: 32 }} />
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
                  <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  sx={{ backgroundColor: 'green', color: 'white' }}
                  onClick={() => setIsLoginOpen(true)}
                >
                  Login
                </Button>
                <Button
                  sx={{ backgroundColor: 'grey', color: 'white' }}
                  onClick={() => setIsRegisterOpen(true)}
                >
                  Signup
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <AuthModals
        isLoginOpen={isLoginOpen}
        isRegisterOpen={isRegisterOpen}
        onLoginClose={() => setIsLoginOpen(false)}
        onRegisterClose={() => setIsRegisterOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userData={
          session?.user
            ? {
                name: session.user.name || '',
                email: session.user.email || '',
                avatar: session.user.image || '',
              }
            : undefined
        }
      />
    </>
  );
};

export default MainNavbar;
