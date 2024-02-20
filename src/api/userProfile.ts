import axios from "axios";

const API_BASE_URL = "https://cards-marketplace-api.onrender.com";

export const fetchUserProfile = async (): Promise<any> => {
  try {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      throw new Error("JWT token not found in localStorage");
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(`${API_BASE_URL}/me`, { headers });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching user profile");
  }
};
