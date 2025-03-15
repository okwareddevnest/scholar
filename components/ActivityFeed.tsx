import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Avatar, 
  Chip, 
  Divider, 
  CircularProgress,
  Button,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  Assignment as AssignmentIcon, 
  Message as MessageIcon, 
  Notifications as NotificationsIcon,
  Grade as GradeIcon,
  Payment as PaymentIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { useSocket } from '@/lib/hooks/useSocket';
import { useAuth } from '@/providers/auth-provider';

interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  status?: string;
  relatedUserId?: string;
  relatedUserName?: string;
}

export default function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { subscribeToActivities } = useSocket();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/activities');
        if (response.ok) {
          const data = await response.json();
          setActivities(data.activities);
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();

    // Subscribe to real-time activity updates
    subscribeToActivities((newActivity: Activity) => {
      setActivities(prev => [newActivity, ...prev].slice(0, 20));
    });
  }, [subscribeToActivities]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return <AssignmentIcon color="primary" />;
      case 'message':
        return <MessageIcon color="info" />;
      case 'notification':
        return <NotificationsIcon color="warning" />;
      case 'grade':
        return <GradeIcon color="success" />;
      case 'payment':
        return <PaymentIcon color="secondary" />;
      default:
        return <NotificationsIcon />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleRefresh = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/activities');
      if (response.ok) {
        const data = await response.json();
        setActivities(data.activities);
      }
    } catch (error) {
      console.error('Error refreshing activities:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 1, overflow: 'hidden' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" component="div">
          Activity Feed
        </Typography>
        <Tooltip title="Refresh">
          <IconButton onClick={handleRefresh} disabled={loading}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress size={30} />
        </Box>
      ) : activities.length > 0 ? (
        <List sx={{ maxHeight: 400, overflow: 'auto', p: 0 }}>
          {activities.map((activity, index) => (
            <Box key={activity.id}>
              <ListItem alignItems="flex-start" sx={{ py: 1.5 }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'background.default' }}>
                    {getActivityIcon(activity.type)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1" component="span">
                        {activity.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="text.primary" sx={{ mt: 0.5, mb: 1 }}>
                        {activity.description}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        {activity.status && (
                          <Chip 
                            label={activity.status} 
                            size="small" 
                            color={getStatusColor(activity.status) as any} 
                            variant="outlined" 
                          />
                        )}
                        {activity.relatedUserName && (
                          <Chip 
                            label={activity.relatedUserName} 
                            size="small" 
                            variant="outlined" 
                          />
                        )}
                      </Box>
                    </>
                  }
                />
              </ListItem>
              {index < activities.length - 1 && <Divider variant="inset" component="li" />}
            </Box>
          ))}
        </List>
      ) : (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="text.secondary">No recent activities</Typography>
        </Box>
      )}
    </Box>
  );
} 