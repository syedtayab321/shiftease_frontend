import React, { useState ,useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate=useNavigate();
   useEffect(() => {
    const storedEmail = localStorage.getItem("adminEmail");
    if (storedEmail) {
      navigate('/admindashboard');
    }
  }, [navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const validEmail = "admin321@gmail.com";
    const validPassword = "admin987";
    if (email === validEmail && password === validPassword) {
      localStorage.setItem("adminEmail", email);
      navigate('/admindashboard')
    } else{
      setError("Cridentials are wrong");
    }
  };
  return (
    <>
      <div className="login-page-wrapper">
        <div className="login-form-container">
          <h2>Admin Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group form-group-custom">
              <label htmlFor="email">Email</label>
              <input
                  type="email"
                  className="form-control form-control-custom"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group form-group-custom">
              <label htmlFor="password">Password</label>
              <input
                  type="password"
                  className="form-control form-control-custom"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  show Password
                </label>
              </div>
            </div>
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-success btn-custom">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}
