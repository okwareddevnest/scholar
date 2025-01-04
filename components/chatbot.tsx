"use client";

import React, { useState } from 'react';
import Image from 'next/image'; // Import Image from Next.js
import { IconButton, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, Box } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

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
      <IconButton 
        onClick={toggleChat} 
        style={{ position: 'fixed', bottom: 16, right: 16, backgroundColor: 'transparent' }}
        title={isOpen ? "Dismiss Chat" : "Chat with our Virtual Assistant"} // Tooltip for the chatbot icon
      >
        <Avatar 
          src="/images/Girl_with_headset.webp" // Adjust the path as necessary
          alt="Chatbot"
          style={{ width: 80, height: 80 }}
        >
          <ChatIcon />
        </Avatar>
      </IconButton>
      <Dialog open={isOpen} onClose={toggleChat} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Chat with us!</Typography>
            <IconButton onClick={toggleChat} title="Close Chat">
              &times; {/* Close button */}
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box height={300} overflow="auto">
            {messages.map((msg, index) => (
              <Box key={index} textAlign={msg.sender === 'User' ? 'right' : 'left'} mb={1}>
                <Typography variant="body1" color={msg.sender === 'User' ? 'primary' : 'textSecondary'}>
                  {msg.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <TextField 
            fullWidth 
            variant="outlined" 
            placeholder="Type your message..." 
            value={userMessage} 
            onChange={(e) => setUserMessage(e.target.value)} 
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} variant="contained" color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Chatbot;