import React from "react";

const ManagementSection = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Manage Content</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <h3 className="text-lg font-semibold">Users</h3>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Manage Users
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Jobs</h3>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Manage Jobs
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Companies</h3>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Manage Companies
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Reviews</h3>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Manage Reviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagementSection;
