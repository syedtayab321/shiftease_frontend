import React, { useState, useEffect } from 'react';
import './../../assets/Providercss/packages.css';
import axios from "axios";
import AddPackage from "./AddPackage";
import { Button, FormControl, Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'; // Import icons
import apiUrls from '../../ApiUrls';

const Packages = () => {
  const [packagesData, setPackagesData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const CompanyID = localStorage.getItem("UserID");
  const [packageId, setPackageId] = useState('');

  const fetchPackagesData = async () => {
    try {
      const response = await axios.get(`${apiUrls.PROVIDER_PACKAGE_DATA_GET}${CompanyID}`);
      
      if (Array.isArray(response.data)) {
        setPackagesData(response.data);
      } else {
        console.error("Unexpected response format", response.data);
        setPackagesData([]);
      }
    } catch (error) {
      console.error("Error fetching packages data:", error);
    }
  };

  useEffect(() => {
    if (CompanyID) {
      fetchPackagesData();
    }
  }, [CompanyID]);

  const handlePackageAdded = () => {
    fetchPackagesData();
    handleClose();
  };

  const filteredPackages = Array.isArray(packagesData)
    ? packagesData.filter((pkg) =>
        pkg.package_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.id.toString().includes(searchTerm) ||
        pkg.package_service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.package_price.toString().includes(searchTerm)
      )
    : [];

  const DeletePackage = async (package_id) => {
    try {
      await axios.delete(`${apiUrls.PROVIDER_PACKAGE_DELETE}${package_id}`);
      fetchPackagesData();
    } catch (error) {
      console.error("Error deleting package:", error);
      alert("An error occurred while deleting the package.");
    }
  };

  const UpdateModal = (package_id) => {
    setPackageId(package_id);
    handleShow();
  };

  const AddModal = () => {
    setPackageId('');
    handleShow();
  };

  return (
    <div className="container">
      <h2 className="header">Your Packages</h2>

      <div className="controls mb-4">
        <Button className="addButton" onClick={AddModal}>Add New Package</Button>
        <FormControl
          type="text"
          placeholder="Search Packages"
          className="searchBar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <AddPackage show={showModal} handleClose={handleClose} onPackageAdded={handlePackageAdded} packageid={packageId} />
      <Row>
        {filteredPackages.length > 0 ? (
          filteredPackages.map((pkg, index) => (
            <Col key={pkg.id} md={4} sm={6} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={`${apiUrls.MAIN_URL}${pkg.package_image}`}
                  alt={pkg.package_name}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{pkg.package_name}</Card.Title>
                  <Card.Text>
                    <strong>Service:</strong> {pkg.package_service} <br />
                    <strong>Price:</strong> ${pkg.package_price}
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="actionButton me-2"
                    onClick={() => UpdateModal(pkg.id)}
                  >
                    <FontAwesomeIcon icon={faEdit} /> {/* Update icon */}
                  </Button>
                  <Button
                    variant="danger"
                    className="deleteButton"
                    onClick={() => DeletePackage(pkg.id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} /> {/* Delete icon */}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center">No packages found</p>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Packages;
