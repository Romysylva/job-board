// src/components/GlobalLoading.js
import React from "react";
import { useGlobalContext } from "./GlobalProvider";

const GlobalLoading = () => {
  const { isLoading } = useGlobalContext();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
    </div>
  );
};

export default GlobalLoading;
