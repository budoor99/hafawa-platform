import axios from "axios";

export const login = async (email, password) => {
  try {
    const response = await axios.post("/api/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

export const signup = async (userData) => {
  try {
    const response = await axios.post("/api/auth/signup", userData);
    return response.data;
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
    throw error;
  }
};

export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`/api/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (token, userData) => {
  try {
    const response = await axios.put("/api/profile", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};
