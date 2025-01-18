import React from "react";

const CompanyInfoPage = ({ logo, name, description, website }) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-lg">
      <div className="flex items-center">
        <img
          src={logo}
          alt={name}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div className="ml-4">
          <h3 className="text-xl font-semibold dark:text-white">{name}</h3>
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Visit Website
          </a>
        </div>
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

export default CompanyInfoPage;
