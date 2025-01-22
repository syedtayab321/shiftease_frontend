import "./App.css";
import "./assets/css/style.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import ProviderLogin from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import Confirmation from "./components/pages/Confirmation";
import Dashboard from "./ProviderModule/Dashboard";
import AdminLogin from "./AdminModule/AdminLogin";
import AdminDashboard from "./AdminModule/AdminDashboard";
import React from "react";
import Rejection from "./components/pages/Rejection";
import ForgotPassword from "./ProviderModule/ForgotPassword/ForgotPassword";
import VerifyCode from "./ProviderModule/ForgotPassword/VerifyCode";
import ResetPassword from "./ProviderModule/ForgotPassword/ResetPassword";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={MainPage}></Route>
        <Route path='/login' Component={ProviderLogin}></Route>
        <Route path='/sign-up' Component={SignUp}></Route>
        <Route path='/confirmation' Component={Confirmation}></Route>
        <Route path='/dashboard' Component={Dashboard}></Route>
        <Route path='/admin' Component={AdminLogin}></Route>
        <Route path='/admindashboard' Component={AdminDashboard}></Route>
        <Route path='/rejection' Component={Rejection}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
