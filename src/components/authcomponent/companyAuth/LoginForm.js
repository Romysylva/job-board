import React, { useState } from "react";
import axios from "../../../utils/axiosConfig"; // Replace with your axios config
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context/global/GlobalProvider";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { showLoading, hideLoading, showError } = useGlobalContext();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      showLoading();
      showError("");

      const response = await axios.post("/auth/company/login", formData, {
        header: { "Content-Type": "application/json" },
      });

      // Store the token in local storage or context
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("company", JSON.stringify(response.data.company));

      navigate("/dashboard");
    } catch (err) {
      showError(err.response?.data?.message || "Login failed");
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="login-form">
      <h2>Login to Your Company Account</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
