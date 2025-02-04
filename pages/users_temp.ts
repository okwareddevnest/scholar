import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../lib/db'; // Ensure the query function is imported

let users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const result = await query('SELECT * FROM users'); // Adjusted to use the query function
    res.status(200).json(result.rows); // Accessing rows from the result
  } else if (req.method === 'POST') {
    const newUser = req.body;
    const result = await query('INSERT INTO users SET ?', newUser); // Example insert query
    res.status(201).json({ id: result.insertId, ...newUser }); // Accessing insertId from the result
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
