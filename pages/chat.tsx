import { useEffect } from 'react';
import '../public/chatbot.css'; // Ensure you're importing the CSS file

const Chat = () => {
    useEffect(() => {
        const sendButton = document.getElementById('send-button');
        sendButton?.addEventListener('click', async () => {
            const input = document.getElementById('user-input') as HTMLInputElement;
            const message = input.value;
            input.value = '';

            const messagesDiv = document.getElementById('chat-messages');
            messagesDiv?.insertAdjacentHTML('beforeend', `<div class="user-message">User: ${message}</div>`);

            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            const data = await response.json();
            messagesDiv?.insertAdjacentHTML('beforeend', `<div class="chatbot-message">Chatbot: ${data.reply}</div>`);
        });
    }, []);

    return (
        <div className="chat-container" id="chatbot">
            <div className="chat-header">
                <img src="/images/Girl_with_headset.webp" alt="Chat Bot" className="chat-bot-image" />
            </div>
            <div className="chat-messages" id="chat-messages"></div>
            <div className="chat-input">
                <input type="text" id="user-input" placeholder="Type a message..." />
                <button id="send-button">Send</button>
            </div>
        </div>
    );
};

export default Chat;