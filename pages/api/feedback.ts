import { NextApiRequest, NextApiResponse } from 'next';

// Define the type for feedback
interface Feedback {
  rating: number;
  comment: string;
  id: number;
  date: string; // Add date field
  responses: { adminComment: string; date: string }[]; // Add responses field
}

// Mock database array to store feedback temporarily
let feedbacks: Feedback[] = [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { rating, comment } = req.body;
    feedbacks.push({ 
      rating, 
      comment, 
      id: feedbacks.length + 1, 
      date: new Date().toISOString(), // Include current date
      responses: [] // Initialize responses as an empty array
    });
    res.status(200).json({ message: 'Feedback submitted successfully!' });
  } else if (req.method === 'GET') {
    res.status(200).json(feedbacks);
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}