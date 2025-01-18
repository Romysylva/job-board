import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
const Sidebar = ({
  onHandleOpen,
  setOpenProfile,
  setOpenPreferences,
  onOpenUserProfile,
  setUserProfile,
}) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileClick = () => {
    onHandleOpen();
    setOpenProfile(false);
    setOpenPreferences(false);
    setUserProfile(false);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Include auth token
            },
          }
        );
        setUserData(response.data.data);
      } catch (err) {
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="relative">
      {/* Hamburger Icon */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-200 dark:bg-gray-700 rounded-md"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? (
          <FaTimes className="text-2xl text-gray-800 dark:text-white" />
        ) : (
          <FaBars className="text-2xl text-gray-800 dark:text-white" />
        )}
      </button>

      {/* Sidebar */}

      <div
        className={`fixed top-50  left-0 h-full w-64 bg-gray-100 dark:bg-gray-800 shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0 z-40`}
      >
        <nav className="p-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            User Menu
          </h2>
          <div className="p-4 flex flex-col items-center border-b border-gray-200 dark:border-gray-700">
            {userData.profileImage && (
              <img
                src={`http://localhost:5000/${userData.profileImage}`}
                alt="User Avatar"
                className="w-20 h-20 rounded-full mb-2"
              />
            )}
            <p className="text-md font-semibold dark:text-slate-300">
              <strong>Username:</strong> {userData.username}
            </p>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              <strong>Role:</strong> {userData.roles}
            </p>
          </div>

          <ul className="space-y-4">
            <li onClick={() => onOpenUserProfile()}>
              <a
                href="#profile"
                className="block px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="#activity"
                className="block px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Activity
              </a>
            </li>
            <Link
              to="/logout"
              className="block px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Logout
            </Link>
            <li onClick={() => handleProfileClick()}>
              <Link
                to="#settings"
                className="block px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay for small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
