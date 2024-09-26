import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    services: "",
    location: ""
  });
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailFromLocalStorage = localStorage.getItem('UserEmail');

  useEffect(() => {
    if (emailFromLocalStorage) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/providerapis/profiledata/?email=${emailFromLocalStorage}`);
          setUserData(response.data);
          setFormData({
            companyName: response.data.company_name,
            email: response.data.email,
            password: response.data.password,
            services: response.data.service,
            location: response.data.location
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [emailFromLocalStorage]);

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
    if (emailFromLocalStorage) {
      try {
        const response = await axios.put(`http://localhost:8000/providerapis/profiledata/?email=${emailFromLocalStorage}`, formData);
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
    <div className="user-profile-container">
      <div className="profile-card">
        <h2 className="profile-title">User Profile</h2>
        <p className="profile-email">Email: {formData.email}</p>

        <div className="profile-grid">
          <input type="email" name="email" value={formData.email} readOnly hidden />

          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            readOnly={!isEditable}
          />

          <label>Password</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              readOnly={!isEditable}
            />
            <i
              className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>

          <label>Services</label>
          <select
            name="services"
            value={formData.services}
            onChange={handleInputChange}
            disabled={!isEditable}
          >
            <option value="Shifting">Shifting</option>
            <option value="Renting">Renting</option>
            <option value="Decorating">Decorating</option>
            <option value="Shifting and Decorating">Shifting and Decorating</option>
            <option value="Shifting and Renting">Shifting and Renting</option>
            <option value="Renting and Decorating">Renting and Decorating</option>
          </select>

          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            readOnly={!isEditable}
          />
        </div>

        <div className="profile-buttons">
          {!isEditable && (
            <button onClick={handleEditClick} className="btn btn-primary">
              Edit
            </button>
          )}
          {showUpdateButton && (
            <button onClick={handleUpdateClick} className="btn btn-success">
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
