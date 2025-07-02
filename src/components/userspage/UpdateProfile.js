import React, { useState } from "react";
import { useParams } from "react-router-dom";
const UpdateProfile = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    profileImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, profileImage: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("username", formData.username);
    formDataObj.append("password", formData.password);
    if (formData.profileImage) {
      formDataObj.append("profileImage", formData.profileImage);
    }

    // Call API to update profile
    fetch(`http://localhost:5000/api/users/${id}`, {
      method: "POST",
      body: formDataObj,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Profile updated successfully!");
        } else {
          alert(data.message || "Failed to update profile.");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred while updating the profile.");
      });
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">
        Update Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
