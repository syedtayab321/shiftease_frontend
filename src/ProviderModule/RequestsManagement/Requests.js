import React, { useState, useEffect } from "react";
import axios from "axios";
import apiUrls from "../../ApiUrls";
import "./../../assets/Providercss/requests.css";
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
        await axios.delete(`${apiUrls.PROVIDER_ORDER_REQUEST_DELETE}${id}`)
        fetchRequests();
      }
      catch (e){
            alert(e.toLowerCase)
      }
    }
  };

  return (
    <div className="client-requests-container">
      <h2 className="client-requests-header">Client Requests</h2>

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by Name, Package, ID, or Location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="table-responsive">
          <table className="client-requests-table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Package Name</th>
                <th>Package ID</th>
                <th>Price</th>
                <th>Location</th>
                <th>Date</th>
                <th>Request Status</th>
                <th>Actions</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.client_name}</td>
                    <td>{request.package_name}</td>
                    <td>{request.package_id}</td>
                    <td>${request.package_price}</td>
                    <td>{request.location}</td>
                    <td>{request.service_date}</td>
                    <td>
                      {request.request_status === "Pending" && (
                        <span className="badge bg-warning text-dark">
                          {request.request_status}
                        </span>
                      )}
                      {request.request_status === "Rejected" && (
                        <span className="badge bg-danger">
                          {request.request_status}
                        </span>
                      )}
                      {request.request_status === "Approved" && (
                        <span className="badge bg-success">
                          {request.request_status}
                        </span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-success"
                        onClick={() => handleApproveClick(request)}
                      >
                        Approve
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDeleteRequest(request.id)}
                      >
                        Delete
                      </button>
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
      )}

      {/* Render the Approval Modal */}
      {showModal && selectedRequest && (
        <RequestApprovalModal
          request={selectedRequest}
          closeModal={closeModal}
          fetchdata={fetchRequests}
        />
      )}
    </div>
  );
};

export default ClientRequests;
