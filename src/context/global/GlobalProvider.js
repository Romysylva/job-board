// src/context/GlobalContext.js
import React, { createContext, useState, useContext } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  const showError = (message) => setError(message);
  const clearError = () => setError(null);

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        error,
        showLoading,
        hideLoading,
        showError,
        clearError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
