import React from "react";
import aboutimage from './../../assets/images/background.png'
import {Link} from "react-router-dom";
export default function About(){
    return(
        <>
            <div className="about-container container mt-5">
                <div className="row">
                    <div className="col-lg-6 about-text-section">
                        <h2 className="about-title">About ShiftEase</h2>
                        <p className="about-lead">
                            Welcome to ShiftEase, your premier platform for renting and shifting services. Our mission
                            is to connect service providers with customers to make home transitions smooth and
                            hassle-free.
                        </p>
                        <p className="about-description">
                            At ShiftEase, we offer a comprehensive solution for companies to register and provide their
                            services to a wide audience. By joining our platform, you can reach potential customers
                            looking for reliable renting, shifting, and decorating services.
                        </p>
                        <p className="about-benefits">
                            <strong>Benefits of Registering with Us:</strong>
                            <ul>
                                <li>Expand your customer base</li>
                                <li>Increase your visibility</li>
                                <li>Boost your business growth</li>
                                <li>Get access to valuable insights and analytics</li>
                            </ul>
                        </p>
                        <p>
                            <Link to="/sign-up" className="btn btn-dark">Register Your Company</Link>
                        </p>
                    </div>
                    <div className="col-lg-6 about-image-section">
                        <img src={aboutimage} alt="About ShiftEase"
                             className="about-image img-fluid"/>
                    </div>
                </div>
            </div>
        </>
    )
}