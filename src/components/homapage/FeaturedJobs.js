// import JobCards from "./cards/JobCards";

// const FeaturedJobs = () => {
//   return (
//     <section className="featured-jobs py-16 bg-gray-50 dark:bg-gray-900">
//       <h2 className="text-3xl text-center font-semibold mb-8 dark:text-white">
//         Featured Jobs
//       </h2>
//       <div className="job-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto ">
//         <JobCards
//           title="Software Engineer"
//           company="Tech Corp"
//           location="Remote"
//         />
//         <JobCards
//           title="Product Manager"
//           company="Innovate Inc."
//           location="New York, NY"
//         />
//         <JobCards
//           title="UI/UX Designer"
//           company="Creative Studio"
//           location="San Francisco, CA"
//         />
//       </div>
//     </section>
//   );
// };
// export default FeaturedJobs;
import React, { useState, useEffect } from "react";
import axios from "axios";
import CtaButton from "../components/CTAButton";
import { useNavigate } from "react-router-dom";

const FeaturedJobs = () => {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://localhost:5000/api/featured-jobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data && Array.isArray(response.data.jobs)) {
          setFeaturedJobs(response.data.jobs);
        } else {
          console.error("Unexpected API response format:", response.data);
          setFeaturedJobs([]); // Fallback to an empty array if response is not as expected
        }
        // setFeaturedJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch featured jobs"
        );
        setFeaturedJobs([]); // Handle error by setting fallback
        setLoading(false);
      }
    };

    fetchFeaturedJobs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleViewDetails = () => {
    // navigate(`/jobs/${jobId}`);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
      <h2 className="text-2xl font-semibold mb-4">Featured Jobs</h2>
      {featuredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job) => (
            <div
              key={job.id}
              className="card-design hover:shadow-gray-300 transition-transform transform hover:scale-105"
            >
              <div className="card-text text-lg">{job.title}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {job.company.name}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Location: {job.location}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Type: {job.type}
              </div>
              <div className="mt-2 text-sm flex justify-between items-center">
                <a
                  href={job.company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Visit Company
                </a>

                <a href={`/job/${job.id}`}>
                  <CtaButton
                    label="View Details"
                    onClick={() => handleViewDetails(job.id)}
                    className="mt-3"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No Featured Jobs Available!</p>
      )}
    </div>
  );
};

export default FeaturedJobs;
