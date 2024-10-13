import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Spinner, Alert, Badge, Form, Button, Row, Col } from 'react-bootstrap';
import { BsCheckCircle, BsXCircle, BsEye } from 'react-icons/bs';
import apiUrls from '../../ApiUrls';

// Import separate modal components for each type of property
import HouseModal from './HouseAdDetailsModal';
import ApartmentModal from './ApartmentAdDetailsModal';
import OfficeModal from './OfficeAdDetailsModal';

const AdRequestsPage = () => {
  const [houses, setHouses] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedAd, setSelectedAd] = useState(null);
  const [showHouseModal, setShowHouseModal] = useState(false);
  const [showApartmentModal, setShowApartmentModal] = useState(false);
  const [showOfficeModal, setShowOfficeModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('house'); 

  const fetchData = async () => {
    try {
      const houseResponse = await axios.get(apiUrls.HOUSE_SELLING_AD_GET);
      const apartmentResponse = await axios.get(apiUrls.Apartment_SELLING_AD_GET);
      const officeResponse = await axios.get(apiUrls.Office_SELLING_AD_GET);

      setHouses(houseResponse.data);
      setApartments(apartmentResponse.data);
      setOffices(officeResponse.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching data from API');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = async (id, apiUrl) => {
    try {
      await axios.put(`${apiUrl}${id}`, { RequestStatus: 'Approved' });
      fetchData();
    } catch (error) {
      console.error('Error approving the ad', error);
    }
  };

  const handleReject = async (id, apiUrl) => {
    try {
      await axios.put(`${apiUrl}${id}`, { RequestStatus: 'Rejected' });
      fetchData();
    } catch (error) {
      console.error('Error rejecting the ad', error);
    }
  };

  const handleViewDetails = (ad, type) => {
    setSelectedAd(ad);
    if (type === 'house') {
      setShowHouseModal(true);
    } else if (type === 'apartment') {
      setShowApartmentModal(true);
    } else if (type === 'office') {
      setShowOfficeModal(true);
    }
  };


  const filterAds = (ads) => {
    return ads.filter((ad) => 
      ad.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const renderAdsTable = (ads, type, apiUrl) => (
    <>
      <h2 className="mt-4 mb-3 text-center text-secondary">{type} Ads</h2>
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by Owner or Location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form>
      <Table responsive bordered hover className="table-striped table-bordered shadow-sm text-center">
        <thead className="bg-primary text-white">
          <tr>
            <th>ID</th>
            <th>Owner Name</th>
            <th>Price</th>
            <th>Location</th>
            <th>Status</th>
            <th>Action</th>
            <th>View Details</th>
          </tr>
        </thead>
        <tbody>
          {filterAds(ads).map((ad) => (
            <tr key={ad.id} className={`align-middle ${ad.RequestStatus === 'Approved' ? 'table-success' : ad.RequestStatus === 'Rejected' ? 'table-danger' : ''}`}>
              <td>{ad.id}</td>
              <td>{ad.ownerName}</td>
              <td>{ad.price}</td>
              <td>{ad.address}</td>
              <td>
                <Badge
                  bg={ad.RequestStatus === 'Approved' ? 'success' : ad.RequestStatus === 'Rejected' ? 'danger' : 'secondary'}
                >
                  {ad.RequestStatus}
                </Badge>
              </td>
              <td>
                <BsCheckCircle
                  size={24}
                  color={ad.RequestStatus === 'Approved' ? 'gray' : 'green'}
                  onClick={() => handleApprove(ad.id, apiUrl)}
                  disabled={ad.RequestStatus === 'Approved'}
                />
    
                <BsXCircle
                  size={24}
                  color={ad.RequestStatus === 'Rejected' ? 'gray' : 'red'}
                  onClick={() => handleReject(ad.id, apiUrl)}
                  disabled={ad.RequestStatus === 'Rejected'}
                />
              </td>
              <td>
                <BsEye
                  size={24}
                  color="blue"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleViewDetails(ad, type)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );

  if (loading) return <Spinner animation="border" role="status" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center text-primary">Ad Requests - Admin Panel</h1>

      {/* Buttons to toggle between ads */}
      <Row className="mb-4">
        <Col className="text-center">
          <Button variant="outline-primary" onClick={() => {
             setSelectedCategory('house')
             fetchData();
          }}>House Ads</Button>
        </Col>
        <Col className="text-center">
          <Button variant="outline-primary" onClick={() => {
            setSelectedCategory('apartment')
            fetchData();
          }}>Apartment Ads</Button>
        </Col>
        <Col className="text-center">
          <Button variant="outline-primary" onClick={() => {
            setSelectedCategory('office')
            fetchData()
          }}>Office Ads</Button>
        </Col>
      </Row>

      {/* Conditionally render tables based on the selected category */}
      {selectedCategory === 'house' && renderAdsTable(houses, 'house', apiUrls.HOUSE_SELLING_AD_UPDATE)}
      {selectedCategory === 'apartment' && renderAdsTable(apartments, 'apartment', apiUrls.Apartment_SELLING_AD_UPDATE)}
      {selectedCategory === 'office' && renderAdsTable(offices, 'office', apiUrls.Office_SELLING_AD_UPDATE)}

      {/* House Modal */}
      <HouseModal
        show={showHouseModal}
        onHide={() => setShowHouseModal(false)}
        ad={selectedAd}
      />

      {/* Apartment Modal */}
      <ApartmentModal
        show={showApartmentModal}
        onHide={() => setShowApartmentModal(false)}
        ad={selectedAd}
      />

      {/* Office Modal */}
      <OfficeModal
        show={showOfficeModal}
        onHide={() => setShowOfficeModal(false)}
        ad={selectedAd}
      />
    </Container>
  );
};

export default AdRequestsPage;
