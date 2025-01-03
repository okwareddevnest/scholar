// pages/api/support-tickets.ts

import type { NextApiRequest, NextApiResponse } from 'next';

interface SupportTicket {
  id: number;
  subject: string;
  description: string;
  status: string; // e.g., "open", "in progress", "resolved"
}

let tickets: SupportTicket[] = []; // This would normally be a database

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const newTicket: SupportTicket = { id: tickets.length + 1, status: 'open', ...req.body };
    tickets.push(newTicket);
    res.status(201).json(newTicket);
  } else if (req.method === 'GET') {
    res.status(200).json(tickets);
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}