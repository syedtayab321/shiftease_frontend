import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import apiUrls from '../../ApiUrls';

const AdRequestsPage = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(apiUrls.HOUSE_SELLING_AD_GET);
        setAds(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data from API');
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.patch(`${apiUrls.HOUSE_SELLING_AD_UPDATE}${id}`, {
        RequestStatus: 'Approved',
      });
      setAds(ads.map(ad => ad.id === id ? { ...ad, RequestStatus: 'Approved' } : ad));
    } catch (error) {
      console.error('Error approving the ad', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(`${apiUrls.HOUSE_SELLING_AD_UPDATE}${id}`, {
        RequestStatus: 'Rejected',
      });
      setAds(ads.map(ad => ad.id === id ? { ...ad, RequestStatus: 'Rejected' } : ad));
    } catch (error) {
      console.error('Error rejecting the ad', error);
    }
  };

  if (loading) return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
  if (error) return <Alert variant="danger">{error}</Alert>;
  return (
    <Container>
      <h1 className="mb-4 text-center">House Rental Ads - Admin Panel</h1>
      <Row>
        {ads.map((ad) => (
          <Col md={6} lg={4} key={ad.id} className="mb-4">
            <Card className="shadow-sm h-100">
              <Card.Img
                variant="top"
                src={`${apiUrls.MAIN_URL}${ad.houseImage}`}
                alt="House"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title className="text-primary">{ad.ownerName}</Card.Title>
                <Card.Text><strong>Country:</strong> {ad.country}</Card.Text>
                <Card.Text><strong>City:</strong> {ad.city}</Card.Text>
                <Card.Text><strong>Description:</strong> {ad.houseDescription}</Card.Text>
                <Card.Text><strong>Owner Email:</strong> {ad.ownerEmail}</Card.Text>
                <Card.Text><strong>Owner Number:</strong> {ad.ownerNumber}</Card.Text>
                <Card.Text><strong>Status:</strong>
                  <span className={`ms-2 badge ${ad.RequestStatus === 'Approved' ? 'bg-success' : ad.RequestStatus === 'Rejected' ? 'bg-danger' : 'bg-secondary'}`}>
                    {ad.RequestStatus}
                  </span>
                </Card.Text>
                <div className="d-flex justify-content-between mt-3">
                  <Button
                    variant="success"
                    onClick={() => handleApprove(ad.id)}
                    disabled={ad.RequestStatus === 'Approved'}
                    className="w-45"
                  >
                    Approve
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleReject(ad.id)}
                    disabled={ad.RequestStatus === 'Rejected'}
                    className="w-45"
                  >
                    Reject
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdRequestsPage;
