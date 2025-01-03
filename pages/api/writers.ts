// pages/api/writers.ts

import type { NextApiRequest, NextApiResponse } from 'next';

interface Writer {
  id: number;
  name: string;
  email: string;
  expertise: string;
  experience: string;
}

let writers: Writer[] = []; // This would normally be a database

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Create a new writer
    const newWriter: Writer = { id: writers.length + 1, ...req.body };
    writers.push(newWriter);
    res.status(201).json(newWriter);
  } else if (req.method === 'GET') {
    // Get all writers
    res.status(200).json(writers);
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}