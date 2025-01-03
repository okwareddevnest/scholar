import { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../lib/db';
import bcrypt from 'bcrypt';
import { ResultSetHeader } from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        try {
            const [result, fields] = await connection.query('SELECT id, username, password FROM users WHERE username = ? AND password = ?', [username, password]) as unknown as [ { id: number; username: string; password: string; }[], ResultSetHeader ];
            const user = result[0];

            if (user && (await bcrypt.compare(password, user.password))) {
                res.status(200).json({ message: 'Login successful', userId: user.id });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Login failed' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}