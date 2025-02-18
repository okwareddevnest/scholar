'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useSocket } from '@/hooks/useSocket';

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: string;
  priority: string;
  description: string;
}

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredAssignments, setFilteredAssignments] = useState<Assignment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [isNewAssignmentOpen, setIsNewAssignmentOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState<Partial<Assignment>>({
    title: '',
    subject: '',
    dueDate: '',
    priority: 'medium',
    description: '',
  });
  const socket = useSocket();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch('/api/assignments');
        if (response.ok) {
          const data = await response.json();
          setAssignments(data);
          setFilteredAssignments(data);
        }
      } catch (error) {
        console.error('Error fetching assignments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();

    socket.subscribeToAssignments((data) => {
      if (data.assignments) {
        setAssignments(data.assignments);
        setFilteredAssignments(data.assignments);
      }
    });
  }, [socket]);

  useEffect(() => {
    let result = assignments;

    if (searchTerm) {
      result = result.filter(
        (assignment) =>
          assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          assignment.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter((assignment) => assignment.status === statusFilter);
    }

    if (subjectFilter !== 'all') {
      result = result.filter((assignment) => assignment.subject === subjectFilter);
    }

    setFilteredAssignments(result);
  }, [searchTerm, statusFilter, subjectFilter, assignments]);

  const handleNewAssignment = async () => {
    try {
      const response = await fetch('/api/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAssignment),
      });

      if (response.ok) {
        const data = await response.json();
        setAssignments([...assignments, data.assignment]);
        setIsNewAssignmentOpen(false);
        setNewAssignment({
          title: '',
          subject: '',
          dueDate: '',
          priority: 'medium',
          description: '',
        });
      }
    } catch (error) {
      console.error('Error creating assignment:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Assignments</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsNewAssignmentOpen(true)}
        >
          New Assignment
        </Button>
      </Box>

      {/* Filters */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="Not Started">Not Started</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Subject</InputLabel>
            <Select
              value={subjectFilter}
              label="Subject"
              onChange={(e) => setSubjectFilter(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              {Array.from(new Set(assignments.map(a => a.subject))).map(subject => (
                <MenuItem key={subject} value={subject}>{subject}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Assignments List */}
      <Grid container spacing={2}>
        {filteredAssignments.length === 0 ? (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" align="center">
                  No assignments found
                </Typography>
                <Typography color="textSecondary" align="center">
                  Create your first assignment to get started!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          filteredAssignments.map((assignment) => (
            <Grid item xs={12} md={6} lg={4} key={assignment.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {assignment.title}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {assignment.subject}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {assignment.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip
                      label={assignment.status}
                      color={
                        assignment.status === 'Completed'
                          ? 'success'
                          : assignment.status === 'In Progress'
                          ? 'warning'
                          : 'default'
                      }
                    />
                    <Typography variant="body2" color="textSecondary">
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* New Assignment Dialog */}
      <Dialog
        open={isNewAssignmentOpen}
        onClose={() => setIsNewAssignmentOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">New Assignment</Typography>
            <IconButton onClick={() => setIsNewAssignmentOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  value={newAssignment.title}
                  onChange={(e) =>
                    setNewAssignment({ ...newAssignment, title: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Subject"
                  value={newAssignment.subject}
                  onChange={(e) =>
                    setNewAssignment({ ...newAssignment, subject: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="date"
                  label="Due Date"
                  InputLabelProps={{ shrink: true }}
                  value={newAssignment.dueDate}
                  onChange={(e) =>
                    setNewAssignment({ ...newAssignment, dueDate: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={newAssignment.priority}
                    label="Priority"
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        priority: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  value={newAssignment.description}
                  onChange={(e) =>
                    setNewAssignment({
                      ...newAssignment,
                      description: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsNewAssignmentOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleNewAssignment}
            disabled={!newAssignment.title || !newAssignment.dueDate}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 