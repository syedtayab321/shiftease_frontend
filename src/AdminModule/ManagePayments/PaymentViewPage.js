import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container, Avatar, Button
} from '@mui/material';
import { styled } from '@mui/system';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: '#f5f5f5',
  color: '#333',
  fontSize: '1rem',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f9f9f9',
  },
  '&:hover': {
    backgroundColor: '#f1f1f1',
  },
}));

const PaymentTable = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Replace with real API call
    const paymentData = [
      { id: 1, username: 'John Doe', email: 'johndoe@example.com', amount: 100, date: '2024-10-01', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 2, username: 'Jane Smith', email: 'janesmith@example.com', amount: 250, date: '2024-09-21', avatar: 'https://i.pravatar.cc/150?img=2' },
      { id: 3, username: 'Alice Johnson', email: 'alicej@example.com', amount: 150, date: '2024-09-18', avatar: 'https://i.pravatar.cc/150?img=3' },
    ];
    setPayments(paymentData);
  }, []);

  return (
    <Container style={{ marginTop: '30px' }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #42a5f5, #478ed1)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          marginBottom: '40px',
        }}
      >
        Payments Received
      </Typography>

      <TableContainer component={Paper} elevation={10} style={{ borderRadius: '15px', overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Avatar</StyledTableCell>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>User Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <StyledTableRow key={payment.id}>
                <TableCell>
                  <Avatar alt={payment.username} src={payment.avatar} />
                </TableCell>
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.username}</TableCell>
                <TableCell>{payment.email}</TableCell>
                <TableCell>${payment.amount}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    style={{ borderRadius: '20px', color: '#fff' }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default PaymentTable;
