import React from "react";
import { useGlobalContext } from "./GlobalProvider";

const GlobalSuccess = () => {
  const { success, clearSuccess } = useGlobalContext();

  if (!success) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-green-500 text-white p-4 rounded shadow-lg z-50">
      <p>{success}</p>
      <button
        onClick={clearSuccess}
        className="mt-2 px-4 py-2 bg-white text-green-500 rounded"
      >
        Dismiss
      </button>
    </div>
  );
};

export default GlobalSuccess;
