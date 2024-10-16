import React from 'react';
import { Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, Paper } from '@mui/material';
import { FaUserCircle } from 'react-icons/fa';

const messages = [
  { id: 1, sender: 'John Doe', lastMessage: 'How are you?', time: '10:33 AM', status: 'Unread' },
  { id: 2, sender: 'Jane Smith', lastMessage: 'Can we meet?', time: '9:15 AM', status: 'Read' },
  { id: 3, sender: 'Alice Johnson', lastMessage: 'Thank you!', time: 'Yesterday', status: 'Read' },
];

const MessageTable = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: 'skyblue', fontWeight: 'bold' }}>
        Messages
      </Typography>

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'skyblue' }}>
              <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Sender</TableCell>
              <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Last Message</TableCell>
              <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Time</TableCell>
              <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id} hover>
                <TableCell align="center">
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <FaUserCircle size={28} color="skyblue" style={{ marginRight: '8px' }} />
                    {message.sender}
                  </Box>
                </TableCell>
                <TableCell align="center">{message.lastMessage}</TableCell>
                <TableCell align="center">{message.time}</TableCell>
                <TableCell align="center">
                  <Typography color={message.status === 'Unread' ? 'error' : 'success'}>
                    {message.status}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: 'skyblue',
                      '&:hover': { backgroundColor: '#5DADE2' },
                      color: '#fff',
                      fontWeight: 'bold',
                    }}
                    onClick={() => alert(`Opening chat with ${message.sender}`)}
                  >
                    Open Chat
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MessageTable;
