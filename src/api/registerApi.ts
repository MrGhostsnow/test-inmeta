import axios from "axios";

const API_BASE_URL = "https://cards-marketplace-api.onrender.com";

export const registerUser = async (name: string, email: string, password: string): Promise<string> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, { name, email, password });
    if (response.status >= 200 && response.status < 300) {
      return response.data.userId;
    } else {
      throw new Error("Failed to register user");
    }
  } catch (error) {
    throw new Error("Failed to register user");
  }
};
