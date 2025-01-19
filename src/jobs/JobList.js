import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../context/global/GlobalProvider";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const { showLoading, hideLoading, showError } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        showLoading();

        // Retrieve token from localStorage
        const token = localStorage.getItem("token");
        // console.log("Token:", token);
        if (!token) {
          showError("Authorization token is missing. Redirecting to login.");
          window.location.href = "/login";
          showError("Invalid authorization");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && Array.isArray(response.data.data)) {
          let jobs = response.data.data;
          setJobs(jobs);
        } else {
          console.error("Unexpected response format:", response.data);
          setJobs([]);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else {
          showError(
            "Failed to fetch jobs.",
            error.response?.data?.message || error.message
          );
        }
      } finally {
        hideLoading();
      }
    };

    fetchJobs();
  }, []);

  const handleViewDetails = (id) => {
    console.log("Navigating to job ID:", id);
    navigate(`/jobs/${id}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Available Jobs</h1>
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="card-design hover:shadow-gray-300 transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => handleViewDetails(job._id)}
            >
              <h2 className="card-text text-lg font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.company?.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {job.location}
              </p>
              <p className="text-sm text-blue-500 dark:text-blue-400 font-medium">
                View Details
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No jobs available.</p>
      )}
    </div>
  );
};

export default JobList;
