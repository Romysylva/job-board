import React from "react";

import Sidebar from "./Sidebar";
import DashboardMain from "./DashboardMain";
import ManagementSection from "./ManagementSection";
import Header from "../Header/Header";
import ApplicationsList from "../applicaions/ApplicationList";
import ActivityLog from "./ActivityLog";
import AdminChat from "./AdminChat";
import AdminSettingsPanel from "./AdminSettingsPanel";
import AdminAutomationPanel from "./AdminAutomationPanel";
import RegistrationForm from "./companies/CompanyRegistrationForm";
import CompanyList from "./companies/CompanyList";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex w-screen flex-col admin-dashboard p-6">
      <Header />

      <div className="flex flex-grow">
        {/* Sidebar for Admin Navigation */}
        {/* <Router> */}
        <Sidebar />
        {/* </Router> */}
        <div className="flex-grow p-6 bg-gray-100 dark:bg-gray-900">
          {/* Main Dashboard Content */}
          <DashboardMain />

          {/* System Settings Panel */}
          <AdminSettingsPanel />
          {/* AI & Automation Panel */}
          <AdminAutomationPanel />

          <AdminChat />
          {/* Management Sections */}
          <ManagementSection />
          <ApplicationsList />
          <ActivityLog />
          <CompanyList />
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

// const AdminDashboard = () => {

//   return (
//     <div className="admin-dashboard">
//       <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

//     </div>
//   );
// };

// export default AdminDashboard;
