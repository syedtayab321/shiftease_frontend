import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaClock, FaUserCircle } from 'react-icons/fa';

const messagesData = [
  { id: 1, name: 'John Doe', message: 'Hey! How are you?', time: '10:30 AM' },
  { id: 2, name: 'Jane Smith', message: 'Are we still meeting tomorrow?', time: '11:00 AM' },
  { id: 3, name: 'Mark Brown', message: 'I finished the project. Let me know what you think!', time: '12:15 PM' },
  { id: 4, name: 'Emily Davis', message: 'Can we reschedule our meeting?', time: '1:45 PM' },
];

const MessagesPage = () => {
  const handleOpenChat = (id) => {
    alert(`Opening chat for user with ID: ${id}`);
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-3" style={{ fontWeight: 'bold', color: '#2c3e50', fontSize: '1.5rem' }}>
        Messages
      </h3>
      <Table responsive bordered hover className="text-center" style={{ fontSize: '0.9rem' }}>
        <thead style={{ backgroundColor: '#2980b9', color: 'white' }}>
          <tr>
            <th style={{ width: '5%' }}></th>
            <th style={{ width: '25%' }}>Name</th>
            <th style={{ width: '40%' }}>Message</th>
            <th style={{ width: '15%' }}>Time</th>
            <th style={{ width: '15%' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {messagesData.map((message) => (
            <tr key={message.id}>
              <td>
                <FaUserCircle size={25} color="#3498db" />
              </td>
              <td>{message.name}</td>
              <td style={{ fontStyle: 'italic', color: '#7f8c8d' }}>{message.message}</td>
              <td>
                <FaClock style={{ marginRight: '5px', fontSize: '0.85rem' }} />
                {message.time}
              </td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  style={{
                    borderRadius: '10px',
                    padding: '3px 10px',
                    backgroundColor: '#2980b9',
                    borderColor: '#2980b9',
                  }}
                  onClick={() => handleOpenChat(message.id)}
                >
                  Open Chat
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MessagesPage;
