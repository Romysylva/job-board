import React from "react";
// import ResetPasswordForm from "../components/auth/ResetPasswordForm";
import ResetPasswordForm from "../auth/ResetPasswordForm";

const ResetPasswordPage = () => {
  const handleResetPassword = (newPassword) => {
    console.log("New Password Submitted:", newPassword);
    // Connect to backend API to update password
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <ResetPasswordForm onSubmit={handleResetPassword} />
    </div>
  );
};

export default ResetPasswordPage;
