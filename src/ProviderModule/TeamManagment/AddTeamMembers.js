import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import { Formik, Field, Form as FormikForm } from "formik";
import * as Yup from "yup";
import axios from "axios";
import apiUrls from "../../ApiUrls";

const validationSchema = Yup.object({
  team_member_name: Yup.string().required("Name is required"),
  team_member_email: Yup.string().email("Invalid email address").required("Email is required"),
  team_member_role: Yup.string().required("Role is required"),
  team_member_phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{11}$/, "Phone number must be exactly 11 digits"),
  team_member_cnic: Yup.string()
    .required("CNIC is required")
    .matches(/^[0-9]{13}$/, "CNIC must be exactly 13 digits"),
  team_name: Yup.string().required("Team name is required"),
  team_member_occupation: Yup.string().required("Occupation is required"),
});

const AddTeamMemberModal = ({ show, handleClose, onTeamAdded, teamMemberId }) => {
  const [companyID, setCompanyID] = useState("");
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    const CompanyId = localStorage.getItem("UserID");
    setCompanyID(CompanyId || "");
  }, []);

  useEffect(() => {
    const fetchTeamData = async () => {
      if (teamMemberId) {
        try {
          const response = await axios.get(`${apiUrls.PROVIDER_TEAM_DATA_UPDATE}${teamMemberId}`);
          setTeamData(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching team data:", error);
        }
      }
    };

    fetchTeamData();
  }, [teamMemberId]);

  const initialValues = {
    team_member_name: teamMemberId ? teamData.team_member_name : "",
    team_member_email: teamMemberId ? teamData.team_member_email : "",
    team_member_role: teamMemberId ? teamData.team_member_role : "",
    team_member_phone: teamMemberId ? teamData.team_member_phone : "",
    team_member_cnic: teamMemberId ? teamData.team_member_cnic : "",
    team_name: teamMemberId ? teamData.team_name : "",
    team_member_occupation: teamMemberId ? teamData.team_member_occupation : "", // New field
    company_ID: companyID,
  };

  const handleDataSubmit = async (values) => {
    const formData = new FormData();
    formData.append("team_member_name", values.team_member_name);
    formData.append("team_member_email", values.team_member_email);
    formData.append("team_member_role", values.team_member_role);
    formData.append("team_member_phone", values.team_member_phone);
    formData.append("team_member_cnic", values.team_member_cnic);
    formData.append("team_name", values.team_name);
    formData.append("team_member_occupation", values.team_member_occupation); // Add occupation field
    formData.append("company_id", companyID);

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
        alert("Email or CNIC already exists");
      }
    }
  };

  return (
    <Dialog open={show} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>{teamMemberId ? "Edit Team Member" : "Add Team Member"}</DialogTitle>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleDataSubmit}
      >
        {({ errors, touched, handleChange, values }) => (
          <FormikForm>
            <DialogContent>
              <Grid container spacing={2}>
                {/* Existing Fields */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Team Member Name"
                    name="team_member_name"
                    value={values.team_member_name}
                    onChange={handleChange}
                    error={touched.team_member_name && Boolean(errors.team_member_name)}
                    helperText={touched.team_member_name && errors.team_member_name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Team Member Email"
                    name="team_member_email"
                    value={values.team_member_email}
                    onChange={handleChange}
                    error={touched.team_member_email && Boolean(errors.team_member_email)}
                    helperText={touched.team_member_email && errors.team_member_email}
                  />
                </Grid>
                {/* New Occupation Field */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Occupation"
                    name="team_member_occupation"
                    value={values.team_member_occupation}
                    onChange={handleChange}
                    error={touched.team_member_occupation && Boolean(errors.team_member_occupation)}
                    helperText={touched.team_member_occupation && errors.team_member_occupation}
                  >
                    <MenuItem value="">
                      <em>Select Occupation</em>
                    </MenuItem>
                    <MenuItem value="Leader">Leader</MenuItem>
                    <MenuItem value="Helper">Helper</MenuItem>
                  </TextField>
                </Grid>
                {/* Remaining Fields */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Team Name"
                    name="team_name"
                    value={values.team_name}
                    onChange={handleChange}
                    error={touched.team_name && Boolean(errors.team_name)}
                    helperText={touched.team_name && errors.team_name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Role"
                    name="team_member_role"
                    value={values.team_member_role}
                    onChange={handleChange}
                    error={touched.team_member_role && Boolean(errors.team_member_role)}
                    helperText={touched.team_member_role && errors.team_member_role}
                  >
                    <MenuItem value="">
                      <em>Select Role</em>
                    </MenuItem>
                    <MenuItem value="Shifting">Shifting</MenuItem>
                    <MenuItem value="Decorating">Decorating</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="team_member_phone"
                    value={values.team_member_phone}
                    onChange={handleChange}
                    error={touched.team_member_phone && Boolean(errors.team_member_phone)}
                    helperText={touched.team_member_phone && errors.team_member_phone}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="CNIC"
                    name="team_member_cnic"
                    value={values.team_member_cnic}
                    onChange={handleChange}
                    error={touched.team_member_cnic && Boolean(errors.team_member_cnic)}
                    helperText={touched.team_member_cnic && errors.team_member_cnic}
                    inputProps={{ maxLength: 13 }}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Close
              </Button>
              <Button type="submit" color="primary">
                {teamMemberId ? "Update Team Member" : "Add Team Member"}
              </Button>
            </DialogActions>
          </FormikForm>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddTeamMemberModal;
