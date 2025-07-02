import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";
import { useGlobalContext } from "../context/global/GlobalProvider";
import RatingStar from "./components/RatingStar";
import LikeDisLike from "./components/LikeDisLike";
// import useFetchUserProfile from "../components/userspage/hooks/useFetchUserProfile";

import {
  FaUser,
  FaBuilding,
  FaMapMarkerAlt,
  FaBriefcase,
  FaDollarSign,
  FaCalendarAlt,
  FaStar,
  FaThumbsUp,
  FaCommentAlt,
  FaUserAlt,
  FaTools,
  FaCheckCircle,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { Button, Typography, Box } from "@mui/material";
import JobRating from "./components/JobRatings";
import CommentForm from "../coments/CommentForm";
import ReviewForm from "../reviews/ReviewForm";
import Reviews from "./components/Reviews";
import Comments from "./components/Comments";
import { AuthProvider } from "../context/AuthProvider";

const JobDetails = ({ targetId, targetType, companyId, userId }) => {
  const { id } = useParams();
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const { showLoading, hideLoading, showError, showSuccess, clearError } =
    useGlobalContext();

  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [viewReviews, setViewReviews] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const [refreshkey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  const handleRatingSubmit = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };
  const handleOpenDialog = () => setShowCommentDialog(true);
  const handleCloseDialog = () => setShowCommentDialog(false);
  const toggleReviews = () => {
    setViewReviews(!viewReviews);
  };
  const hanleShowComment = () => {
    setOpenComment(!openComment);
  };

  useEffect(() => {
    if (targetId && targetType) {
      fetchComments();
    }
  }, [targetId, targetType]);

  useEffect(() => {
    // console.log("Target ID:", targetId, "Target Type:", targetType);

    if (targetId && targetType) {
      fetchReviews();
    }
  }, [targetId, targetType]);

  const fetchComments = async () => {
    try {
      showLoading();
      showError("");
      const response = await axios.get("/comments", {
        params: { targetId, targetType },
      });
      setComments(response.data.comments);
      console.log(response.data.comments);
    } catch (err) {
      showError(
        "failed to fetch comments",
        err.response?.data.message || err.message
      );
    } finally {
      hideLoading();
    }
  };

  const fetchReviews = async () => {
    try {
      showLoading();
      const response = await axios.get(`/reviews`, {
        params: { targetId, targetType },
      });
      setReviews(response.data.reviews);
      console.log(response.data.reviews);
    } catch (error) {
      showError(
        "Failed to fetch reviews:",
        error.response?.data?.message || error.message
      );
    } finally {
      hideLoading();
    }
  };

  const handleNewReview = (newReview) => {
    setReviews((prevReviews) => [newReview, ...prevReviews]); // Add new review to the top
  };

  const handleNewComment = (newComment) => {
    setComments((preComments) => [newComment, ...preComments]);
  };

  const handlePostComment = async (commentData) => {
    // const { commentText, targetId, targetType } = commentData;

    try {
      showLoading();
      clearError();
      const response = await axios.post(
        "/comments",
        // {
        //   commentText,
        //   targetId,
        //   targetType,
        // }
        commentData
      );

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Failed to post comment. Please try again."
        );
      }
      // Clear input field on success
      setComments((prev) => [...prev, response.data.comment]);
      console.log(response.data.comment);
      showSuccess("Comment posted successfully!");
    } catch (err) {
      showError(err.message || "Failed to post comment. Please try again.");
    } finally {
      hideLoading();
    }
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  const handleCloseForm = () => {
    setShowReviewDialog(false);
  };
  useEffect(() => {
    if (!id) {
      showError("Invalid job ID. Please check the URL and try again.");
      return;
    }
    const fetchJobDetails = async () => {
      try {
        showLoading();
        const token = localStorage.getItem("token");
        if (!token) {
          showError("Authorization token is missing. Redirecting to login.");
          window.location.href = "/login";
          return;
        }
        const response = await axios.get(`/jobs/${id}`);
        setJobDetails(response.data);
        const applicantsResponse = await axios.get(`/jobs/${id}/applicants`);
        // console.log("Job Details:", jobDetails);
        // console.log("Applicants:", applicants);

        setApplicants(applicantsResponse.data.applicants);
      } catch (err) {
        showError("Failed to fetch job details. Please try again.");
      } finally {
        hideLoading();
      }
    };
    fetchJobDetails();
  }, [id]);

  // if (!jobDetails) return <div>loading...</div>;

  // const handleRatingSubmit = async (rating) => {
  //   try {
  //     showLoading();
  //     const token = localStorage.getItem("token");
  //     await axios.post(
  //       `http://localhost:5000/api/jobs/${id}/rate`,
  //       { rating },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     showSuccess("Thank you for your feedback!");
  //   } catch (err) {
  //     showError("Failed to submit your rating. Please try again.");
  //   } finally {
  //     hideLoading();
  //   }
  // };

  if (!jobDetails) {
    return <p>Loading job details...</p>;
  }

  return (
    <AuthProvider>
      <div className="min-h-screen">
        <div className="p-6 bg-white shadow-md rounded-lg job-card-grid w-full md:w-4/12 lg:w-6/12 m-auto ">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
            {jobDetails.title}
          </h1>

          {/* Job Details Table */}
          <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">
                  <FaBriefcase className="inline-block mr-2 text-blue-500" />{" "}
                  Job Title
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  <FaBuilding className="inline-block mr-2 text-purple-500" />{" "}
                  Company
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  <FaMapMarkerAlt className="inline-block mr-2 text-red-500" />{" "}
                  Location
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  <FaBriefcase className="inline-block mr-2 text-green-500" />{" "}
                  Employment Type
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  <FaDollarSign className="inline-block mr-2 text-yellow-500" />{" "}
                  Salary
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  <FaCalendarAlt className="inline-block mr-2 text-gray-500" />{" "}
                  Application Deadline
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  {jobDetails.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {jobDetails.company?.name || "Anonymous"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {jobDetails.location}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {jobDetails.jobType}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {jobDetails.salary
                    ? `$${jobDetails.salary}`
                    : "Not specified"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {jobDetails.applicationDeadline
                    ? new Date(jobDetails.applicationDeadline).toDateString()
                    : "Not specified"}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Expandable Sections */}
          {[
            {
              key: "skills",
              title: "Skills Required",
              icon: <FaTools className="inline-block mr-2 text-indigo-500" />,
              content: jobDetails.skills,
              itemIcon: <FaCheckCircle className="text-green-500 mr-2" />,
            },
            {
              key: "applicants",
              title: "Applicants",
              icon: <FaUserAlt className="inline-block mr-2 text-blue-500" />,
              content: jobDetails.applicants.map((applicant) => (
                <li key={applicants._id}>{applicant.user.username}</li>
              )),
              itemIcon: <FaUser className="mr-2 text-gray-700" />,
            },
          ].map(({ key, title, icon, content, itemIcon }) => (
            <div key={key} className="mb-6">
              <h2
                className="text-2xl font-semibold text-gray-900 mb-4 cursor-pointer flex items-center"
                onClick={() => toggleSection(key)}
              >
                {icon} {title}{" "}
                {expandedSections[key] ? (
                  <FaChevronUp className="ml-2 text-gray-500" />
                ) : (
                  <FaChevronDown className="ml-2 text-gray-500" />
                )}
              </h2>
              {expandedSections[key] && (
                <ul className="list-disc ml-6">
                  {content.length > 0 ? (
                    content.map((items, index) => (
                      <li key={index} className="flex items-center mb-2">
                        {itemIcon}
                        {items}
                      </li>
                    ))
                  ) : (
                    <li>No data available</li>
                  )}
                </ul>
              )}
            </div>
          ))}

          {/* Likes */}
          <div className=" ">
            {jobDetails && (
              <JobRating jobId={jobDetails._id} refreshkey={refreshkey} />
            )}
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            <FaThumbsUp className="inline-block mr-2 text-green-500" /> Likes
          </h2>
          <p>
            {jobDetails.likes.length === 1
              ? `${jobDetails.likes.length} user`
              : `${jobDetails.likes.length} users`}{" "}
            liked this job.
          </p>
          <div className="reviews-section">
            <div className="reviews-header">
              <div>
                <button onClick={toggleReviews} className="add-review-button">
                  View Reviews
                </button>
                {viewReviews && (
                  <Reviews
                    targetId={`${id}`}
                    targetType="Job"
                    onSetReview={reviews}
                  />
                )}
              </div>

              <button
                onClick={() => setShowReviewDialog(true)}
                className="add-review-button"
              >
                Write a Review
              </button>
            </div>

            {showReviewDialog && (
              <>
                <div className="overlay" onClick={handleCloseForm}></div>

                {id ? (
                  <ReviewForm
                    targetId={id}
                    targetType="Job"
                    onReviewSubmit={handleNewReview}
                    onClose={handleCloseForm}
                  />
                ) : (
                  <p>Loading job details...</p>
                )}
              </>
            )}

            <div>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review._id} className="review-item">
                    <p>
                      <strong>Rating:</strong> {review.review.rating} Star
                      {review.review.rating > 1 ? "s" : ""} ⭐
                    </p>
                    <p>
                      <strong>Review:</strong> {review.review.reviewText}
                    </p>
                  </div>
                ))
              ) : (
                <p>Write your rerview here!</p>
              )}
            </div>
          </div>
          <div className="reviews-section mt-8">
            <div className="reviews-header">
              <div>
                <button
                  onClick={hanleShowComment}
                  className="add-review-button"
                >
                  View Comments
                </button>
                {openComment && (
                  <Comments
                    targetId={`${id}`}
                    targetType="Job"
                    onSetComments={comments}
                  />
                )}
              </div>

              <button onClick={handleOpenDialog} className="add-review-button">
                Write a Comment
              </button>
            </div>

            {showCommentDialog && (
              <>
                <div className="overlay" onClick={handleCloseForm}></div>

                {id ? (
                  <CommentForm
                    open={showCommentDialog}
                    targetId={id}
                    targetType="Job"
                    onSubmit={handlePostComment}
                    onClose={handleCloseDialog}
                  />
                ) : (
                  <p>Loading job details...</p>
                )}
              </>
            )}

            <div>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment._id} className="review-item">
                    <p>
                      <strong>Comment:</strong> {comment.commentText}
                    </p>
                  </div>
                ))
              ) : (
                <p>Write your comment here!🆎</p>
              )}
              <LikeDisLike jobId={id} />
              {jobDetails && (
                <RatingStar
                  jobId={jobDetails?._id}
                  // userId={jobDetails.user?._id}
                  onSubmitRating={handleRatingSubmit}
                />
              )}

              <h3>Total Applicants: {jobDetails.applicants.length || 0}</h3>
              <div className="applicants-list">
                {jobDetails.applicants.map((applicant) => (
                  <div
                    key={applicant.user.id}
                    className="applicant-card flex items-center gap-4"
                  >
                    {applicant.user.profileImage && (
                      <span>
                        <img
                          src={`http://localhost:5000/${applicant.user.profileImage.replace(
                            /\\/g,
                            "/"
                          )}`}
                          // src={applicant.user.profileImage.replace(/\\/g, "/")}
                          alt={`${applicant.user.username}'s profile`}
                          className="w-10 h-10 rounded-full mt-4"
                        />
                      </span>
                    )}

                    <p className="font-bold">{applicant.user.username}</p>
                  </div>
                ))}
              </div>
              <div>
                <button
                  className="add-review-button"
                  onClick={() => {
                    if (jobDetails.company && jobDetails.company._id) {
                      navigate(`/companies/${jobDetails.company._id}`);
                    } else {
                      showError("Company details not available.");
                    }
                  }}
                >
                  Apply for this Job
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>{/* Other Job Details */}</div>
      </div>
    </AuthProvider>
  );
};

export default JobDetails;
