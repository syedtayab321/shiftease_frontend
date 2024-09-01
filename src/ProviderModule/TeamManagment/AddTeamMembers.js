import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Formik, Field, Form as FormikForm } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object({
  team_member_name: Yup.string().required("Name is required"),
  team_member_email: Yup.string().email("Invalid email address").required("Email is required"),
  team_member_role: Yup.string().required("Role is required"),
  team_member_phone: Yup.string().required("Phone number is required"),
  team_member_cnic: Yup.string()
    .required("CNIC is required")
    .matches(/^[0-9]{13}$/, "CNIC must be exactly 13 digits"),
  team_name: Yup.string().required("Team name is required"),
  company_email: Yup.string().email("Invalid email address").required("Company email is required"),
});

const AddTeamMemberModal = ({ show, handleClose, onTeamAdded,teamMemberId }) => {
  const [companyEmail, setCompanyEmail] = useState("");
  const [teamdata,setTeamData]=useState([]);

  useEffect(() => {
    const email = localStorage.getItem("UserEmail");
    setCompanyEmail(email || "");
  }, []);

useEffect(() => {
  const fetchTeamData = async () => {
    if (teamMemberId) {
      try {
        const response = await axios.get(`http://localhost:8000/providerapis/teamdata/?id=${teamMemberId}`);
        setTeamData(response.data);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    }
  };

  fetchTeamData();
}, [teamMemberId]);

  const initialValues = {
    team_member_name: teamMemberId?teamdata.team_member_name:"",
    team_member_email:teamMemberId?teamdata.team_member_email: "",
    team_member_role:teamMemberId?teamdata.team_member_role: "",
    team_member_phone:teamMemberId?teamdata.team_member_phone: "",
    team_member_cnic:teamMemberId?teamdata.team_member_cnic: "",
    team_name:teamMemberId?teamdata.team_name: "",
    company_email: companyEmail,
  };

  const handleSubmit = async (values) => {
    if(teamMemberId){
      try {
      await axios.put(`http://localhost:8000/providerapis/teamdata/?id=${teamMemberId}`, values);
      handleClose();
      onTeamAdded();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error.message);
    }
    }
    else
    {
      try {
      await axios.post("http://localhost:8000/providerapis/teamdata/", values);
      handleClose();
      onTeamAdded();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error.message);
    }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Team Member</Modal.Title>
      </Modal.Header>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
                  <Form.Group controlId="formCompanyEmail">
                    <Form.Label>Company Email</Form.Label>
                    <Field
                      name="company_email"
                      as={Form.Control}
                      type="email"
                      value={companyEmail} // Display the company email fetched from state
                      isInvalid={touched.company_email && !!errors.company_email}
                      readOnly
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.company_email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
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
                <Col md={6}>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Field
                      name="team_member_email"
                      as={Form.Control}
                      type="email"
                      placeholder="Enter team member's email"
                      isInvalid={touched.team_member_email && !!errors.team_member_email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.team_member_email}
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
                Add Team Member
              </Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

export default AddTeamMemberModal;
