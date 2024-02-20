import axios from "axios";

const API_BASE_URL = "https://cards-marketplace-api.onrender.com";

export const fetchCards = async (currentPage: number): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cards?rpp=10&page=${currentPage}`);
    return response.data.list;
  } catch (error) {
    throw new Error("Failed to fetch cards");
  }
};

export const fetchTrades = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/trades?rpp=10&page=1`);
    return response.data.list;
  } catch (error) {
    console.error("Error fetching trades:", error);
    throw new Error("Failed to fetch trades");
  }
};

export const saveSelectedCards = async (selectedCards: string[]): Promise<void> => {
  const url = `${API_BASE_URL}/me/cards`;
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    throw new Error("JWT token not found in localStorage");
  }

  const headers = { Authorization: `Bearer ${token}` };

  try {
    await axios.post(url, { cardIds: selectedCards }, { headers });
  } catch (error) {
    throw new Error("Failed to save selected cards");
  }
};

export const deleteTrade = async (tradeId: string, token: string): Promise<void> => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await axios.delete(`${API_BASE_URL}/trades/${tradeId}`, { headers });
  } catch (error) {
    console.error("Error deleting trade:", error);
    throw new Error("Failed to delete trade");
  }
};

