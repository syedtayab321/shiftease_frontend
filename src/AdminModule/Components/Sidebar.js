import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

export default function Sidebar({onselect}) {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const handleshowModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
   const handleLogoutClick=()=>{
       setShowModal(false);
       localStorage.clear();
       navigate('/admin');
   }
    return (
        <>
            <div className={`modal fade ${showModal ? 'show' : ''}`} id="logoutModal" tabIndex="-1" aria-labelledby="logoutModalLabel"
                 aria-hidden="true" style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="logoutModalLabel">Confirm Logout</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to log out?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                            <button onClick={handleLogoutClick} className="btn btn-danger">Logout</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <nav className="col-md-3 col-lg-2 d-md-block  sidebar" id="side-bar">
                <div className="sidebar-header">
                    <h4>ShiftEase</h4>
                </div>
                <div className="sidebar-links">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <button className="nav-link sidelinks" onClick={() => onselect('manage_providers')}>Home
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link sidelinks" onClick={() => onselect('manage_users')}>Manage
                                Users
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link sidelinks" onClick={() => onselect('manage_ad_requests')}>View Ads Requests
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link sidelinks" onClick={() => onselect('manage_providers')}>Manage
                                Service Providers
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link sidelinks" onClick={() => onselect('manage_payments')}>Manage
                                Payments
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link sidelinks" onClick={() => onselect('manage_requests')}>Manage
                                Help Requests
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link sidelinks"
                                    onClick={() => onselect('manage_messages')}>Messages
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="logout">
                    <button type="button" className="btn btn-danger" onClick={handleshowModal}>Logout</button>
                </div>
            </nav>

            {/* Hamburger Icon */}
            <div className="hamburgericon" id="hamburger" onClick={() => document.getElementById('side-bar').classList.toggle('show')}>
                <div className="line line1"></div>
                <div className="line line2"></div>
                <div className="line line3"></div>
            </div>
        </>
    );
}
