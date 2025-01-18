import React from "react";

const ProfileDetails = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Profile Details</h2>
      <div className="space-y-4">
        <div>
          <p className="text-gray-500">Name:</p>
          <p className="font-medium">John Doe</p>
        </div>
        <div>
          <p className="text-gray-500">Email:</p>
          <p className="font-medium">john.doe@example.com</p>
        </div>
        <div>
          <p className="text-gray-500">Role:</p>
          <p className="font-medium">Job Seeker</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
