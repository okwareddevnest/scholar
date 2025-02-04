import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  CardActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Link,
  Grid,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Icon for mobile menu
import FacebookIcon from '@mui/icons-material/Facebook'; // Social media icons
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PayPalIcon from '../components/PaypalIcon'; 

const Payments: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Check for mobile view
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); // For mobile menu

  // Handle mobile menu open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle mobile menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const loadPayPalScript = () => {
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=AXXXXXXX'; // Replace with your PayPal client ID
      script.async = true;
      script.onload = () => {
        initFastlane();
      };
      document.body.appendChild(script);
    };

    loadPayPalScript();
  }, []);

  const initFastlane = async () => {
    try {
      if (!window.paypal.Fastlane) {
        throw new Error('PayPal script loaded but no Fastlane module');
      }

      const { FastlanePaymentComponent, FastlaneWatermarkComponent } = await window.paypal.Fastlane({
        styles: {
          root: {
            backgroundColor: '#faf8f5',
          },
        },
      });

      const paymentComponent = await FastlanePaymentComponent();
      await paymentComponent.render('#payment-component');

      const watermarkComponent = await FastlaneWatermarkComponent({ includeAdditionalInfo: true });
      await watermarkComponent.render('#watermark-container');
    } catch (error) {
      console.error(error);
    }
  };

  // Mock transaction data
  const transactions = [
    { id: 1, date: '2023-10-01', description: 'Article Writing', amount: 50, status: 'Paid' },
    { id: 2, date: '2023-10-05', description: 'Blog Post', amount: 30, status: 'Pending' },
  ];

  return (
    <>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: '#003087' }}>
        <Toolbar>
          {/* Logo */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Scholarstream
          </Typography>

          {/* Desktop Navigation Links */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button color="inherit" href="/">
                Home
              </Button>
              <Button color="inherit" href="/payments">
                Payments
              </Button>
              <Button color="inherit" href="/support">
                Support
              </Button>
            </Box>
          )}

          {/* Mobile Menu */}
          {isMobile && (
            <>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                <MenuItem onClick={handleMenuClose} href="/">
                  Home
                </MenuItem>
                <MenuItem onClick={handleMenuClose} href="/payments">
                  Payments
                </MenuItem>
                <MenuItem onClick={handleMenuClose} href="/support">
                  Support
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Header */}
        <Typography variant="h4" gutterBottom>
          Payments
        </Typography>
        <Typography variant="body1" gutterBottom>
          Pay for your writing service securely via PayPal.
        </Typography>

        {/* Payment Prompt Card */}
        <Card
          sx={{
            mt: 4,
            borderRadius: 2,
            boxShadow: 3,
            background: 'linear-gradient(145deg, #003087, #001f5e)', // Gradient background
            color: 'white', // White text for contrast
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Payment Prompt
            </Typography>
            <Typography variant="h4" gutterBottom>
              $50
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: '#ffc439', // PayPal's secondary color
                color: '#003087', // Dark text for contrast
                transition: 'transform 0.2s, box-shadow 0.2s', // Smooth transition
                '&:hover': {
                  backgroundColor: '#e0ac32', // Darker shade for hover
                  transform: 'translateY(-2px)', // Move button up slightly
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow on hover
                },
              }}
              startIcon={<PayPalIcon />} // Add the PayPal icon here
              onClick={() => {
                // Handle PayPal payment
                alert('Redirecting to PayPal...');
              }}
            >
              Pay with PayPal
            </Button>
            <Typography variant="body2" sx={{ mt: 2 }}>
              You will be redirected to PayPal to complete your payment.
            </Typography>
          </CardContent>
        </Card>

        {/* Payment Status Card */}
        <Card
          sx={{
            mt: 4,
            borderRadius: 2,
            boxShadow: 3,
            background: 'linear-gradient(145deg, #28a745, #218838)', // Green gradient
            color: 'white', // White text for contrast
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Payment Status
            </Typography>
            <Typography variant="body1" sx={{ color: 'white' }}>
              Payment Successful
            </Typography>
            <Typography variant="body2">Transaction ID: 123456789</Typography>
          </CardContent>
        </Card>

        {/* Transaction History Card */}
        <Card
          sx={{
            mt: 4,
            borderRadius: 2,
            boxShadow: 3,
            background: 'linear-gradient(145deg, #ffffff, #f8f9fa)', // Light gradient
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Transaction History
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>${transaction.amount}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            color:
                              transaction.status === 'Paid'
                                ? 'success.main'
                                : transaction.status === 'Pending'
                                ? 'warning.main'
                                : 'error.main',
                          }}
                        >
                          {transaction.status}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <CardActions>
              <Button
                sx={{
                  mt: 2,
                  color: 'primary.main',
                  transition: 'transform 0.2s, box-shadow 0.2s', // Smooth transition
                  '&:hover': {
                    transform: 'translateY(-2px)', // Move button up slightly
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow on hover
                  },
                }}
              >
                View All
              </Button>
            </CardActions>
          </CardContent>
        </Card>

        {/* Support Link */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2">
            Need Help?{' '}
            <Button
              color="primary"
              sx={{
                transition: 'transform 0.2s, box-shadow 0.2s', // Smooth transition
                '&:hover': {
                  transform: 'translateY(-2px)', // Move button up slightly
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow on hover
                },
              }}
            >
              Contact Support
            </Button>
          </Typography>
        </Box>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: '#003087',
          color: 'white',
          py: 4,
          mt: 4,
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={4}>
            {/* Quick Links */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Link href="/" color="inherit" underline="hover">
                Home
              </Link>
              <br />
              <Link href="/payments" color="inherit" underline="hover">
                Payments
              </Link>
              <br />
              <Link href="/support" color="inherit" underline="hover">
                Support
              </Link>
            </Grid>

            {/* Social Media */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton color="inherit" href="https://facebook.com" target="_blank">
                  <FacebookIcon />
                </IconButton>
                <IconButton color="inherit" href="https://twitter.com" target="_blank">
                  <TwitterIcon />
                </IconButton>
                <IconButton color="inherit" href="https://instagram.com" target="_blank">
                  <InstagramIcon />
                </IconButton>
              </Box>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2">Email: discounthomeworkhelper@gmail.com</Typography>
              <Typography variant="body2">Phone: +92 340 1258059</Typography>
            </Grid>
          </Grid>

          {/* Copyright */}
          <Typography variant="body2" align="center" sx={{ mt: 4 }}>
            &copy; {new Date().getFullYear()} Scholarstream. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Payments;