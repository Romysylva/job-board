const LogOutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login"; // Redirect to login page
};

export default LogOutUser;
