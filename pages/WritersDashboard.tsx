// pages/WritersDashboard.tsx

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  LinearProgress,
  Button,
  IconButton,
  AppBar,
  Toolbar,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  TextField,
} from '@mui/material';
import { styled } from '@mui/system';
import { Notifications, AccountCircle } from '@mui/icons-material';

interface Assignment {
  id: number;
  title: string;
  description: string;
  deadline: string;
  progress: number; // Progress percentage
  status: string; // e.g., "completed", "pending"
}

interface Notification {
  id: number;
  message: string;
  timestamp: Date;
}

const ContainerStyled = styled(Container)({
  marginTop: '20px',
});

const Section = styled(Paper)({
  marginBottom: '40px',
  padding: '20px',
});

const ProgressContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
});

const ProgressBar = styled(LinearProgress)({
  flexGrow: 1,
  marginRight: '10px',
});

const WritersDashboard = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [newAssignment, setNewAssignment] = useState<Assignment>({
    id: 0,
    title: '',
    description: '',
    deadline: '',
    progress: 0,
    status: 'pending',
  });
  const [newMessage, setNewMessage] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    password: '',
    notificationPreferences: {
      emailNotifications: true,
      smsNotifications: false,
    },
    profilePicture: null as File | null,
  });

  useEffect(() => {
    fetchAssignments();
    fetchNotifications();
    fetchUserProfile(); // Fetch user profile on component mount
  }, []);

  const fetchAssignments = async () => {
    const response = await fetch('/api/writers/assignments'); // Adjust the endpoint
    const data: Assignment[] = await response.json();
    setAssignments(data);
  };

  const fetchNotifications = async () => {
    const response = await fetch('/api/writers/notifications'); // Adjust the endpoint
    const data: Notification[] = await response.json();
    setNotifications(data);
  };

  const fetchUserProfile = async () => {
    const response = await fetch('/api/user/profile');
    const data = await response.json();
    setProfile(data);
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  const handleAssignmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/writers/assignments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAssignment),
    });

    if (response.ok) {
      setNewAssignment({ id: 0, title: '', description: '', deadline: '', progress: 0, status: 'pending' });
      fetchAssignments();
      fetchNotifications();
    } else {
      alert('Failed to submit assignment.');
    }
  };

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newMessage }),
    });
    setNewMessage('');
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('email', profile.email);
    formData.append('password', profile.password);
    if (profile.profilePicture) {
      formData.append('profilePicture', profile.profilePicture);
    }
    formData.append('notificationPreferences', JSON.stringify(profile.notificationPreferences));

    const response = await fetch('/api/user/profile', {
      method: 'PUT',
      body: formData,
    });

    if (response.ok) {
      alert('Profile updated successfully!');
      fetchUserProfile(); // Refresh the profile data
    } else {
      alert('Failed to update profile.');
    }
  };

  return (
    <ContainerStyled>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Writers Dashboard
          </Typography>
          <IconButton color="inherit" onClick={handleNotificationClick}>
            <Badge badgeContent={notifications.length} color="secondary">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Avatar>
              <AccountCircle />
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Section elevation={3}>
        <Typography variant="h5" gutterBottom>
          Update Profile
        </Typography>
        <form onSubmit={handleProfileUpdate}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            required
          />
          <TextField
            label="New Password"
            type="password"
            variant="outlined"
            fullWidth
            value={profile.password}
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
          />
          <Button variant="contained" color="primary" type="submit">
            Update Profile
          </Button>
        </form>
      </Section>

      <Section elevation={3}>
        <Typography variant="h5" gutterBottom>
          Submit Assignment
        </Typography>
        <form onSubmit={handleAssignmentSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={newAssignment.title}
            onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={newAssignment.description}
            onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
            required
          />
          <TextField
            label="Deadline"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={newAssignment.deadline}
            onChange={(e) => setNewAssignment({ ...newAssignment, deadline: e.target.value })}
            required
          />
          <TextField
            label="Progress"
            type="number"
            variant="outlined"
            fullWidth
            value={newAssignment.progress}
            onChange={(e) => setNewAssignment({ ...newAssignment, progress: Number(e.target.value) })}
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </Section>

      <Section elevation={3}>
        <Typography variant="h5" gutterBottom>
          Your Assignments
        </Typography>
        <Grid container spacing={2}>
          {assignments.map((assignment) => (
            <Grid item xs={12} sm={6} md={4} key={assignment.id}>
              <Paper elevation={2}>
                <Box p={2}>
                  <Typography variant="h6">{assignment.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Deadline: {new Date(assignment.deadline).toLocaleDateString()}
                  </Typography>
                  <ProgressContainer>
                    <ProgressBar variant="determinate" value={assignment.progress} />
                    <Typography variant="body2" color="textSecondary">
                      {assignment.progress}%
                    </Typography>
                  </ProgressContainer>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section elevation={3}>
        <Typography variant="h5" gutterBottom>
          Notifications
        </Typography>
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>
              <Typography variant="body2">{notification.message}</Typography>
              <Typography variant="caption" color="textSecondary">
                {new Date(notification.timestamp).toLocaleString()}
              </Typography>
            </li>
          ))}
        </ul>
      </Section>

      <Section elevation={3}>
        <Typography variant="h5" gutterBottom>
          Send a Message
        </Typography>
        <form onSubmit={handleMessageSubmit}>
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Send
          </Button>
        </form>
      </Section>
    </ContainerStyled>
  );
};

export default WritersDashboard;