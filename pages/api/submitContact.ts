import { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../../lib/dbConnection'; // Ensure this is the correct path

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email,phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      const [result]: any = await connection.execute(
        'INSERT INTO contact_form (name, email,phone, message) VALUES (?, ?, ?)',
        [name, email, message]
      );
      const insertId = result[0].insertId;
      return res.status(201).json({ id: insertId, name, email, message });
    } catch (error: any) { // Specify the type of error
      console.error('Error inserting into database:', error);
      return res.status(500).json({ error: 'Database error', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}