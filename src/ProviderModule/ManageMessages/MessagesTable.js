import React, { useState, useEffect } from 'react';
import { Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, Paper, Avatar } from '@mui/material';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import apiUrls from "../../ApiUrls";
import ProviderChatPage from "./chatPage";

const ProviderMessageTable = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const providerName=localStorage.getItem('CompanyName');
  const providerId=localStorage.getItem('UserId');
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${apiUrls.PROVIDER_MESSAGE_API_GET}`);
        const groupedMessages = groupMessagesBySender(response.data);
        const filteredMessages = groupedMessages.filter(message => message.senderName !== providerName);
        setMessages(filteredMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, []);

  const groupMessagesBySender = (messages) => {
    const grouped = messages.reduce((acc, message) => {
      const { senderName } = message;
      if (!acc[senderName] || new Date(message.time) > new Date(acc[senderName].time)) {
        acc[senderName] = message;
      }
      return acc;
    }, {});
    return Object.values(grouped);
  };

  const handleOpenChat = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4, bgcolor: '#f5f5f5', p: 2, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: 'darkblue', fontWeight: 'bold', mb: 4 }}>
          Messages
        </Typography>

        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'darkblue' }}>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Sender</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Last Message</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Time</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {messages.map((message) => (
                <TableRow key={message.id} hover sx={{ '&:hover': { backgroundColor: '#f1f9ff' } }}>
                  <TableCell align="center">
                    <Box display="flex" alignItems="center" justifyContent="center">
                      <Avatar sx={{ bgcolor: 'darkblue', mr: 1 }}>
                        <FaUserCircle size={24} />
                      </Avatar>
                      {message.senderName}
                    </Box>
                  </TableCell>
                  <TableCell align="center">{message.content}</TableCell>
                  <TableCell align="center">{message.time}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: 'darkblue',
                        '&:hover': { backgroundColor: '#5DADE2' },
                        color: '#fff',
                        fontWeight: 'bold',
                        borderRadius: 2,
                      }}
                      onClick={() => handleOpenChat(message)}>
                      Open Chat
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {selectedMessage && (
        <ProviderChatPage show={isModalOpen}
          handleClose={handleCloseModal}
          senderName={providerName}
          receiverName={selectedMessage.senderName}
          senderId={providerId}
          receiverId={selectedMessage.senderId} />
      )}
    </>
  );
};

export default ProviderMessageTable;
