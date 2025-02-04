import type { NextApiRequest, NextApiResponse } from 'next';
import { addUser, findUserByEmail } from './userStorage';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      // Check if user already exists
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }

      // Register the user
      await addUser(email, password); // Await the addUser function
      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error: any) {
      console.error('Error during signup:', error); // Log the error details
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
