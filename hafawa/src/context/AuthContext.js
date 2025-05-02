import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          id: decoded.userId,
          role: decoded.role,
        });
      } catch (err) {
        console.error("Invalid token");
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  // login function
  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setUser({
      id: userData.id,
      name: userData.name,
      role: userData.role,
    });
  };

  // logout function
  const logout = () => {
    // Clear all user-related data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("profileData");
    localStorage.removeItem("bookmarks");

    // Clear user state
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
