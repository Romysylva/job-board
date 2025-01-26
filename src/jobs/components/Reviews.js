import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosConfig";
import Spinner from "../loading/Sinner";
import { Url } from "../../api/api";

const Reviews = ({ targetId, targetType, onSetReview }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch reviews on component mount
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/reviews`, {
          params: { targetId, targetType },
        });

        setReviews(response.data.reviews);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [targetId, targetType, onSetReview]);

  // Render logic
  // if (loading) return <p>Loading reviews...</p>;
  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet, Be the first to write one! 👍</p>
      ) : (
        <ul className="review-item">
          {reviews.map((review) => (
            <li key={review._id}>
              <p>
                {review.user ? (
                  <p>
                    {review.user.profileImage && (
                      <img
                        src={`${Url}${review.user.profileImage}`}
                        alt="Profile"
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                    <strong>By:</strong> {review.user.username}{" "}
                  </p>
                ) : (
                  <p>
                    <strong>By:</strong> Unknown User
                  </p>
                )}
              </p>
              <p>
                <strong>Rating:</strong> {review.rating} Stars
              </p>
              <p>
                <strong>Review:</strong> {review.reviewText}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;
