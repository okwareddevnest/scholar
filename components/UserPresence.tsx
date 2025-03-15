import { useState, useEffect } from 'react';
import { 
  Box, 
  Avatar, 
  Badge, 
  Tooltip, 
  Typography, 
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  IconButton
} from '@mui/material';
import { 
  MoreVert as MoreVertIcon,
  Message as MessageIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useSocket } from '@/lib/hooks/useSocket';
import { useRouter } from 'next/navigation';

interface OnlineUser {
  id: string;
  name: string;
  picture?: string;
  lastActive: string;
  role?: string;
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function UserPresence() {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const router = useRouter();
  const socket = useSocket();

  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        const response = await fetch('/api/users/online');
        if (response.ok) {
          const data = await response.json();
          setOnlineUsers(data.users);
        }
      } catch (error) {
        console.error('Error fetching online users:', error);
      }
    };

    fetchOnlineUsers();

    // Subscribe to user presence updates
    if (socket) {
      socket.subscribeToActivities((activity: any) => {
        if (activity.type === 'presence') {
          // Update online users list
          if (activity.status === 'online') {
            setOnlineUsers(prev => {
              // Check if user already exists
              const exists = prev.some(user => user.id === activity.userId);
              if (!exists) {
                return [...prev, {
                  id: activity.userId,
                  name: activity.userName || 'Unknown User',
                  picture: activity.userPicture,
                  lastActive: new Date().toISOString(),
                  role: activity.userRole
                }];
              }
              return prev;
            });
          } else if (activity.status === 'offline') {
            setOnlineUsers(prev => prev.filter(user => user.id !== activity.userId));
          }
        }
      });
    }

    return () => {
      // Cleanup if needed
    };
  }, [socket]);

  const handleMessageUser = (userId: string) => {
    router.push(`/dashboard/messages?userId=${userId}`);
  };

  if (onlineUsers.length === 0) {
    return null;
  }

  return (
    <Paper sx={{ mb: 3, borderRadius: 1, overflow: 'hidden' }}>
      <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
        <Typography variant="subtitle1">Online Users</Typography>
      </Box>
      <List sx={{ p: 0 }}>
        {onlineUsers.map((user, index) => (
          <Box key={user.id}>
            <ListItem
              secondaryAction={
                <Tooltip title="Send Message">
                  <IconButton edge="end" onClick={() => handleMessageUser(user.id)}>
                    <MessageIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              }
            >
              <ListItemAvatar>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                >
                  <Avatar 
                    alt={user.name} 
                    src={user.picture || undefined}
                    sx={{ width: 40, height: 40 }}
                  />
                </StyledBadge>
              </ListItemAvatar>
              <ListItemText
                primary={user.name}
                secondary={user.role || 'User'}
                primaryTypographyProps={{ variant: 'body2' }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </ListItem>
            {index < onlineUsers.length - 1 && <Divider variant="inset" component="li" />}
          </Box>
        ))}
      </List>
    </Paper>
  );
} 