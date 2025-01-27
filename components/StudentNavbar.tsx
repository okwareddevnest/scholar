"use client";

import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const StudentNavbar: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button onClick={toggleSidebar}>
          <MenuIcon />
        </Button>
        <Typography variant="h6">Dashboard</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default StudentNavbar;
