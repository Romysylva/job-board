import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosConfig";
import { useGlobalContext } from "../../context/global/GlobalProvider";

const AdminAutomationPanel = () => {
  const { showLoading, hideLoading, showError } = useGlobalContext();
  const [jobRecs, setJobRecs] = useState([]);
  const [fraudResults, setFraudResults] = useState([]);

  const fetchJobRecs = async () => {
    try {
      showLoading();
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/admin/job-recommendations",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data.recommendedJobs);
      setJobRecs(response.data.recommendedJobs);
    } catch (err) {
      showError("Failed to fetch job recommendations");
    } finally {
      hideLoading();
    }
  };

  const fetchFraudResults = async () => {
    try {
      showLoading();
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/admin/fraud-detection",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFraudResults(response.data.flaggedItems);
    } catch (err) {
      showError("Failed to fetch fraud detection results");
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchJobRecs();
    fetchFraudResults();
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded mt-6">
      <h2 className="text-2xl font-bold mb-4">Automation & AI</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Job Recommendations</h3>
        {jobRecs.length > 0 ? (
          <ul>
            {jobRecs.map((job) => (
              <li key={job._id}>
                {job.title} : {job.location} - {job.applicationCount}{" "}
                applications
              </li>
            ))}
          </ul>
        ) : (
          <p>No recommendations available</p>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold">Fraud Detection</h3>
        {fraudResults.length > 0 ? (
          <ul>
            {fraudResults.map((item, idx) => (
              <li key={idx}>{item.description || "Flagged Item"}</li>
            ))}
          </ul>
        ) : (
          <p>No fraudulent activity detected</p>
        )}
      </div>
    </div>
  );
};

export default AdminAutomationPanel;
