import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tab, Tabs, Card, Button, Modal, Table, Form, InputGroup } from 'react-bootstrap';
import apiUrls from "../../ApiUrls";

const RentAdsPage = () => {
  const [rentAds, setRentAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch rent ads
    axios.get(`${apiUrls.RENT_AD_GET}`)
      .then((response) => setRentAds(response.data))
      .catch((error) => console.error('Error fetching rent ads:', error));
  }, []);

  const handleApprove = (id) => {
    console.log('Approve Ad:', id);
    // Add your API call for approval here
  };

  const handleReject = (id) => {
    console.log('Reject Ad:', id);
    // Add your API call for rejection here
  };

  const handleDelete = (id) => {
    axios
      .delete(`/adminapis/RentAdData/${id}/`)
      .then(() => setRentAds(rentAds.filter((ad) => ad.id !== id)))
      .catch((error) => console.error('Error deleting rent ad:', error));
  };

  const openDetails = (ad) => {
    setSelectedAd(ad);
    setShowModal(true);
  };

  // Filter rent ads based on the search term
  const filteredAds = rentAds.filter((ad) => {
    return (
      ad.propertyType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.price_per_month.toString().includes(searchTerm)
    );
  });

  // Close Modal
  const closeModal = () => setShowModal(false);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Rent Ads Management</h2>

      {/* Search Bar */}
      <InputGroup className="mb-4">
        <Form.Control
          placeholder="Search by Property Type, Location, or Price"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <div className="row">
        {filteredAds.length > 0 ? (
          filteredAds.map((ad) => (
            <div className="col-md-4 col-sm-6 mb-4" key={ad.id}>
              <Card className="shadow-lg border-0 rounded">
                {/* Check if image exists before rendering */}
                {ad.image && ad.image[0] && (
                  <Card.Img variant="top" src={ad.image[0]} alt="Rent Ad Image" className="card-img-top" />
                )}
                <Card.Body>
                  <Card.Title className="text-primary">{ad.title}</Card.Title>
                  <Card.Text>{ad.propertyType}</Card.Text>
                  <Card.Text className="text-muted">{ad.city}</Card.Text>
                  <Card.Text><strong>${ad.price_per_month}</strong> / month</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="primary"
                      onClick={() => openDetails(ad)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(ad.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p className="text-center">No matching ads found</p>
        )}
      </div>

      {/* Modal for Rent Ad Details */}
      {selectedAd && (
        <Modal show={showModal} onHide={closeModal} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedAd.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs defaultActiveKey="details" id="rent-ad-tabs" className="mb-3">
              <Tab eventKey="details" title="Details">
                <Table striped bordered hover responsive>
                  <tbody>
                    <tr>
                      <td>Property Type</td>
                      <td>{selectedAd.propertyType}</td>
                    </tr>
                    <tr>
                      <td>Price Per Month</td>
                      <td>{selectedAd.price_per_month}</td>
                    </tr>
                    <tr>
                      <td>Owner Name</td>
                      <td>{selectedAd.ownerName}</td>
                    </tr>
                    <tr>
                      <td>City</td>
                      <td>{selectedAd.city}</td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>{selectedAd.address}</td>
                    </tr>
                    <tr>
                      <td>Description</td>
                      <td>{selectedAd.Description}</td>
                    </tr>
                  </tbody>
                </Table>
              </Tab>
              <Tab eventKey="images" title="Images">
                <div className="d-flex flex-wrap">
                  {/* Check if images exist */}
                  {selectedAd.images && selectedAd.images.length > 0 ? (
                    selectedAd.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={`${apiUrls.MAIN_URL}${img.image}`}
                        alt={`Rent Ad ${idx}`}
                        className="img-thumbnail m-2"
                        style={{ width: '150px', height: '150px' }}
                      />
                    ))
                  ) : (
                    <p>No images available</p>
                  )}
                </div>
              </Tab>
            </Tabs>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => handleApprove(selectedAd.id)}>
              Approve
            </Button>
            <Button variant="warning" onClick={() => handleReject(selectedAd.id)}>
              Reject
            </Button>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default RentAdsPage;
