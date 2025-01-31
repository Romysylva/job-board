import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown, FaChevronRight } from "react-icons/fa";
import { 
  FaUsers, FaClipboardList, FaBriefcase, FaBuilding, 
  FaPlus, FaEdit, FaTrash 
} from "react-icons/fa"; // Importing icons

const Sidebar = ({ userRole }) => {
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
      <aside className={`sidebar dark:bg-gray-900 dark:text-white ${isSidebarOpen ? "open" : ""}`}>
        <h2 className="sidebar-title">Company Dashboard</h2>
        <SidebarMenu userRole={userRole} />
      </aside>
    </>
  );
};

const SidebarMenu = ({ userRole }) => {
  const [expandedMenus, setExpandedMenus] = useState({});

  const menuItems = [
    { label: "Applicants", icon: <FaUsers />, roles: ["admin", "manager"], path: "/applicants" },
    { label: "Applications", icon: <FaClipboardList />, roles: ["admin", "manager"], path: "/applications" },
    {
      label: "Manage Jobs",
      icon: <FaBriefcase />,
      roles: ["admin"],
      submenu: [
        { label: "Post a Job", icon: <FaPlus />, path: "/manage-jobs/post" },
        { label: "Update Job", icon: <FaEdit />, path: "/manage-jobs/update" },
        { label: "Delete Job", icon: <FaTrash />, path: "/manage-jobs/delete" },
      ],
    },
    {
      label: "Manage Company",
      icon: <FaBuilding />,
      roles: ["admin", "manager"],
      submenu: [
        { label: "Update Company", icon: <FaEdit />, path: "/manage-company/update" },
        { label: "Delete Company", icon: <FaTrash />, path: "/manage-company/delete" },
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
              <div className="menu-title " onClick={() => toggleSubmenu(item.label)}>
                <span className="menu-icon ">{item.icon}</span>
                {item.label}
                {expandedMenus[item.label] ? <FaChevronDown /> : <FaChevronRight />}
              </div>
            ) : (
              <NavLink to={item.path} className="menu-link dark:text-gray-300 hover:underline">
                <span className="menu-icon dark:text-gray-300">{item.icon}</span>
                {item.label}
              </NavLink>
            )}

            {item.submenu && expandedMenus[item.label] && (
              <ul className="submenu">
                {item.submenu.map((sub) => (
                  <li key={sub.label} >
                    <NavLink to={sub.path} className="submenu-link dark:text-gray-300 hover:underline">
                      <span className="menu-icon dark:text-gray-300">{sub.icon}</span>
                      {sub.label}
                    </NavLink>
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






// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { FaBars, FaTimes, FaChevronDown, FaChevronRight } from "react-icons/fa";

// const Sidebar = ({ userRole }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   return (
//     <>
//       {/* Hamburger Menu Button (Mobile) */}
//       <button
//         className="hamburger-menu md:hidden"
//         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//       >
//         {isSidebarOpen ? <FaTimes /> : <FaBars />}
//       </button>

//       {/* Sidebar */}
//       <aside className={`sidebar w-64 h-screen dark:bg-gray-900  p-4 dark:text-gray-300 ${isSidebarOpen ? "open" : ""}`} >
//         <h2 className="sidebar-title">Company Dashboard</h2>
//         <SidebarMenu userRole={userRole} />
//       </aside>
//     </>
//   );
// };

// const SidebarMenu = ({ userRole }) => {
//   const [expandedMenus, setExpandedMenus] = useState({});

//   const menuItems = [
//     { label: "Applicants", roles: ["admin", "manager"], path: "/applicants" },
//     { label: "Applications", roles: ["admin", "manager"], path: "/applications" },
//     {
//       label: "Manage Jobs",
//       roles: ["admin"],
//       submenu: [
//         { label: "Post a Job", path: "/manage-jobs/post" },
//         { label: "Update Job", path: "/manage-jobs/update" },
//         { label: "Delete Job", path: "/manage-jobs/delete" },
//       ],
//     },
//     {
//       label: "Manage Company",
//       roles: ["admin", "manager"],
//       submenu: [
//         { label: "Update Company", path: "/manage-company/update" },
//         { label: "Delete Company", path: "/manage-company/delete" },
//       ],
//     },
//   ];

//   // Toggle submenu
//   const toggleSubmenu = (label) => {
//     setExpandedMenus((prev) => ({
//       ...prev,
//       [label]: !prev[label],
//     }));
//   };

//   return (
//     <ul className="sidebar-menu">
//       {menuItems
//         .filter((item) => item.roles.includes(userRole))
//         .map((item) => (
//           <li key={item.label} className="menu-item">
//             {item.submenu ? (
//               <div className="menu-title" onClick={() => toggleSubmenu(item.label)}>
//                 {item.label}
//                 {expandedMenus[item.label] ? <FaChevronDown /> : <FaChevronRight />}
//               </div>
//             ) : (
//               <NavLink to={item.path} className="menu-link">
//                 {item.label}
//               </NavLink>
//             )}

//             {item.submenu && expandedMenus[item.label] && (
//               <ul className="submenu">
//                 {item.submenu.map((sub) => (
//                   <li key={sub.label}>
//                     <NavLink to={sub.path} className="submenu-link">
//                       {sub.label}
//                     </NavLink>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//     </ul>
//   );
// };

// export default Sidebar;

