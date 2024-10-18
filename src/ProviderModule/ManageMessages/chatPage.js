import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, IconButton, Typography, Avatar, Grid, Paper } from '@mui/material';
import { Send as SendIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { format, parseISO } from 'date-fns';
import axios from 'axios';
import apiUrls from "../../ApiUrls";

const ProviderChatPage = ({ show, handleClose, senderId, senderName, receiverId, receiverName }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${apiUrls.PROVIDER_MESSAGE_API_GET}${senderName}${receiverName}`);
      if (response.data === null) {
        alert('No messages yet');
      } else {
        setMessages(response.data.map(msg => ({
          ...msg,
          message_time: msg.message_time ? format(parseISO(msg.message_time), 'PPP p') : 'Invalid Date',
        })));
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
         fetchMessages()
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
      <Box sx={{ maxWidth: '600px', margin: 'auto', marginTop: '2%', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, p: 2, overflowY: 'scroll' }}>
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

       <Box sx={{ maxHeight: '300px', width: '100%', overflowY: 'auto', mb: 2, p: 1 }}>
          {messages.map((msg) => (
            <Box
              key={msg.id}
              sx={{ display: 'flex', justifyContent: msg.senderName !== senderName ? 'flex-start' : 'flex-end', mb: 1,width:'100%'}}>
              <Paper sx={{ p: 2,
                  backgroundColor: msg.senderName !== senderName ? '#f5f5f5' : '#1976d2',
                  color: msg.senderName !== senderName ? 'black' : 'white',
                  borderRadius: 2,
                  maxWidth: '50%',
                  width:'50%',
                  boxShadow: 2,
                  display:'flex',
                }}>
                <Box sx={{ width:'80%'}}>
                  <Typography variant="body1">{msg.content}</Typography>
                  <Typography variant="caption" color="textSecondary">
                     {msg.message_time}
                  </Typography>
                </Box>
                <Box sx={{width:'20%'}}>
                  <IconButton edge="end" size="small"
                  onClick={() => deleteMessage(msg.id)} sx={{ color: msg.senderName !== senderName ? 'blue' : 'red' }}>
                  <DeleteIcon />
                </IconButton>
                </Box>
              </Paper>
            </Box>
          ))}
        </Box>

        <Grid container alignItems="center" spacing={1}>
          <Grid item xs>
            <TextField fullWidth variant="outlined" placeholder="Type a message..."
              value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
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
