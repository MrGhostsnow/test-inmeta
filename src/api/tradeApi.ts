import axios from "axios";

const API_BASE_URL = "https://cards-marketplace-api.onrender.com";

export const createTrade = async (
  offeringCardId: string,
  receivingCardId: string
): Promise<string> => {
  try {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      throw new Error("JWT token not found in localStorage");
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const requestBody = {
      cards: [
        {
          cardId: offeringCardId,
          type: "OFFERING",
        },
        {
          cardId: receivingCardId,
          type: "RECEIVING",
        },
      ],
    };

    const response = await axios.post(
      `${API_BASE_URL}/trades`,
      requestBody,
      { headers }
    );

    const tradeId = response.data.tradeId;
    return tradeId;
  } catch (error) {
    throw new Error("Error creating trade");
  }
};
