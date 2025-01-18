import React from "react";
import ForgotPasswordForm from "../auth/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  const handleForgotPassword = (email) => {
    console.log("Forgot Password Email Submitted:", email);
    // Connect to backend API to send reset email
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <ForgotPasswordForm onSubmit={handleForgotPassword} />
    </div>
  );
};

export default ForgotPasswordPage;
