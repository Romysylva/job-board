// import React from "react";

// const ApplicationForm = ({ isOpen, onClose }) => {
//   return (
//     <div className={`modal-overlay ${isOpen ? "modal-visible" : "modal-hidden"}`}>
//       <div className="modal-content">
//         <button className="close-btn" onClick={onClose}>&times;</button>
//         <form className="application-form">
//           <h3>Application Form</h3>
//           <input type="text" placeholder="Full Name" required />
//           <input type="email" placeholder="Email" required />
//           <input type="text" placeholder="Resume" required />
//           <textarea placeholder="Cover Letter" required></textarea>
//           <button type="submit">Submit Application</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ApplicationForm;


import React, { useState } from "react";
import axios from "axios";

const ApplicationForm = ({ isOpen, onClose, jobId }) => {
  console.log(jobId)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    coverLetter: "",
    resumeLink: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token"); // Get token for authentication
      const response = await axios.post(
        "http://localhost:5000/api/applications/apply",
        { ...formData, jobId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Response:", response.data);
      setMessage(response.data.message);
      setFormData({ fullName: "", email: "", coverLetter: "", resumeLink: "" });

      setTimeout(() => {
        onClose(); // Close modal after success
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`modal-overlay ${isOpen ? "modal-visible" : "modal-hidden"}`}>
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <form className="application-form" onSubmit={handleSubmit}>
          <h3>Application Form</h3>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            required
            value={formData.fullName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="resumeLink"
            placeholder="Resume"
            required
            value={formData.resume}
            onChange={handleChange}
          />
          <textarea
            name="coverLetter"
            placeholder="Cover Letter"
            required
            value={formData.coverLetter}
            onChange={handleChange}
          ></textarea>
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
