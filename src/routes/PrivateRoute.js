import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import React from "react";

const PrivateRoute = ({ element, roleRequired }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/" />;
  }

  return element;
};

export default PrivateRoute;
