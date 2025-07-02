import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        credentials
      );
      const userData = response.data;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout"); // Optional logout API call
      setUser(null);
      localStorage.removeItem("user");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  useEffect(() => {
    const initializeUser = async (userId) => {
      try {
        setLoading(true);
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Use local storage if available
        } else {
          const response = await axios.get(
            `http://localhost:5000/api/users/${userId}`
          ); // Replace with your user data endpoint
          setUser(response.data);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Add a global loading indicator
  }

  if (error) {
    return <p>Error: {error}</p>; // Add a global error indicator
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
