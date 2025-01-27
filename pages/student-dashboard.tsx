import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Link from "next/link";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  TextField,
  Paper,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import ChatComponent from '../components/ChatComponent'; // Importing ChatComponent
import { Value as CalendarValue } from "node_modules/react-calendar/dist/cjs/shared/types";

type ValuePiece = Date | null;
type LocalValue = ValuePiece | [ValuePiece, ValuePiece];

const StudentDashboard: React.FC = () => {
  const [date, setDate] = useState<LocalValue>(new Date('2023-01-01')); // Fixed initial date
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleCloseDrawer = (event: MouseEvent) => {
    if (mobileOpen && drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
      setMobileOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleCloseDrawer);
    return () => {
      document.removeEventListener('mousedown', handleCloseDrawer);
    };
  }, [mobileOpen]);

  const drawer = (
    <div ref={drawerRef}>
      <List>
        <Link href="/student-dashboard" passHref legacyBehavior>
          <ListItem component="a">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Link href="/assignments" passHref legacyBehavior>
          <ListItem component="a">
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Assignments" />
          </ListItem>
        </Link>
        <Link href="/messages" passHref legacyBehavior>
          <ListItem component="a">
            <ListItemIcon>
              <MessageIcon />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItem>
        </Link>
        <Link href="/notifications" passHref legacyBehavior>
          <ListItem component="a">
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>
        </Link>
        <Link href="/payments" passHref legacyBehavior>
          <ListItem component="a">
            <ListItemIcon>
              <PaymentIcon />
            </ListItemIcon>
            <ListItemText primary="Payments" />
          </ListItem>
        </Link>
        <Link href="/profile" passHref legacyBehavior>
          <ListItem component="a">
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  const handleDateChange = (value: LocalValue) => {
    setDate(value);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
        open
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Assignment Details
        </Typography>
        <Paper elevation={3} sx={{ p: 3, maxWidth: 600, margin: "0 auto" }}>
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField label="Subject" variant="outlined" fullWidth />
            <TextField label="Pages" variant="outlined" fullWidth />
            <TextField
              label="Task Description"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
            />
            <TextField label="URL Needed" variant="outlined" fullWidth />
            <label htmlFor="file-upload" style={{ marginTop: '16px' }}>
              Upload File
              <input
                id="file-upload"
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    console.log("File selected:", file.name);
                    // Handle file upload logic here
                  }
                }}
                style={{ display: 'block', marginTop: '8px' }}
              />
            </label>
            <Box sx={{ mt: 2 }}>
              <Calendar value={date} onChange={(value) => handleDateChange(value)} />
            </Box>
            <Button
              variant="contained"
              color="primary"
              sx={{ alignSelf: "center", mt: 2 }}
            >
              Continue
            </Button>
          </Box>
        </Paper>
        {/* Render Chat Component */}
        <ChatComponent /> {/* Adding ChatComponent here */}
      </Box>
    </Box>
  );
};

export default StudentDashboard;
