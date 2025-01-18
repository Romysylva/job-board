import React, { useState, useEffect } from "react";
import axios from "axios";

const SavedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await axios.get("/api/saved-jobs");
        setJobs(response.data); // Adjust according to API response
        setLoading(false);
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
        setLoading(false);
      }
    };
    fetchSavedJobs();
  }, []);

  if (loading) {
    return <p>Loading saved jobs...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Saved Jobs
      </h1>
      {jobs.length > 0 ? (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
            >
              <h2 className="text-lg font-semibold dark:text-white">
                {job.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {job.company}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          You haven't saved any jobs yet.
        </p>
      )}
    </div>
  );
};

export default SavedJobs;
