import React from "react";
import Sidebar from "../components/sidebar/SideBar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-gray-100">{children}</div>
    </div>
  );
};

export default Layout;
