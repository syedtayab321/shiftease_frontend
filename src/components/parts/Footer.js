import React from "react";
export default function Footer(){
    return (
        <>
    
    <footer className="footer-bg">
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-sm-12">
                    <h5 className="footer-title">About Us</h5>
                    <p className="footer-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
                </div>
                <div className="col-md-4 col-sm-12">
                    <h5 className="footer-title">Quick Links</h5>
                    <ul className="list-unstyled footer-links">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div className="col-md-4 col-sm-12">
                    <h5 className="footer-title">Contact Us</h5>
                    <p className="footer-text">Email: info@example.com</p>
                    <p className="footer-text">Phone: +123 456 7890</p>
                    <p className="footer-text">Address: 123 Street, City, Country</p>
                </div>
            </div>
            <div className="row">
                <div className="col-12 text-center">
                    <p className="footer-copy">&copy; 2024 Your Company. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    </footer>
        </>
    );
}