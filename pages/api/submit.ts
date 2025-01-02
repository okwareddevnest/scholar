import { NextApiRequest, NextApiResponse } from 'next';
import connection from 'db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, phone, message, location } = req.body;

    const query = 'INSERT INTO contacts (name, email, phone, message, location) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [name, email, phone, message, location], (err: any, results: any) => {
      if (err) {  
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ id: results.insertId, name, email, phone, message, location });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}