import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io();

const ChatComponent = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState<string>('');

    useEffect(() => {
        socket.on('message', (message: string) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    const sendMessage = () => {
        if (input) {
            socket.emit('message', input);
            setInput('');
        }
    };

    return (
        <div style={{ position: 'fixed', right: 0, bottom: 0, width: '300px', border: '1px solid #ccc', padding: '10px' }}>
            <div style={{ height: '400px', overflowY: 'scroll' }}>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
            />
            <button 
                onClick={sendMessage} 
                style={{ backgroundColor: 'blue', color: 'white', padding: '5px 8px', border: 'none', borderRadius: '5px', fontSize: '12px' }}
            >
                Send
            </button>
        </div>
    );
};

export default ChatComponent;
