// pages/api/ratings.ts

import type { NextApiRequest, NextApiResponse } from 'next';

interface Rating {
  writerId: number;
  rating: number;
}

let ratings: Rating[] = []; // This would normally be a database

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const newRating: Rating = req.body;
    ratings.push(newRating);
    res.status(201).json(newRating);
  } else if (req.method === 'GET') {
    res.status(200).json(ratings);
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}