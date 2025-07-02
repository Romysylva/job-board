import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosConfig";
import { useGlobalContext } from "../../context/global/GlobalProvider";

const AdminSettingsPanel = () => {
  const { showLoading, hideLoading, showError, showSuccess } =
    useGlobalContext();
  const [settings, setSettings] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        showLoading();
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/admin/settings",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSettings(response.data.settings);
        setFormData(response.data.settings);
      } catch (err) {
        showError("Failed to fetch settings");
      } finally {
        hideLoading();
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/api/admin/settings",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSettings(response.data.settings);
      showSuccess("Settings updated successfully");
    } catch (err) {
      showError("Failed to update settings");
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">System Settings</h2>
      {settings ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">Maintenance Mode</label>
            <input
              type="checkbox"
              name="maintenanceMode"
              checked={formData.maintenanceMode || false}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block">Job Recommendations Enabled</label>
            <input
              type="checkbox"
              name="jobRecommendations"
              checked={formData.featureToggles?.jobRecommendations || false}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  featureToggles: {
                    ...formData.featureToggles,
                    jobRecommendations: e.target.checked,
                  },
                })
              }
            />
          </div>
          {/* Add more settings fields as needed */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            Save Settings
          </button>
        </form>
      ) : (
        <p>Loading settings...</p>
      )}
    </div>
  );
};

export default AdminSettingsPanel;
