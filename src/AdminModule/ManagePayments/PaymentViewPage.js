import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container, Avatar, Button
} from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import apiUrls from './../../ApiUrls'
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
    // Fetch data from the Django API
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`${apiUrls.PACKAGE_PAYMENTS}`);
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payment data:', error);
      }
    };
    fetchPayments();
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
              <StyledTableCell>Package Title</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <StyledTableRow key={payment.id}>
                <TableCell>
                  <Avatar alt={payment.package_title} src={`https://via.placeholder.com/150`} />
                </TableCell>
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.package_title}</TableCell>
                <TableCell>${payment.amount}</TableCell>
                <TableCell>{new Date(payment.created_at).toLocaleDateString()}</TableCell>
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
