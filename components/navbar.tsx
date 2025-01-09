

Task Completed
I have provided the final changes to the navbar.tsx file, which include updating the left side to have "Home," "About Us," and "Services," and adding a "Get in Touch" button on the right side. The quick links are positioned immediately after the logo. Please implement these changes directly in your code editor.


give the full updated code "use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Button, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

interface NavbarProps {
className?: string; // Accept className as an optional prop
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

const toggleMobileMenu = () => {
setIsMobileMenuOpen(!isMobileMenuOpen);
};

return (
<AppBar position="static" className={className}>
<Toolbar>
<Link href="/" passHref>
<IconButton edge="start" color="inherit" aria-label="logo">
<Image
src="/images/logo.png"
alt="Logo"
width={80}
height={50}
className="object-contain rounded-full"
priority
/>
</IconButton>
</Link>
<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 2 }}>
<Button color="inherit" component={Link} href="/">
Home
</Button>
<Button color="inherit" component={Link} href="#about">
About Us
</Button>
<Button color="inherit" component={Link} href="#services">
Services
</Button>
</Box>
<Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 'auto' }}>
<Button color="primary" variant="contained" component={Link} href="#contact">
Get in Touch
</Button>
</Box>
<IconButton
edge="end"
color="inherit"
aria-label="menu"
sx={{ display: { md: 'none' } }}
onClick={toggleMobileMenu}
>
<MenuIcon />
</IconButton>
</Toolbar>
<Drawer anchor="right" open={isMobileMenuOpen} onClose={toggleMobileMenu}>
<Box sx={{ width: 250 }}>
<IconButton onClick={toggleMobileMenu}>
<CloseIcon />
</IconButton>
<List>
<ListItem>
<Link href="/" passHref>
<ListItemText primary="Home" />
</Link>
</ListItem>
<ListItem>
<Link href="#about" passHref>
<ListItemText primary="About Us" />
</Link>
</ListItem>
<ListItem>
<Link href="#services" passHref>
<ListItemText primary="Services" />
</Link>
</ListItem>
<ListItem>
<Link href="#contact" passHref>
<ListItemText primary="Get in Touch" />
</Link>
</ListItem>
</List>
</Box>
</Drawer>
</AppBar>
);
};

export default Navbar;