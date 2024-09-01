import Navbar from './../parts/Navbar'
import React from "react";
import logo from './../../assets/images/shifting.png'
import {Link} from "react-router-dom";
import  './../../assets/css/style.css'
import Contactus from "../parts/Contactus";
import About from "../parts/About";
import Footer from '../parts/Footer';
import AppSection from "../parts/AppSection";
export default function MainPage(){
    return(
        <>
                <div className='main'>
                    <Navbar/>
                    <div className="container-fluid">
                        <div className="row hero">
                            <div className="col-md-6 text">
                                <h1>Moving and Renting House Services</h1>
                                <h4>Create Account and Offer services</h4>
                                <p>
                                    Moving to a new home can be both exciting and overwhelming. Our comprehensive home
                                    shifting and renting services are designed to make your transition smooth and
                                    hassle-free.
                                </p>
                                <Link to="/sign-up" className="btn btn-dark">Get Started</Link>
                            </div>
                            <div className="col-md-6">
                                <img
                                    src={logo}
                                    alt="Moving House Services"/>
                            </div>
                        </div>
                    </div>
                </div>
            <div className='about-section' id='about'>
                <About/>
            </div>
              <div className='contact-section' id='contact'>
                  <Contactus/>
              </div>
              <AppSection/>
              <Footer/>
        </>
    );
}