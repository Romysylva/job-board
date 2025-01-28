// import React from "react";

import CompanyBanner from "./CompanyBanner";
import AboutCompany from "./AboutCompany";
// import OpenPositions from "./OpenPositions";
// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";

// const CompanyPage = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <main className="flex-grow">
//         <CompanyBanner />
//         <div className="container mx-auto px-4 py-8">
// <AboutCompany />
//           <OpenPositions />
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default CompanyPage;

// Populate the CompanyBanner and OpenPositions with dynamic data fetched from the backend.
// Add navigation links to make the company page interactive.
// Implement a loading spinner or skeleton UI for API data fetching.

// users

// Connect the ProfileDetails, ActivityFeed, and SettingsSection components to the backend API.
// Allow user interaction to update profile details and preferences.
// Fetch dynamic data for saved jobs, applications, and reviews

// dashbord

// Dynamic Data: Fetch and display real-time data for users, jobs, companies, and reviews.
// Routing: Ensure admin navigation links work correctly using React Router.
// CRUD Operations: Implement forms and modals for creating, updating, and deleting entities.

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../utils/axiosConfig";

const CompanyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [error, setError] = useState("");

  console.log("show companyId is defined", id);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      if (!id) {
        setError("Company not found!");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:5000/api/companies/${id}`
        );
        setCompany(response.data);
        setJobs(response.data.jobs);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching company details:", err.message);
      }
    };
    fetchCompanyDetails(id);
  }, [id]);

  const handleApply = (job) => {
    setSelectedJob(job);
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      await axios.post(
        `/jobs/${selectedJob._id}/apply`,
        Object.fromEntries(formData)
      );
      alert("Application submitted successfully!");
      window.location.reload();
    } catch (err) {
      console.error("Error submitting application:", err.message);
      alert("Failed to submit application.");
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!company) {
    return <p>Loading... ✴</p>;
  }

  return (
    <div className="company-page">
      {company && (
        <>
          <div
            className="parallax-banner"
            style={{ backgroundImage: `url(${company.bannerImage})` }}
          >
            <h1>{company.name}</h1>
            {company.logo && (
              <img
                src={`http://localhost:5000/${company.logo}`}
                alt="companyLogo"
              />
            )}
          </div>
          <div className="company-info">
            <h2>About {company.name}</h2>
            <p>{company.description}</p>
          </div>
          <div className="job-list">
            <h2>Available Jobs</h2>
            {jobs.map((job) => (
              <div
                key={job._id}
                className="job-card"
                onClick={() => navigate(`/jobs/${job._id}`)}
              >
                <h3>Job Title: {job.title}</h3>
                <p>Job description: {job.description}</p>
                <p>Job location: {job.location}</p>
                <p>Salary: {jobs.salary}</p>
                <button onClick={() => handleApply(job)}>Apply</button>
              </div>
            ))}
          </div>
        </>
      )}
      {selectedJob && (
        <div className="application-form">
          <h2>Apply for {selectedJob.title}</h2>
          <form onSubmit={handleApplicationSubmit}>
            <input type="text" name="name" placeholder="Your Name" required />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
            <textarea
              name="coverLetter"
              placeholder="Your Cover Letter"
              required
            />
            <button type="submit">Submit Application</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CompanyPage;
