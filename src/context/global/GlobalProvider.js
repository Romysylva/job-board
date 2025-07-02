// src/context/GlobalContext.js
import React, { createContext, useState, useContext } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  const showError = (message) => setError(message);
  const clearError = () => setError(null);
  const showSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(""), 3000);
  };
  const clearSuccess = () => setSuccess(null);

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        error,
        showLoading,
        hideLoading,
        showError,
        clearError,
        success,
        showSuccess,
        clearSuccess,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
