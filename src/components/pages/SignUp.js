import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Spinner } from 'react-bootstrap';
import logo from './../../assets/images/logo_back.png';

const SignUp = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); // For showing the spinner

  return (
    <div className='main-signup-section'>
      <div className="signup-container">
        <div className='Image-section'>
           <img src={logo} alt="Logo" />
        </div>
        <div className="signup-section">
          <h2>Create an account</h2>
          <p>Sign up to access our services:</p>
          <Formik
            initialValues={{
              email: "",
              company: "",
              location: "",
              services: "",
              countryCode: "+92",
              phone: "",
              zipcode: "",
              password: "",
              confirmPassword: "",
              image: null,
            }}
            validationSchema={Yup.object({
              email: Yup.string().email("Invalid email address").required("Required"),
              company: Yup.string().required("Required"),
              location: Yup.string().required("Required"),
              services: Yup.string().required("Required"),
              phone: Yup.string().required("Required"),
              zipcode: Yup.string().required("Required"),
              password: Yup.string()
                .min(8, "Password must be at least 8 characters")
                .required("Required"),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], "Passwords must match")
                .required("Required"),
              image: Yup.mixed().required("Required") // Validation for image
            })}
            onSubmit={async (values, { resetForm, setErrors }) => {
              setIsSubmitting(true);

              const formData = new FormData();
              formData.append('email', values.email);
              formData.append('company_name', values.company);
              formData.append('location', values.location);
              formData.append('service', values.services);
              formData.append('mobile_no', values.countryCode + values.phone);
              formData.append('zipcode', values.zipcode);
              formData.append('password', values.password);
              formData.append('request_status', 'pending');
              formData.append('profile_image', values.image); // Append image file

              try {
                const response = await axios.post('http://127.0.0.1:8000/providerapis/signup/', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  }
                });
                setIsSubmitting(false);
                navigate('/confirmation');
              } catch (error) {
                setIsSubmitting(false);
                if (error.response && error.response.status === 400) {
                  setErrors({ email: error.response.data.error });
                } else {
                  console.error('Error during signup:', error);
                }
              }
            }}
          >
            {({ setFieldValue, errors }) => (

                 <Form>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                        type="email"
                        id="email"
                        name="email"
                        placeholder="hello@company.com"
                    />
                    {errors.email && <div className="error text text-danger">{errors.email}</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">Company Logo</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={(event) => {
                          setFieldValue("image", event.currentTarget.files[0]);
                        }}
                    />
                    <ErrorMessage name="image" component="div" className="error text text-danger"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Company Name</label>
                    <Field
                        type="text"
                        id="company"
                        name="company"
                        placeholder="Your Company"
                    />
                    <ErrorMessage name="company" component="div" className="error text text-danger"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <Field
                        type="text"
                        id="location"
                        name="location"
                        placeholder="City, Country"
                    />
                    <ErrorMessage name="location" component="div" className="error text text-danger"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="services">Select Services</label>
                    <Field as="select" id="services" name="services">
                      <option value="">Select Options</option>
                      <option value="All">All</option>
                      <option value="decorating">Decorating</option>
                      <option value="shifting">Shifting</option>
                    </Field>
                    <ErrorMessage name="services" component="div" className="error text text-danger"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Mobile Number</label>
                    <div className="phone-input">
                      <Field as="select" id="countryCode" name="countryCode">
                        <option value="+92">+92</option>
                        <option value="+44">+44</option>
                        <option value="+91">+91</option>
                      </Field>
                      <Field
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder="1234567890"
                      />
                    </div>
                    <ErrorMessage name="phone" component="div" className="error text text-danger"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipcode">Zip Code</label>
                    <Field
                        type="number"
                        id="zipcode"
                        name="zipcode"
                        placeholder="12340"
                    />
                    <ErrorMessage name="zipcode" component="div" className="error text text-danger"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                        type="password"
                        id="password"
                        name="password"
                        placeholder="********"
                    />
                    <ErrorMessage name="password" component="div" className="error text text-danger"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Field
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="********"
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="error text text-danger"/>
                  </div>

                  <button type="submit" className="sign-up-btn" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                          <Spinner animation="border" size="sm"/> Processing...
                        </>
                    ) : (
                        'Sign Up'
                    )}
                  </button>
                </Form>
            )}
          </Formik>
          <div className="links">
            <p className="login">Already have an account? <Link to='/login'>Log In</Link></p>
            <Link to='/' className="singupbtn">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
