import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import React from "react";

const PrivateRoute = ({ element, roleRequired }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  const userRoles = Array.isArray(user.roles) ? user.roles : [user.roles];

  if (roleRequired && !userRoles.includes(roleRequired)) {
    return <Navigate to="/" />;
  }

  return element;
};

export default PrivateRoute;
