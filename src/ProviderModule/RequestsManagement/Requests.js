import React, { useState, useEffect } from "react";
import "./../../assets/Providercss/requests.css";
import axios from "axios";
import apiUrls from "../../ApiUrls";

const ClientRequests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchRequests();
  }, []);

  const filteredRequests = requests.filter(
    (request) =>
      (request.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        "") &&
      (request.package_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        "") &&
      (request.package_id?.includes(searchTerm) || "") &&
      (request.location?.toLowerCase().includes(searchTerm.toLowerCase()) || "")
  );

  const approveRequest = (id) => {
    alert(`Request ${id} approved.`);
    setRequests(requests.filter((request) => request.id !== id));
  };

  const rejectRequest = (id) => {
    alert(`Request ${id} rejected.`);
    setRequests(requests.filter((request) => request.id !== id));
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
                <th>Actions</th>
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
                        className="client-requests-approve-button"
                        onClick={() => approveRequest(request.id)}
                      >
                        Approve
                      </button>
                    </td>
                    <td>
                      <button
                        className="client-requests-reject-button"
                        onClick={() => rejectRequest(request.id)}
                      >
                        Reject
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
    </div>
  );
};

export default ClientRequests;
