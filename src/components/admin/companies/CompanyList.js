import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./CompanyList.module.css";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [editingCompanyId, setEditingComanyId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    logo: null,
    password: "",
    about: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/companies");
        if (Array.isArray(response.data.data)) {
          setCompanies(response.data.data);
        } else {
          console.error("Fetched data is not an array:", response.data);
        }
      } catch (error) {
        setError("Error fetching Companies, Please try again later.");
      }
    };

    fetchCompanies();
  }, []);

  const handleViewDetails = (companyId) => {
    navigate(`/companise/${companyId}`);
  };

  const handleEdit = (company) => {
    setEditingComanyId(company.id);
    setFormData({
      name: company.name,
      email: company.email,
      location: company.location,
      about: company.about,
      logo: company.logo,
    });
  };

  const handleDelete = async (companyId) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      try {
        await axios.delete(`http://localhost:5000/api/companies/${companyId}`);
        setCompanies(companies.filter((company) => company.id !== companyId));
      } catch (error) {
        setError("Error deleting company. Please try again later.");
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefauult();

    try {
      await axios.put(
        `http://localhost:5000/api/companies/${editingCompanyId}`,
        formData
      );
      setCompanies(
        companies.map((company) =>
          company.id === editingCompanyId
            ? { ...company, ...formData }
            : company
        )
      );
      setEditingComanyId(null);
      setFormData({
        name: "",
        email: "",
        location: "",
        about: "",
        logo: null,
      });
    } catch (err) {
      setError("Error updating company. Please try again later");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className={styles.container}>
      {error && <p className={styles.error}>{error}</p>}
      {Array.isArray(companies) ? (
        companies.map((company) => (
          <div key={company._id} className={styles.companyCard}>
            <h3 className={styles.companyName}>{company.name}</h3>
            <p className={styles.companyEmail}>{company.email}</p>

            <div className={styles.buttonGroup}>
              <button
                className={`${styles.button} ${styles.viewButton}`}
                onClick={() => handleViewDetails(company._id)}
              >
                View Details
              </button>
              <button
                className={`${styles.button} ${styles.editButton}`}
                onClick={() => handleEdit(company)}
              >
                Edit
              </button>
              <button
                className={`${styles.button} ${styles.deleteButton}`}
                onClick={() => handleDelete(company.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No Companies available.</p>
      )}

      {editingCompanyId && (
        <div className={styles.editForm}>
          <h3>Edit Company</h3>
          <form onSubmit={handleFormSubmit}>
            <input
              className={styles.inputField}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Company Name"
              required
            />
            <input
              className={styles.inputField}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Company Email"
              required
            />
            <textarea
              className={styles.textAreaField}
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              placeholder="Company About"
              required
            ></textarea>
            <input
              className={styles.inputField}
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Company Location"
              required
            />
            {/* Add other fields as necessary */}
            <button className={styles.saveButton} type="submit">
              Save
            </button>
            <button
              className={styles.cancelButton}
              onClick={() => setEditingComanyId(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CompanyList;
