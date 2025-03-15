import { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  LinearProgress, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Button, 
  Collapse,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  CheckCircle as CheckCircleIcon, 
  Cancel as CancelIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useAuth } from '@/providers/auth-provider';
import { useRouter } from 'next/navigation';

interface ProfileItem {
  id: string;
  label: string;
  completed: boolean;
  path: string;
}

export default function ProfileCompletionTracker() {
  const [expanded, setExpanded] = useState(false);
  const [profileItems, setProfileItems] = useState<ProfileItem[]>([]);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const items: ProfileItem[] = [
        {
          id: 'basic-info',
          label: 'Basic Information',
          completed: !!(user.firstName && user.lastName),
          path: '/dashboard/profile'
        },
        {
          id: 'profile-picture',
          label: 'Profile Picture',
          completed: !!user.picture,
          path: '/dashboard/profile'
        },
        {
          id: 'preferences',
          label: 'Notification Preferences',
          completed: !!(user.preferences && user.preferences.notifications),
          path: '/dashboard/profile#preferences'
        },
        {
          id: 'subjects',
          label: 'Subject Preferences',
          completed: !!(user.subjects && user.subjects.length > 0),
          path: '/dashboard/profile#subjects'
        }
      ];

      setProfileItems(items);
      
      // Calculate completion percentage
      const completedCount = items.filter(item => item.completed).length;
      const percentage = Math.round((completedCount / items.length) * 100);
      setCompletionPercentage(percentage);
    }
  }, [user]);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleItemClick = (path: string) => {
    router.push(path);
  };

  if (!user || completionPercentage === 100) {
    return null;
  }

  return (
    <Paper sx={{ p: 2, mb: 3, borderRadius: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PersonIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" component="div">
            Complete Your Profile
          </Typography>
        </Box>
        <Tooltip title={expanded ? "Show less" : "Show more"}>
          <IconButton onClick={handleToggleExpand} size="small">
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress 
            variant="determinate" 
            value={completionPercentage} 
            sx={{ 
              height: 8, 
              borderRadius: 5,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: completionPercentage < 50 ? 'warning.main' : 'success.main',
              }
            }} 
          />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {completionPercentage}%
        </Typography>
      </Box>
      
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List dense sx={{ mt: 1 }}>
          {profileItems.map((item) => (
            <ListItem 
              key={item.id}
              sx={{ 
                py: 0.5, 
                cursor: 'pointer',
                '&:hover': { bgcolor: 'action.hover' }
              }}
              onClick={() => handleItemClick(item.path)}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                {item.completed ? (
                  <CheckCircleIcon color="success" fontSize="small" />
                ) : (
                  <CancelIcon color="error" fontSize="small" />
                )}
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{ 
                  variant: 'body2',
                  color: item.completed ? 'text.secondary' : 'text.primary',
                  sx: { textDecoration: item.completed ? 'line-through' : 'none' }
                }} 
              />
            </ListItem>
          ))}
        </List>
        
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            size="small" 
            variant="outlined" 
            onClick={() => router.push('/dashboard/profile')}
          >
            Complete Profile
          </Button>
        </Box>
      </Collapse>
    </Paper>
  );
} 