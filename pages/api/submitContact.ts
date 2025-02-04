import { NextApiRequest, NextApiResponse } from 'next';
import getConnection from '../../../lib/dbConnection'; // Ensure this is the correct path

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      const connection = await getConnection();
      const [result]: any = await connection.execute(
        'INSERT INTO contact_form (name, email, phone, message) VALUES (?, ?, ?, ?)',
        [name, email, phone, message]
      );
      await connection.end();
      const insertId = result.insertId;
      return res.status(201).json({ id: insertId, name, email, phone, message });
    } catch (error: any) { // Specify the type of error
      console.error('Error inserting into database:', error);
      return res.status(500).json({ error: 'Database error', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}