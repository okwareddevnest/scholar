'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  IconButton,
  Divider,
  Tab,
  Tabs,
  Switch,
  FormControlLabel,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  PhotoCamera as PhotoCameraIcon,
  Add as AddIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'I am a dedicated student passionate about learning and helping others succeed.',
    university: 'Example University',
    major: 'Computer Science',
    graduationYear: '2025',
    skills: ['Mathematics', 'Physics', 'Programming'],
    languages: ['English', 'Spanish'],
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    privacy: {
      showProfile: true,
      showActivity: true,
      showRatings: true,
    },
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    // Save profile data - replace with actual API call
    setIsEditing(false);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const handleSkillDelete = (skillToDelete: string) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToDelete),
    }));
  };

  const handleLanguageDelete = (languageToDelete: string) => {
    setProfileData((prev) => ({
      ...prev,
      languages: prev.languages.filter((language) => language !== languageToDelete),
    }));
  };

  const handleAddSkill = () => {
    const newSkill = prompt('Enter new skill:');
    if (newSkill && !profileData.skills.includes(newSkill)) {
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }));
    }
  };

  const handleAddLanguage = () => {
    const newLanguage = prompt('Enter new language:');
    if (newLanguage && !profileData.languages.includes(newLanguage)) {
      setProfileData((prev) => ({
        ...prev,
        languages: [...prev.languages, newLanguage],
      }));
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {showSaveSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Profile updated successfully!
        </Alert>
      )}

      <Paper sx={{ mb: 3 }}>
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              sx={{ width: 120, height: 120 }}
              alt={`${profileData.firstName} ${profileData.lastName}`}
              src="/avatars/profile.jpg"
            />
            <IconButton
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: 'background.paper',
              }}
              size="small"
            >
              <PhotoCameraIcon />
            </IconButton>
          </Box>
          <Box sx={{ ml: 3, flex: 1 }}>
            <Typography variant="h4">
              {profileData.firstName} {profileData.lastName}
            </Typography>
            <Typography color="textSecondary">{profileData.email}</Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {profileData.bio}
            </Typography>
          </Box>
          <Box>
            {!isEditing ? (
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleEdit}
              >
                Edit Profile
              </Button>
            ) : (
              <Box>
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={handleCancel}
                  sx={{ mr: 1 }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                >
                  Save
                </Button>
              </Box>
            )}
          </Box>
        </Box>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="profile tabs"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Personal Information" />
          <Tab label="Academic Details" />
          <Tab label="Settings" />
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="First Name"
                value={profileData.firstName}
                disabled={!isEditing}
                onChange={(e) =>
                  setProfileData({ ...profileData, firstName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={profileData.lastName}
                disabled={!isEditing}
                onChange={(e) =>
                  setProfileData({ ...profileData, lastName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                value={profileData.email}
                disabled={!isEditing}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                value={profileData.phone}
                disabled={!isEditing}
                onChange={(e) =>
                  setProfileData({ ...profileData, phone: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Bio"
                value={profileData.bio}
                disabled={!isEditing}
                onChange={(e) =>
                  setProfileData({ ...profileData, bio: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="University"
                value={profileData.university}
                disabled={!isEditing}
                onChange={(e) =>
                  setProfileData({ ...profileData, university: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Major"
                value={profileData.major}
                disabled={!isEditing}
                onChange={(e) =>
                  setProfileData({ ...profileData, major: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Graduation Year"
                value={profileData.graduationYear}
                disabled={!isEditing}
                onChange={(e) =>
                  setProfileData({ ...profileData, graduationYear: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Skills
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {profileData.skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    onDelete={isEditing ? () => handleSkillDelete(skill) : undefined}
                  />
                ))}
                {isEditing && (
                  <Chip
                    icon={<AddIcon />}
                    label="Add Skill"
                    onClick={handleAddSkill}
                    variant="outlined"
                  />
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Languages
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {profileData.languages.map((language) => (
                  <Chip
                    key={language}
                    label={language}
                    onDelete={isEditing ? () => handleLanguageDelete(language) : undefined}
                  />
                ))}
                {isEditing && (
                  <Chip
                    icon={<AddIcon />}
                    label="Add Language"
                    onClick={handleAddLanguage}
                    variant="outlined"
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Notification Preferences
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={profileData.notifications.email}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        notifications: {
                          ...profileData.notifications,
                          email: e.target.checked,
                        },
                      })
                    }
                  />
                }
                label="Email Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={profileData.notifications.push}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        notifications: {
                          ...profileData.notifications,
                          push: e.target.checked,
                        },
                      })
                    }
                  />
                }
                label="Push Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={profileData.notifications.sms}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        notifications: {
                          ...profileData.notifications,
                          sms: e.target.checked,
                        },
                      })
                    }
                  />
                }
                label="SMS Notifications"
              />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Privacy Settings
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={profileData.privacy.showProfile}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        privacy: {
                          ...profileData.privacy,
                          showProfile: e.target.checked,
                        },
                      })
                    }
                  />
                }
                label="Show Profile to Other Users"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={profileData.privacy.showActivity}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        privacy: {
                          ...profileData.privacy,
                          showActivity: e.target.checked,
                        },
                      })
                    }
                  />
                }
                label="Show Activity History"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={profileData.privacy.showRatings}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        privacy: {
                          ...profileData.privacy,
                          showRatings: e.target.checked,
                        },
                      })
                    }
                  />
                }
                label="Show Ratings and Reviews"
              />
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </Box>
  );
} 