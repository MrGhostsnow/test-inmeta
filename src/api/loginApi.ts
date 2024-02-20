import axios from "axios";

const API_BASE_URL = "https://cards-marketplace-api.onrender.com";

export const login = async (email: string, password: string): Promise<string> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data.token;
  } catch (error) {
    throw new Error("Failed to login");
  }
};
