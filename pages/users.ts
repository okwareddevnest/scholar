import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../lib/db'; // Ensure the query function is imported

let users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req || !res) {
    res.status(500).json({ error: 'Request or response is not defined' });
    return;
  }

  if (req.method === 'GET') {
    const result = await query('SELECT * FROM users'); // Adjusted to use the query function
    res.status(200).json(result); // Directly return the result as it already contains the rows
  } else if (req.method === 'POST') {
    const newUser = req.body;
    const result = await query('INSERT INTO users SET ?', newUser); // Example insert query
    const [insertResult] = result as any; // Type assertion to access insertId
    res.status(201).json({ id: insertResult.insertId, ...newUser });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
