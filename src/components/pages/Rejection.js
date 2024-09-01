import React from "react";
import { useNavigate,Link } from "react-router-dom";

export default function Rejection() {
    const navigate = useNavigate();
    return (
        <div className='main-confirmatio'>
            <div className="container mt-5">
                <div className="text-center">
                    <h1 className="display-4 text-danger">Request Rejected</h1>
                    <p className="lead">Your request has been rejected. Kindly contact the admin for further
                        details.</p>
                      <Link to="/" className="btn btn-primary">Go Back to Home</Link>
                </div>
            </div>
        </div>
    );
}
