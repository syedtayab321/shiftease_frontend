import React from 'react';
import OrdersList from './OrderList';
import MapComponent from './MapData';
import './../../assets/Providercss/orderMainpage.css';
import GoogleMapComponent from "./MapData";

const OrderMainPage = () => {
  return (
    <div className="order-container">
      <div className="orders-section">
        <OrdersList />
      </div>
      <div className="map-section">
        <GoogleMapComponent/>
      </div>
    </div>
  );
};

export default OrderMainPage;
