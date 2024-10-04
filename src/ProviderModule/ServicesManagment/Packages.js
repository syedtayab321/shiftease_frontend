import React, { useState, useEffect } from 'react';
import './../../assets/Providercss/packages.css';
import axios from "axios";
import AddPackage from "./AddPackage";
import { Button, FormControl, Card, Row, Col } from 'react-bootstrap';

const Packages = () => {
  const [packagesData, setPackagesData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const CompanyEmail = localStorage.getItem("UserEmail");
  const [packageId, setPackageId] = useState('');

  const fetchPackagesData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/providerapis/packagesdata/?email=${CompanyEmail}`);
      if (Array.isArray(response.data)) {
        setPackagesData(response.data);
      } else {
        console.error("Unexpected response format", response.data);
        setPackagesData([]);
      }
    } catch (error) {
      console.error("Error fetching packages data:", error);
      alert("An error occurred while fetching package data.");
    }
  };

  useEffect(() => {
    if (CompanyEmail) {
      fetchPackagesData();
    }
  }, [CompanyEmail]);

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

  const DeletePackage = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/providerapis/packagesdata/?id=${id}`);
      fetchPackagesData();
    } catch (error) {
      console.error("Error deleting package:", error);
      alert("An error occurred while deleting the package.");
    }
  };

  const UpdateModal = (id) => {
    setPackageId(id);
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
                    src={`http://localhost:8000${pkg.package_image}`}
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
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    className="deleteButton"
                    onClick={() => DeletePackage(pkg.id)}
                  >
                    Delete
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
