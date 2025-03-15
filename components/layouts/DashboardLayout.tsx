import { useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Badge,
  useMediaQuery,
  CircularProgress,
  Tooltip,
  Menu,
  MenuItem,
  Button,
  Collapse,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  Message as MessageIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Payment as PaymentIcon,
  Star as StarIcon,
  Help as HelpIcon,
  ChevronLeft as ChevronLeftIcon,
  Logout as LogoutIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  BarChart as BarChartIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  SupervisorAccount as SupervisorAccountIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { useAuth } from '@/providers/auth-provider';
import { useThemeContext } from '@/providers/theme-provider';
import NotificationCenter from '@/components/NotificationCenter';

const drawerWidth = 280;

interface NavigationItem {
  text: string;
  icon: ReactNode;
  path: string;
  roles?: string[];
  children?: NavigationItem[];
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(!isMobile);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return null;
  }

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  const handleSubmenuToggle = (text: string) => {
    setExpandedSubmenu(expandedSubmenu === text ? null : text);
  };

  const handleLogout = async () => {
    handleProfileMenuClose();
    await logout();
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    if (isMobile) {
      setOpen(false);
    }
  };

  // Define navigation items based on user role
  const getNavigationItems = (): NavigationItem[] => {
    // Common navigation items for all users
    const commonItems: NavigationItem[] = [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
      { text: 'Messages', icon: <MessageIcon />, path: '/dashboard/messages' },
      { text: 'Profile', icon: <PersonIcon />, path: '/dashboard/profile' },
      { text: 'Settings', icon: <SettingsIcon />, path: '/dashboard/settings' },
    ];

    // Student-specific navigation items
    const studentItems: NavigationItem[] = [
      { text: 'My Assignments', icon: <AssignmentIcon />, path: '/dashboard/assignments' },
      { text: 'Tutors', icon: <PeopleIcon />, path: '/dashboard/tutors' },
      { text: 'Payments', icon: <PaymentIcon />, path: '/dashboard/payments' },
      { text: 'Reviews', icon: <StarIcon />, path: '/dashboard/reviews' },
    ];

    // Admin-specific navigation items
    const adminItems: NavigationItem[] = [
      { 
        text: 'Management', 
        icon: <AdminPanelSettingsIcon />, 
        path: '/dashboard/management',
        children: [
          { text: 'Users', icon: <PeopleIcon />, path: '/dashboard/management/users' },
          { text: 'Assignments', icon: <AssignmentIcon />, path: '/dashboard/management/assignments' },
          { text: 'Payments', icon: <PaymentIcon />, path: '/dashboard/management/payments' },
        ]
      },
      { text: 'Analytics', icon: <BarChartIcon />, path: '/dashboard/analytics' },
      { text: 'System Settings', icon: <SettingsIcon />, path: '/dashboard/system-settings' },
    ];

    // Tutor-specific navigation items
    const tutorItems: NavigationItem[] = [
      { text: 'Assignments', icon: <AssignmentIcon />, path: '/dashboard/assignments' },
      { text: 'Students', icon: <SchoolIcon />, path: '/dashboard/students' },
      { text: 'Earnings', icon: <PaymentIcon />, path: '/dashboard/earnings' },
      { text: 'Reviews', icon: <StarIcon />, path: '/dashboard/reviews' },
    ];

    // Return navigation items based on user role
    switch (user.role) {
      case 'admin':
        return [...commonItems, ...adminItems];
      case 'tutor':
        return [...commonItems, ...tutorItems];
      case 'student':
      default:
        return [...commonItems, ...studentItems];
    }
  };

  const navigationItems = getNavigationItems();

  // Render navigation items recursively
  const renderNavigationItems = (items: NavigationItem[], level = 0) => {
    return items.map((item) => {
      const isActive = pathname === item.path || 
                      (item.children && item.children.some(child => pathname === child.path));
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = expandedSubmenu === item.text;

      return (
        <Box key={item.text}>
          <ListItem
            component={hasChildren ? 'div' : 'button'}
            onClick={hasChildren ? () => handleSubmenuToggle(item.text) : () => handleNavigation(item.path)}
            sx={{
              width: '100%',
              textAlign: 'left',
              backgroundColor: isActive ? 'primary.main' : 'transparent',
              color: isActive ? 'white' : 'inherit',
              '&:hover': {
                backgroundColor: isActive ? 'primary.dark' : 'action.hover',
              },
              cursor: 'pointer',
              pl: level * 2 + 2,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ListItemIcon
                sx={{
                  color: isActive ? 'white' : 'inherit',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{
                  fontWeight: isActive ? 600 : 400,
                }}
              />
            </Box>
            {hasChildren && (
              isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />
            )}
          </ListItem>
          
          {hasChildren && (
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderNavigationItems(item.children, level + 1)}
              </List>
            </Collapse>
          )}
        </Box>
      );
    });
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${open ? drawerWidth : 0}px)` },
          ml: { sm: `${open ? drawerWidth : 0}px` },
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
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
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {user.role === 'admin' ? 'Admin Dashboard' : 'Scholar Dashboard'}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
              <IconButton color="inherit" onClick={toggleTheme}>
                {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
              </IconButton>
            </Tooltip>
            
            <NotificationCenter />
            
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleProfileMenuOpen}
                size="small"
                sx={{ ml: 1 }}
                aria-controls="profile-menu"
                aria-haspopup="true"
              >
                <Avatar 
                  src={user?.picture || undefined}
                  alt={user?.firstName || 'User'}
                  sx={{ 
                    width: 40, 
                    height: 40,
                    border: '2px solid',
                    borderColor: 'primary.light',
                  }}
                />
              </IconButton>
            </Tooltip>
            
            <Menu
              id="profile-menu"
              anchorEl={profileMenuAnchorEl}
              open={Boolean(profileMenuAnchorEl)}
              onClose={handleProfileMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                elevation: 3,
                sx: {
                  mt: 1.5,
                  minWidth: 200,
                  borderRadius: 2,
                  overflow: 'visible',
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
                <Typography variant="caption" sx={{ 
                  display: 'inline-block', 
                  px: 1, 
                  py: 0.5, 
                  mt: 1, 
                  bgcolor: 'primary.light', 
                  color: 'white',
                  borderRadius: 1,
                  textTransform: 'capitalize',
                }}>
                  {user.role}
                </Typography>
              </Box>
              <Divider />
              <MenuItem onClick={() => {
                handleProfileMenuClose();
                router.push('/dashboard/profile');
              }}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem onClick={() => {
                handleProfileMenuClose();
                router.push('/dashboard/settings');
              }}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="left"
        open={open}
        onClose={isMobile ? handleDrawerToggle : undefined}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: theme.spacing(2),
            minHeight: 64,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              sx={{ 
                bgcolor: 'primary.main', 
                width: 40, 
                height: 40, 
                mr: 1.5,
              }}
            >
              {user.role === 'admin' ? 
                <SupervisorAccountIcon /> : 
                user.role === 'tutor' ? 
                  <SchoolIcon /> : 
                  <PersonIcon />
              }
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                {user.role}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <Divider />
        
        <Box sx={{ overflow: 'auto', flexGrow: 1, p: 1.5 }}>
          <List>
            {renderNavigationItems(navigationItems)}
          </List>
        </Box>
        
        <Box sx={{ p: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<HelpIcon />}
            onClick={() => router.push('/dashboard/support')}
            sx={{ mb: 2 }}
          >
            Support
          </Button>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            startIcon={<LogoutIcon />}
            onClick={logout}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: open ? `${drawerWidth}px` : 0 },
          mt: '64px',
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          bgcolor: 'background.default',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        {children}
      </Box>
    </Box>
  );
} 