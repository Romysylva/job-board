import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import DynamicDrawer from "../../components/TopNavAndDrawer";

const Register = () => {
  const navigate = useNavigate(); // Initialize the navigate hook

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    roles: "user", // Default role can be set
  });
  const [profileImage, setProfileImage] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name}: ${value}`); // Debug log
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with:", formData, profileImage); // Debug log

    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("roles", formData.roles);
    if (profileImage) {
      data.append("profileImage", profileImage);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResponseMessage(
        response.data.success
          ? "Registration successful! Redirecting to login..."
          : response.data.message
      );
      if (response.data.success) {
        setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      console.error("Registration Error:", error.response?.data);
      setResponseMessage(
        error.response?.data?.message || "Something went wrong."
      );
    }
  };

  const handleTabSelection = (text) => {
    console.log("Menu item clicked:", text);
  };

  const menuItems = [
    {
      text: "Dashboard",
      // icon: <InboxIcon />,
    },
    { name: "Overview", path: "/dashboard" },
    {
      text: "Messages",
      // icon: <MailIcon />,
      subItems: [
        {
          text: "Inbox",
          //  icon: <InboxIcon />
        },
        {
          text: "Sent",
          //  icon: <MailIcon />
        },
      ],
    },
    {
      text: "Settings",
      // icon: <InboxIcon />,
    },
    {
      text: "Help",
      // icon: <InfoIcon />,
      subItems: [
        {
          text: "FAQ",
          //  icon: <InfoIcon />
        },
        {
          text: "Support",
          //  icon: <InfoIcon />
        },
      ],
    },
  ];

  return (
    <>
      {/* <Header /> */}
      <DynamicDrawer
        menuItems={menuItems}
        title="Home| Page"
        onSelectedTab={handleTabSelection}
      >
        <div className="mx-auto bg-white p-4 h-screen rounded shadow-md dark:bg-gray-900">
          <h2 className="text-3xl font-bold mb-4 text-center dark:text-white">
            Register
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-800 dark:text-white m-auto mt-20 w-full md:w-1/3 lg:w-1/3"
          >
            <div>
              <label className="block text-sm font-medium">Username</label>
              <input
                type="name"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-800"
                placeholder="write here"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-800"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-800"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Profile Image</label>
              <input
                type="file"
                name="profileImage"
                onChange={handleFileChange}
                className="w-full mt-1"
                accept="image/*"
              />
            </div>
            <div className="flex space-between ">
              <button
                type="submit"
                className="cta-button bg-blue-600 text-white py-2 px-6 rounded-full mt-6 hover:bg-blue-700 dark:hover:bg-gray-900"
              >
                Register
              </button>
              <button
                onClick={() => navigate("/login")}
                className="cta-button bg-blue-600 text-white py-2 px-6 rounded-full mt-6 hover:bg-blue-700 dark:hover:bg-gray-900"
              >
                Login
              </button>
            </div>
          </form>
          {responseMessage && (
            <p className="mt-4 text-center">{responseMessage}</p>
          )}
        </div>
      </DynamicDrawer>
    </>
  );
};

export default Register;
