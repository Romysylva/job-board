// import React, { useState } from "react";
// import { FaStar } from "react-icons/fa";

// const RatingStar = ({ onSubmitRating }) => {
//   const [selectedRating, setSelectedRating] = useState(0);
//   const [hoveredRating, setHoveredRating] = useState(0);

//   const handleRatingClick = (rating) => {
//     setSelectedRating(rating);
//   };

//   const handleMouseEnter = (rating) => {
//     setHoveredRating(rating);
//   };

//   const handleMouseLeave = () => {
//     setHoveredRating(0);
//   };

//   const handleSubmit = () => {
//     if (selectedRating > 0) {
//       onSubmitRating(selectedRating);
//     }
//   };

//   return (
//     <div className="rating-component my-4">
//       <h3 className="text-lg font-semibold mb-2">Rate this Job:</h3>
//       <div className="flex items-center mb-4">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <FaStar
//             key={star}
//             size={30}
//             className={`cursor-pointer transition-colors ${
//               (hoveredRating || selectedRating) >= star
//                 ? "text-yellow-500"
//                 : "text-gray-300"
//             }`}
//             onClick={() => handleRatingClick(star)}
//             onMouseEnter={() => handleMouseEnter(star)}
//             onMouseLeave={handleMouseLeave}
//           />
//         ))}
//       </div>
//       <button
//         className={`px-4 py-2 rounded-md text-white ${
//           selectedRating > 0
//             ? "bg-blue-500 hover:bg-blue-600"
//             : "bg-gray-400 cursor-not-allowed"
//         }`}
//         disabled={selectedRating === 0}
//         onClick={handleSubmit}
//       >
//         Submit Rating
//       </button>
//     </div>
//   );
// };

// export default RatingStar;

import React, { useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const RatingStar = ({ jobId, userId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!rating) {
      setMessage("Please select a rating before submitting.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token) {
        setMessage("You need to log in to rate this job.");
        return;
      }

      const response = await axios.post(
        `http://localhost:5000/api/ratings`,
        {
          rating,
          userId,
          targetId: jobId,
          targetType: "Job",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message || "Rating submitted successfully.");
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
