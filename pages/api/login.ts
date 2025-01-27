import type { NextApiRequest, NextApiResponse } from 'next';
import { findUser } from './userStorage';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if user exists
    const existingUser = await findUser(email, password);
    if (!existingUser) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Successful login
    const { role } = existingUser; // Get the user's role
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT secret is not defined' });
    }
    const token = jwt.sign({ email, role }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generate JWT

    return res.status(200).json({ token, redirect: role === 'student' ? '/student-dashboard' : role === 'admin' ? '/admin-dashboard' : '/writer-dashboard' });
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
