// src/components/GlobalError.js
import React from "react";
import { useGlobalContext } from "./GlobalProvider";

const GlobalError = () => {
  const { error, clearError } = useGlobalContext();

  if (!error) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-red-500 text-white p-4 rounded shadow-lg z-50">
      <p>{error}</p>
      <button
        onClick={clearError}
        className="mt-2 px-4 py-2 bg-white text-red-500 rounded"
      >
        Dismiss
      </button>
    </div>
  );
};

export default GlobalError;
