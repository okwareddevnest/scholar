import type { NextApiRequest, NextApiResponse } from 'next';

interface Notification {
  id: number;
  message: string;
  timestamp: Date;
}

let notifications: Notification[] = [
  { id: 1, message: 'Welcome to your dashboard!', timestamp: new Date() },
  { id: 2, message: 'You have 3 new assignments.', timestamp: new Date() },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(notifications);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
