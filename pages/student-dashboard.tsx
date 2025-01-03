import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Grid,
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  Badge,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/system';
import { AttachFile, Send, Notifications, AccountCircle } from '@mui/icons-material';

interface Assignment {
  id: number;
  title: string;
  description: string;
  studentId: number;
  deadline: string;
  rate: number;
  status: string;
  feedback: string;
  progress: number; // Added progress property (0-100%)
}

interface Notification {
  id: number;
  message: string;
  timestamp: Date;
}

interface Message {
  studentId: number;
  content: string;
}

const ContainerStyled = styled(Container)({
  marginTop: '20px',
});

const Section = styled(Paper)({
  marginBottom: '40px',
  padding: '20px',
});

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
});

const Input = styled(TextField)({
  marginBottom: '10px',
});

const ButtonStyled = styled(Button)({
  alignSelf: 'flex-start',
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

const StudentDashboard = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [newAssignment, setNewAssignment] = useState<Assignment>({
    id: 0,
    title: '',
    description: '',
    studentId: 1,
    deadline: '',
    rate: 0,
    status: '',
    feedback: '',
    progress: 0,
  });
  const [file, setFile] = useState<File | null>(null);
  const [newMessage, setNewMessage] = useState<Message>({ studentId: 1, content: '' });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);

  // Profile management state
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
    const response = await fetch('/api/assignments');
    const data: Assignment[] = await response.json();
    setAssignments(data);
  };

  const fetchNotifications = async () => {
    const response = await fetch('/api/notifications');
    const data: Notification[] = await response.json();
    setNotifications(data);
  };

  const fetchUserProfile = async () => {
    const response = await fetch('/api/user/profile');
    const data = await response.json();
    setProfile(data);
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

  const handleAssignmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newAssignment.title);
    formData.append('description', newAssignment.description);
    formData.append('studentId', String(newAssignment.studentId));
    formData.append('deadline', newAssignment.deadline);
    formData.append('rate', String(newAssignment.rate));
    if (file) {
      formData.append('file', file);
    }

    const response = await fetch('/api/assignments/submit', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      setNewAssignment({ id: 0, title: '', description: '', studentId: 1, deadline: '', rate: 0, status: '', feedback: '', progress: 0 });
      setFile(null);
      fetchAssignments();
      fetchNotifications();
    } else {
      alert('Failed to submit assignment.');
    }
  };

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMessage),
    });

    if (response.ok) {
      setNewMessage({ studentId: 1, content: '' });
    } else {
      alert('Failed to send message.');
    }
  };

  const handleResubmit = (assignment: Assignment) => {
    setNewAssignment(assignment);
    setFile(null);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'green';
      case 'pending':
        return 'orange';
      case 'overdue':
        return 'red';
      default:
        return 'gray';
    }
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  return (
    <ContainerStyled>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Student Dashboard
          </Typography>
          <IconButton color="inherit" onClick={handleNotificationClick}>
            <Badge badgeContent={notifications.length} color="secondary">
              <Notifications />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleNotificationClose}
          >
            {notifications.map((notification) => (
              <MenuItem key={notification.id} onClick={handleNotificationClose}>
                {notification.message}
              </MenuItem>
            ))}
          </Menu>
          <IconButton color="inherit" onClick={handleProfileClick}>
            <Avatar alt={profile.name} src={profile.profilePicture ? URL.createObjectURL(profile.profilePicture) : undefined}>
              <AccountCircle />
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={handleProfileClose}
          >
            <MenuItem onClick={handleProfileClose}>View Profile</MenuItem>
            <MenuItem onClick={handleProfileClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Section elevation={3}>
        <Typography variant="h5" gutterBottom>
          Update Profile
        </Typography>
        <Form onSubmit={handleProfileUpdate}>
          <Input
            label="Name"
            variant="outlined"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            required
          />
          <Input
            label="Email"
            variant="outlined"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            required
          />
          <Input
            label="New Password"
            type="password"
            variant="outlined"
            value={profile.password}
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
          />
          <ButtonStyled
            variant="contained"
            startIcon={<AttachFile />}
          >
            Upload Profile Picture
            <input
              type="file"
              hidden
              onChange={(e) => setProfile({ ...profile, profilePicture: e.target.files ? e.target.files[0] : null })}
            />
          </ButtonStyled>
          <FormControlLabel
            control={
              <Checkbox
                checked={profile.notificationPreferences.emailNotifications}
                onChange={(e) => setProfile({ ...profile, notificationPreferences: { ...profile.notificationPreferences, emailNotifications: e.target.checked } })}
              />
            }
            label="Email Notifications"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={profile.notificationPreferences.smsNotifications}
                onChange={(e) => setProfile({ ...profile, notificationPreferences: { ...profile.notificationPreferences, smsNotifications: e.target.checked } })}
              />
            }
            label="SMS Notifications"
          />
          <ButtonStyled type="submit" variant="contained" color="primary">
            Update Profile
          </ButtonStyled>
        </Form>
      </Section>

      <Section elevation={3}>
        <Typography variant="h5" gutterBottom>
          Post Assignment
        </Typography>
        <Form onSubmit={handleAssignmentSubmit}>
          <Input
            label="Title"
            variant="outlined"
            value={newAssignment.title}
            onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
            required
          />
          <Input
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            value={newAssignment.description}
            onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
            required
          />
          <Input
            label="Deadline"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={newAssignment.deadline}
            onChange={(e) => setNewAssignment({ ...newAssignment, deadline: e.target.value })}
            required
          />
          <Input
            label="Rate (in dollars)"
            type="number"
            variant="outlined"
            value={newAssignment.rate}
            onChange={(e) => setNewAssignment({ ...newAssignment, rate: Number(e.target.value) })}
            required
          />
          <ButtonStyled
            variant="contained"
            startIcon={<AttachFile />}
          >
            Upload File
            <input
              type="file"
              hidden
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            />
          </ButtonStyled>
          <ButtonStyled type="submit" variant="contained" color="primary">
            Submit
          </ButtonStyled>
        </Form>
      </Section>

      <Section elevation={3}>
        <Typography variant="h5" gutterBottom>
          Assignment Progress Tracker
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
                    <ProgressBar
                      variant="determinate"
                      value={assignment.progress}
                      style={{ backgroundColor: getStatusColor(assignment.status) }}
                    />
                    <Typography variant="body2" color="textSecondary">
                      {assignment.progress}%
                    </Typography>
                  </ProgressContainer>
                  <ButtonStyled
                    variant="contained"
                    color="secondary"
                    onClick={() => handleResubmit(assignment)}
                  >
                    Resubmit
                  </ButtonStyled>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section elevation={3}>
        <Typography variant="h5" gutterBottom>
          Send a Message
        </Typography>
        <Form onSubmit={handleMessageSubmit}>
          <Input
            label="Message"
            variant="outlined"
            multiline
            rows={4}
            value={newMessage.content}
            onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
            required
          />
          <ButtonStyled type="submit" variant="contained" color="primary" startIcon={<Send />}>
            Send
          </ButtonStyled>
        </Form>
      </Section>
    </ContainerStyled>
  );
};

export default StudentDashboard;