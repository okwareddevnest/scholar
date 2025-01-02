"use client"; // Add this line at the top

import { useEffect, useState } from 'react';
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

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [labels, setLabels] = useState<string[]>([]);
  const [dataPoints, setDataPoints] = useState<number[]>([]);
  const [adminResponse, setAdminResponse] = useState<{ [key: number]: string }>({}); // Store responses by feedback ID

  const fetchFeedbacks = async () => {
    const response = await fetch('/api/feedback');
    const data = await response.json();
    setFeedbacks(data);
    calculateAverageRating(data);
    calculateFeedbackTrends(data);
  };

  const calculateAverageRating = (feedbacks: Feedback[]) => {
    const total = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
    const average = feedbacks.length > 0 ? total / feedbacks.length : 0;
    setAverageRating(average);
  };

  const calculateFeedbackTrends = (feedbacks: Feedback[]) => {
    const ratingsCount = Array(5).fill(0);
    feedbacks.forEach(feedback => {
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

  useEffect(() => {
    fetchFeedbacks(); // Fetch feedbacks on component mount
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <h2>Average Rating: {averageRating.toFixed(1)} ⭐</h2>
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
      <h2>Feedback List</h2>
      {feedbacks.map(feedback => (
        <div key={feedback.id} className="feedback-item">
          <strong>Rating:</strong> {feedback.rating} <br />
          <strong>Comment:</strong> {feedback.comment} <br />
          <strong>Date:</strong> {feedback.date}
          <div>
            <h3>Responses:</h3>
            {feedback.responses.map((response, index) => (
              <div key={index}>
                <strong>Admin:</strong> {response.adminComment} <br />
                <strong>Date:</strong> {response.date}
              </div>
            ))}
            <textarea
              value={adminResponse[feedback.id] || ''}
              onChange={(e) => setAdminResponse(prev => ({ ...prev, [feedback.id]: e.target.value }))}
              placeholder="Write your response here..."
            />
            <button onClick={() => handleResponseSubmit(feedback.id)}>Submit Response</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;