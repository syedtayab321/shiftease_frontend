import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Formik, Field, Form as FormikForm } from "formik";
import * as Yup from "yup";
import axios from "axios";
import apiUrls from "../../ApiUrls";

const validationSchema = Yup.object({
  team_member_name: Yup.string().required("Name is required"),
  team_member_email: Yup.string().email("Invalid email address").required("Email is required"),
  team_member_role: Yup.string().required("Role is required"),
  team_member_phone: Yup.string().required("Phone number is required").matches(/^[0-9]{11}$/, "number must be exactly 11 digits"),
  team_member_cnic: Yup.string()
    .required("CNIC is required")
    .matches(/^[0-9]{13}$/, "CNIC must be exactly 13 digits"),
  team_name: Yup.string().required("Team name is required"),
  company_email: Yup.string().email("Invalid email address").required("Company email is required"),
});

const AddTeamMemberModal = ({ show, handleClose, onTeamAdded, teamMemberId }) => {
  const [companyEmail, setCompanyEmail] = useState("");
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("UserEmail");
    setCompanyEmail(email || "");
  }, []);

  useEffect(() => {
    const fetchTeamData = async () => {
      if (teamMemberId) {
        try {
          const response = await axios.get(`http://localhost:8000${teamMemberId}`);
          setTeamData(response.data);
        } catch (error) {
          console.error("Error fetching team data:", error);
        }
      }
    };

    fetchTeamData();
  }, [teamMemberId]);

  const initialValues = {
    team_member_name: teamMemberId  ? teamData.team_member_name : "",
    team_member_email: teamMemberId ? teamData.team_member_email : "",
    team_member_role: teamMemberId ? teamData.team_member_role : "",
    team_member_phone: teamMemberId ? teamData.team_member_phone : "",
    team_member_cnic: teamMemberId  ? teamData.team_member_cnic : "",
    team_name: teamMemberId ? teamData.team_name : "",
    company_email: companyEmail,
  };

  const handleDataSubmit = async (values) => {

    const formData = new FormData();
    formData.append("eam_member_name", values.team_member_name);
    formData.append("team_member_email", values.team_member_email);
    formData.append("team_member_role", values.team_member_role);
    formData.append("team_member_phone", values.team_member_phone);
    formData.append("team_member_cnic", values.team_member_cnic);
    formData.append("team_name", values.team_name);
    formData.append("company_email", companyEmail)

    try {
      if (teamMemberId) {
        const response = await axios.put(`${apiUrls.PROVIDER_TEAM_DATA_UPDATE}${teamMemberId}`, formData);
        console.log("Update response:", response);
      } else {
        const response = await axios.post(`${apiUrls.PROVIDER_TEAM_DATA_POST}`, formData);
        console.log("Post response:", response);
      }
      onTeamAdded();
      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response) {
        alert(error.response.data.message || "An error occurred");
      } else {
        alert("An error occurred");
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{teamMemberId ? "Edit Team Member" : "Add Team Member"}</Modal.Title>
      </Modal.Header>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleDataSubmit}
      >
        {({ errors, touched }) => (
          <FormikForm>
            <Modal.Body>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formTeamName">
                    <Form.Label>Team Name</Form.Label>
                    <Field
                      name="team_name"
                      as={Form.Control}
                      type="text"
                      placeholder="Enter team name"
                      isInvalid={touched.team_name && !!errors.team_name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.team_name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Field
                      name="team_member_name"
                      as={Form.Control}
                      type="text"
                      placeholder="Enter team member's name"
                      isInvalid={touched.team_member_name && !!errors.team_member_name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.team_member_name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="formRole">
                    <Form.Label>Role</Form.Label>
                    <Field
                      name="team_member_role"
                      as="select"
                      className="form-control"
                      isInvalid={touched.team_member_role && !!errors.team_member_role}
                    >
                      <option value="">Select Role</option>
                      <option value="Shifting">Shifting</option>
                      <option value="Decorating">Decorating</option>
                    </Field>
                    <Form.Control.Feedback type="invalid">
                      {errors.team_member_role}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formPhone">
                    <Form.Label>Phone</Form.Label>
                    <Field
                      name="team_member_phone"
                      as={Form.Control}
                      type="text"
                      placeholder="Enter team member's phone number"
                      isInvalid={touched.team_member_phone && !!errors.team_member_phone}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.team_member_phone}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="formCnic">
                    <Form.Label>CNIC</Form.Label>
                    <Field
                      name="team_member_cnic"
                      as={Form.Control}
                      type="text"
                      placeholder="Enter team member's CNIC (13 digits)"
                      maxLength="13"
                      isInvalid={touched.team_member_cnic && !!errors.team_member_cnic}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.team_member_cnic}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit" variant="primary">
                {teamMemberId ? "Update" : "Add"} Team Member
              </Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

export default AddTeamMemberModal;
