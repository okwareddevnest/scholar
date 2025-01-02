"use client";

import React, { useState } from 'react';
import Image from 'next/image'; // Import Image from Next.js

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Show introductory message when chat opens
      setMessages(prevMessages => [...prevMessages, { sender: 'Bot', text: 'Hello! I am your virtual assistant. How can I help you today?' }]);
    }
  };

  const handleSendMessage = () => {
    if (userMessage.trim()) {
      // Add user message to the chat
      setMessages(prevMessages => [...prevMessages, { sender: 'User', text: userMessage }]);
      
      // Define common questions and responses
      const responses: { [key: string]: string } = {
        "what services do you offer?": "We offer a variety of academic writing services, including essays, research papers, and more.",
        "how can I contact support?": "You can contact support via email at support@example.com.",
        "what is your revision policy?": "We offer free revisions within a certain timeframe after the order is completed.",
        "is my information secure?": "Yes, we take your privacy seriously and ensure that all personal information is kept confidential."
      };

      // Check for a matching response
      const lowerCaseMessage = userMessage.toLowerCase();
      const botResponse = responses[lowerCaseMessage] || "I'm sorry, I didn't understand that. Can you please ask something else?";

      // Simulate bot response
      setMessages(prevMessages => [...prevMessages, { sender: 'Bot', text: botResponse }]);
      
      // Clear the input
      setUserMessage('');
    }
  };

  return (
    <div>
      <button 
        onClick={toggleChat} 
        className="fixed bottom-4 right-4 p-3 bg-transparent border-none"
        title={isOpen ? "Dismiss Chat" : "Chat with our Virtual Assistant"} // Tooltip for the chatbot icon
      >
        <Image 
          src="/images/Girl_with_headset.webp" // Adjust the path as necessary
          alt="Chatbot"
          width={80} // Standard width of the image
          height={80} // Standard height of the image
          className="rounded-full shadow-lg cursor-pointer"
        />
      </button>
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-96 bg-white shadow-lg rounded-lg p-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold mb-2">Chat with us!</h3>
            <button 
              onClick={toggleChat} 
              className="text-gray-500"
              title="Close Chat"
            >
              &times; {/* Close button */}
            </button>
          </div>
          <div className="h-40 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender === 'User' ? 'text-right' : 'text-left'}>
                <p className={msg.sender === 'User' ? 'text-blue-500' : 'text-gray-700'}>
                  {msg.text}
                </p>
              </div>
            ))}
          </div>
          <input 
            type="text" 
            value={userMessage} 
            onChange={(e) => setUserMessage(e.target.value)} 
            placeholder="Type your message..." 
            className="border rounded w-full p-2 mt-2"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button 
            onClick={handleSendMessage} 
            className="mt-2 w-full bg-blue-600 text-white rounded p-2"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;