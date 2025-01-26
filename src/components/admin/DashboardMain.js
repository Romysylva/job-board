import React, { useEffect, useState, useMemo } from "react";
// import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
// import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardMain = () => {
  const [stats, setStats] = useState({
    jobs: 0,
    users: 0,
    applications: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/admin/stats",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStats(response.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  // Memoize data and options to prevent unnecessary re-renders
  const data = useMemo(
    () => ({
      labels: ["Jobs", "Users", "Applications"],
      datasets: [
        {
          label: "Activity Stats",
          data: [stats.jobs, stats.users, stats.applications],
          backgroundColor: ["#42a5f5", "#66bb6a", "#ffa726"],
          borderColor: ["#1e88e5", "#43a047", "#fb8c00"],
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
              const value = tooltipItem.raw;
              return `${tooltipItem.label}: ${value}`;
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* <div className="chart-container">
          <Bar data={data} options={options} />
        </div> */}
        <div className="admin-dashboard">
          <div className="chart-container">
            <Pie data={data} options={options} />
          </div>
        </div>
        {/* Example Analytics Cards */}
        <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold">1,234</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded">
          <h3 className="text-lg font-semibold">Total Jobs</h3>
          <p className="text-2xl font-bold">567</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded">
          <h3 className="text-lg font-semibold">Total Companies</h3>
          <p className="text-2xl font-bold">89</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded">
          <h3 className="text-lg font-semibold">Pending Reviews</h3>
          <p className="text-2xl font-bold">12</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
