import React, {useState} from "react";
import { FaSignOutAlt } from "react-icons/fa";
import "./../../assets/Providercss/topbar.css";
import profilePic from "./../../assets/images/logo.png";
import {useNavigate} from "react-router-dom";
import apiUrls from "../../ApiUrls";
const TopBar = () => {
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
       navigate('/login');
   }
  return (
      <>
          {/*logout modal */}
          <div className={`modal fade ${showModal ? 'show' : ''}`} id="logoutModal" tabIndex="-1"
               aria-labelledby="logoutModalLabel"
               aria-hidden="true" style={{display: showModal ? 'block' : 'none'}}>
              <div className="modal-dialog">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="logoutModalLabel">Confirm Logout</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                  onClick={handleCloseModal}></button>
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
          {/* main bar*/}
          <div className="custom-topbar">
              <div className="custom-topbar-title">
                  <h1>{localStorage.getItem('CompanyName')} Dashboard</h1>
              </div>
              <div className="custom-topbar-user">
                  <img src ={`${apiUrls.MAIN_URL}${localStorage.getItem("CompanyProfile")}`} alt="Profile" className="custom-profile-pic"/>
                  <span className="custom-username">{localStorage.getItem('CompanyName')}</span>
                  <button className="custom-logout-btn" onClick={handleshowModal}>
                      <FaSignOutAlt className="custom-logout-icon"/>
                      Logout
                  </button>
              </div>
          </div>
      </>
  )
      ;
};

export default TopBar;
