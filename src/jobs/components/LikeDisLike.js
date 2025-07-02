import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import axios from "../../utils/axiosConfig";
import { useGlobalContext } from "../../context/global/GlobalProvider";

const LikeDisLike = ({ jobId }) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { showLoading, hideLoading, showError } = useGlobalContext();

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        showLoading();

        // const token = localStorage.getItem("token");
        // const user = JSON.parse(localStorage.getItem("user"));

        // if (!token || !user?.id) {
        //   // setMessage("You need to log in to rate this job.");
        //   return;
        // }
        const response = await axios.get(`/jobs/${jobId}`);

        console.log("Fetched job data:", response.data.likes);

        setLikes(response.data.likes.length);
        if (user) {
          setIsLiked(response.data.likes.some((likeId) => likeId === user._id));
        }
      } catch (err) {
        showError("Error fetching likes:", err.message);
      } finally {
        hideLoading();
      }
    };

    fetchLikes();
  }, [jobId, user]);

  const handleLikeDislike = async () => {
    console.log("Current User:", user);

    if (!user || !user.id) {
      showError("You need to be logged in to like or dislike a job.");
      return;
    }

    try {
      showLoading();
      showError("");

      const response = await axios.post(`/jobs/${jobId}/like`, {
        userId: user.id,
      });

      console.log("Like response:", response.data); // Debugging

      setLikes(response.data.likes.length);
      setIsLiked(response.data.isLiked);
    } catch (err) {
      console.error(err);
      showError("Error updating like status.");
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="like-dislike-container">
      <button
        onClick={handleLikeDislike}
        className={`like-button ${isLiked ? "liked" : ""}`}
      >
        {isLiked ? "👎" : "👍"}
      </button>
      <span>
        {likes}{" "}
        {likes === 1 ? (
          <span className="text-green-800 font-bold">Like</span>
        ) : (
          <span className="text-green-600 font-bold">Likes</span>
        )}
      </span>
    </div>
  );
};

export default LikeDisLike;
