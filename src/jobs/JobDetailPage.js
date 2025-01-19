import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../context/global/GlobalProvider";

const JobDetails = () => {
  const { id } = useParams();
  // console.log("Job ID from useParams:", id);
  const [jobDetails, setJobDetails] = useState(null);
  const { showLoading, hideLoading, showError } = useGlobalContext();

  useEffect(() => {
    if (!id) {
      console.error("No job ID provided in the route.");
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
          showError("Invalid authorization");
          return;
        }
        const response = await axios.get(
          `http://localhost:5000/api/jobs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setJobDetails(response.data);
      } catch (err) {
        showError("Failed to fetch job details. Please try again.");
      } finally {
        hideLoading();
      }
    };
    fetchJobDetails();
  }, [id]);

  // Add a loading state or check for null
  if (!jobDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6  bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
        {jobDetails.title}
      </h1>

      {/* Job Details Table */}
      <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Job Title</th>
            <th className="border border-gray-300 px-4 py-2">Company</th>
            <th className="border border-gray-300 px-4 py-2">Location</th>
            <th className="border border-gray-300 px-4 py-2">
              Employment Type
            </th>
            <th className="border border-gray-300 px-4 py-2">Salary</th>
            <th className="border border-gray-300 px-4 py-2">
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
              {jobDetails.company?.name}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {jobDetails.location}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {jobDetails.employment}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {jobDetails.salary ? `$${jobDetails.salary}` : "Not specified"}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {jobDetails.applicationDeadline
                ? new Date(jobDetails.applicationDeadline).toDateString()
                : "Not specified"}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Skills Table */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Skills Required
      </h2>
      <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Skill</th>
          </tr>
        </thead>
        <tbody>
          {jobDetails.skills.map((skill, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{skill}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Applicants Table */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Applicants</h2>
      <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Applied At</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {jobDetails.applicants.length > 0 ? (
            jobDetails.applicants.map((applicant, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {applicant.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(applicant.appliedAt).toDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {applicant.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="border border-gray-300 px-4 py-2 text-center"
              >
                No applicants yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Comments Table */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Comments</h2>
      <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">User Id</th>
            <th className="border border-gray-300 px-4 py-2">Comment</th>
            <th className="border border-gray-300 px-4 py-2">Posted At</th>
          </tr>
        </thead>
        <tbody>
          {jobDetails.comments.length > 0 ? (
            jobDetails.comments.map((comment, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {comment.userId}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {comment.comment}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(comment.postedAt).toDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="border border-gray-300 px-4 py-2 text-center"
              >
                No comments yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Reviews Table */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Reviews</h2>
      <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">User Id</th>
            <th className="border border-gray-300 px-4 py-2">Review</th>
            <th className="border border-gray-300 px-4 py-2">Reviewed At</th>
          </tr>
        </thead>
        <tbody>
          {jobDetails.reviews.length > 0 ? (
            jobDetails.reviews.map((review, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {review.userId}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {review.review}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(review.postedAt).toDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="border border-gray-300 px-4 py-2 text-center"
              >
                No reviews yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Ratings Table */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ratings</h2>
      <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">User Id</th>
            <th className="border border-gray-300 px-4 py-2">Rating</th>
            <th className="border border-gray-300 px-4 py-2">Rated At</th>
          </tr>
        </thead>
        <tbody>
          {jobDetails.ratings.length > 0 ? (
            jobDetails.ratings.map((rating, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {rating.userId}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {rating.rating} / 5
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(rating.postedAt).toDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="border border-gray-300 px-4 py-2 text-center"
              >
                No ratings yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Likes Table */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Likes</h2>
      <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">User Id</th>
            <th className="border border-gray-300 px-4 py-2">Liked At</th>
          </tr>
        </thead>
        <tbody>
          {jobDetails.likes.length > 0 ? (
            jobDetails.likes.map((like, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {like.userId}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(like.likedAt).toDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="2"
                className="border border-gray-300 px-4 py-2 text-center"
              >
                No likes yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JobDetails;
