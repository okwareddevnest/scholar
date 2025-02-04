import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { Phone } from 'lucide-react';

dotenv.config();

console.log('MYSQL_HOST:', process.env.MYSQL_HOST);
console.log('MYSQL_USER:', process.env.MYSQL_USER);
console.log('MYSQL_PASSWORD:', process.env.MYSQL_PASSWORD ? '******' : 'NOT SET');
console.log('MYSQL_DATABASE:', process.env.MYSQL_DATABASE);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Create a connection to the database
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    // Verify the connection
    await connection.ping();
    console.log('Database connection successful');

    if (req.method === 'GET') {
      // Query the database
      const [rows] = await connection.execute('SELECT * FROM contact_form');
      res.status(200).json(rows);
    } else if (req.method === 'POST') {
      const { name, email, phone, message } = req.body;
      console.log('Received data:', { name, email, phone, message });

      // Insert data into the database
      const [result] = await connection.execute(
        'INSERT INTO contact_form (name, email, phone, message) VALUES (?, ?, ?, ?)',
        [name, email, phone, message]
      );

      console.log('Insert result:', result);
      res.status(200).json({ message: 'Data inserted successfully' });
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}