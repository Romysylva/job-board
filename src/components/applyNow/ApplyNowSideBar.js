import React from "react";

const ApplyNowSidebar = ({ deadline, onApply, onSave }) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-lg">
      <p className="text-gray-600 dark:text-gray-300">
        Application Deadline: <strong>{deadline}</strong>
      </p>
      <button
        onClick={onApply}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Apply Now
      </button>
      <button
        onClick={onSave}
        className="mt-4 w-full bg-gray-200 dark:bg-gray-700 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        Save Job
      </button>
    </div>
  );
};

export default ApplyNowSidebar;
