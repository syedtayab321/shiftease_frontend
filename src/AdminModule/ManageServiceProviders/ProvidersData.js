import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner, Modal, Button } from 'react-bootstrap';
import apiUrls from '../../ApiUrls';

export default function ProviderDataTable() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false); // New state for action loading
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedID, setSelectedID] = useState('');
    const [selectedEmail, setSelectedEmail] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch data from the server
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

    const handleshowModal = (id,email) => {
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
                email:selectedEmail,
            });
            setActionLoading(false);
            window.location.reload();
        } catch (e) {
            console.log('Error during action:', e);
            setActionLoading(false);
        }
    };
    const DeleteData=async (CompanyId)=>{
               const response = await axios.delete(`${apiUrls.PROVIDER_DELETE_ACCOUNT}${CompanyId}`);
               if (response){
                   alert(response.data)
               }
    }
    const filteredItems = items.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            {/* Modal for Account Approval */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Account Approvals</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Do you want to approve or reject the request for {selectedEmail}?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal} disabled={actionLoading}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={() => handleActionClick('Approved')} disabled={actionLoading}>
                        {actionLoading ? <Spinner animation="border" size="sm" /> : 'Approve'}
                    </Button>
                    <Button variant="danger" onClick={() => handleActionClick('Rejected')} disabled={actionLoading}>
                        {actionLoading ? <Spinner animation="border" size="sm" /> : 'Reject'}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Main User Management Table */}
            <div className="container mt-5">
                <h2 className="mb-4 text-center">Company Management</h2>

                {/* Search Bar */}
                <div className="mb-4 d-flex justify-content-between align-items-center">
                    <input
                        type="text"
                        placeholder="Search by email or company name"
                        className="form-control w-50"
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                        <tr>
                            <th>Company Id</th>
                            <th>Email</th>
                            <th>Company Name</th>
                            <th>Address</th>
                            <th>Password</th>
                            <th>Zip Code</th>
                            <th>Services</th>
                            <th>Request Status</th>
                            <th>Action</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>{user.email}</td>
                                    <td>{user.company_name}</td>
                                    <td>{user.location}</td>
                                    <td>{user.password}</td>
                                    <td>{user.zipcode}</td>
                                    <td>{user.service}</td>
                                    <td>
                                        {user.request_status === 'pending' && (
                                            <span className='badge bg-warning text-dark'>{user.request_status}</span>
                                        )}
                                        {user.request_status === 'Rejected' && (
                                            <span className='badge bg-danger'>{user.request_status}</span>
                                        )}
                                        {user.request_status === 'Approved' && (
                                            <span className='badge bg-success'>{user.request_status}</span>
                                        )}
                                    </td>
                                    <td>
                                        <button className="btn btn-success btn-sm me-2"
                                                onClick={() => handleshowModal(user.id,user.email)}
                                                disabled={actionLoading}>
                                            Approve/Reject
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger btn-sm"
                                         onClick={() => DeleteData(user.id)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
