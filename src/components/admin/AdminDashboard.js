import React from "react";

import Sidebar from "./Sidebar";
import DashboardMain from "./DashboardMain";
import ManagementSection from "./ManagementSection";
import Header from "../Header/Header";
import ApplicationsList from "../applicaions/ApplicationList";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex w-screen flex-col admin-dashboard">
      <Header />

      <div className="flex flex-grow">
        {/* Sidebar for Admin Navigation */}
        {/* <Router> */}
        <Sidebar />
        {/* </Router> */}
        <div className="flex-grow p-6 bg-gray-100 dark:bg-gray-900">
          {/* Main Dashboard Content */}
          <DashboardMain />
          {/* Management Sections */}
          <ManagementSection />
          <ApplicationsList />
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
