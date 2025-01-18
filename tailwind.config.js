/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",

  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#BEAA2F",
        secondary: "#FB4F29",
        tertiary: "#AF4462",
        quaternary: "#C53773",
        quinary: "#452F70",
      },
      fontFamily: {
        domine: ["Domine", "sans-serif"],
        jost: ["Jost", "sans-serif"],
      },
      keyframes: {
        wave: {
          "0%": { transform: "rotate(0.0deg)" },
          "10%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(14deg)" },
          "40%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(10.0deg)" },
          "60%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
        rotating: {
          "0%": { transform: "rotate(0.0deg)" },
          "25%": { transform: "rotate(90deg)" },
          "50%": { transform: "rotate(180deg)" },
          "75%": { transform: "rotate(270deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        waving: "wave 2s linear infinite",
        rotating: "rotating 5s linear infinite",
      },
    },
  },
  plugins: [],
};

// import { useState, useEffect } from "react";
// import { SunIcon, MoonIcon } from "@heroicons/react/outline";

// const DarkModeToggle = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   // Initialize theme from localStorage or default
//   useEffect(() => {
//     const theme = localStorage.getItem("theme") || "light";
//     setIsDarkMode(theme === "dark");
//     if (theme === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, []);

//   // Toggle dark mode
//   const toggleDarkMode = () => {
//     const newTheme = isDarkMode ? "light" : "dark";
//     setIsDarkMode(!isDarkMode);
//     localStorage.setItem("theme", newTheme);
//     document.documentElement.classList.toggle("dark", newTheme === "dark");
//   };

//   return (
//     <button
//       onClick={toggleDarkMode}
//       className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
//       aria-label="Toggle Dark Mode"
//     >
//       {isDarkMode ? (
//         <SunIcon className="h-6 w-6 text-yellow-500" />
//       ) : (
//         <MoonIcon className="h-6 w-6 text-gray-500" />
//       )}
//     </button>
//   );
// };

// export default DarkModeToggle;
