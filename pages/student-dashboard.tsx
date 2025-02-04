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
  Avatar,
  Badge,
  Divider,
  Chip,
  CircularProgress,
  Slider,
  Menu,
  MenuItem,
  InputAdornment,
  Collapse,
  Tooltip,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Payment as PaymentIcon,
  AccountCircle as AccountCircleIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  AttachFile as AttachFileIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Support as SupportIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";

// Use the Value type from react-calendar
import { Value } from "react-calendar/dist/cjs/shared/types";

const StudentDashboard: React.FC = () => {
  const [date, setDate] = useState<Value>(new Date("2023-01-01")); // Use the Value type
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleCloseDrawer = (event: MouseEvent) => {
    if (mobileOpen && drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
      setMobileOpen(false);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Updated handleDateChange to match the expected signature
  const handleDateChange = (value: Value, event: React.SyntheticEvent<any, Event>) => {
    setDate(value);
  };

  const handleNextStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleDropdownToggle = (item: string) => {
    setOpenDropdown((prev) => (prev === item ? null : item));
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseDrawer);
    return () => {
      document.removeEventListener("mousedown", handleCloseDrawer);
    };
  }, [mobileOpen]);

  const drawer = (
    <div ref={drawerRef}>
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Scholarstream
        </Typography>
      </Box>
      <Divider />
      <List>
        {[
          { text: "Dashboard", icon: <DashboardIcon />, link: "/dashboard" },
          {
            text: "Assignments",
            icon: <AssignmentIcon />,
            link: "/assignments",
            dropdown: [
              { text: "New Assignment", link: "/new-assignment" },
              { text: "Active Assignments", link: "/active-assignments" },
              { text: "Completed Assignments", link: "/completed-assignments" },
            ],
          },
          { text: "Messages", icon: <MessageIcon />, link: "/messages" },
          { text: "Payments", icon: <PaymentIcon />, link: "/payments" },
          { text: "Support", icon: <SupportIcon />, link: "/support" },
        ].map((item) => (
          <React.Fragment key={item.text}>
            <Link href={item.link} passHref legacyBehavior>
              <ListItem
                component="a"
                onClick={() => item.dropdown && handleDropdownToggle(item.text)}
                sx={{
                  cursor: "pointer",
                  "&:hover": { backgroundColor: darkMode ? "#333" : "#f5f5f5" },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                {item.dropdown &&
                  (openDropdown === item.text ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
              </ListItem>
            </Link>
            {item.dropdown && (
              <Collapse in={openDropdown === item.text} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.dropdown.map((subItem) => (
                    <Link href={subItem.link} passHref legacyBehavior key={subItem.text}>
                      <ListItem
                        component="a"
                        sx={{
                          pl: 4,
                          cursor: "pointer",
                          "&:hover": { backgroundColor: darkMode ? "#333" : "#f5f5f5" },
                        }}
                      >
                        <ListItemText primary={subItem.text} />
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
          Upcoming Deadlines
        </Typography>
        {[
          { title: "Math Homework", deadline: "2023-10-15", progress: 50 },
          { title: "Science Project", deadline: "2023-10-20", progress: 30 },
        ].map((item) => (
          <Box key={item.title} sx={{ mb: 2 }}>
            <Typography variant="body2">{item.title}</Typography>
            <Typography variant="caption" color="textSecondary">
              Due: {item.deadline}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Slider value={item.progress} size="small" disabled sx={{ flexGrow: 1, mr: 1 }} />
              <Typography variant="caption">{item.progress}%</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: darkMode ? "#121212" : "#f5f5f5" }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: { sm: `calc(100% - ${sidebarOpen ? 240 : 60}px)` },
          ml: { sm: `${sidebarOpen ? 240 : 60}px` },
          transition: "width 0.3s ease, margin 0.3s ease",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleSidebarToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: "bold" }}>
            StudyHelper Pro
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mr: 2, backgroundColor: "white", borderRadius: 1 }}
          />
          <Tooltip title="Toggle Dark Mode">
            <IconButton color="inherit" onClick={toggleDarkMode}>
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
          <IconButton color="inherit" aria-label="notifications">
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" aria-label="profile" onClick={handleMenuOpen}>
            <Avatar src="/avatar.jpg" alt="User Avatar" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          width: sidebarOpen ? 240 : 60,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: sidebarOpen ? 240 : 60,
            boxSizing: "border-box",
            transition: "width 0.3s ease",
          },
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
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${sidebarOpen ? 240 : 60}px)` },
          ml: { sm: `${sidebarOpen ? 240 : 60}px` },
          transition: "width 0.3s ease, margin 0.3s ease",
        }}
      >
        <Toolbar />
        {/* Hero Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
            Welcome back, Sarah!
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Chip icon={<CheckCircleIcon />} label="3 Active Assignments" color="primary" />
            <Chip icon={<ScheduleIcon />} label="Next Deadline: 2023-10-15" color="secondary" />
          </Box>
        </Box>

        {/* New Assignment Form */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Create New Assignment
          </Typography>
          {activeStep === 0 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField label="Assignment Title" variant="outlined" fullWidth />
              <TextField
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
              />
              <Button
                variant="contained"
                startIcon={<AttachFileIcon />}
                component="label"
              >
                Upload Files
                <input type="file" hidden />
              </Button>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button variant="contained" onClick={handleNextStep}>
                  Next
                </Button>
              </Box>
            </Box>
          )}
          {activeStep === 1 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Deadline"
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField label="Budget" variant="outlined" fullWidth />
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Button variant="outlined" onClick={handlePreviousStep}>
                  Back
                </Button>
                <Button variant="contained" onClick={handleNextStep}>
                  Submit
                </Button>
              </Box>
            </Box>
          )}
        </Paper>

        {/* Calendar */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Calendar
          </Typography>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Calendar value={date} onChange={(value, event) => handleDateChange(value, event)} />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentDashboard;