import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-gray-900 shadow ">
      <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
        <a href="/">JobBoard</a>
      </div>
      <nav className="space-x-6  dark:text-gray-300">
        <a
          href="/"
          className="text-gray-600 hover:text-blue-500 dark:text-yellow-400 "
        >
          Home
        </a>
        <a
          href="/jobs"
          className="text-gray-600 hover:text-blue-500 dark:text-yellow-400"
        >
          Jobs
        </a>
        <a
          href="/contact"
          className="text-gray-600 hover:text-blue-500 dark:text-yellow-400 "
        >
          Contact
        </a>
      </nav>
      <button onClick={toggleTheme} className=" px-4 py-2 rounded  ">
        {theme === "light" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8  dark:hover:shadow-gray-700  hover:text-yellow-400 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="yellow"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8 text-yellow hover:shadow-lg dark:hover:shadow-gray-700  hover:text-yellow-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        )}
      </button>
    </header>
  );
};

export default Header;

// bg-purple-100
// bg-gray-100
// bg-slate-800
