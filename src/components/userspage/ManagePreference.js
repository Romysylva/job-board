import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useGlobalContext } from "../../context/GlobalContext";
import { useGlobalContext } from "../../context/global/GlobalProvider";

const ManagePreferences = () => {
  const [preferences, setPreferences] = useState(null); // Start with null to indicate loading
  const { showLoading, hideLoading, showError } = useGlobalContext();

  // Fetch user preferences when the component loads
  // useEffect(() => {
  //   const fetchPreferences = async () => {
  //     showLoading();
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:5000/api/users/preferences",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`, // Include auth token
  //           },
  //         }
  //       );
  //       setPreferences(response.data.preferences); // Update state with fetched preferences
  //     } catch (err) {
  //       showError(err.response?.data?.message || "Failed to fetch preferences");
  //     } finally {
  //       hideLoading();
  //     }
  //   };

  //   fetchPreferences();
  // }, [showLoading, hideLoading, showError]);
  useEffect(() => {
    const fetchPreferences = async () => {
      showLoading();
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/preferences",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Include auth token
            },
          }
        );

        // Check the response structure
        if (response.data && response.data.preferences) {
          setPreferences(response.data.preferences); // Update state with fetched preferences
        } else {
          throw new Error("Preferences data not found in response");
        }
      } catch (err) {
        showError(err.response?.data?.message || "Failed to fetch preferences");
        console.error("Error fetching preferences:", err);
      } finally {
        hideLoading();
      }
    };

    fetchPreferences();
  }, []);

  // // Handle toggle of preferences

  const handleToggle = (preference) => {
    setPreferences((prev) => ({
      ...prev,
      [preference]: !prev[preference],
    }));
  };

  // Submit updated preferences to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoading();
    try {
      await axios.put(
        "http://localhost:5000/api/users/preferences",
        { preferences },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include auth token
          },
        }
      );
      alert("Preferences updated successfully!");
    } catch (err) {
      showError(err.response?.data?.message || "Failed to update preferences");
    } finally {
      hideLoading();
    }
  };

  // Display a loading state or fallback UI while fetching preferences
  if (!preferences) {
    return <p>Loading preferences...</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
      <h2 className="text-2xl font-semibold mb-4">Manage Preferences</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Enable Notifications</span>
          <input
            type="checkbox"
            checked={preferences.notifications}
            onChange={() => handleToggle("notifications")}
            className="form-checkbox h-5 w-5 text-blue-600 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <span>Dark Mode</span>
          <input
            type="checkbox"
            checked={preferences.darkMode}
            onChange={() => handleToggle("darkMode")}
            className="form-checkbox h-5 w-5 text-blue-600 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <span>Receive Email Updates</span>
          <input
            type="checkbox"
            checked={preferences.emailUpdates}
            onChange={() => handleToggle("emailUpdates")}
            className="form-checkbox h-5 w-5 text-blue-600 rounded"
          />
        </div>

        <button
          type="submit"
          className="cta-button bg-blue-600 text-white py-2 px-6 rounded-full mt-4 hover:bg-blue-700"
        >
          Save Preferences
        </button>
      </form>
    </div>
  );
};

export default ManagePreferences;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useGlobalContext } from "../../context/global/GlobalProvider";

// const ManagePreferences = () => {
//   const [preferences, setPreferences] = useState({
//     notifications: true,
//     darkMode: false,
//     emailUpdates: true,
//   });

//   const { showLoading, hideLoading, showError } = useGlobalContext();

//   // Fetch user preferences when the component loads
//   useEffect(() => {
//     const fetchPreferences = async () => {
//       showLoading();
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/users/preferences",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`, // Include auth token
//             },
//           }
//         );
//         setPreferences(response.data.preferences); // Update state with fetched preferences
//       } catch (err) {
//         showError(err.response?.data?.message || "Failed to fetch preferences");
//       } finally {
//         hideLoading();
//       }
//     };

//     fetchPreferences();
//   }, [showLoading, hideLoading, showError]);

//   // Handle toggle of preferences
//   const handleToggle = (preference) => {
//     setPreferences((prev) => ({
//       ...prev,
//       [preference]: !prev[preference],
//     }));
//   };

//   // Submit updated preferences to the backend
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     showLoading();
//     try {
//       await axios.put(
//         "http://localhost:5000/api/users/preferences",
//         { preferences },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`, // Include auth token
//           },
//         }
//       );
//       alert("Preferences updated successfully!");
//     } catch (err) {
//       showError(err.response?.data?.message || "Failed to update preferences");
//     } finally {
//       hideLoading();
//     }
//   };

//   // if (!preferences) {
//   //   return <p>Loading preferences...</p>;
//   // }

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
//       <h2 className="text-2xl font-semibold mb-4">Manage Preferences</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="flex items-center justify-between">
//           <span>Enable Notifications</span>
//           <input
//             type="checkbox"
//             checked={preferences.notifications}
//             onChange={() => handleToggle("notifications")}
//             className="form-checkbox h-5 w-5 text-blue-600 rounded"
//           />
//         </div>

//         <div className="flex items-center justify-between">
//           <span>Dark Mode</span>
//           <input
//             type="checkbox"
//             checked={preferences.darkMode}
//             onChange={() => handleToggle("darkMode")}
//             className="form-checkbox h-5 w-5 text-blue-600 rounded"
//           />
//         </div>

//         <div className="flex items-center justify-between">
//           <span>Receive Email Updates</span>
//           <input
//             type="checkbox"
//             checked={preferences.emailUpdates}
//             onChange={() => handleToggle("emailUpdates")}
//             className="form-checkbox h-5 w-5 text-blue-600 rounded"
//           />
//         </div>

//         <button
//           type="submit"
//           className="cta-button bg-blue-600 text-white py-2 px-6 rounded-full mt-4 hover:bg-blue-700"
//         >
//           Save Preferences
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ManagePreferences;
