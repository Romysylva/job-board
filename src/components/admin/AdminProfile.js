import React from "react";
import { useUser } from "../../context/users/useUser";
import useFetchUserProfile from "../../components/userspage/hooks/useFetchUserProfile";

const AdminProfile = ({ userId }) => {
  const { userData, error } = useFetchUserProfile(userId);
  const { user } = useUser(); // Access the user from context

  if (!user) {
    return <p>You need to log in to view the dashboard.</p>;
  }

  if (error) {
    return <p>Error fetching profile: {error}</p>;
  }

  console.log("User Data:", userData);
  console.log("Profile Image:", userData?.profileImage);

  return (
    <div>
      {userData && userData.profileImage && (
        <img
          src={`http://localhost:5000${userData.profileImage}`}
          alt="Profile"
          className="w-20 h-20 rounded-full mt-4"
        />
      )}

      <h1>Welcome Mr {user.username}</h1>
      <p> email: {user.email}</p>
      <p> role: {user.roles}</p>
      {/* Display other user details */}
    </div>
  );
};

export default AdminProfile;
