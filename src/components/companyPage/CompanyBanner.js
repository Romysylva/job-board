import React from "react";

const CompanyBanner = () => {
  return (
    <div className="bg-blue-500 text-white py-12 px-6">
      <div className="container mx-auto flex items-center">
        <img
          src="https://via.placeholder.com/100"
          alt="Company Logo"
          className="w-20 h-20 rounded-full mr-6"
        />
        <div>
          <h1 className="text-3xl font-bold">Company Name</h1>
          <p className="text-lg">Innovating for a better tomorrow</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyBanner;
