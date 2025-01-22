import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, TextField, Badge } from '@mui/material';
import { FaSearch } from "react-icons/fa";
import apiUrls from "../../ApiUrls";
import RequestApprovalModal from "./requestApprovalModal";

const ClientRequests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiUrls.PROVIDER_ORDER_REQUESTS_GET}`
      );
      setRequests(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const filteredRequests = requests.filter((request) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      request.client_name?.toLowerCase().includes(searchLower) ||
      request.package_name?.toLowerCase().includes(searchLower) ||
      request.package_id?.toLowerCase().includes(searchLower) ||
      request.location?.toLowerCase().includes(searchLower)
    );
  });

  const handleApproveClick = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
  };
  
  const handleDeleteRequest = async (id) =>{
    if (window.confirm("Are you sure you want to delete this request?")) {
      try{
        await axios.delete(`${apiUrls.PROVIDER_ORDER_REQUEST_DELETE}${id}`);
        fetchRequests();
      }
      catch (e){
        alert(e.toLowerCase());
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: 'skyblue', fontWeight: 'bold' }}>
        Client Requests
      </Typography>

      <Box display="flex" justifyContent="center" sx={{ mb: 3 }}>
        <TextField
          placeholder="Search by Name, Package, ID, or Location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          sx={{ width: '50%' }}
          InputProps={{
            startAdornment: <FaSearch style={{ marginRight: '10px', color: 'black' }} />
          }}
        />
      </Box>

      {loading ? (
        <Typography variant="h6" align="center">Loading...</Typography>
      ) : error ? (
        <Typography variant="h6" align="center">{error}</Typography>
      ) : (
        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'black' }}>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Client Name</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Package Name</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Package ID</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Price</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Location</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Date</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Payment Method</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Request Status</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Actions</TableCell>
                <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <TableRow key={request.id} hover>
                    <TableCell align="center">{request.client_name}</TableCell>
                    <TableCell align="center">{request.package_name}</TableCell>
                    <TableCell align="center">{request.package_id}</TableCell>
                    <TableCell align="center">${request.package_price}</TableCell>
                    <TableCell align="center">{request.location}</TableCell>
                    <TableCell align="center">{request.service_date}</TableCell>
                    <TableCell align="center">{request.payment_method}</TableCell>
                    <TableCell align="center">
                      <Badge
                        badgeContent={request.request_status}
                        color={
                          request.request_status === "Pending" ? "warning"
                          : request.request_status === "Rejected" ? "error"
                          : "success"
                        }
                      />
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
                        onClick={() => handleApproveClick(request)}
                      >
                        Approve
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ color: '#fff', fontWeight: 'bold' }}
                        onClick={() => handleDeleteRequest(request.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="9" align="center">
                    No requests found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {showModal && selectedRequest && (
        <RequestApprovalModal
          request={selectedRequest}
          closeModal={closeModal}
          fetchdata={fetchRequests}
        />
      )}
    </Container>
  );
};

export default ClientRequests;
