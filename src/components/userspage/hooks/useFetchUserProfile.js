import axios from "axios";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../../context/global/GlobalProvider";

const useFetchUserProfile = (userId) => {
  const [userProfile, setUserProfile] = useState(null);
  const { showLoading, hideLoading, showError } = useGlobalContext();

  const fetchUserProfile = async () => {
    showLoading(); // Start global loading state
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass the JWT token
          },
        }
      );
      setUserProfile(response.data);
    } catch (error) {
      showError(
        error.response?.data?.message || "Failed to fetch user profile."
      );
    } finally {
      hideLoading(); // Stop global loading state
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  return { userProfile, refetch: fetchUserProfile };
};

export default useFetchUserProfile;

// const useFetchUserProfile = (userId) => {
//   const [userProfile, setUserProfile] = useState({});
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/users/${userId}`
//         );
//         if (response.data.success) {
//           setUserProfile(response.data.user);
//         } else {
//           setError("Failed to fetch user profile");
//         }
//       } catch (err) {
//         setError(err.message || "An error occurred");
//       }
//     };

//     if (userId) fetchUserProfile();
//   }, [userId]);

//   return { userProfile, error };
// };

// export default useFetchUserProfile;
