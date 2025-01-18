import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate(); // For navigation after login
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        // Store the JWT token and user details in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Call onLogin callback to inform parent component
        onLogin(response.data.user);

        // Redirect based on user role
        if (response.data.user.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/"); // Redirect to general user dashboard
        }
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" shadow-md  bg-white rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-900 dark:text-white "
    >
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Login
      </button>
      {errorMessage && (
        <div className="mt-4 text-red-600">
          <p>{errorMessage}</p>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
