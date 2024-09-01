import React, {useState} from 'react';
import '../assets/Providercss/dashboard.css'
import ProviderSidebar from "./DashboardComponents/ProviderSidebar";
import TopBar from "./DashboardComponents/TopBar";
import OrdersTable from "./OrdersManagement/OrderTable";
import TeamDataTable from "./TeamManagment/TeamDataTable";
import UserProfile from "./ProfileManagement";
import Notifications from "./Notifications/Notifications";
import Packages from "./ServicesManagment/Packages";
import Requests from "./RequestsManagement/Requests";
import ReviewsPage from "./Reviews/Reviews";
import OrderMainPage from "./OrdersManagement/OrderMainPage";
export default function Dashboard(){
  const [selectedSection, setSelectedSection] = useState('home');

  const handleSelect = (section) => {
    setSelectedSection(section);
  };
  var email=localStorage.getItem("UserEmail");
  return (
      <>
        <div className="provider-dashboard">
          <div className="provider-sidebar">
            <ProviderSidebar onselect={handleSelect}/>
          </div>
          <div className="Providers-content">
            <TopBar/>
            {selectedSection === "home" && <OrdersTable/>}
            {selectedSection === "team" && <TeamDataTable/>}
            {selectedSection === "profile" && <UserProfile/>}
            {selectedSection === "notifications" && <Notifications/>}
            {selectedSection === "packages" && <Packages/>}
            {selectedSection === "requests" && <Requests/>}
            {selectedSection === "reviews" && <ReviewsPage/>}
            {selectedSection === "orders" && <OrderMainPage/>}
          </div>
        </div>
      </>
  );
}