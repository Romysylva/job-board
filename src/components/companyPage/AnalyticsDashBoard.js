// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Bar, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from "chart.js";

// // ✅ Register required chart scales and elements
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// );

// const AnalyticsDashboard = ({ companyId }) => {
//   const [analytics, setAnalytics] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/companies/${companyId}/analytics`
//         );
//         setAnalytics(response.data);
//       } catch (err) {
//         setError("Failed to fetch analytics");
//         console.error("Error fetching analytics:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (companyId) fetchAnalytics();
//   }, [companyId]);

//   if (loading) return <p>Loading analytics...</p>;
//   if (error) return <p>{error}</p>;
//   if (!analytics) return <p>No data available.</p>;

//   return (
//     <div className="analytics-dashboard">
//       <h2>Company Analytics</h2>
//       <p>Total Job Applications: {analytics.totalApplications}</p>

//       <h3>Top-Performing Jobs</h3>
//       <Bar
//         data={{
//           labels: analytics.topJobs.map(
//             (job) => job.jobDetails.title || "Unknown"
//           ),
//           datasets: [
//             {
//               label: "Applications",
//               data: analytics.topJobs.map((job) => job.count),
//               backgroundColor: "blue",
//             },
//           ],
//         }}
//         options={{
//           responsive: true,
//           plugins: { legend: { display: true } },
//         }}
//       />

//       <h3>Applicant Demographics</h3>
//       <Pie
//         data={{
//           labels: analytics.demographics.map((d) => d._id || "Unknown"),
//           datasets: [
//             {
//               data: analytics.demographics.map((d) => d.count),
//               backgroundColor: ["red", "blue", "green"],
//             },
//           ],
//         }}
//         options={{
//           responsive: true,
//           plugins: { legend: { position: "right" } },
//         }}
//       />
//     </div>
//   );
// };

// export default AnalyticsDashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// ✅ Register required chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsDashboard = ({ companyId }) => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/companies/${companyId}/analytics`
        );
        setAnalytics(response.data);
        // window.location.reload();
      } catch (err) {
        setError("Failed to fetch analytics");
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    if (companyId) fetchAnalytics();
  }, [companyId]);

  if (loading) return <p>Loading analytics...</p>;
  if (error) return <p>{error}</p>;
  if (!analytics) return <p>No data available.</p>;

  return (
    <div className="analytics-dashboard">
      <h2>Company Analytics</h2>
      <p>
        Total Job Applications: <strong>{analytics.totalApplications}</strong>
      </p>

      <div className="chart-container">
        <h3>Top-Performing Jobs</h3>
        <div className="bar-chart">
          <Bar
            data={{
              labels: analytics.topJobs.map(
                (job) => job.jobDetails.title || "Unknown"
              ),
              datasets: [
                {
                  label: "Applications",
                  data: analytics.topJobs.map((job) => job.count),
                  backgroundColor: [
                    "#007bff",
                    "#28a745",
                    "#dc3545",
                    "#ffc107",
                    "#17a2b8",
                  ],
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
              },
              scales: {
                x: {
                  ticks: { color: "#333", font: { size: 12 } },
                  grid: { display: false },
                },
                y: {
                  beginAtZero: true,
                  ticks: { font: { size: 12 } },
                },
              },
            }}
          />
        </div>
      </div>

      <div className="chart-container">
        <h3>Applicant Demographics</h3>
        <div className="pie-chart">
          <Pie
            data={{
              labels: analytics.demographics.map((d) => d._id || "Unknown"),
              datasets: [
                {
                  data: analytics.demographics.map((d) => d.count),
                  backgroundColor: [
                    "#007bff",
                    "#28a745",
                    "#dc3545",
                    "#ffc107",
                    "#17a2b8",
                  ],
                  hoverOffset: 10,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: "right" } },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
