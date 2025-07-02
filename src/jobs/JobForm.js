// import React, { useState } from "react";
// import axios from "../utils/axiosConfig";

// const JobForm = ({ companyId, onClose, refreshJobs }) => {
//   const [formData, setFormData] = useState({
//     title: "",
//     location: "",
//     description: "",
//     salary: "",
//     experience: "",
//     skills: "",
//     contactEmail: "",
//     jobType: "Full-time",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("No token found");
//         return;
//       }

//       const headers = {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       };

//       await axios.post(
//         `/jobs/company`,
//         {
//           ...formData,
//           company: companyId,
//         },
//         { headers }
//       );
//       alert("Job posted successfully!");
//       refreshJobs();
//       onClose();
//     } catch (error) {
//       console.error("Error posting job:", error.message);
//     }
//   };

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <h2>Post a Job</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="title"
//             placeholder="Job Title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="location"
//             placeholder="Location"
//             value={formData.location}
//             onChange={handleChange}
//             required
//           />
//           <textarea
//             name="description"
//             placeholder="Job Description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="salary"
//             placeholder="Salary"
//             value={formData.salary}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="experience"
//             placeholder="Experience"
//             value={formData.experience}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="skills"
//             placeholder="Skills (comma-separated)"
//             value={formData.skills}
//             onChange={handleChange}
//           />
//           <input
//             type="email"
//             name="contactEmail"
//             placeholder="Contact Email"
//             value={formData.contactEmail}
//             onChange={handleChange}
//           />
//           <select
//             name="jobType"
//             value={formData.jobType}
//             onChange={handleChange}
//           >
//             <option>Full-time</option>
//             <option>Part-time</option>
//             <option>Contract</option>
//             <option>Internship</option>
//           </select>
//           <button type="submit">Submit</button>
//           <button type="button" onClick={onClose}>
//             Cancel
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default JobForm;

import React, { useState, useEffect } from "react";
import axios from "../utils/axiosConfig";

const JobForm = ({ companyId, onClose, refreshJobs }) => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    salary: "",
    experience: "",
    skills: "",
    contactEmail: "",
    jobType: "Full-time",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      await axios.post(
        `/jobs/company`,
        {
          ...formData,
          company: companyId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Job posted successfully!");
      refreshJobs();
      onClose();
    } catch (error) {
      console.error("Error posting job:", error.message);
    }
  };

  return (
    <div className="dropdown-container">
      {/* Overlay: Click outside to close */}
      {/* <div className="overlay" onClick={onClose}></div> */}

      {/* Dropdown Dialog: Prevent Click from Bubbling */}
      <div className="dropdown-dialog" onClick={(e) => e.stopPropagation()}>
        <h2>Post a Job</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Job Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
          />
          <input
            type="text"
            name="experience"
            placeholder="Experience"
            value={formData.experience}
            onChange={handleChange}
          />
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma-separated)"
            value={formData.skills}
            onChange={handleChange}
          />
          <input
            type="email"
            name="contactEmail"
            placeholder="Contact Email"
            value={formData.contactEmail}
            onChange={handleChange}
          />
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
          <div className="button-group">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
