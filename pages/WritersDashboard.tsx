import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Grid,
  Box,
  LinearProgress,
  Button,
  TextField,
  Chip,
  Container,
  Card,
  CardContent,
  CardActions,
  InputAdornment,
  Snackbar,
  Alert,
  ListItemButton,
  Collapse, // Add this import
} from '@mui/material';
import {
  Notifications,
  AccountCircle,
  Home,
  Assignment,
  MonetizationOn,
  Chat,
  Settings,
  Search,
  Email,
  Payment,
  Help,
  ExitToApp,
  Brightness4,
  Brightness7,
  ExpandLess,
  ExpandMore, // Add this import
} from '@mui/icons-material';
import { styled } from '@mui/system';
import { teal, blue, green, red, grey } from '@mui/material/colors';

// Custom Styled Components
const Navbar = styled(AppBar)({
  backgroundColor: blue[800],
});

const Sidebar = styled(Drawer)({
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    backgroundColor: grey[100],
  },
});

const HeroSection = styled(Box)({
  backgroundColor: blue[50],
  padding: '20px',
  borderRadius: '12px',
  marginBottom: '20px',
});

const Footer = styled(Box)({
  backgroundColor: blue[800],
  color: 'white',
  padding: '20px',
  marginTop: '40px',
  textAlign: 'center',
});

const StatusChip = ({ status }: { status: string }) => {
  let chipColor: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

  switch (status) {
    case 'completed':
      chipColor = 'success';
      break;
    case 'pending':
      chipColor = 'warning';
      break;
    default:
      chipColor = 'default';
      break;
  }

  return <Chip label={status} color={chipColor} />;
};

const WritersDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [openOrders, setOpenOrders] = useState(false); // State for Orders dropdown
  const [openEarnings, setOpenEarnings] = useState(false); // State for Earnings dropdown

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleOrdersClick = () => {
    setOpenOrders(!openOrders); // Toggle Orders dropdown
  };

  const handleEarningsClick = () => {
    setOpenEarnings(!openEarnings); // Toggle Earnings dropdown
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: darkMode ? grey[900] : grey[50] }}>
      {/* Navbar */}
      <Navbar position="fixed">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Scholastream
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search orders or clients..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ mr: 2, backgroundColor: 'white', borderRadius: '4px' }}
          />
          <IconButton color="inherit" onClick={handleNotificationClick}>
            <Badge badgeContent={notifications.length} color="secondary">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <IconButton color="inherit" onClick={handleProfileClick}>
            <Avatar>
              <AccountCircle />
            </Avatar>
          </IconButton>
        </Toolbar>
      </Navbar>

      {/* Sidebar */}
      <Sidebar variant="permanent">
        <Toolbar />
        <List>
          <ListItemButton>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>

          {/* Orders Dropdown */}
          <ListItemButton onClick={handleOrdersClick}>
            <ListItemIcon>
              <Assignment />
            </ListItemIcon>
            <ListItemText primary="Orders" />
            {openOrders ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openOrders} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Active Orders" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Completed Orders" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Pending Orders" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Earnings Dropdown */}
          <ListItemButton onClick={handleEarningsClick}>
            <ListItemIcon>
              <MonetizationOn />
            </ListItemIcon>
            <ListItemText primary="Earnings" />
            {openEarnings ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openEarnings} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Total Earnings" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Withdrawal History" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Withdraw Funds" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton>
            <ListItemIcon>
              <Chat />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </List>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Performance Metrics</Typography>
          <Typography variant="body2">Rating: 4.8/5</Typography>
          <Typography variant="body2">Completed Orders: 120</Typography>
          <Typography variant="body2">Earnings this month: $1,200</Typography>
        </Box>
      </Sidebar>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '64px' }}>
        {/* Hero Section */}
        <HeroSection>
          <Typography variant="h4" gutterBottom>
            Welcome back, John!
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Active Orders</Typography>
                  <Typography variant="h4">5</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Pending Payments</Typography>
                  <Typography variant="h4">$500</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Upcoming Deadlines</Typography>
                  <Typography variant="h4">2</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </HeroSection>

        {/* Active Orders Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Active Orders
          </Typography>
          <Grid container spacing={2}>
            {[1, 2, 3].map((order) => (
              <Grid item xs={12} md={6} key={order}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Order #{order}</Typography>
                    <Typography variant="body2">Client: John Doe</Typography>
                    <Typography variant="body2">Deadline: 2023-12-01</Typography>
                    <StatusChip status="In Progress" />
                  </CardContent>
                  <CardActions>
                    <Button size="small">View Details</Button>
                    <Button size="small">Submit Work</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Earnings Overview */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Earnings Overview
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Balance: $1,200</Typography>
              <Button variant="contained" color="primary">
                Withdraw Earnings
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Footer */}
      <Footer>
        <Typography variant="body1">© 2025 scholarstream. All rights reserved.</Typography>
      </Footer>
    </Box>
  );
};

export default WritersDashboard;