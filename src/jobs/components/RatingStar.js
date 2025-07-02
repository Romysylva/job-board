import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const RatingStar = ({ jobId, onSubmitRating }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("Received jobId:", jobId);
  }, [jobId]);

  const handleSubmit = async () => {
    if (!jobId) {
      setMessage("Job ID is missing. Please try again.");
      console.error("Error: jobId is undefined!");
      return;
    }

    if (!rating) {
      setMessage("Please select a rating before submitting.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!token || !user?.id) {
        setMessage("You need to log in to rate this job.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/ratings",
        {
          user: user.id, // 🔥 Backend expects "user", not "userId"
          targetId: jobId,
          targetType: "Job",
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage(response.data.message || "Rating submitted successfully.");

      if (onSubmitRating) {
        onSubmitRating();
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      setMessage(
        error.response?.data?.message ||
          "An error occurred while submitting the rating."
      );
    }
  };

  return (
    <div className="rating-container p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Rate this Job</h3>
      <div className="stars flex items-center">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <FaStar
              key={starValue}
              size={30}
              className={`cursor-pointer ${
                starValue <= (hover || rating)
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
            />
          );
        })}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Submit Rating
      </button>
      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default RatingStar;

// /explain-code
// The selected code within the RatingStar component is responsible for handling the rating submission functionality. Here's a breakdown of the code:
// 1.
// The handleSubmit function is defined, which is triggered when the "Submit Rating" button is clicked.
// 2.
// Inside the handleSubmit function, it first checks if a rating has been selected. If not, it sets an error message and returns early.
// 3.
// It then retrieves the user's token and user ID from the local storage. If the token is not present, it sets an error message indicating that the user needs to log in to rate the job.
// 4.
// If the token is present, it makes an asynchronous POST request to the backend API endpoint (http://localhost:5000/api/ratings) to submit the rating. The request payload includes the rating value, user ID, target ID (which is the job ID), and target type ("Job"). The token is included in the request headers for authentication.
// 5.
// If the request is successful, it sets a success message indicating that the rating has been submitted successfully. If there's an error in the response, it sets an error message based on the response data.
// 6.
// If there's an error during the request, it logs the error to the console and sets an error message indicating that an error occurred while submitting the rating.
// This code handles the rating submission process by making an API request to the backend and displaying appropriate messages based on the response.
// Workspace indexing: Done

// Current file

// Workspace

// Add scope
