import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik, Field, Form as FormikForm } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./../../assets/Providercss/packages.css";

const validationSchema = Yup.object({
  package_name: Yup.string().required("Package name is required"),
  package_service: Yup.string().required("Service type is required"),
  package_price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number"),
});

const AddPackage = ({ show, handleClose, onPackageAdded, packageid }) => {
  const [companyEmail, setCompanyEmail] = useState("");
  const [packageData, setPackageData] = useState({});

  useEffect(() => {
    const email = localStorage.getItem("UserEmail");
    setCompanyEmail(email || "");
  }, []);

  useEffect(() => {
    const fetchPackageData = async () => {
      if (packageid) {
        try {
          const response = await axios.get(
            `http://localhost:8000/providerapis/packagesdata/?id=${packageid}`
          );
          setPackageData(response.data);
        } catch (error) {
          console.error("Error fetching package data:", error);
        }
      }
    };
    fetchPackageData();
  }, [packageid]);

  const initialValues = {
    package_name: packageid ? packageData.package_name : "",
    package_service:packageid ? packageData.package_service : "",
    package_price:packageid ? packageData.package_price : "",
    company_email:companyEmail,
  };

  const handleSubmit = async (values) => {
    const data = {
      package_name: values.package_name,
      package_service: values.package_service,
      package_price: values.package_price,
      company_email: companyEmail,
    };

    try {
      if (packageid) {
        await axios.put(
          `http://localhost:8000/providerapis/packagesdata/?id=${packageid}`,
          data
        );
      } else {
        await axios.post("http://localhost:8000/providerapis/packagesdata/", data);
        alert('data saved')
      }
      handleClose();
      onPackageAdded();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred: " + (error.response?.data?.error || error.message));
    }
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
        {({ errors, touched }) => (
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
                  <option value="Shifting and Decorating">Shifting and Decorating</option>
                </Field>
                <Form.Control.Feedback type="invalid" className="feedback-custom">
                  {errors.package_service}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Package Price Field */}
              <Form.Group controlId="formPackagePrice" className="form-group-custom">
                <Form.Label className="form-label-custom">Package Price</Form.Label>
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

              {/* Read-only Company Email Field */}
              <Form.Group controlId="formCompanyEmail" className="form-group-custom">
                <Form.Label className="form-label-custom">Company Email</Form.Label>
                <Field
                  name="company_email"
                  as={Form.Control}
                  type="email"
                  value={companyEmail}
                  readOnly
                  className="form-control-custom"
                />
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
