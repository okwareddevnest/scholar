'use client';

import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material';

const footerLinks = {
  services: [
    { name: 'Tutoring', href: '#' },
    { name: 'Group Study', href: '#' },
    { name: 'Exam Prep', href: '#' },
    { name: 'Writing Help', href: '#' },
  ],
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Press', href: '#' },
  ],
  support: [
    { name: 'Help Center', href: '#' },
    { name: 'Contact Us', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ],
};

const socialLinks = [
  { Icon: FacebookIcon, href: '#' },
  { Icon: TwitterIcon, href: '#' },
  { Icon: InstagramIcon, href: '#' },
  { Icon: LinkedInIcon, href: '#' },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 6,
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Scholar
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Empowering students worldwide with expert academic support and
              resources for educational success.
            </Typography>
            <Box sx={{ mb: 2 }}>
              {socialLinks.map(({ Icon, href }, index) => (
                <IconButton
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ mr: 1 }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Services
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              {footerLinks.services.map((link) => (
                <Box component="li" key={link.name} sx={{ pb: 1 }}>
                  <Link href={link.href} color="text.secondary" underline="hover">
                    {link.name}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Company
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              {footerLinks.company.map((link) => (
                <Box component="li" key={link.name} sx={{ pb: 1 }}>
                  <Link href={link.href} color="text.secondary" underline="hover">
                    {link.name}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Support
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              {footerLinks.support.map((link) => (
                <Box component="li" key={link.name} sx={{ pb: 1 }}>
                  <Link href={link.href} color="text.secondary" underline="hover">
                    {link.name}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ pt: 2 }}
        >
          © {new Date().getFullYear()} Scholar. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
