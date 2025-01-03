"use client"; // Add this line at the top

import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextareaAutosize,
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2'; // Import Chart.js for bar charts
import './admin-dashboard.css'; // Import CSS for styles

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Feedback {
  rating: number;
  comment: string;
  id: number;
  date: string;
  responses: { adminComment: string; date: string }[];
}

interface Writer {
  id: number;
  name: string;
  email: string;
  expertise: string;
  experience: string;
  averageRating: number; // Average rating for the writer
  totalRatings: number; // Total number of ratings received
}

interface Task {
  id: number;
  title: string;
  description: string;
  writerId: number; // ID of the writer the task is assigned to
  completed: boolean; // Track if the task is completed
  deadline: string; // Deadline for the task
}

interface SupportTicket {
  id: number;
  subject: string;
  description: string;
  status: string;
}

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [writers, setWriters] = useState<Writer[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]); // Initialize tasks state
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [labels, setLabels] = useState<string[]>([]);
  const [dataPoints, setDataPoints] = useState<number[]>([]);
  const [adminResponse, setAdminResponse] = useState<{ [key: number]: string }>({});
  const [newWriter, setNewWriter] = useState({ name: '', email: '', expertise: '', experience: '' });
  const [selectedWriter, setSelectedWriter] = useState<number | null>(null);
  const [newTask, setNewTask] = useState({ title: '', description: '', deadline: '' });
  const [newTicket, setNewTicket] = useState({ subject: '', description: '' });

  const fetchFeedbacks = async () => {
    const response = await fetch('/api/feedback');
    const data: Feedback[] = await response.json();
    setFeedbacks(data);
    calculateAverageRating(data);
    calculateFeedbackTrends(data);
  };

  const fetchWriters = async () => {
    const response = await fetch('/api/writers');
    const data: Writer[] = await response.json();
    setWriters(data);
  };

  const fetchTasks = async () => {
    const response = await fetch('/api/tasks');
    const data: Task[] = await response.json();
    setTasks(data);
  };

  const fetchRatings = async () => {
    const response = await fetch('/api/ratings');
    const data = await response.json();
    // Process ratings to calculate average ratings for writers
    const writerRatings = writers.map(writer => {
      const writerRatings = data.filter((rating: { writerId: number; rating: number }) => rating.writerId === writer.id);
      const totalRating = writerRatings.reduce((sum: number, rating: { rating: number }) => sum + rating.rating, 0);
      const averageRating = writerRatings.length > 0 ? totalRating / writerRatings.length : 0;
      return { ...writer, averageRating, totalRatings: writerRatings.length };
    });
    setWriters(writerRatings);
  };

  const fetchSupportTickets = async () => {
    const response = await fetch('/api/support-tickets');
    const data: SupportTicket[] = await response.json();
    setSupportTickets(data);
  };

  const calculateAverageRating = (feedbacks: Feedback[]) => {
    const total = feedbacks.reduce((sum: number, feedback: Feedback) => sum + feedback.rating, 0);
    const average = feedbacks.length > 0 ? total / feedbacks.length : 0;
    setAverageRating(average);
  };

  const calculateFeedbackTrends = (feedbacks: Feedback[]) => {
    const ratingsCount = Array(5).fill(0);
    feedbacks.forEach((feedback: Feedback) => {
      ratingsCount[feedback.rating - 1] += 1; // Count ratings
    });

    setLabels(['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars']);
    setDataPoints(ratingsCount);
  };

  const handleResponseSubmit = (feedbackId: number) => {
    const updatedFeedbacks = feedbacks.map(feedback => {
      if (feedback.id === feedbackId) {
        return {
          ...feedback,
          responses: [
            ...feedback.responses,
            { adminComment: adminResponse[feedbackId] || '', date: new Date().toISOString() }
          ]
        };
      }
      return feedback;
    });

    setFeedbacks(updatedFeedbacks);
    setAdminResponse(prev => ({ ...prev, [feedbackId]: '' })); // Clear the input field for this feedback
  };

  const handleWriterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/writers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newWriter),
    });
    const writer: Writer = await response.json();
    setWriters(prev => [...prev, writer]);
    setNewWriter({ name: '', email: '', expertise: '', experience: '' }); // Clear the form
  };

  const handleTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedWriter) {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newTask, writerId: selectedWriter }),
      });
      const task: Task = await response.json();
      setTasks(prev => [...prev, task]);
      setNewTask({ title: '', description: '', deadline: '' }); // Clear the form
    }
  };

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/support-tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTicket),
    });
    const ticket: SupportTicket = await response.json();
    setSupportTickets(prev => [...prev, ticket]);
    setNewTicket({ subject: '', description: '' }); // Clear the form
  };

  const markTaskAsCompleted = async (taskId: number) => {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: true }),
    });
    if (response.ok) {
      setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? { ...task, completed: true } : task));
    }
  };

  useEffect(() => {
    fetchFeedbacks(); // Fetch feedbacks on component mount
    fetchWriters(); // Fetch writers on component mount
    fetchTasks(); // Fetch tasks on component mount
    fetchRatings(); // Fetch ratings on component mount
    fetchSupportTickets(); // Fetch support tickets on component mount
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Average Rating: {averageRating.toFixed(1)} ⭐
        </Typography>
        <Bar
          data={{
            labels: labels,
            datasets: [
              {
                label: 'Number of Feedbacks',
                data: dataPoints,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
              },
            ],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </Paper>

      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Feedback List
        </Typography>
        {feedbacks.map(feedback => (
          <Box key={feedback.id} mb={2}>
            <Typography variant="body1"><strong>Rating:</strong> {feedback.rating}</Typography>
            <Typography variant="body1"><strong>Comment:</strong> {feedback.comment}</Typography>
            <Typography variant="body1"><strong>Date:</strong> {feedback.date}</Typography>
            <Box mt={1}>
              <Typography variant="h6">Responses:</Typography>
              {feedback.responses.map((response, index) => (
                <Box key={index} mb={1}>
                  <Typography variant="body2"><strong>Admin:</strong> {response.adminComment}</Typography>
                  <Typography variant="body2"><strong>Date:</strong> {response.date}</Typography>
                </Box>
              ))}
              <TextareaAutosize
                minRows={3}
                placeholder="Write your response here..."
                value={adminResponse[feedback.id] || ''}
                onChange={(e) => setAdminResponse(prev => ({ ...prev, [feedback.id]: e.target.value }))}
                style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
              />
              <Button variant="contained" color="primary" onClick={() => handleResponseSubmit(feedback.id)}>
                Submit Response
              </Button>
            </Box>
          </Box>
        ))}
      </Paper>

      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Register Writer
        </Typography>
        <form onSubmit={handleWriterSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newWriter.name}
            onChange={(e) => setNewWriter({ ...newWriter, name: e.target.value })}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newWriter.email}
            onChange={(e) => setNewWriter({ ...newWriter, email: e.target.value })}
            required
          />
          <TextField
            label="Expertise"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newWriter.expertise}
            onChange={(e) => setNewWriter({ ...newWriter, expertise: e.target.value })}
            required
          />
          <TextField
            label="Experience"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newWriter.experience}
            onChange={(e) => setNewWriter({ ...newWriter, experience: e.target.value })}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Register Writer
          </Button>
        </form>
      </Paper>

      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Assign Task to Writer
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Select Writer</InputLabel>
          <Select
            value={selectedWriter || ''}
            onChange={(e) => setSelectedWriter(Number(e.target.value))}
            required
          >
            <MenuItem value="">
              <em>Select Writer</em>
            </MenuItem>
            {writers.map(writer => (
              <MenuItem key={writer.id} value={writer.id}>{writer.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <form onSubmit={handleTaskSubmit}>
          <TextField
            label="Task Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
          <TextField
            label="Task Description"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            required
          />
          <TextField
            label="Deadline"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={newTask.deadline}
            onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Assign Task
          </Button>
        </form>
      </Paper>

      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Current Tasks
        </Typography>
        {tasks.map(task => (
          <Box key={task.id} mb={2}>
            <Typography variant="body1"><strong>Title:</strong> {task.title}</Typography>
            <Typography variant="body1"><strong>Description:</strong> {task.description}</Typography>
            <Typography variant="body1"><strong>Assigned to Writer ID:</strong> {task.writerId}</Typography>
            <Typography variant="body1"><strong>Completed:</strong> {task.completed ? 'Yes' : 'No'}</Typography>
            <Button variant="contained" color="secondary" onClick={() => markTaskAsCompleted(task.id)}>
              Mark as Completed
            </Button>
          </Box>
        ))}
      </Paper>

      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Support Ticket System
        </Typography>
        <form onSubmit={handleTicketSubmit}>
          <TextField
            label="Subject"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newTicket.subject}
            onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={newTicket.description}
            onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Submit Ticket
          </Button>
        </form>
      </Paper>

      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Submitted Tickets
        </Typography>
        {supportTickets.map(ticket => (
          <Box key={ticket.id} mb={2}>
            <Typography variant="body1"><strong>Subject:</strong> {ticket.subject}</Typography>
            <Typography variant="body1"><strong>Description:</strong> {ticket.description}</Typography>
            <Typography variant="body1"><strong>Status:</strong> {ticket.status}</Typography>
          </Box>
        ))}
      </Paper>
    </Container>
  );
};

export default AdminDashboard;