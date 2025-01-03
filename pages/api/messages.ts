// pages/api/messages.ts

import { NextApiRequest, NextApiResponse } from 'next';

interface Message {
  id: number;
  studentId: number; // ID of the student sending the message
  content: string; // Message content
  status: string; // e.g., "sent", "delivered"
}

let messages: Message[] = []; // This would normally be a database

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { studentId, content } = req.body;

    const newMessage: Message = {
      id: messages.length + 1,
      studentId,
      content,
      status: 'sent',
    };
    messages.push(newMessage);
    res.status(201).json(newMessage);
  } else if (req.method === 'GET') {
    res.status(200).json(messages);
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}