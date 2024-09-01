import React from 'react';
import image1 from './../../assets/images/background.png'
const orders = [
  {
    id: 1,
    name: 'Whity White House',
    location: 'Bangkok',
    price: '$1,636',
    img: image1,
  },
  {
    id: 2,
    name: 'Equinox House',
    location: 'Wonderland',
    price: '$320',
    img: 'url_to_image_2',
  },
  // Add more orders here
];

const OrdersList = () => {
  return (
    <div className="orders-list">
      {orders.map(order => (
        <div key={order.id} className="order-card">
          <img src={order.img} alt={order.name} />
          <h3>{order.name}</h3>
          <p>{order.location}</p>
          <p>{order.price}</p>
        </div>
      ))}
    </div>
  );
};

export default OrdersList;
