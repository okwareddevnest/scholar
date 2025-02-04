import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../lib/db';
import type { RowDataPacket } from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await query('SELECT NOW() AS now') as RowDataPacket[];
    res.status(200).json({ success: true, time: (result[0] as RowDataPacket).now });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ success: false, error: 'Database connection error' });
  }
}