import React, { useState } from 'react';
import './../../assets/Providercss/requests.css';

const ClientRequests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [requests, setRequests] = useState([
    { id: 1, packageName: 'Home Shifting Package', price: 1000, packageId: 'PKG001', clientName: 'John Doe', location: 'New York', date: '2024-08-21' },
    { id: 2, packageName: 'Home Decorating Package', price: 800, packageId: 'PKG002', clientName: 'Jane Smith', location: 'Los Angeles', date: '2024-08-20' },
    { id: 3, packageName: 'Home Renting Package', price: 600, packageId: 'PKG003', clientName: 'Sam Wilson', location: 'Chicago', date: '2024-08-19' }
  ]);

  const filteredRequests = requests.filter(request =>
    request.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.packageId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const approveRequest = (id) => {
    alert(`Request ${id} approved.`);
    setRequests(requests.filter(request => request.id !== id));
  };

  const rejectRequest = (id) => {
    alert(`Request ${id} rejected.`);
    setRequests(requests.filter(request => request.id !== id));
  };

  return (
    <div className="client-requests-container">
      <h2 className="client-requests-header">Client Requests</h2>

      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by Name, Package, ID, or Location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      <table className="client-requests-table">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Package Name</th>
            <th>Package ID</th>
            <th>Price</th>
            <th>Location</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.length > 0 ? (
            filteredRequests.map(request => (
              <tr key={request.id}>
                <td>{request.clientName}</td>
                <td>{request.packageName}</td>
                <td>{request.packageId}</td>
                <td>${request.price}</td>
                <td>{request.location}</td>
                <td>{request.date}</td>
                <td>
                  <button className="client-requests-approve-button" onClick={() => approveRequest(request.id)}>Approve</button>
                  <button className="client-requests-reject-button" onClick={() => rejectRequest(request.id)}>Reject</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No requests found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClientRequests;
