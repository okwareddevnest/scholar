import React, { useState } from 'react';
import Link from 'next/link'; // Import Next.js Link
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Grid,
  Card,
  CardContent,
  CssBaseline,
  Box,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Payment as PaymentIcon,
  Analytics as AnalyticsIcon,
  Notifications as NotificationsIcon,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

// Navbar Component
const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={toggleSidebar} // Add toggle button in the navbar
          sx={{ mr: 2 }}
        >
          {<ChevronLeft />} {/* Toggle icon */}
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Avatar sx={{ ml: 2 }}>A</Avatar>
      </Toolbar>
    </AppBar>
  );
};

// Sidebar Component
const Sidebar = ({ open }: { open: boolean }) => {
  const [userManagementOpen, setUserManagementOpen] = useState(false); // State for dropdown

  const handleUserManagementClick = () => {
    setUserManagementOpen(!userManagementOpen); // Toggle dropdown
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? 240 : 64,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? 240 : 64,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease', // Smooth transition
        },
      }}
    >
      <List>
        {/* Dashboard Link */}
        <Link href="/admin-dashboard" passHref>
          <ListItemButton>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            {open && <ListItemText primary="Dashboard" />}
          </ListItemButton>
        </Link>

        {/* User Management Dropdown */}
        <ListItemButton onClick={handleUserManagementClick}>
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          {open && <ListItemText primary="User Management" />}
          {open && (userManagementOpen ? <ChevronLeft /> : <ChevronRight />)}
        </ListItemButton>
        <Collapse in={userManagementOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link href="/user-management" passHref>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="All Users" />
              </ListItemButton>
            </Link>
            <Link href="/writer-management" passHref>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Writers" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>

        {/* Assignment Management Link */}
        <Link href="/assignment-management" passHref>
          <ListItemButton>
            <ListItemIcon><AssignmentIcon /></ListItemIcon>
            {open && <ListItemText primary="Assignment Management" />}
          </ListItemButton>
        </Link>

        {/* Payment Management Link */}
        <Link href="/payment-management" passHref>
          <ListItemButton>
            <ListItemIcon><PaymentIcon /></ListItemIcon>
            {open && <ListItemText primary="Payment Management" />}
          </ListItemButton>
        </Link>

        {/* Analytics Link */}
        <Link href="/analytics" passHref>
          <ListItemButton>
            <ListItemIcon><AnalyticsIcon /></ListItemIcon>
            {open && <ListItemText primary="Analytics" />}
          </ListItemButton>
        </Link>
      </List>
    </Drawer>
  );
};

// Card Component
interface CardProps {
  title: string;
  value: string | number;
}

const CustomCard = ({ title, value }: CardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
      </CardContent>
    </Card>
  );
};

// LineChart Component
const LineChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 3000, 5000, 2000, 3000],
        borderColor: '#1976D2',
        backgroundColor: 'rgba(25, 118, 210, 0.2)',
      },
    ],
  };

  return (
    <Box sx={{ height: '400px', width: '100%' }}> {/* Set a fixed height for the chart */}
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false, // Allow the chart to scale
        }}
      />
    </Box>
  );
};

// PieChart Component
const PieChart = () => {
  const data = {
    labels: ['Completed', 'Pending', 'In Progress'],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: ['#4CAF50', '#FF9800', '#1976D2'],
      },
    ],
  };

  return (
    <Box sx={{ height: '400px', width: '100%' }}> {/* Set a fixed height for the chart */}
      <Pie
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false, // Allow the chart to scale
        }}
      />
    </Box>
  );
};

// Dashboard Component
const Dashboard = ({ open }: { open: boolean }) => {
  const data = {
    totalUsers: 1200,
    activeAssignments: 45,
    revenue: 12000,
    pendingTasks: 5,
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        marginLeft: { sm: open ? '240px' : '64px' }, // Adjust margin for the sidebar
        marginTop: '64px', // Adjust margin for the navbar
        transition: 'margin-left 0.3s ease', // Smooth transition
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <CustomCard title="Total Users" value={data.totalUsers} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CustomCard title="Active Assignments" value={data.activeAssignments} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CustomCard title="Revenue" value={`$${data.revenue}`} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CustomCard title="Pending Tasks" value={data.pendingTasks} />
        </Grid>
        <Grid item xs={12} md={6}>
          <LineChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <PieChart />
        </Grid>
      </Grid>
    </Box>
  );
};

// AdminDashboard Component
const AdminDashboard = () => {
  const [open, setOpen] = useState(true); // State to toggle sidebar

  const toggleSidebar = () => {
    setOpen(!open); // Toggle sidebar state
  };

  return (
    <>
      <CssBaseline />
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar open={open} />
      <Dashboard open={open} />
    </>
  );
};

export default AdminDashboard;