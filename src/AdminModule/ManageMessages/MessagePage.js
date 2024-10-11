import React, { useState } from 'react';
import { Button, Container, Table, Form } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import ChatPage from './chatPage';
import './../../assets/Admincss/chatmodal.css'; // Keep existing styles

const messages = [
  { id: 1, name: 'John Doe', time: '10:30 AM', message: 'Hello!' },
  { id: 2, name: 'Jane Smith', time: '11:00 AM', message: 'How are you?' },
  { id: 3, name: 'Mark Wilson', time: '12:15 PM', message: 'Good afternoon!' },
  { id: 4, name: 'Emily Johnson', time: '01:30 PM', message: 'Let\'s catch up!' },
  { id: 5, name: 'Michael Brown', time: '02:00 PM', message: 'Good evening!' },
];

const MessageList = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const showChatModal = () => {
    handleShow();
  };

  const filteredMessages = messages.filter(msg =>
    msg.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ChatPage show={showModal} handleClose={handleClose} />
      <Container>
        <h2 className="text-center mb-4">Messages</h2>

        {/* Search Bar */}
        <Form className="mb-4">
          <Form.Group controlId="search">
            <Form.Control
              type="text"
              placeholder="Search by sender's name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="unique-search-bar" // Unique class
            />
          </Form.Group>
        </Form>

        {/* Message Table */}
        <Table striped bordered hover responsive className="unique-message-table"> {/* Unique class */}
          <thead>
            <tr>
              <th>Sender</th>
              <th>Time</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.map((msg) => (
              <tr key={msg.id} className="unique-message-row"> {/* Unique class */}
                <td className="text-center">
                  <FaUserCircle size={30} color="#6c757d" /> {msg.name}
                </td>
                <td>{msg.time}</td>
                <td>{msg.message}</td>
                <td className="text-end">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={showChatModal}
                    className="unique-chat-button" // Unique class
                  >
                    Open Chat
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default MessageList;
