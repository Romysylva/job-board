import React, { useState, useEffect } from "react";
import axios from "axios";

const CompanyEditForm = ({ companyId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    logo: null,
  });

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`/api/companies/${companyId}`);
        setFormData(response.data);
      } catch (error) {
        // Handle error (e.g., display an error message)
      }
    };

    fetchCompany();
  }, [companyId]);

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
      await axios.put(`/api/companies/${companyId}`, data);
      // Handle success (e.g., display a success message or redirect)
    } catch (error) {
      // Handle error (e.g., display an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
      />
      <input type="file" name="logo" onChange={handleFileChange} />
      <button type="submit">Update</button>
    </form>
  );
};

export default CompanyEditForm;
