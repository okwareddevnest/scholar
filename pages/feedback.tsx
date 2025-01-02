"use client"; // Add this line at the top

import { useState, useEffect } from 'react';
import './feedback.css'; // Import a CSS file for styles

const Feedback = () => {
  const [rating, setRating] = useState<number>(1);
  const [comment, setComment] = useState<string>('');
  const [feedbacks, setFeedbacks] = useState<{ id: number; rating: number; comment: string; date: string; responses: { adminComment: string; date: string }[] }[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<string>('asc'); // 'asc' or 'desc'
  const [adminResponse, setAdminResponse] = useState<string>('');

  const fetchFeedbacks = async () => {
    const response = await fetch('/api/feedback');
    const data = await response.json();
    setFeedbacks(data);
    calculateAverageRating(data); // Calculate average rating
  };

  const calculateAverageRating = (feedbacks: { rating: number }[]) => {
    const total = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
    const average = feedbacks.length > 0 ? total / feedbacks.length : 0;
    setAverageRating(average);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating, comment }),
    });
    setComment('');
    fetchFeedbacks(); // Refresh the feedback list
  };

  const handleResponseSubmit = async (feedbackId: number) => {
    // Find the feedback entry by ID and add the response
    const updatedFeedbacks = feedbacks.map(feedback => {
      if (feedback.id === feedbackId) {
        return {
          ...feedback,
          responses: [
            ...feedback.responses,
            { adminComment: adminResponse, date: new Date().toISOString() }
          ]
        };
      }
      return feedback;
    });

    setFeedbacks(updatedFeedbacks);
    setAdminResponse(''); // Clear the input field
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    return filterRating ? feedback.rating === filterRating : true;
  });

  const sortedFeedbacks = filteredFeedbacks.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  useEffect(() => {
    fetchFeedbacks(); // Fetch feedbacks on component mount
  }, []);

  return (
    <div className="feedback-container">
      <h1>Feedback</h1>
      <div className="filter-sort">
        <label>
          Filter by Rating:
          <select onChange={(e) => setFilterRating(Number(e.target.value))} value={filterRating || ''}>
            <option value="">All</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </label>
        <label>
          Sort by Date:
          <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
            <option value="asc">Oldest First</option>
            <option value="desc">Newest First</option>
          </select>
        </label>
      </div>
      <div className="average-rating">
        <h2>Average Rating: {averageRating.toFixed(1)} ⭐</h2>
        <div>
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} style={{ color: index < averageRating ? 'gold' : 'lightgray' }}>★</span>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="feedback-form">
        <label>
          Rating:
          <input
            type="number"
            value={rating}
            min="1"
            max="5"
            onChange={(e) => setRating(Number(e.target.value))}
            required
            className="feedback-input"
          />
        </label>
        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="feedback-textarea"
          />
        </label>
        <button type="submit" className="feedback-button">Submit Feedback</button>
      </form>

      <h2>Existing Feedbacks</h2>
      <ul className="feedback-list">
        {sortedFeedbacks.map((feedback) => (
          <li key={feedback.id} className="feedback-item">
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
                value={adminResponse}
                onChange={(e) => setAdminResponse(e.target.value)}
                placeholder="Write your response here..."
              />
              <button onClick={() => handleResponseSubmit(feedback.id)}>Submit Response</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feedback;