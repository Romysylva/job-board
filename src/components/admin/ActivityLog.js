import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosConfig";

const ActivityLog = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get("/admin/activity-logs", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setLogs(response.data.logs);
      } catch (error) {
        console.error("Error fetching activity logs:", error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Activity Logs</h2>
      <div className="bg-white p-4 rounded shadow">
        {logs.map((log) => (
          <div key={log._id} className="border-b p-2">
            <p>
              <strong>{log.action}</strong>: {log.details}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(log.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;
