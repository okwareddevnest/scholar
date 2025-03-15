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
  Divider,
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
import ActivityFeed from '@/components/ActivityFeed';
import NotificationCenter from '@/components/NotificationCenter';
import ProfileCompletionTracker from '@/components/ProfileCompletionTracker';
import UserPresence from '@/components/UserPresence';

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* Profile Completion Tracker */}
        <Grid item xs={12}>
          <ProfileCompletionTracker />
        </Grid>

        {/* Main Dashboard Content */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {/* Stats Cards */}
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom variant="subtitle2">
                    Active Assignments
                  </Typography>
                  <Typography variant="h4" component="div">
                    {stats.activeAssignments}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom variant="subtitle2">
                    Completed
                  </Typography>
                  <Typography variant="h4" component="div">
                    {stats.completedAssignments}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom variant="subtitle2">
                    {user?.role === 'student' ? 'Total Spent' : 'Total Earnings'}
                  </Typography>
                  <Typography variant="h4" component="div">
                    ${user?.role === 'student' ? stats.totalSpent : stats.totalEarnings}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom variant="subtitle2">
                    Average Rating
                  </Typography>
                  <Typography variant="h4" component="div">
                    {stats.averageRating.toFixed(1)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Performance Chart */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" component="div">
                      Performance Overview
                    </Typography>
                    <IconButton
                      aria-label="more"
                      aria-controls="performance-menu"
                      aria-haspopup="true"
                      onClick={handleMenuClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="performance-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleMenuClose}>Last 7 Days</MenuItem>
                      <MenuItem onClick={handleMenuClose}>Last 30 Days</MenuItem>
                      <MenuItem onClick={handleMenuClose}>Last 90 Days</MenuItem>
                    </Menu>
                  </Box>
                  <Box sx={{ height: 300 }}>
                    <Line options={chartOptions} data={performanceData} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Activity Feed */}
            <Grid item xs={12}>
              <ActivityFeed />
            </Grid>
          </Grid>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            {/* Upcoming Deadlines */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                    Upcoming Deadlines
                  </Typography>
                  {upcomingDeadlines.length > 0 ? (
                    <List sx={{ p: 0 }}>
                      {upcomingDeadlines.map((deadline) => (
                        <Box key={deadline.id}>
                          <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                            <ListItemIcon>
                              <CalendarIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary={deadline.title}
                              secondary={
                                <>
                                  <Typography variant="body2" color="text.primary">
                                    Due: {deadline.dueDate}
                                  </Typography>
                                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                    <Box sx={{ width: '100%', mr: 1 }}>
                                      <LinearProgress variant="determinate" value={deadline.progress} />
                                    </Box>
                                    <Typography variant="body2" color="text.secondary">
                                      {deadline.progress}%
                                    </Typography>
                                  </Box>
                                  <Chip
                                    label={deadline.subject}
                                    size="small"
                                    sx={{ mt: 1 }}
                                    variant="outlined"
                                  />
                                </>
                              }
                            />
                          </ListItem>
                          <Divider component="li" />
                        </Box>
                      ))}
                    </List>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 2 }}>
                      <Typography color="textSecondary">No upcoming deadlines</Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Online Users */}
            <Grid item xs={12}>
              <UserPresence />
            </Grid>

            {/* Recent Activities */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                    Recent Activities
                  </Typography>
                  {recentActivities.length > 0 ? (
                    <List sx={{ p: 0 }}>
                      {recentActivities.map((activity) => (
                        <Box key={activity.id}>
                          <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                            <ListItemIcon>
                              {activity.type === 'assignment' ? (
                                <AssignmentIcon color="primary" />
                              ) : (
                                <NotificationsIcon color="secondary" />
                              )}
                            </ListItemIcon>
                            <ListItemText
                              primary={activity.title}
                              secondary={
                                <>
                                  <Typography variant="body2" color="text.secondary">
                                    {activity.date}
                                  </Typography>
                                  <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                                    <Chip
                                      label={activity.status}
                                      size="small"
                                      color={getStatusColor(activity.status) as any}
                                      variant="outlined"
                                    />
                                    {activity.priority && (
                                      <Chip
                                        label={activity.priority}
                                        size="small"
                                        color={getPriorityColor(activity.priority) as any}
                                        variant="outlined"
                                      />
                                    )}
                                  </Box>
                                </>
                              }
                            />
                          </ListItem>
                          <Divider component="li" />
                        </Box>
                      ))}
                    </List>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 2 }}>
                      <Typography color="textSecondary">No recent activities</Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Create Assignment Dialog */}
      <Dialog open={isCreateDialogOpen} onClose={() => setIsCreateDialogOpen(false)}>
        <DialogTitle>Create New Assignment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Assignment Title"
            type="text"
            fullWidth
            variant="outlined"
            value={newAssignment.title}
            onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={newAssignment.description}
            onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="subject-label">Subject</InputLabel>
            <Select
              labelId="subject-label"
              id="subject"
              value={newAssignment.subject}
              label="Subject"
              onChange={(e) => setNewAssignment({ ...newAssignment, subject: e.target.value })}
            >
              <MenuItem value="Mathematics">Mathematics</MenuItem>
              <MenuItem value="Physics">Physics</MenuItem>
              <MenuItem value="Chemistry">Chemistry</MenuItem>
              <MenuItem value="Biology">Biology</MenuItem>
              <MenuItem value="Computer Science">Computer Science</MenuItem>
              <MenuItem value="Literature">Literature</MenuItem>
              <MenuItem value="History">History</MenuItem>
              <MenuItem value="Economics">Economics</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="dueDate"
            label="Due Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={newAssignment.dueDate}
            onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateAssignment} variant="contained" disabled={isSubmitting}>
            {isSubmitting ? <CircularProgress size={24} /> : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 