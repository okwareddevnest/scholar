import { Server } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';

const io = new Server();

const SocketHandler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        res.status(200).json({ message: 'Socket.IO server is running' });
    }
};

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', (msg) => {
        io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

export default SocketHandler;
