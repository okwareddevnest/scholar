'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  IconButton,
  Divider,
  Badge,
  InputAdornment,
} from '@mui/material';
import {
  Send as SendIcon,
  Search as SearchIcon,
  AttachFile as AttachFileIcon,
} from '@mui/icons-material';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
}

export default function MessagesPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    // Fetch contacts - replace with actual API call
    const mockContacts: Contact[] = [
      {
        id: '1',
        name: 'John Smith',
        avatar: '/avatars/john.jpg',
        lastMessage: 'Can you help me with the assignment?',
        lastMessageTime: '10:30 AM',
        unreadCount: 2,
        online: true,
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        avatar: '/avatars/sarah.jpg',
        lastMessage: 'Thanks for your help!',
        lastMessageTime: 'Yesterday',
        unreadCount: 0,
        online: false,
      },
      {
        id: '3',
        name: 'Michael Brown',
        avatar: '/avatars/michael.jpg',
        lastMessage: 'When is the deadline?',
        lastMessageTime: '2 days ago',
        unreadCount: 1,
        online: true,
      },
    ];
    setContacts(mockContacts);
  }, []);

  useEffect(() => {
    if (selectedContact) {
      // Fetch messages for selected contact - replace with actual API call
      const mockMessages: Message[] = [
        {
          id: '1',
          senderId: '1',
          receiverId: 'current-user',
          content: 'Hi, can you help me with the assignment?',
          timestamp: '10:30 AM',
          isRead: true,
        },
        {
          id: '2',
          senderId: 'current-user',
          receiverId: '1',
          content: 'Sure, what do you need help with?',
          timestamp: '10:31 AM',
          isRead: true,
        },
        {
          id: '3',
          senderId: '1',
          receiverId: 'current-user',
          content: 'I\'m stuck on question 3',
          timestamp: '10:32 AM',
          isRead: false,
        },
      ];
      setMessages(mockMessages);
      scrollToBottom();
    }
  }, [selectedContact]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedContact) {
      const message: Message = {
        id: (messages.length + 1).toString(),
        senderId: 'current-user',
        receiverId: selectedContact.id,
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false,
      };
      setMessages([...messages, message]);
      setNewMessage('');
      scrollToBottom();
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ height: 'calc(100vh - 100px)', display: 'flex' }}>
      {/* Contacts List */}
      <Paper sx={{ width: 320, borderRadius: 0, overflow: 'hidden' }}>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            placeholder="Search contacts..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Divider />
        <List sx={{ overflow: 'auto', height: 'calc(100vh - 164px)' }}>
          {filteredContacts.map((contact) => (
            <ListItem
              key={contact.id}
              button
              selected={selectedContact?.id === contact.id}
              onClick={() => setSelectedContact(contact)}
            >
              <ListItemAvatar>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                  color={contact.online ? 'success' : 'error'}
                >
                  <Avatar src={contact.avatar} alt={contact.name} />
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={contact.name}
                secondary={contact.lastMessage}
                primaryTypographyProps={{
                  variant: 'subtitle1',
                  fontWeight: contact.unreadCount > 0 ? 'bold' : 'normal',
                }}
                secondaryTypographyProps={{
                  noWrap: true,
                  sx: { maxWidth: 150 },
                }}
              />
              {contact.unreadCount > 0 && (
                <Badge badgeContent={contact.unreadCount} color="primary" />
              )}
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Chat Area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <Paper sx={{ p: 2, borderRadius: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                  color={selectedContact.online ? 'success' : 'error'}
                >
                  <Avatar src={selectedContact.avatar} alt={selectedContact.name} />
                </Badge>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="h6">{selectedContact.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {selectedContact.online ? 'Online' : 'Offline'}
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Messages */}
            <Box
              sx={{
                flex: 1,
                overflow: 'auto',
                p: 2,
                backgroundColor: 'grey.100',
              }}
            >
              {messages.map((message) => (
                <Box
                  key={message.id}
                  sx={{
                    display: 'flex',
                    justifyContent: message.senderId === 'current-user' ? 'flex-end' : 'flex-start',
                    mb: 2,
                  }}
                >
                  <Paper
                    sx={{
                      p: 2,
                      maxWidth: '70%',
                      backgroundColor:
                        message.senderId === 'current-user' ? 'primary.main' : 'white',
                      color: message.senderId === 'current-user' ? 'white' : 'inherit',
                    }}
                  >
                    <Typography variant="body1">{message.content}</Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        textAlign: 'right',
                        mt: 0.5,
                        opacity: 0.8,
                      }}
                    >
                      {message.timestamp}
                    </Typography>
                  </Paper>
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </Box>

            {/* Message Input */}
            <Paper sx={{ p: 2, borderRadius: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton size="small" sx={{ mr: 1 }}>
                  <AttachFileIcon />
                </IconButton>
                <TextField
                  fullWidth
                  placeholder="Type a message..."
                  variant="outlined"
                  size="small"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                <IconButton
                  color="primary"
                  sx={{ ml: 1 }}
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </Paper>
          </>
        ) : (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'grey.100',
            }}
          >
            <Typography variant="h6" color="textSecondary">
              Select a contact to start messaging
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
} 