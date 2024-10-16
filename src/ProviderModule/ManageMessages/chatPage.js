import React, { useState } from 'react';
import { Button, Container, Row, Col, Form, InputGroup, Modal } from 'react-bootstrap';
import { FaPaperPlane, FaUserCircle } from 'react-icons/fa';

const initialMessages = [
  { id: 1, sender: 'John Doe', text: 'Hello!', time: '10:30 AM', isSender: false },
  { id: 2, sender: 'You', text: 'Hi John!', time: '10:32 AM', isSender: true },
  { id: 3, sender: 'John Doe', text: 'How are you?', time: '10:33 AM', isSender: false },
];

const ProviderChatPage = ({ show, handleClose }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: 'You',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSender: true,
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered className="chat-modal">
      <Modal.Header closeButton className="bg-primary text-white">
        <Row className="align-items-center w-100">
          <Col xs={2} className="text-center">
            <FaUserCircle size={50} />
          </Col>
          <Col xs={10}>
            <h5 className="mb-0">John Doe</h5>
            <p className="mb-0 text-white-50">Online</p>
          </Col>
        </Row>
      </Modal.Header>

      <Modal.Body>
        <Container className="chat-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {messages.map((msg) => (
            <Row key={msg.id} className="my-2">
              <Col className={`d-flex ${msg.isSender ? 'justify-content-end' : 'justify-content-start'}`}>
                <div
                  className={`p-3 message-bubble ${msg.isSender ? 'bg-primary text-white' : 'bg-light text-dark'}`}
                  style={{ borderRadius: '20px', maxWidth: '70%' }}
                >
                  <p className="mb-0">{msg.text}</p>
                  <small className="text-muted">{msg.time}</small>
                </div>
              </Col>
            </Row>
          ))}
        </Container>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-between">
        <InputGroup className="mb-3 flex-grow-1">
          <Form.Control
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="message-input"
          />
          <Button variant="primary" onClick={sendMessage}>
            <FaPaperPlane />
          </Button>
        </InputGroup>
      </Modal.Footer>
    </Modal>
  );
};

export default  ProviderChatPage;
