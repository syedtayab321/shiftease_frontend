import React, {useState, useEffect} from 'react';
import '../assets/Admincss/adminstyle.css'
import Sidebar from "./Components/Sidebar";
import ProviderDataTable from "./ManageServiceProviders/ProvidersData";
import {useNavigate} from "react-router-dom";
import UserTable from "./ManageUsers/UserTable";
import MessageList from './ManageMessages/MessagePage';
import PaymentTable from './ManagePayments/PaymentViewPage';
import RentAdsPage from "./ManageAdsRequests/AdRequests";

import ComplaintPage from './ManageComplaints/Complaints';
export default function AdminDashboard(props){
  const [selectedSection, setSelectedSection] = useState('manage_providers');
    const adminEmail = localStorage.getItem('adminEmail');

    const navigate = useNavigate();

  useEffect(() => {
    if (!adminEmail) {
      navigate("/admin");
    }
  }, [adminEmail, navigate]);
  const handleSelect = (section) => {
    setSelectedSection(section);
  };
    return(
        <>
            <div className="admin-dashboard">
                    <Sidebar onselect={handleSelect}/>
                <div className="admin-content">
                    {selectedSection === "manage_providers" && <ProviderDataTable/>}
                    {selectedSection === 'manage_users' && <UserTable/>}
                    {selectedSection === 'manage_ad_requests' && <RentAdsPage/>}
                    {selectedSection === 'manage_messages' && <MessageList/>}
                    {selectedSection === 'manage_payments' && <PaymentTable/>}
                    {selectedSection === 'manage_complaints' && <ComplaintPage/>}
                </div>
            </div>
        </>
    )
}