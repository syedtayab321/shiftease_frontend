import React, {useEffect} from "react";
import image1 from './../../assets/images/logo_back.png'
import {Link,useNavigate} from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
export  default function ProviderLogin(){
  const navigate=useNavigate()

     useEffect(() => {
    const storedEmail = localStorage.getItem("UserEmail");
    if (storedEmail) {
      navigate('/dashboard');
    }
  }, [navigate]);

    return(
        <>
            <div className='main-login-section'>
                <div className="login-container">
                    <div className="image-section">
                        <img src={image1} alt="Room"/>
                    </div>
                    <div className="login-section">
                        <h2>Welcome back!</h2>
                        <p>Sign in to access your dashboard, settings and projects:</p>
                        <Formik
                            initialValues={{email: '', password: ''}}
                            validationSchema={Yup.object({
                                email: Yup.string()
                                    .email('Invalid email address')
                                    .required('Required'),
                                password: Yup.string()
                                    .min(6, 'Must be 6 characters or more')
                                    .required('Required'),
                            })}
                            onSubmit={async(values,{setErrors}) => {
                                try{
                                    const response=await axios.post('http://127.0.0.1:8000/providerapis/login/', values);
                                if (response.status === 200) {
                                const { email, requeststatus } = response.data;
                                  if(requeststatus === 'pending'){
                                      navigate('/confirmation')
                                   }else if(requeststatus==='Rejected'){
                                      navigate('/rejection')
                                  }else if(requeststatus==='Approved'){
                                      navigate('/dashboard')
                                      localStorage.setItem('UserEmail',email)
                                  }
                            }
                                }catch (error) {
                if (error.response && error.response.status === 400) {
                  setErrors({ password: error.response.data.error });
                } else {
                  console.error('Error during login:', error);
                }
              }
                            }}
                        >
                            {({errors})=>(
                                <Form>
                                <label htmlFor="email">Email</label>
                                <Field type="email" id="email" name="email" placeholder="hello@123d.one" required/>
                                {errors.email && <div className="error text text-danger">{errors.email}</div>}
                                <label htmlFor="password">Password</label>
                                <Field type="password" id="password" name="password" placeholder="********" required/>
                                {errors.password && <div className="error text text-danger">{errors.password}</div>}
                                <div className="options">
                                    <a href="#">Forgot password?</a>
                                </div>

                                <button type="submit" className="sign-in-btn">Sign In</button>
                                <Link to='/' type="button" className="google-sign-in-btn">Back to Home Page</Link>
                            </Form>
                            )}
                        </Formik>

                        <p className="sign-up">Don't have an account? <Link to="/sign-up">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
}