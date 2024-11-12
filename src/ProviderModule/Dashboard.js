import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import '../assets/Providercss/dashboard.css';
import ProviderSidebar from './DashboardComponents/ProviderSidebar';
import TopBar from './DashboardComponents/TopBar';
import OrdersTable from './OrdersManagement/OrderTable';
import TeamDataTable from './TeamManagment/TeamDataTable';
import UserProfile from './ProfileManagement';
import Packages from './ServicesManagment/Packages';
import Requests from './RequestsManagement/Requests';
import ReviewsPage from './Reviews/Reviews';
import OrderMainPage from './OrdersManagement/OrderMainPage';
import ProviderMessageTable from "./ManageMessages/MessagesTable";

export default function Dashboard() {
  const [selectedSection, setSelectedSection] = useState('home');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('UserID');
    if (!id) {
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  }, [navigate]);

  const handleSelect = (section) => {
    setSelectedSection(section);
  };

  return (
    <>
      <div className="provider-dashboard">
        <div className="provider-sidebar">
          <ProviderSidebar onselect={handleSelect} />
        </div>
        <div className="Providers-content">
          <TopBar />
          {selectedSection === 'home' && <OrdersTable />}
          {selectedSection === 'team' && <TeamDataTable />}
          {selectedSection === 'profile' && <UserProfile />}
          {selectedSection === 'messages' && <ProviderMessageTable />}
          {selectedSection === 'packages' && <Packages />}
          {selectedSection === 'requests' && <Requests />}
          {selectedSection === 'reviews' && <ReviewsPage />}
          {selectedSection === 'orders' && <OrderMainPage />}
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        message="You need to login first!"
        onClose={() => setOpenSnackbar(false)}
      />
    </>
  );
}
