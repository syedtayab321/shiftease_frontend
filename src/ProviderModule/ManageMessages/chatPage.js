import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, IconButton, Typography, Avatar, Grid, Paper } from '@mui/material';
import { Send as SendIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { format } from 'date-fns';
import axios from 'axios';
import apiUrls from "../../ApiUrls";

const ProviderChatPage = ({ show, handleClose, senderId, senderName, receiverId, receiverName }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${apiUrls.PROVIDER_MESSAGE_API_GET}${receiverName}`);
      if (response.data === null) {
        alert('No messages yet');
      } else {
        setMessages(response.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    if (show) {
      fetchMessages();
    }
  }, [show]);

  const sendMessage = async () => {
    if (newMessage.trim()) {
      const messageData = {
        senderId,
        receiverId,
        receiverName,
        senderName,
        content: newMessage,
        message_time: new Date().toISOString(),
      };

      try {
        const response = await axios.post(`${apiUrls.PROVIDER_MESSAGE_API_POST}`, messageData);
        setMessages([...messages, response.data]);
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const deleteMessage = async (id) => {
    try {
      await axios.delete(`${apiUrls.PROVIDER_MESSAGE_API_DELETE}${id}`);
      setMessages(messages.filter((msg) => msg.id !== id));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <Modal open={show} onClose={handleClose}>
      <Box sx={{ maxWidth: '600px', margin: 'auto', marginTop: '2%', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, p: 2 ,overflowY: 'scroll',}}>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Grid item>
            <Avatar sx={{ width: 50, height: 50 }}>
              {receiverName[0]}
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h6">{receiverName}</Typography>
            <Typography variant="body2" color="textSecondary">Online</Typography>
          </Grid>
        </Grid>

        <Box sx={{ maxHeight: '300px', width: 300, overflowY: 'auto', mb: 2, p: 1 }}>
          {messages.map((msg) => (
            <Paper
              key={msg.id}
              sx={{
                p: 2,
                mb: 1,
                backgroundColor: msg.senderId === senderId ? '#f5f5f5' : '#1976d2',
                color: msg.senderId === senderId ? 'black' : 'white',
                display: 'flex',
                justifyContent: msg.senderId === senderId ? 'flex-start' : 'flex-end',
                borderRadius: 2,
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1">{msg.content}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {format(new Date(msg.message_time), 'PPP p')}
                </Typography>
              </Box>
              <IconButton edge="end" size="small" onClick={() => deleteMessage(msg.id)} sx={{ color: msg.senderId === senderId ? 'gray' : 'white' }}>
                <DeleteIcon />
              </IconButton>
            </Paper>
          ))}
        </Box>

        <Grid container alignItems="center" spacing={1}>
          <Grid item xs>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
          </Grid>
          <Grid item>
            <IconButton color="primary" onClick={sendMessage}>
              <SendIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ProviderChatPage;
