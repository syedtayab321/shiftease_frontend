import React, { useState,useEffect } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import apiUrls from "../../ApiUrls";

const RequestApprovalModal = ({ request, closeModal,fetchdata }) => {
  const [team, setTeam] = useState("");
  const [serviceDate, setServiceDate] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const fetchTeamData = async () => {
    try {
      const response = await axios.get(`${apiUrls.PROVIDER_TEAM_DATA_GET}${request.Company_id}`);
      if (Array.isArray(response.data)) {
        setTeamMembers(response.data);
      } else {
        console.error("Unexpected response format", response.data);
        setTeamMembers([]);
      }
    } catch (error) {
      console.error("Error fetching packages data:", error);

    }
  };

  useEffect(() => {
    if (request.Company_id) {
      fetchTeamData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request.Company_id]);

  const handleApprove = async () => {
    const requestData = {
      client_name: request.client_name,
      package_id: request.package_id,
      team_name: team,
      location:request.location,
      package_price:request.package_price,
      service_date: serviceDate,
      order_status:'Processing',
      Company_id:request.Company_id,
      payment_method:request.payment_method,
    };

    try {
      await axios.post(`${apiUrls.PROVIDER_ORDER_REQUEST_APPROVAL}`, requestData);
      alert(`Request approved for client ${request.client_name}`);
      closeModal();
      await handleDeleteRequest(request.id)
    } catch (error) {
      console.error("Error approving request:", error);
      alert("Failed to approve the request.");
    }
  };

  const handleDeleteRequest = async (id) =>{
      try{
        await axios.delete(`${apiUrls.PROVIDER_ORDER_REQUEST_DELETE}${id}`)
        fetchdata();
      }
      catch (e){
            alert(e.toLowerCase)
      }
  };
  return (
    <Modal show={true} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Approve Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <Row className="mb-3">
            <Col md={6}>
              <label htmlFor="clientName" className="form-label">
                Client Name
              </label>
              <input
                type="text"
                className="form-control"
                id="clientName"
                value={request.client_name}
                readOnly
              />
            </Col>
            <Col md={6}>
              <label htmlFor="packageName" className="form-label">
                Package Id
              </label>
              <input
                type="text"
                className="form-control"
                id="packageName"
                value={request.package_id}
                readOnly
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <label htmlFor="teamSelect" className="form-label">
                Select Team
              </label>
              <select
                className="form-control"
                id="teamSelect"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
              >
                <option value="">Choose...</option>
                 {teamMembers.map((teamMember) => (
                  <option key={teamMember.id} value={teamMember.team_name}>
                    {teamMember.team_name}
                  </option>
                ))}
              </select>
            </Col>
            <Col md={6}>
              <label htmlFor="serviceDate" className="form-label">
                Service Date
              </label>
              <input
                type="date"
                className="form-control"
                id="serviceDate"
                value={serviceDate}
                onChange={(e) => setServiceDate(e.target.value)}
              />
            </Col>
          </Row>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleApprove}>
          Approve Request
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RequestApprovalModal;
