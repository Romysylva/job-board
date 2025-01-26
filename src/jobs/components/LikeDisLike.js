import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import axios from "../../utils/axiosConfig";
// import Loading from "./Loading"; // Global loading component
// import Error from "./Error"; // Global error component
import { useGlobalContext } from "../../context/global/GlobalProvider";
import { RequestPageRounded } from "@mui/icons-material";

const LikeDisLike = ({ jobId }) => {
  const { user } = useAuth(); // Access authenticated user
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { showLoading, hideLoading, showError } = useGlobalContext();

  useEffect(() => {
    if (!jobId) {
      console.error("No jobId provided to LikeDisLike component.");
      showError("Job ID is missing.");
      return;
    }
    const fetchLikes = async () => {
      try {
        showLoading();
        const response = await axios.get(`/jobs/${jobId}`);
        setLikes(response.data.likes.length);
        if (user) {
          setIsLiked(response.data.likes.includes(user.id)); // Dynamically use the logged-in user's ID
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
    if (!user) {
      showError("You need to be logged in to like or dislike a job.");
      return;
    }

    try {
      showLoading();
      showError("");

      const requestBody = {
        userId: user._id,
      };

      if (isLiked) {
        // Dislike API
        const response = await axios.post(
          `/jobs/${jobId}/dislike`,
          requestBody
        );
        setLikes(response.data.likes);
        setIsLiked(false);
      } else {
        // Like API
        const response = await axios.post(`/jobs/${jobId}/like`, {
          userId: user.id,
        });
        setLikes(response.data.likes);
        setIsLiked(true);
      }
    } catch (err) {
      console.error(err);
      showError("Error updating like status.");
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="like-dislike-container">
      {/* {showLoading()} */}
      {showError()}
      <button
        onClick={handleLikeDislike}
        className={`like-button ${isLiked ? "liked" : ""}`}
        // disabled={loading}
      >
        {isLiked ? "👎" : "👍"}
      </button>
      <span>
        {likes} {likes === 1 ? "Like" : "Likes"}
      </span>
    </div>
  );
};

export default LikeDisLike;

// import React from "react";
// import LikeDislike from "./LikeDislike";

// const JobDetails = ({ job }) => {
//   return (
//     <div>
//       <h1>{job.title}</h1>
//       <p>{job.description}</p>
//       <LikeDislike jobId={job.id} />
//     </div>
//   );
// };

// export default JobDetails;
