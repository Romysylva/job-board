// CtaButton.js
import React from "react";

const CtaButton = ({ label, onClick, className, jobId }) => {
  return (
    <button
      className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all ${className}`}
      onClick={onClick}
      jobId={jobId}
    >
      {label}
    </button>
  );
};

export default CtaButton;
