import React, { useEffect, useState, useMemo } from "react";
import { useGlobalContext } from "../../context/global/GlobalProvider";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";

import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardMain = () => {
  const { showLoading, hideLoading, showError } = useGlobalContext();
  const [stats, setStats] = useState({
    jobs: 0,
    users: 0,
    applications: 0,
    companies: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        showLoading();
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/admin/stats",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("API Response:", response.data); // Debugging log
        setStats(response.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
        showError("Failed to load statistics.");
      } finally {
        hideLoading();
      }
    };

    fetchStats();
  }, []);

  // Memoized chart data
  const data = useMemo(
    () => ({
      labels: ["Jobs", "Users", "Applications", "Companies"],
      datasets: [
        {
          label: "Activity Stats",
          data: [stats.jobs, stats.users, stats.applications, stats.companies],
          backgroundColor: ["#42a5f5", "#66bb6a", "#ffa726", "#d9d9"],
          borderColor: ["#1e88e5", "#43a047", "#fb8c00", "#d9d9"],
          borderWidth: 1,
        },
      ],
    }),
    [stats]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem) => {
              return `${tooltipItem.label}: ${tooltipItem.raw}`;
            },
          },
        },
      },
    }),
    []
  );

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
      {/* <div style={{ width: "50%", margin: "auto" }}>
        <Pie data={data} options={options} />
      </div> */}
      <div className="chart-container bar-chart">
        <Bar data={data} options={options} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Display Stats from Backend */}
        <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold">{stats.users}</p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded">
          <h3 className="text-lg font-semibold">Total Jobs</h3>
          <p className="text-2xl font-bold">{stats.jobs}</p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded">
          <h3 className="text-lg font-semibold">Total Companies</h3>
          <p className="text-2xl font-bold">{stats.companies}</p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded">
          <h3 className="text-lg font-semibold">Total Applications</h3>
          <p className="text-2xl font-bold">{stats.applications}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
