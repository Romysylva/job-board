// import React from "react";
// import { useUser } from "../../context/users/useUser";
// import useFetchUserProfile from "../../components/userspage/hooks/useFetchUserProfile";

// const AdminProfile = ({ userId }) => {
//   const userPics = useFetchUserProfile(userId);
//   const { user } = useUser(); // Access the user from context

//   if (!user) {
//     return <p>You need to log in to view the dashboard.</p>;
//   }

//   return (
//     <div>
//       <img
//         src={`http://localhost:5000/${userPics.profileImage}`}
//         alt="Profile"
//         className="w-20 h-20 rounded-full mt-4"
//       />
//       <h1>Welcome, {user.username}</h1>
//       <p>Your email: {user.email}</p>
//       <p>Your email: {user.role}</p>
//       {/* Display other user details */}
//     </div>
//   );
// };

// export default AdminProfile;

import React from "react";
import { useUser } from "../../context/users/useUser";
import useFetchUserProfile from "../../components/userspage/hooks/useFetchUserProfile";

const AdminProfile = ({ userId }) => {
  const { userProfile, error } = useFetchUserProfile(userId);
  const { user } = useUser(); // Access the user from context

  if (!user) {
    return <p>You need to log in to view the dashboard.</p>;
  }

  if (error) {
    return <p>Error fetching profile: {error}</p>;
  }

  return (
    <div>
      {/* {userProfile.profileImage ? (
        <img
          src={`http://localhost:5000/${userProfile.profileImage}`}
          alt="Profile"
          className="w-20 h-20 rounded-full mt-4"
        />
      ) : (
        <p>Loading profile image...</p>
      )} */}
      <h1>Welcome, {user.username}</h1>
      <p> email: {user.email}</p>
      <p> role: {user.role}</p>
      {/* Display other user details */}
    </div>
  );
};

export default AdminProfile;
