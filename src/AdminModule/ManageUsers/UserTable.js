import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, TextField, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material";
import { styled } from '@mui/system';
import apiUrls from "../../ApiUrls";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: '#f9f9f9',
  '&:hover': {
    backgroundColor: '#f1f1f1',
  },
}));


export default function UserTable() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  const fetchItems = async () => {
    try {
      const response = await axios.get(apiUrls.BUYER_GET_DATA);
      if (Array.isArray(response.data)) {
        setItems(response.data);
      } else {
        setItems([]);
      }
      setLoading(false);
    } catch (err) {
      setError('Error fetching data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const DeleteData = async (userid) => {
    try {
      const response = await axios.delete(`${apiUrls.BUYER_DELETE_DATA}${userid}`);
      if (response.status === 200) {
        alert('Data Deleted Successfully');
        fetchItems();
      }
    } catch (e) {
      alert(e);
    }
  }

  if (loading) {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const filteredItems = items.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 600 }}>Users Management</Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by email or username"
        onChange={e => setSearchTerm(e.target.value)}
        sx={{
          mb: 4,
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
          },
        }}
      />

      <TableContainer component={Paper} elevation={6} sx={{ borderRadius: '15px', overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'darkblue' }}>
              <TableCell sx={{ color: '#fff', fontWeight: 600 }}>User Id</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 600 }}>User Name</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 600 }}>User uid</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Password</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((user, index) => (
              <StyledTableRow key={index}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.users_uid}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{
                      padding: '5px 15px',
                      borderRadius: '8px',
                      textTransform: 'none',
                    }}
                    onClick={() => DeleteData(user.id)}
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
}
