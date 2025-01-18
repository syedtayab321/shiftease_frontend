import React from 'react';
import logo from './../../assets/images/logo.png'
import {Link} from "react-router-dom";
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to='/'>
                    <img src={logo} alt="Logo" className="rounded-circle logo"/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <h2>Welcome to House Ease</h2>
                        {/*<li className="nav-item">*/}
                        {/*    <Link className="nav-link active" aria-current="page" href="#">Home</Link>*/}
                        {/*</li>*/}
                        {/*<li className="nav-item">*/}
                        {/*    <Link className="nav-link" to='#about'>About</Link>*/}
                        {/*</li>*/}
                        {/*<li className="nav-item">*/}
                        {/*    <Link className="nav-link" to='#about'>Services</Link>*/}
                        {/*</li>*/}
                        {/*<li className="nav-item">*/}
                        {/*    <Link className="nav-link" to='#contact'>Contact us</Link>*/}
                        {/*</li>*/}
                    </ul>
                    <div className="d-flex">
                        <Link to='/login' className="btn btn-outline-dark me-2" type="button">Service Provider Login</Link>
                        <Link to='/sign-up' className="btn btn-dark" type="button">Create Account</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
