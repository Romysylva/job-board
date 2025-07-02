import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown, FaChevronRight } from "react-icons/fa";
import {
  FaUsers,
  FaClipboardList,
  FaBriefcase,
  FaBuilding,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const Sidebar = ({ userRole, onPostJobClick }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Hamburger Menu Button (Mobile) */}
      <button
        className="hamburger-menu md:hidden dark:text-gray-200"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`sidebar dark:bg-gray-900 dark:text-white ${
          isSidebarOpen ? "open" : ""
        }`}
      >
        <h2 className="sidebar-title">Company Dashboard</h2>
        <SidebarMenu userRole={userRole} onPostJobClick={onPostJobClick} />
      </aside>
    </>
  );
};

const SidebarMenu = ({ userRole, onPostJobClick }) => {
  const [expandedMenus, setExpandedMenus] = useState({});

  const menuItems = [
    {
      label: "Applicants",
      icon: <FaUsers />,
      roles: ["admin", "manager"],
      path: "/applicants",
    },
    {
      label: "Applications",
      icon: <FaClipboardList />,
      roles: ["admin", "manager"],
      path: "/applications",
    },
    {
      label: "Manage Jobs",
      icon: <FaBriefcase />,
      roles: ["admin"],
      submenu: [
        { label: "Post a Job", icon: <FaPlus />, onClick: onPostJobClick },
        { label: "Update Job", icon: <FaEdit />, path: "/manage-jobs/update" },
        { label: "Delete Job", icon: <FaTrash />, path: "/manage-jobs/delete" },
      ],
    },
    {
      label: "Manage Company",
      icon: <FaBuilding />,
      roles: ["admin", "manager"],
      submenu: [
        {
          label: "Update Company",
          icon: <FaEdit />,
          path: "/manage-company/update",
        },
        {
          label: "Delete Company",
          icon: <FaTrash />,
          path: "/manage-company/delete",
        },
      ],
    },
  ];

  // Toggle submenu
  const toggleSubmenu = (label) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <ul className="sidebar-menu  ">
      {menuItems
        .filter((item) => item.roles.includes(userRole))
        .map((item) => (
          <li key={item.label} className="menu-item">
            {item.submenu ? (
              <div
                className="menu-title "
                onClick={() => toggleSubmenu(item.label)}
              >
                <span className="menu-icon ">{item.icon}</span>
                {item.label}
                {expandedMenus[item.label] ? (
                  <FaChevronDown />
                ) : (
                  <FaChevronRight />
                )}
              </div>
            ) : (
              <NavLink
                to={item.path}
                className="menu-link dark:text-gray-300 hover:underline"
              >
                <span className="menu-icon dark:text-gray-300">
                  {item.icon}
                </span>
                {item.label}
              </NavLink>
            )}

            {item.submenu && expandedMenus[item.label] && (
              <ul className="submenu">
                {item.submenu.map((sub) => (
                  <li key={sub.label}>
                    {sub.onClick ? (
                      <button
                        className="submenu-link dark:text-gray-300 hover:underline"
                        onClick={sub.onClick}
                      >
                        <span className="menu-icon dark:text-gray-300">
                          {sub.icon}
                        </span>
                        {sub.label}
                      </button>
                    ) : (
                      <NavLink
                        to={sub.path}
                        className="submenu-link dark:text-gray-300 hover:underline"
                      >
                        <span className="menu-icon dark:text-gray-300">
                          {sub.icon}
                        </span>
                        {sub.label}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
    </ul>
  );
};

export default Sidebar;
