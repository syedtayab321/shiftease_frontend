import React, { useState } from "react";
import {
  FaHome,
  FaBars,
  FaUserAlt,
  FaProjectDiagram,
  FaStar,
  FaUsers,
  FaBoxOpen
} from "react-icons/fa";
import './../../assets/Providercss/providersidebar.css';
import logo from './../../assets/images/logo.png';

const navitems = [
  { text: 'Home', icon: <FaHome />, link: "home" },
  { text: 'Team Management', icon: <FaProjectDiagram />, link: "team" },
  { text: 'Service Management', icon: <FaUserAlt />, link: "packages" },
  { text: 'View Requests', icon: <FaUsers />, link: "requests" },
  { text: 'Orders Management', icon: <FaProjectDiagram />, link: "orders" },
  { text: 'Messages', icon: <FaStar />, link: "messages" },
  { text: 'Profile', icon: <FaBars />, link: "profile" },
  { text: 'Reviews', icon: <FaBoxOpen />, link: "reviews" },
];

const ProviderSidebar = ({ onselect }) => {
  // State to track the active item
  const [activeItem, setActiveItem] = useState("home");

  // Handle the item click
  const handleClick = (link) => {
    setActiveItem(link);
    onselect(link); // Pass the selected link to the parent component
  };

  return (
    <>
      <div className='provider-menu'>
        {navitems.map((items, index) => (
          <button
            className={`provider-menu-items ${activeItem === items.link ? 'activelink' : ''}`}
            key={index}
            onClick={() => handleClick(items.link)}
          >
            <span>{items.icon}</span>
            <span>{items.text}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default ProviderSidebar;
