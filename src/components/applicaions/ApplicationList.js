import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../../context/global/GlobalProvider";

const ApplicationsList = () => {
  const [applications, setApplications] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const { showLoading, hideLoading, showError } = useGlobalContext();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        showLoading();
        const response = await axios.get(
          "http://localhost:5000/api/applications/all",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setApplications(response.data.applications);

          // Initialize statuses for all applications
          const initialStatuses = response.data.applications.reduce(
            (acc, app) => ({ ...acc, [app._id]: app.status }),
            {}
          );
          setSelectedStatus(initialStatuses);
        } else {
          showError("Failed to fetch applications.");
        }
      } catch (err) {
        showError(err.message || "An error occurred.");
      } finally {
        hideLoading();
      }
    };

    fetchApplications();
  }, []);

  const handleStatusChange = (id, status) => {
    setSelectedStatus((prev) => ({ ...prev, [id]: status }));
  };

  const updateStatus = async (id) => {
    try {
      const newStatus = selectedStatus[id];
      const response = await axios.put(
        `http://localhost:5000/api/applications/${id}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        // Update application status locally
        setApplications((prev) =>
          prev.map((app) =>
            app._id === id ? { ...app, status: newStatus } : app
          )
        );
        alert("Status updated successfully!");
      } else {
        alert("Failed to update status.");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status.");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Applications</h2>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Company</th>
              <th className="border border-gray-300 px-4 py-2">Job Title</th>
              <th className="border border-gray-300 px-4 py-2">Applicant</th>
              <th className="border border-gray-300 px-4 py-2">Resume</th>
              <th className="border border-gray-300 px-4 py-2">Cover Letter</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {application.job?.company?.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {application.job?.title || ""}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {application.user.username}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <a
                    href={application.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Resume
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {application.coverLetter || "No cover letter provided."}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <select
                    value={
                      selectedStatus[application._id] || application.status
                    }
                    onChange={(e) =>
                      handleStatusChange(application._id, e.target.value)
                    }
                    className="border px-2 py-1 rounded"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Interview">Interview</option>
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => updateStatus(application._id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApplicationsList;
