import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed lg:relative top-0 left-0 w-64 h-full bg-blue-600 text-white z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 text-lg font-bold">My App</div>
        <nav className="mt-4 space-y-2">
          <Link to="/" className="block px-4 py-2 hover:bg-blue-500 transition">
            Home
          </Link>
          <Link
            to="/featured-jobs"
            className="block px-4 py-2 hover:bg-blue-500 transition"
          >
            Featured Jobs
          </Link>
          <Link
            to="/testimonials"
            className="block px-4 py-2 hover:bg-blue-500 transition"
          >
            Testimonials
          </Link>
          <Link
            to="/contact"
            className="block px-4 py-2 hover:bg-blue-500 transition"
          >
            Contact
          </Link>
        </nav>
      </div>

      {/* Hamburger Icon */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 bg-blue-600 text-white rounded focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
