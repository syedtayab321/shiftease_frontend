import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik, Field, Form as FormikForm } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./../../assets/Providercss/packages.css";
import apiUrls from "../../ApiUrls";

const validationSchema = Yup.object({
  package_name: Yup.string().required("Package name is required"),
  package_service: Yup.string().required("Service type is required"),
  package_description:Yup.string().required('service description is required'),
  package_price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number"),
});

const AddPackage = ({ show, handleClose, onPackageAdded, packageid }) => {
  const [companyID, setCompanyID] = useState("");
  const [packageData, setPackageData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const ID = localStorage.getItem("UserID");
    setCompanyID(ID || "");
  }, []);

  useEffect(() => {
    const fetchPackageData = async () => {
      if (packageid) {
        try {
          const response = await axios.get(
            `${apiUrls.PROVIDER_PACKAGE_UPDATE}${packageid}`
          );
          setPackageData(response.data);
        } catch (error) {
          alert("Error fetching package data:", error);
        }
      }
    };
    fetchPackageData();
  }, [packageid]);

  const initialValues = {
    package_name: packageid ? packageData.package_name : "",
    package_service: packageid ? packageData.package_service : "",
    package_price: packageid ? packageData.package_price : "",
    package_description: packageid ? packageData.package_description : "",
    company_id: companyID,
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("package_name", values.package_name);
    formData.append("package_service", values.package_service);
    formData.append("package_price", values.package_price);
    formData.append("package_description", values.package_description);
    formData.append("company_id", companyID);
    if (selectedImage) {
      formData.append("package_image", selectedImage);
    }

    try {
      if (packageid) {
        await axios.put(
          `${apiUrls.PROVIDER_PACKAGE_UPDATE}${packageid}`,
           formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post(
          `${apiUrls.PROVIDER_PACKAGE_POST}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Data saved");
      }
      handleClose();
      onPackageAdded();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred: " + (error.response?.data?.error || error.message));
    }
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    setSelectedImage(event.currentTarget.files[0]);
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="add-package-modal">
      <Modal.Header closeButton className="add-package-header">
        <Modal.Title className="add-package-title">
          {packageid ? "Edit Package" : "Add New Package"}
        </Modal.Title>
      </Modal.Header>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue }) => (
          <FormikForm className="add-package-form">
            <Modal.Body className="add-package-body">
              {/* Package Name Field */}
              <Form.Group controlId="formPackageName" className="form-group-custom">
                <Form.Label className="form-label-custom">Package Name</Form.Label>
                <Field
                  name="package_name"
                  as={Form.Control}
                  type="text"
                  placeholder="Enter package name"
                  className="form-control-custom"
                  isInvalid={touched.package_name && !!errors.package_name}
                />
                <Form.Control.Feedback type="invalid" className="feedback-custom">
                  {errors.package_name}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Package Service Field */}
              <Form.Group controlId="formPackageService" className="form-group-custom">
                <Form.Label className="form-label-custom">Package Service</Form.Label>
                <Field
                  name="package_service"
                  as="select"
                  className="form-control-custom"
                  isInvalid={touched.package_service && !!errors.package_service}
                >
                  <option value="">Select service type</option>
                  <option value="Shifting">Shifting</option>
                  <option value="Decorating">Decorating</option>
                  <option value="Shifting and Decorating">
                    Shifting and Decorating
                  </option>
                </Field>
                <Form.Control.Feedback type="invalid" className="feedback-custom">
                  {errors.package_service}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Package Price Field */}
              <Form.Group controlId="formPackagePrice" className="form-group-custom">
                <Form.Label className="form-label-custom">Package Price(PKR)</Form.Label>
                <Field
                  name="package_price"
                  as={Form.Control}
                  type="number"
                  placeholder="Enter package price"
                  className="form-control-custom"
                  isInvalid={touched.package_price && !!errors.package_price}
                />
                <Form.Control.Feedback type="invalid" className="feedback-custom">
                  {errors.package_price}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Package Image Field */}
              <Form.Group controlId="formPackageImage" className="form-group-custom">
                <Form.Label className="form-label-custom">Package Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  className="form-control-custom"
                  onChange={handleFileChange}
                />
              </Form.Group>
              <Form.Group controlId="formPackageDescription" className="form-group-custom">
                <Form.Label className="form-label-custom">Package Description</Form.Label>
                <Field name="package_description" 
                  as={Form.Control}
                  type="text"
                  maxLength={1000}
                  placeholder="Enter package description about 1000 words"
                  className="form-control-custom"
                  isInvalid={touched.package_description && !!errors.package_description}
                />
                <Form.Control.Feedback type="invalid" className="feedback-custom">
                  {errors.package_description}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="add-package-footer">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="close-button-custom"
              >
                Close
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="submit-button-custom"
              >
                {packageid ? "Update Package" : "Add Package"}
              </Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

export default AddPackage;
