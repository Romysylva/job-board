import React, { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../../../context/global/GlobalProvider";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { showLoading, showError, hideLoading, showSuccess } =
    useGlobalContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
    location: "",
    shortDescription: "",
    logo: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, logo: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    try {
      showLoading();
      showError("");
      showSuccess("");

      const response = await axios.post(
        "http://localhost:5000/api/auth/company/register",
        data
        // {
        //   headers: { "Content-Type": "application/json" },
        // }
      );

      showSuccess(
        response.data.sucess
          ? "Company registered successfully!"
          : response.data.message
      );

      if (response.data.success) {
        setTimeout(() => navigate("/companylogin"), 2000);
      }
      setFormData({
        name: "",
        email: "",
        password: "",
        about: "",
        location: "",
        shortDescription: "",
      });
    } catch (err) {
      showError(err.response?.data?.message || "Registration failed");
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="register-form">
      <h2>Register Your Company</h2>
      {error && <p className="error">{showError()}</p>}
      {success && <p className="success">{showSuccess()}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Company Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
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
        <textarea
          name="about"
          placeholder="Company Description"
          value={formData.about}
          onChange={handleChange}
          required
        ></textarea>
        <textarea
          name="shortDescription"
          placeholder="Company Description"
          value={formData.shortDescription}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input type="file" name="logo" onChange={handleFileChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
