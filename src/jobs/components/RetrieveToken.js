import { useGlobalContext } from "../../context/global/GlobalProvider";

const RetrieveToken = () => {
  const { showError } = useGlobalContext();
  const getToken = () => {
    const token = localStorage.getItem("token");
    // console.log("Token:", token);
    if (!token) {
      showError("Authorization token is missing. Redirecting to login.");
      window.location.href = "/login";
      showError("Invalid authorization");
      return;
    }
    // getToken();
  };

  return getToken();
};

export default RetrieveToken;
