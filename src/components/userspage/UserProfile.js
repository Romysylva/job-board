import React from "react";
import useFetchUserProfile from "./hooks/useFetchUserProfile";
import { useGlobalContext } from "../../context/global/GlobalProvider";
import LoadingSpinner from "../../jobs/loading/LoadingSpinner";

const UserProfile = ({ userId }) => {
  const { userProfile, refetch } = useFetchUserProfile(userId);
  const { isLoading, error } = useGlobalContext();

  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow rounded">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">User Profile</h2>

      {isLoading && (
        <p className="text-blue-500">
          <LoadingSpinner />
        </p>
      )}
      {error && <p className="text-red-500">{error}</p>}

      {userProfile && (
        <div className="dark:text-slate-300">
          <p className="text-lg">
            <strong>Username:</strong> {userProfile.username}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {userProfile.email}
          </p>
          <p className="text-lg">
            <strong>Role:</strong> {userProfile.roles}
          </p>
          {userProfile.profileImage && (
            <img
              src={`http://localhost:5000/${userProfile.profileImage}`}
              alt="Profile"
              className="w-20 h-20 rounded-full mt-4"
            />
          )}
        </div>
      )}

      <button
        onClick={refetch}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Refresh Profile
      </button>
    </div>
  );
};

export default UserProfile;
