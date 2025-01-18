import React from "react";

const SettingsSection = ({
  onOpenProfile,
  onOpenPreference,
  setUserProfile,
}) => {
  const handelClicks = () => {
    setUserProfile(false);
    onOpenPreference();
  };
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Settings
      </h2>
      <ul className="space-y-4">
        <li>
          <button
            className="block w-full text-left bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            onClick={() => onOpenProfile()}
          >
            Update Profile
          </button>
        </li>
        <li>
          <button className="block w-full text-left bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            Change Password
          </button>
        </li>
        <li>
          <button
            className="block w-full text-left bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            onClick={() => handelClicks()}
          >
            Manage Preferences
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SettingsSection;
