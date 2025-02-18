'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Paper,
  Chip,
  Divider,
  Button,
  Menu,
  MenuItem,
  FormControlLabel,
  Switch,
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  Message as MessageIcon,
  Payment as PaymentIcon,
  Star as StarIcon,
  MoreVert as MoreVertIcon,
  FilterList as FilterListIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

interface Notification {
  id: string;
  type: 'assignment' | 'message' | 'payment' | 'review';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    'assignment',
    'message',
    'payment',
    'review',
  ]);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    // Fetch notifications - replace with actual API call
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'assignment',
        title: 'New Assignment Due',
        description: 'Your Math assignment is due tomorrow at 11:59 PM',
        timestamp: '2 hours ago',
        isRead: false,
      },
      {
        id: '2',
        type: 'message',
        title: 'New Message from Tutor',
        description: 'John Smith sent you a message regarding your recent submission',
        timestamp: '4 hours ago',
        isRead: true,
      },
      {
        id: '3',
        type: 'payment',
        title: 'Payment Successful',
        description: 'Your payment for Physics tutoring has been processed',
        timestamp: 'Yesterday',
        isRead: false,
      },
      {
        id: '4',
        type: 'review',
        title: 'New Review Received',
        description: 'You received a 5-star review from Sarah Johnson',
        timestamp: '2 days ago',
        isRead: true,
      },
    ];
    setNotifications(mockNotifications);
  }, []);

  useEffect(() => {
    let filtered = notifications;

    // Apply type filter
    filtered = filtered.filter((notification) => selectedTypes.includes(notification.type));

    // Apply read/unread filter
    if (showUnreadOnly) {
      filtered = filtered.filter((notification) => !notification.isRead);
    }

    setFilteredNotifications(filtered);
  }, [notifications, selectedTypes, showUnreadOnly]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return <AssignmentIcon color="primary" />;
      case 'message':
        return <MessageIcon color="info" />;
      case 'payment':
        return <PaymentIcon color="success" />;
      case 'review':
        return <StarIcon color="warning" />;
      default:
        return null;
    }
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setMenuAnchorEl((prev) => ({ ...prev, [id]: event.currentTarget }));
  };

  const handleMenuClose = (id: string) => {
    setMenuAnchorEl((prev) => ({ ...prev, [id]: null }));
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
    handleMenuClose(id);
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Notifications</Typography>
        <Box>
          <Button
            startIcon={<FilterListIcon />}
            onClick={handleFilterClick}
            variant="outlined"
            sx={{ mr: 2 }}
          >
            Filter
          </Button>
          <Button variant="contained" onClick={handleMarkAllAsRead}>
            Mark All as Read
          </Button>
        </Box>
      </Box>

      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
        PaperProps={{
          sx: { width: 250 },
        }}
      >
        <MenuItem>
          <FormControlLabel
            control={
              <Switch
                checked={showUnreadOnly}
                onChange={(e) => setShowUnreadOnly(e.target.checked)}
              />
            }
            label="Show Unread Only"
          />
        </MenuItem>
        <Divider />
        <MenuItem>
          <FormControlLabel
            control={
              <Switch
                checked={selectedTypes.includes('assignment')}
                onChange={() => handleTypeToggle('assignment')}
              />
            }
            label="Assignments"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Switch
                checked={selectedTypes.includes('message')}
                onChange={() => handleTypeToggle('message')}
              />
            }
            label="Messages"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Switch
                checked={selectedTypes.includes('payment')}
                onChange={() => handleTypeToggle('payment')}
              />
            }
            label="Payments"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Switch
                checked={selectedTypes.includes('review')}
                onChange={() => handleTypeToggle('review')}
              />
            }
            label="Reviews"
          />
        </MenuItem>
      </Menu>

      <Paper>
        <List>
          {filteredNotifications.map((notification, index) => (
            <Box key={notification.id}>
              {index > 0 && <Divider />}
              <ListItem
                sx={{
                  backgroundColor: notification.isRead ? 'inherit' : 'action.hover',
                }}
                secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      onClick={(e) => handleMenuOpen(e, notification.id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={menuAnchorEl[notification.id]}
                      open={Boolean(menuAnchorEl[notification.id])}
                      onClose={() => handleMenuClose(notification.id)}
                    >
                      <MenuItem onClick={() => handleMarkAsRead(notification.id)}>
                        <ListItemIcon>
                          <CheckCircleIcon fontSize="small" />
                        </ListItemIcon>
                        Mark as read
                      </MenuItem>
                    </Menu>
                  </>
                }
              >
                <ListItemIcon>{getNotificationIcon(notification.type)}</ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: notification.isRead ? 'normal' : 'bold' }}
                      >
                        {notification.title}
                      </Typography>
                      <Chip
                        label={notification.type}
                        size="small"
                        sx={{ ml: 1 }}
                        color={
                          notification.type === 'assignment'
                            ? 'primary'
                            : notification.type === 'message'
                            ? 'info'
                            : notification.type === 'payment'
                            ? 'success'
                            : 'warning'
                        }
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {notification.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {notification.timestamp}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            </Box>
          ))}
          {filteredNotifications.length === 0 && (
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="body1" align="center" color="text.secondary">
                    No notifications found
                  </Typography>
                }
              />
            </ListItem>
          )}
        </List>
      </Paper>
    </Box>
  );
} 