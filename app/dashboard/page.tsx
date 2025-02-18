'use client';

import { useEffect, useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  LinearProgress,
  IconButton,
  Button,
  Menu,
  MenuItem,
  CircularProgress,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  AttachMoney as MoneyIcon,
  Grade as GradeIcon,
  Schedule as ScheduleIcon,
  MoreVert as MoreVertIcon,
  TrendingUp as TrendingUpIcon,
  CalendarToday as CalendarIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useSocket } from '@/lib/hooks/useSocket';
import { useAuth } from '@/providers/auth-provider';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardStats {
  activeAssignments: number;
  completedAssignments: number;
  totalSpent: number;
  averageRating: number;
  monthlyProgress: number;
  totalEarnings: number;
}

interface Activity {
  id: string;
  type: string;
  title: string;
  date: string;
  status: string;
  priority?: string;
}

interface UpcomingDeadline {
  id: string;
  title: string;
  dueDate: string;
  progress: number;
  subject: string;
}

interface PerformanceData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

export default function DashboardPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    subject: '',
    dueDate: '',
    priority: 'medium',
  });
  const [stats, setStats] = useState<DashboardStats>({
    activeAssignments: 0,
    completedAssignments: 0,
    totalSpent: 0,
    averageRating: 0,
    monthlyProgress: 0,
    totalEarnings: 0,
  });
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState<UpcomingDeadline[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    labels: [],
    datasets: [],
  });
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const socket = useSocket();

  useEffect(() => {
    let mounted = true;

    const fetchDashboardData = async () => {
      if (!mounted || !user?.id || dataFetched) return;
      
      try {
        setLoading(true);
        const [statsResponse, activitiesResponse, deadlinesResponse, performanceResponse] = await Promise.all([
          fetch('/api/dashboard/stats'),
          fetch('/api/dashboard/activities'),
          fetch('/api/dashboard/deadlines'),
          fetch('/api/dashboard/performance')
        ]);

        if (!mounted) return;

        const [statsData, activitiesData, deadlinesData, performanceData] = await Promise.all([
          statsResponse.json(),
          activitiesResponse.json(),
          deadlinesResponse.json(),
          performanceResponse.json()
        ]);

        if (!mounted) return;

        if (Array.isArray(activitiesData)) {
          setRecentActivities(activitiesData);
        } else {
          console.error('Activities data is not an array:', activitiesData);
          setRecentActivities([]);
        }

        setStats(statsData);
        if (Array.isArray(deadlinesData)) {
          setUpcomingDeadlines(deadlinesData);
        } else {
          setUpcomingDeadlines([]);
        }
        setPerformanceData(performanceData);
        setDataFetched(true);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        if (mounted) {
          setRecentActivities([]);
          setUpcomingDeadlines([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    const setupSocketSubscriptions = () => {
      if (!user?.id) return;

      // Subscribe to real-time updates
      socket.subscribeToAssignments((data) => {
        if (!mounted) return;
        if (data && typeof data === 'object') {
          setStats(prev => ({
            ...prev,
            activeAssignments: data.activeAssignments || prev.activeAssignments,
            completedAssignments: data.completedAssignments || prev.completedAssignments,
          }));
          if (Array.isArray(data.deadlines)) {
            setUpcomingDeadlines(data.deadlines);
          }
        }
      });

      socket.subscribeToActivities((data) => {
        if (!mounted) return;
        if (data) {
          setRecentActivities(prev => Array.isArray(prev) ? [data, ...prev].slice(0, 10) : [data]);
        }
      });

      socket.subscribeToPerformance((data) => {
        if (!mounted) return;
        if (data && typeof data === 'object') {
          setStats(prev => ({
            ...prev,
            averageRating: data.averageRating || prev.averageRating,
            monthlyProgress: data.monthlyProgress || prev.monthlyProgress,
            totalEarnings: data.totalEarnings || prev.totalEarnings,
          }));
          if (data.performanceData) {
            setPerformanceData(data.performanceData);
          }
        }
      });
    };

    if (user?.id && !isAuthLoading && !dataFetched) {
      fetchDashboardData();
      setupSocketSubscriptions();
    }

    return () => {
      mounted = false;
    };
  }, [user?.id, isAuthLoading, dataFetched, socket]);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'in progress':
        return 'warning';
      case 'pending':
        return 'info';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const handleCreateAssignment = async () => {
    try {
      const response = await fetch('/api/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAssignment),
      });

      if (response.ok) {
        setIsCreateDialogOpen(false);
        setNewAssignment({
          title: '',
          description: '',
          subject: '',
          dueDate: '',
          priority: 'medium',
        });
      } else {
        console.error('Failed to create assignment');
      }
    } catch (error) {
      console.error('Error creating assignment:', error);
    }
  };

  if (isAuthLoading || loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    router.push('/');
    return null;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Welcome back, {user?.firstName || user?.email?.split('@')[0] || 'Student'}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's what's happening with your assignments today.
          </Typography>
        </Box>
        <IconButton onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => router.push('/dashboard/profile')}>View Profile</MenuItem>
          <MenuItem onClick={() => router.push('/dashboard/settings')}>Settings</MenuItem>
        </Menu>
      </Box>

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              color: 'white',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -15,
                right: -15,
                opacity: 0.2,
                transform: 'rotate(30deg)',
              }}
            >
              <AssignmentIcon sx={{ fontSize: 100 }} />
            </Box>
            <Typography variant="h6" gutterBottom>
              Active Assignments
            </Typography>
            <Typography variant="h3">{stats.activeAssignments}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {stats.activeAssignments > 3 ? 'Busy week ahead!' : 'Looking good!'}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)',
              color: 'white',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -15,
                right: -15,
                opacity: 0.2,
                transform: 'rotate(30deg)',
              }}
            >
              <MoneyIcon sx={{ fontSize: 100 }} />
            </Box>
            <Typography variant="h6" gutterBottom>
              Monthly Earnings
            </Typography>
            <Typography variant="h3">${stats.totalEarnings}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              +12% from last month
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)',
              color: 'white',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -15,
                right: -15,
                opacity: 0.2,
                transform: 'rotate(30deg)',
              }}
            >
              <TrendingUpIcon sx={{ fontSize: 100 }} />
            </Box>
            <Typography variant="h6" gutterBottom>
              Monthly Progress
            </Typography>
            <Typography variant="h3">{stats.monthlyProgress}%</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Keep up the good work!
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(45deg, #F44336 30%, #EF5350 90%)',
              color: 'white',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -15,
                right: -15,
                opacity: 0.2,
                transform: 'rotate(30deg)',
              }}
            >
              <GradeIcon sx={{ fontSize: 100 }} />
            </Box>
            <Typography variant="h6" gutterBottom>
              Average Rating
            </Typography>
            <Typography variant="h3">{stats.averageRating}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Based on {stats.completedAssignments} reviews
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Performance Chart and Recent Activities */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Performance Overview
            </Typography>
            <Box sx={{ height: 300 }}>
              <Line
                data={performanceData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <List>
              {Array.isArray(recentActivities) && recentActivities.length > 0 ? (
                recentActivities.map((activity) => (
                  <ListItem
                    key={activity.id}
                    sx={{
                      mb: 2,
                      backgroundColor: 'background.default',
                      borderRadius: 1,
                    }}
                  >
                    <ListItemIcon>
                      {activity.type === 'assignment' ? (
                        <AssignmentIcon color="primary" />
                      ) : activity.type === 'payment' ? (
                        <MoneyIcon color="success" />
                      ) : (
                        <GradeIcon color="warning" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.title}
                      secondary={
                        <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                          <Typography variant="caption" color="text.secondary">
                            {activity.date}
                          </Typography>
                          <Chip
                            label={activity.status}
                            size="small"
                            color={getStatusColor(activity.status)}
                            sx={{ ml: 1 }}
                          />
                          {activity.priority && (
                            <Chip
                              label={activity.priority}
                              size="small"
                              color={getPriorityColor(activity.priority)}
                            />
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="body1" align="center" color="text.secondary">
                        No recent activities
                      </Typography>
                    }
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Upcoming Deadlines */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Deadlines
            </Typography>
            <Grid container spacing={2}>
              {upcomingDeadlines.map((deadline) => (
                <Grid item xs={12} md={4} key={deadline.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" gutterBottom>
                          {deadline.title}
                        </Typography>
                        <Typography color="text.secondary" variant="body2">
                          {deadline.subject}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Due: {deadline.dueDate}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={deadline.progress}
                          sx={{ mt: 1 }}
                          color={
                            deadline.progress > 75
                              ? 'success'
                              : deadline.progress > 25
                              ? 'warning'
                              : 'error'
                          }
                        />
                      </Box>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => router.push('/dashboard/assignments')}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Create Assignment Dialog */}
      <Dialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Assignment</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Title"
              value={newAssignment.title}
              onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={newAssignment.description}
              onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
            />
            <TextField
              fullWidth
              label="Subject"
              value={newAssignment.subject}
              onChange={(e) => setNewAssignment({ ...newAssignment, subject: e.target.value })}
            />
            <TextField
              fullWidth
              label="Due Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={newAssignment.dueDate}
              onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={newAssignment.priority}
                label="Priority"
                onChange={(e) => setNewAssignment({ ...newAssignment, priority: e.target.value })}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleCreateAssignment}
            variant="contained"
            disabled={!newAssignment.title || !newAssignment.dueDate}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 