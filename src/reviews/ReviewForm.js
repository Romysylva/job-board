import React, { useState } from "react";
import axios from "../utils/axiosConfig";
import { useGlobalContext } from "../context/global/GlobalProvider";

const ReviewForm = ({ targetId, targetType, onReviewSubmit, onClose }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const { showLoading, hideLoading, showError, clearError } =
    useGlobalContext();

  // Run fetchReviews on component mount

  // Callback to update reviews after a new review is submitted

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoading();
    clearError();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        showError("Authorization token is missing. Redirecting to login.");
        window.location.href = "/login";
        return;
      }
      const response = await axios.post(`/reviews`, {
        targetId,
        targetType,
        rating,
        reviewText,
      });

      onReviewSubmit(response.data); // Callback to update parent state
      setRating(0);
      setReviewText("");
      onClose(); // Close the dialog after submission
    } catch (err) {
      showError(err.response?.data?.message || "Failed to submit review.");
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      {/* Inline styles */}
      <style>
        {`
          .dialog {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(1);
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            animation: fadeIn 0.3s ease forwards;
            width: 400px;
          }
          .dialog-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .dialog h3 {
            margin-bottom: 20px;
            font-size: 24px;
            color: #333;
          }
          .dialog form {
            width: 100%;
          }
          .dialog form > div {
            margin-bottom: 15px;
          }
          .dialog form label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
          }
          .dialog form textarea,
          .dialog form select {
            width: 100%;
            padding: 10px;
            font-size: 14px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
          .dialog form button {
            margin-top: 10px;
            padding: 10px 15px;
            font-size: 16px;
            font-weight: bold;
            color: #fff;
            background-color: #007bff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          .dialog form button:hover {
            background-color: #0056b3;
          }
          .dialog button[type="button"] {
            background-color: #f44336;
          }
          .dialog button[type="button"]:hover {
            background-color: #c62828;
          }
          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
            animation: fadeIn 0.3s ease;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
      </style>

      <div className="dialog">
        <div className="dialog-content">
          <h3>Leave a Review</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Rating:</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                required
              >
                <option value="">Select Rating</option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} Star{num > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Review:</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review here..."
                required
              />
            </div>
            <button type="submit">Submit Review</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReviewForm;
