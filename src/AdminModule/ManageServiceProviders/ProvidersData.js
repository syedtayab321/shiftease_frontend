import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Badge } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import './../../assets/Admincss/adminstyle.css';
import apiUrls from '../../ApiUrls';

export default function ProviderDataTable() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedID, setSelectedID] = useState('');
    const [selectedEmail, setSelectedEmail] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchItems = async () => {
        try {
            const response = await axios.get(apiUrls.PROVIDER_ACCOUNT_GET);
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

    const handleShowModal = (id, email) => {
        setSelectedID(id);
        setSelectedEmail(email);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleActionClick = async (status) => {
        setShowModal(false);
        setActionLoading(true);

        try {
            await axios.post(apiUrls.PROVIDER_ACCOUNT_APPROVAL, {
                request_status: status,
                id: selectedID,
                email: selectedEmail,
            });
            setActionLoading(false);
            window.location.reload();
        } catch (e) {
            console.log('Error during action:', e);
            setActionLoading(false);
        }
    };

    const deleteData = async (CompanyId) => {
        const response = await axios.delete(`${apiUrls.PROVIDER_DELETE_ACCOUNT}${CompanyId}`);
        if (response) {
            alert(response.data);
        }
    };

    const filteredItems = items.filter((user) =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="text-center my-5">
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <Modal
                open={showModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 1 }}>
                    <h2>Account Approvals</h2>
                    <p>Do you want to approve or reject the request for {selectedEmail}?</p>
                    <div>
                        <Button onClick={handleCloseModal} variant="outlined" disabled={actionLoading}>Cancel</Button>
                        <Button
                            onClick={() => handleActionClick('Approved')}
                            variant="contained"
                            color="success"
                            disabled={actionLoading}
                            sx={{ ml: 2 }}
                        >
                            {actionLoading ? <CircularProgress size={20} /> : 'Approve'}
                        </Button>
                        <Button
                            onClick={() => handleActionClick('Rejected')}
                            variant="contained"
                            color="error"
                            disabled={actionLoading}
                            sx={{ ml: 2 }}
                        >
                            {actionLoading ? <CircularProgress size={20} /> : 'Reject'}
                        </Button>
                    </div>
                </Box>
            </Modal>

            <div className="container">
                <h2 className="mb-4 text-center">Company Management</h2>

                <div className="mb-4 d-flex justify-content-between align-items-center">
                    <TextField
                        label="Search by email or company name"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <TableContainer component={Paper}>
                    <Table aria-label="provider table">
                        <TableHead sx={{ backgroundColor: 'darkblue' }}>
                            <TableRow sx={{ backgroundColor: 'darkblue' }}>
                                <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Avatar</TableCell>
                                <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Company Id</TableCell>
                                <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Email</TableCell>
                                <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Company Name</TableCell>
                                <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Address</TableCell>
                                <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Password</TableCell>
                                <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Zip Code</TableCell>
                                <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Services</TableCell>
                                <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Request Status</TableCell>
                                <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Action</TableCell>
                                <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredItems.map((user, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                                        '&:hover': { backgroundColor: '#e0f7fa' },
                                    }}
                                >
                                    <TableCell>
                                        <Avatar alt={user.company_name} src={`${apiUrls.MAIN_URL}${user.profile_image}`} />
                                    </TableCell>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.company_name}</TableCell>
                                    <TableCell>{user.location}</TableCell>
                                    <TableCell>{user.password}</TableCell>
                                    <TableCell>{user.zipcode}</TableCell>
                                    <TableCell>{user.service}</TableCell>
                                    <TableCell>
                                        <Badge
                                            color={
                                                user.request_status === 'pending'
                                                    ? 'warning'
                                                    : user.request_status === 'Rejected'
                                                    ? 'error'
                                                    : 'success'
                                            }
                                            badgeContent={user.request_status}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            onClick={() => handleShowModal(user.id, user.email)}
                                            disabled={actionLoading}
                                            sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
                                        >
                                            Approve/Reject
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            size="small"
                                            onClick={() => deleteData(user.id)}
                                            sx={{ backgroundColor: '#d32f2f', '&:hover': { backgroundColor: '#c62828' } }}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}
