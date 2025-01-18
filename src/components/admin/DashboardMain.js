import React from "react";

const DashboardMain = () => {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Example Analytics Cards */}
        <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold">1,234</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded">
          <h3 className="text-lg font-semibold">Total Jobs</h3>
          <p className="text-2xl font-bold">567</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded">
          <h3 className="text-lg font-semibold">Total Companies</h3>
          <p className="text-2xl font-bold">89</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded">
          <h3 className="text-lg font-semibold">Pending Reviews</h3>
          <p className="text-2xl font-bold">12</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
