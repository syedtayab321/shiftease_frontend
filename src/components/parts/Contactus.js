import React from "react";
import {Link} from "react-router-dom";
export default function Contactus(){
    return(
        <>
            <div className="contact-container container mt-5">
                <div className="row">
                    <div className="col-lg-6 contact-form-section">
                        <h2 className="contact-title">Get in Touch</h2>
                        <p className="contact-lead">We'd love to hear from you! Please fill out the form below and we'll
                            get in touch with you shortly.</p>
                        <form action="#" method="post" className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" id="name" name="name" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email" name="email" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input type="tel" className="form-control" id="phone" name="phone" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea className="form-control" id="message" name="message" rows="5"
                                          required></textarea>
                            </div>
                            <button type="submit" className="btn btn-dark  contact-submit-btn">Submit
                            </button>
                        </form>
                    </div>
                    <div className="col-lg-6 contact-info-section">
                        <h2 className="contact-title">Contact Information</h2>
                        <ul className="list-unstyled contact-info">
                            <li><i className="fas fa-map-marker-alt"></i> 123 Main Street, Anytown, USA</li>
                            <li><i className="fas fa-envelope"></i> syedhussain4508@gmail.com</li>
                            <li><i className="fas fa-phone"></i> (+92) 316 0854067</li>
                        </ul>
                        <h3 className="contact-subtitle">Follow Us</h3>
                        <div className="social-icons">
                            <Link to="#" className="mr-3"><i className="fab fa-facebook-f"></i></Link>
                            <Link to="#" className="mr-3"><i className="fab fa-twitter"></i></Link>
                            <Link to="#" className="mr-3"><i className="fab fa-linkedin-in"></i></Link>
                            <Link to="#" className="mr-3"><i className="fab fa-instagram"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}