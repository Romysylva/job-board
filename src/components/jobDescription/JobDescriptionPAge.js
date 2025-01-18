import React, { useState } from "react";

const JobDescriptionPage = ({
  description,
  responsibilities,
  requirements,
  perks,
}) => {
  const [activeTab, setActiveTab] = useState("Description");

  const getTabContent = () => {
    switch (activeTab) {
      case "Description":
        return description;
      case "Responsibilities":
        return responsibilities;
      case "Requirements":
        return requirements;
      case "Perks":
        return perks;
      default:
        return description;
    }
  };

  return (
    <div className="mt-6">
      <div className="flex space-x-4 border-b dark:border-gray-700">
        {["Description", "Responsibilities", "Requirements", "Perks"].map(
          (tab) => (
            <button
              key={tab}
              className={`pb-2 ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 dark:border-blue-400 text-blue-500"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          )
        )}
      </div>
      <div className="mt-4 text-gray-600 dark:text-gray-300">
        {getTabContent()}
      </div>
    </div>
  );
};

export default JobDescriptionPage;
