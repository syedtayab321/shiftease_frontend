import React, {useState, useEffect} from 'react';
import '../assets/Admincss/adminstyle.css'
import Sidebar from "./Components/Sidebar";
import ProviderDataTable from "./ManageServiceProviders/ProvidersData";
import {useNavigate} from "react-router-dom";
import UserTable from "./ManageUsers/UserTable";
import AdRequestsPage from "./ManageAdsRequests/AdRequests";
import MessageList from './ManageMessages/MessagePage';
export default function AdminDashboard(props){
  const [selectedSection, setSelectedSection] = useState('manage_providers');
  var adminemail = localStorage.getItem('adminEmail');

  const navigate = useNavigate();

  useEffect(() => {
    if (!adminemail) {
      navigate("/admin");
    }
  }, [adminemail, navigate]);
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
                    {selectedSection === 'manage_ad_requests' && <AdRequestsPage/>}
                    {selectedSection === 'manage_messages' && <MessageList/>}
                </div>
            </div>
        </>
    )
}