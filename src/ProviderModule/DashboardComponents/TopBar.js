import React, { useState } from "react";
import { FaSignOutAlt,FaEnvelope } from "react-icons/fa";
import "./../../assets/Providercss/topbar.css";
import { useNavigate } from "react-router-dom";
import apiUrls from "../../ApiUrls";
import ProviderChatPage from './../ManageMessages/chatPage'
const TopBar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const navigate = useNavigate();

  const handleshowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const MessageshowModal = () => {
    setShowMessageModal(true);
  };

  const MessageCloseModal = () => {
    setShowMessageModal(false);
  };

  const handleLogoutClick = () => {
    setShowModal(false);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {/* Logout modal */}
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        id="logoutModal"
        tabIndex="-1"
        aria-labelledby="logoutModalLabel"
        aria-hidden="true"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="logoutModalLabel">
                Confirm Logout
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="modal-body">Are you sure you want to log out?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button onClick={handleLogoutClick} className="btn btn-danger">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Main bar */}
      <div className="custom-topbar">
        <div className="custom-topbar-title">
          <h1>{localStorage.getItem("CompanyName")} Dashboard</h1>
        </div>
        <div className="custom-topbar-user">
          <img
            src={`${apiUrls.MAIN_URL}${localStorage.getItem(
              "CompanyProfile"
            )}`}
            alt="Profile"
            className="custom-profile-pic"
          />
          <span className="custom-username">
            {localStorage.getItem("CompanyName")}
          </span>
          <button className="custom-message-admin-btn" onClick={MessageshowModal}>
            <FaEnvelope className="custom-message-icon" />
            Message
          </button>
          <button className="custom-logout-btn" onClick={handleshowModal}>
            <FaSignOutAlt className="custom-logout-icon" />
            Logout
          </button>
        </div>
      </div>
      {/* message modal */}
      <ProviderChatPage show={showMessageModal} handleClose={MessageCloseModal} />
    </>
  );
};

export default TopBar;
