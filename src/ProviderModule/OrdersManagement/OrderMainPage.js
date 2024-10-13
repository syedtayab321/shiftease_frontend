import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import apiUrls from './../../ApiUrls'; 

const OrderMainPage = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const company_id = localStorage.getItem("UserID");
    const fetchOrdersData = async () => {
      try {
        const response = await axios.get(`${apiUrls.PROVIDER_APPROVED_ORDERS_GET}${company_id}`);
        console.log('Fetched Orders Data:', response.data);
        setOrdersData(response.data);
      } catch (error) {
        console.error('Error fetching orders data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersData();
  }, []);

  const handleLocationClick = async (location) => {
    try {
      const geocodeResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: location,
          key: 'AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao',
        },
      });

      if (geocodeResponse.data.status === "OK") {
        const { lat, lng } = geocodeResponse.data.results[0].geometry.location;
        const locationObject = { lat, lng };
        console.log('Selected Location:', locationObject);
        setSelectedLocation(locationObject);
        setShowModal(true);
      } else {
        console.error("Geocode was not successful for the following reason: " + geocodeResponse.data.status);
        alert("Geocode was not successful for the following reason: " + geocodeResponse.data.status)
      }
    } catch (error) {
      console.error('Error fetching geocode data:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedLocation(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Orders</h1>
      {ordersData.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Location</th>
              <th>Date</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Team</th>
              <th>Location View</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.client_name}</td>
                <td>{order.location}</td>
                <td>{order.service_date}</td>
                <td className={`status ${order.order_status.toLowerCase()}`}>
                  {order.order_status}
                </td>
                <td>{order.package_price}</td>
                <td>{order.team_name}</td>
                <td>
                  <Button onClick={() => handleLocationClick(order.location)}>View Location</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedLocation && (
            <LoadScript googleMapsApiKey="AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao">
              <GoogleMap
                mapContainerStyle={{ height: '400px', width: '100%' }}
                center={selectedLocation}
                zoom={15}
              >
                <Marker position={selectedLocation} />
              </GoogleMap>
            </LoadScript>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderMainPage; 
