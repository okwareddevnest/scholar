import { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../lib/db';
import bcrypt from 'bcrypt';
import { ResultSetHeader, FieldPacket } from 'mysql2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { username, password, email, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const [result, fieldPacket]: [ResultSetHeader, FieldPacket[]] = await connection.query('INSERT INTO Users (username, password, email, role) VALUES (?, ?, ?, ?)', [username, hashedPassword, email, role]);
            res.status(201).json({ id: result.insertId, username, email });
        } catch (error) {
            res.status(500).json({ error: 'User registration failed' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}