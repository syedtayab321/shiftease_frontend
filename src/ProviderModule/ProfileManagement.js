import React, { useState, useEffect } from "react";
import axios from "axios";
import apiUrls from "./../ApiUrls";
const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    services: "",
    location: "",
    profileImage: ""
  });
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const IdFromLocalStorage = localStorage.getItem('UserID');

  useEffect(() => {
    if (IdFromLocalStorage) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${apiUrls.PROVIDER_OWN_DATA_GET}${IdFromLocalStorage}`);
          setUserData(response.data);
          setFormData({
            companyName: response.data.company_name,
            email: response.data.email,
            password: response.data.password,
            services: response.data.service,
            location: response.data.location,
            profileImage: response.data.profile_image || "",
          });
          localStorage.setItem('CompanyProfile',response.data.profile_image)
          localStorage.setItem('CompanyName',response.data.company_name)
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [IdFromLocalStorage]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setShowUpdateButton(true);
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleUpdateClick = async () => {
    if (IdFromLocalStorage) {
      try {
        const response = await axios.put(`${apiUrls.PROVIDER_OWN_DATA_GET}${IdFromLocalStorage}`, formData);
        setUserData(response.data);
        setIsEditable(false);
        setShowUpdateButton(false);
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="user-profile-container-custom">
      <div className="profile-card-custom">
        <div className="profile-avatar-custom">
          <img
            src={`${apiUrls.MAIN_URL}${formData.profileImage}`}
            alt="Profile Avatar"
            className="avatar-image-custom"
          />
        </div>
        <h2 className="profile-title-custom">User Profile</h2>
        <p className="profile-email-custom">Email: {formData.email}</p>

        <div className="profile-grid-custom">
          <input type="email" name="email" value={formData.email} readOnly hidden />

          <label className="profile-label-custom">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            readOnly={!isEditable}
            className="profile-input-custom"
          />

          <label className="profile-label-custom">Password</label>
          <div className="password-container-custom">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              readOnly={!isEditable}
              className="profile-input-custom"
            />
            <i
              className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} password-toggle-custom`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>

          <label className="profile-label-custom">Services</label>
          <select
            name="services"
            value={formData.services}
            onChange={handleInputChange}
            disabled={!isEditable}
            className="profile-select-custom"
          >
            <option value="Shifting">Shifting</option>
            <option value="Decorating">Decorating</option>
            <option value="All">Shifting and Decorating</option>
          </select>

          <label className="profile-label-custom">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            readOnly={!isEditable}
            className="profile-input-custom"
          />
        </div>

        <div className="profile-buttons-custom">
          {!isEditable && (
            <button onClick={handleEditClick} className="btn-custom btn-primary-custom">
              Edit
            </button>
          )}
          {showUpdateButton && (
            <button onClick={handleUpdateClick} className="btn-custom btn-success-custom">
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
