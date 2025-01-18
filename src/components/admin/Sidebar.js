import React from "react";
import { Link } from "react-router-dom";
import AdminProfile from "./AdminProfile";

const Sidebar = ({ userId }) => {
  const links = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Manage Users", path: "/admin/users" },
    { name: "Manage Jobs", path: "/admin/jobs" },
    { name: "Manage Companies", path: "/admin/companies" },
    { name: "Manage Reviews", path: "/admin/reviews" },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
      <AdminProfile userId={userId} />
      <nav className="p-6">
        <ul className="space-y-4">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                className="block py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                activeClassName="bg-blue-500 text-white dark:bg-blue-600"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
