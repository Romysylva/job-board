import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosConfig";
import Spinner from "../loading/Sinner";
import { Url } from "../../api/api";

const Comments = ({ targetId, targetType, onSetComments }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch comments on component mount
    const fetchComments = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/comments`, {
          params: { targetId, targetType },
        });

        setComments(response.data.comments);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch comments.");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [targetId, targetType, onSetComments]);

  // Render logic
  // if (loading) return <p>Loading comments...</p>;
  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Comments</h2>
      {comments.length === 0 ? (
        <p>No comments yet, Be the first to write one! 👍</p>
      ) : (
        <ul className="review-item">
          {comments.map((coment) => (
            <li key={coment._id}>
              <p>
                {coment.user ? (
                  <p>
                    {coment.user.profileImage && (
                      <img
                        src={`${Url}${coment.user.profileImage}`}
                        alt="Profile"
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                    <strong>By:</strong> {coment.user.username}{" "}
                  </p>
                ) : (
                  <p>
                    <strong>By:</strong> Unknown User
                  </p>
                )}
              </p>

              <p>
                <strong>Comnents:</strong> {coment.commentText}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Comments;
