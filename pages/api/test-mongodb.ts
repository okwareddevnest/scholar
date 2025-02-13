import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();
    res.status(200).json({ message: 'Successfully connected to MongoDB' });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    res.status(500).json({ error: 'Failed to connect to MongoDB' });
  }
} 