import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Overview", path: "/dashboard/overview" },
    { name: "Profile", path: "/dashboard/profile" },
    { name: "Saved Jobs", path: "/dashboard/saved-jobs" },
    { name: "Applications", path: "/dashboard/applications" },
    { name: "Notifications", path: "/dashboard/notifications" },
    { name: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
      {/* Hamburger Menu for Mobile */}
      <div className="flex justify-between items-center md:hidden bg-white dark:bg-gray-800 p-4 shadow-lg">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-800 dark:text-white focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`absolute md:relative z-50 md:z-auto ${
          isSidebarOpen ? "left-0" : "-left-full"
        } md:left-0 w-64 bg-white dark:bg-gray-800 shadow-lg md:shadow-none md:h-screen p-4 transition-all duration-300`}
      >
        <div className="text-center mb-6">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-2"
          />
          <h2 className="text-lg font-semibold dark:text-white">Jane Doe</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Software Engineer
          </p>
        </div>
        <nav className="space-y-4">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `block py-2 px-4 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
              onClick={() => setIsSidebarOpen(false)} // Close sidebar on mobile
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
