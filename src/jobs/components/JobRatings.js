import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const JobRating = ({ jobId, refreshkey }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/ratings/${jobId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAverageRating(response.data.averageRating);
        setTotalRatings(response.data.totalRatings);
      } catch (err) {
        setError("Failed to load ratings.");
        console.error("Error fetching ratings:", err);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) fetchRatings();
  }, [jobId, refreshkey]);

  return (
    <div className="rating-summary p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Job Ratings</h3>
      {loading ? (
        <p>Loading ratings...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className=" items-center">
          <p className="text-xl font-sm-bold">
            Average Ratings: {averageRating}
          </p>
          <FaStar className="text-yellow-500 ml-2" />
          <p className="ml-2 text-gray-600">
            Total Ratings: ({totalRatings} ratings)
          </p>
        </div>
      )}
    </div>
  );
};

export default JobRating;
