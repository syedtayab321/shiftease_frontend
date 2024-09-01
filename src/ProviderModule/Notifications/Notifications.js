import React, { useState, useEffect } from 'react';
import {hover} from "@testing-library/user-event/dist/hover";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Your order has been shipped!', time: '2 hours ago' },
    { id: 2, message: 'New message from John.', time: '3 hours ago' },
    { id: 3, message: 'Reminder: Meeting tomorrow.', time: '5 hours ago' },
      { id: 1, message: 'Your order has been shipped!', time: '2 hours ago' },
    { id: 2, message: 'New message from John.', time: '3 hours ago' },
    { id: 3, message: 'Reminder: Meeting.', time: '5 hours ago' },
  ]);

  // You can add logic to fetch notifications from an API or backend.

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Notifications</h2>
      <ul style={styles.list}>
        {notifications.map((notification) => (
            <a style={styles.anchor}>
              <li key={notification.id} style={styles.notificationCard}>
                <div>
                  <p style={styles.message}>{notification.message}</p>
                  <p style={styles.time}>{notification.time}</p>
                </div>
              </li>
            </a>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '100%',
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '15px',
  },
  anchor:{
    cursor: 'pointer',
  },
  notificationCard: {
    background: '#010a27',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  message: {
    fontSize: '16px',
    margin: 0,
    color: 'white'
  },
  time: {
    fontSize: '12px',
    color: '#cadfda',
  },
};

export default Notifications;
