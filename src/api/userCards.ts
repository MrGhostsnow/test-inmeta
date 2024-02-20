import axios from "axios";

const API_BASE_URL = "https://cards-marketplace-api.onrender.com";

export const fetchUserCards = async (): Promise<any[]> => {
  try {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      throw new Error("JWT token not found in localStorage");
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(
      `${API_BASE_URL}/me`,
      { headers }
    );
    return response.data.cards;
  } catch (error) {
    console.error("Error fetching user cards:", error);
    throw new Error("Failed to fetch user cards");
  }
};
