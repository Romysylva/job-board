// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// import { useGlobalContext } from "../context/global/GlobalProvider";
// import StarRatings from "react-star-ratings";
// // import RetrieveToken from "./components/RetrieveToken";
// import axios from "../utils/axiosConfig";
// import ComfirmDialog from "../utils/ComfirmDialog";

// const JobList = () => {
//   const [jobs, setJobs] = useState([]);
//   const { showLoading, hideLoading, showError, showSuccess } =
//     useGlobalContext();
//   const navigate = useNavigate();
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedJobId, setSelectedJobId] = useState(null);

//   const fetchJobs = async () => {
//     try {
//       showLoading();

//     const token = localStorage.getItem("token");
//     if (!token) {
//       showError("Authorization token is missing. Redirecting to login.");
//       window.location.href = "/login";
//       showError("Invalid authorization");
//       return;
//     }

//     const response = await axios.get("http://localhost:5000/api/jobs", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (response.data && Array.isArray(response.data.data)) {
//       let jobs = response.data.data;
//       setJobs(jobs);
//     } else {
//       console.error("Unexpected response format:", response.data);
//       setJobs([]);
//     }
//   } catch (error) {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     } else {
//       showError(
//         "Failed to fetch jobs.",
//         error.response?.data?.message || error.message
//       );
//     }
//   } finally {
//     hideLoading();
//   }
// };
// const refreshJobs = () => {
//   fetchJobs();
// };
//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const handleViewDetails = (id) => {
//     console.log("Navigating to job ID:", id);
//     navigate(`/jobs/${id}`);
//   };

//   const confirmDelete = (jobId) => {
//     setSelectedJobId(jobId);
//     setOpenDialog(true);
//   };

//   const handleDeleteJob = async () => {
//     // if (!window.confirm("Are you sure you want to delete this job?")) return;
//     showLoading();
//     if (!selectedJobId) return;

//     try {
//       await axios.delete(`/jobs/${selectedJobId}`);
//       showSuccess("Job deleted successfully!");

//       refreshJobs();
//       setOpenDialog(false);
//     } catch (err) {
//       showError("Failed to delete job.");
//     } finally {
//       hideLoading();
//     }
//   };

//   // grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
//   return (
//     <div className="p-4 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Available Jobs</h1>
//       {jobs.length > 0 ? (
//         <div className="  job-list-container-grid ">
//           {jobs.map((job) => (
//             <div
//               key={job._id}
//               className=" hover:shadow-gray-300 transition-transform transform hover:scale-105 cursor-pointer job-card-grid dark:bg-gray-900"
//             >
//               <h2 className="card-text text-lg font-semibold">{job.title}</h2>
//               <p className="text-gray-600">© {job.company?.name}</p>
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 ✈ {job.location}
//               </p>
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 ✈ {job.description}
//               </p>
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 comments: <span>{job.comments.length}</span>
//               </p>
//               <div className="flex justify-between content-center ">
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   Likes: <span>{job.likes.length} </span>
//                 </p>
//                 <span>👍👎</span>
//               </div>
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 Reviews: <span>{job.reviews.length}</span>
//               </p>

//               <div className="text-sm text-gray-500 dark:text-gray-400">
//                 <h3>Ratings</h3>
//                 {job.ratingsSummary?.totalRatings > 0 ? (
//                   <>
//                     <StarRatings
//                       rating={job.ratingsSummary.averageRating}
//                       starRatedColor="gold"
//                       numberOfStars={5}
//                       starDimension="20px"
//                       starSpacing="2px"
//                     />
//                     <p>({job.ratingsSummary.totalRatings} ratings)</p>
//                   </>
//                 ) : (
//                   <>
//                     <StarRatings
//                       rating={job.ratingsSummary.averageRating}
//                       starRatedColor=""
//                       numberOfStars={5}
//                       starDimension="20px"
//                       starSpacing="2px"
//                     />
//                     <p>No ratings available yet.</p>
//                   </>
//                 )}
//               </div>
//               <div className="flex justify-between mt-4">
//                 <button
//                   className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
//                   onClick={() => handleViewDetails(job._id)}
//                 >
//                   View Details
//                 </button>

//                 <button
//                   onClick={() => confirmDelete(job._id)}
//                   className="delete-btn"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//           <ComfirmDialog
//             open={openDialog}
//             onClose={() => setOpenDialog(false)}
//             onConfirm={handleDeleteJob}
//             title="Delete Job"
//             message="Are you sure you want to delete this job? This action cannot be undone."
//           />
//         </div>
//       ) : (
//         <p>No jobs available.</p>
//       )}
//     </div>
//   );
// };

// export default JobList;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../utils/axiosConfig";
// import { useGlobalContext } from "../context/global/GlobalProvider";
// import StarRatings from "react-star-ratings";
// import ComfirmDialog from "../utils/ComfirmDialog";

// const JobList = () => {
//   const [jobs, setJobs] = useState([]);
//   const { showLoading, hideLoading, showError, showSuccess } =
//     useGlobalContext();
//   const navigate = useNavigate();
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedJobId, setSelectedJobId] = useState(null);

//   // Filters & Search
//   const [searchQuery, setSearchQuery] = useState("");
//   const [companyFilter, setCompanyFilter] = useState("");
//   const [locationFilter, setLocationFilter] = useState("");
//   const [minLikes, setMinLikes] = useState("");
//   const [minRatings, setMinRatings] = useState("");
//   const [sortBy, setSortBy] = useState("");

//   const fetchJobs = async () => {
//     try {
//       showLoading();

//       const token = localStorage.getItem("token");
//       if (!token) {
//         showError("Authorization token is missing. Redirecting to login.");
//         window.location.href = "/login";
//         return;
//       }

//       const params = new URLSearchParams();
//       if (searchQuery) params.append("title", searchQuery);
//       if (companyFilter) params.append("company", companyFilter);
//       if (locationFilter) params.append("location", locationFilter);
//       if (minLikes) params.append("minLikes", minLikes);
//       if (minRatings) params.append("minRatings", minRatings);
//       if (sortBy) params.append("sortBy", sortBy);

//       const response = await axios.get(
//         `http://localhost:5000/api/jobs?${params.toString()}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.data && Array.isArray(response.data.data)) {
//         let jobs = response.data.data;
//         setJobs(jobs);
//       } else {
//         console.error("Unexpected response format:", response.data);
//         setJobs([]);
//       }
//     } catch (error) {
//       if (error.response?.status === 401) {
//         localStorage.removeItem("token");
//         window.location.href = "/login";
//       } else {
//         showError(
//           "Failed to fetch jobs.",
//           error.response?.data?.message || error.message
//         );
//       }
//     } finally {
//       hideLoading();
//     }
//   };

// const refreshJobs = () => {
//   fetchJobs();
// };
//   useEffect(() => {
//     fetchJobs();
//   }, []);

// const handleViewDetails = (id) => {
//   console.log("Navigating to job ID:", id);
//   navigate(`/jobs/${id}`);
// };

// const confirmDelete = (jobId) => {
//   setSelectedJobId(jobId);
//   setOpenDialog(true);
// };

// const handleDeleteJob = async () => {
//   // if (!window.confirm("Are you sure you want to delete this job?")) return;
//   showLoading();
//   if (!selectedJobId) return;

//   try {
//     await axios.delete(`/jobs/${selectedJobId}`);
//     showSuccess("Job deleted successfully!");

//     refreshJobs();
//     setOpenDialog(false);
//   } catch (err) {
//     showError("Failed to delete job.");
//   } finally {
//     hideLoading();
//   }
// };

//   return (
//     <div className="p-4 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Available Jobs</h1>

//       {/* Search & Filter Section */}
//       <div className="flex flex-wrap gap-4 mb-4">
//         <input
//           type="text"
//           placeholder="Search job title..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="p-2 border rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Company Name..."
//           value={companyFilter}
//           onChange={(e) => setCompanyFilter(e.target.value)}
//           className="p-2 border rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Location..."
//           value={locationFilter}
//           onChange={(e) => setLocationFilter(e.target.value)}
//           className="p-2 border rounded-md"
//         />
//         <select
//           value={minLikes}
//           onChange={(e) => setMinLikes(e.target.value)}
//           className="p-2 border rounded-md"
//         >
//           <option value="">Min Likes</option>
//           <option value="10">10+</option>
//           <option value="50">50+</option>
//           <option value="100">100+</option>
//         </select>
//         <select
//           value={minRatings}
//           onChange={(e) => setMinRatings(e.target.value)}
//           className="p-2 border rounded-md"
//         >
//           <option value="">Min Rating</option>
//           <option value="1">1+</option>
//           <option value="3">3+</option>
//           <option value="4">4+</option>
//         </select>
//         <select
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value)}
//           className="p-2 border rounded-md"
//         >
//           <option value="">Sort By</option>
//           <option value="latest">Latest</option>
//           <option value="oldest">Oldest</option>
//         </select>
//         <button
//           onClick={fetchJobs}
//           className="bg-blue-500 text-white p-2 rounded-md"
//         >
//           Apply Filters
//         </button>
//       </div>

//       {/* Job List */}
//       <div>
// {jobs.length > 0 ? (
//   <div className="  job-list-container-grid ">
//     {jobs.map((job) => (
//       <div
//         key={job._id}
//         className=" hover:shadow-gray-300 transition-transform transform hover:scale-105 cursor-pointer job-card-grid dark:bg-gray-900"
//       >
//         <h2 className="card-text text-lg font-semibold">{job.title}</h2>
//         <p className="text-gray-600">© {job.company?.name}</p>
//         <p className="text-sm text-gray-500 dark:text-gray-400">
//           ✈ {job.location}
//         </p>
//         <p className="text-sm text-gray-500 dark:text-gray-400">
//           ✈ {job.description}
//         </p>
//         <p className="text-sm text-gray-500 dark:text-gray-400">
//           comments: <span>{job.comments.length}</span>
//         </p>
//         <div className="flex justify-between content-center ">
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             Likes: <span>{job.likes.length} </span>
//           </p>
//           <span>👍👎</span>
//         </div>
//         <p className="text-sm text-gray-500 dark:text-gray-400">
//           Reviews: <span>{job.reviews.length}</span>
//         </p>

//         <div className="text-sm text-gray-500 dark:text-gray-400">
//           <h3>Ratings</h3>
//           {job.ratingsSummary?.totalRatings > 0 ? (
//             <>
//               <StarRatings
//                 rating={job.ratingsSummary.averageRating}
//                 starRatedColor="gold"
//                 numberOfStars={5}
//                 starDimension="20px"
//                 starSpacing="2px"
//               />
//               <p>({job.ratingsSummary.totalRatings} ratings)</p>
//             </>
//           ) : (
//             <>
//               <StarRatings
//                 rating={job.ratingsSummary.averageRating}
//                 starRatedColor=""
//                 numberOfStars={5}
//                 starDimension="20px"
//                 starSpacing="2px"
//               />
//               <p>No ratings available yet.</p>
//             </>
//           )}
//         </div>
//         <div className="flex justify-between mt-4">
//           <button
//             className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
//             onClick={() => handleViewDetails(job._id)}
//           >
//             View Details
//           </button>

//           <button
//             onClick={() => confirmDelete(job._id)}
//             className="delete-btn"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     ))}
//     <ComfirmDialog
//       open={openDialog}
//       onClose={() => setOpenDialog(false)}
//       onConfirm={handleDeleteJob}
//       title="Delete Job"
//       message="Are you sure you want to delete this job? This action cannot be undone."
//     />
//   </div>
// ) : (
//   <p>No jobs available.</p>
// )}
//       </div>
//     </div>
//   );
// };

// export default JobList;

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/global/GlobalProvider";
import StarRatings from "react-star-ratings";
import axios from "../utils/axiosConfig";
import ComfirmDialog from "../utils/ComfirmDialog";
import { debounce } from "lodash"; // Import lodash debounce

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const { showLoading, hideLoading, showError, showSuccess } =
    useGlobalContext();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [minLikes, setMinLikes] = useState("");
  const [minRatings, setMinRatings] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Fetch jobs (only when user types)
  const fetchJobs = async () => {
    if (!searchQuery) {
      setJobs([]); // Reset jobs if search is empty
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        showError("Authorization token is missing. Redirecting to login.");
        window.location.href = "/login";
        return;
      }

      const params = new URLSearchParams();
      params.append("title", searchQuery);
      if (companyFilter) params.append("company", companyFilter);
      if (locationFilter) params.append("location", locationFilter);
      if (minLikes) params.append("minLikes", minLikes);
      if (minRatings) params.append("minRatings", minRatings);
      if (sortBy) params.append("sortBy", sortBy);

      const response = await axios.get(`/jobs?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setJobs(response.data.data || []);
    } catch (error) {
      showError("Failed to fetch jobs.");
    }
  };

  // Debounce search to avoid excessive API calls
  const debouncedFetchJobs = useCallback(debounce(fetchJobs, 500), [
    searchQuery,
    companyFilter,
    locationFilter,
    minLikes,
    minRatings,
    sortBy,
  ]);

  // Fetch jobs only when the user types
  useEffect(() => {
    debouncedFetchJobs();
    return () => debouncedFetchJobs.cancel(); // Cleanup function
  }, [
    searchQuery,
    companyFilter,
    locationFilter,
    minLikes,
    minRatings,
    sortBy,
  ]);

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Search Jobs</h1>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search job title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Company Name..."
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Location..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="p-2 border rounded-md"
        />
        <select
          value={minLikes}
          onChange={(e) => setMinLikes(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Min Likes</option>
          <option value="10">10+</option>
          <option value="50">50+</option>
          <option value="100">100+</option>
        </select>
        <select
          value={minRatings}
          onChange={(e) => setMinRatings(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Min Rating</option>
          <option value="1">1+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Sort By</option>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {/* Job Listings */}
      {jobs.length > 0 ? (
        <div className="job-list-container-grid">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="hover:shadow-gray-300 transition-transform transform hover:scale-105 cursor-pointer job-card-grid dark:bg-gray-900"
            >
              <h2 className="card-text text-lg font-semibold">{job.title}</h2>
              <p className="text-gray-600">© {job.company?.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ✈ {job.location}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ✈ {job.description}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Comments: <span>{job.comments.length}</span>
              </p>
              <div className="flex justify-between content-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Likes: <span>{job.likes.length} </span>
                </p>
                <span>👍👎</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Reviews: <span>{job.reviews.length}</span>
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <h3>Ratings</h3>
                {job.ratingsSummary?.totalRatings > 0 ? (
                  <>
                    <StarRatings
                      rating={job.ratingsSummary.averageRating}
                      starRatedColor="gold"
                      numberOfStars={5}
                      starDimension="20px"
                      starSpacing="2px"
                    />
                    <p>({job.ratingsSummary.totalRatings} ratings)</p>
                  </>
                ) : (
                  <>
                    <StarRatings
                      rating={job.ratingsSummary.averageRating}
                      starRatedColor=""
                      numberOfStars={5}
                      starDimension="20px"
                      starSpacing="2px"
                    />
                    <p>No ratings available yet.</p>
                  </>
                )}
              </div>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                  onClick={() => navigate(`/jobs/${job._id}`)}
                >
                  View Details
                </button>

                <button
                  onClick={() => {
                    setSelectedJobId(job._id);
                    setOpenDialog(true);
                  }}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No jobs found. Try adjusting your search criteria.</p>
      )}

      <ComfirmDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={() => {
          if (!selectedJobId) return;
          axios.delete(`/jobs/${selectedJobId}`).then(() => {
            showSuccess("Job deleted successfully!");
            fetchJobs();
            setOpenDialog(false);
          });
        }}
        title="Delete Job"
        message="Are you sure you want to delete this job? This action cannot be undone."
      />
    </div>
  );
};

export default JobList;
