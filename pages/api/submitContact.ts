import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../lib/mongodb';
import Contact from '../../models/Contact';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await connectDB();
    
    const contact = await Contact.create({
      name,
      email,
      phone,
      message
    });

    return res.status(201).json(contact);
  } catch (error: any) {
    console.error('Error saving contact form:', error);
    return res.status(500).json({ error: 'Database error', details: error.message });
  }
}