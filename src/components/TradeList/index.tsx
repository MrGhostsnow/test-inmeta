import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ContainerTradeList,
  TitleTradeList,
  SectionTradeList,
  SectionCard,
  SectionTradeCards,
  SectionUserOption,
  User,
  Card,
  ImageCard,
  NameCard,
  DescriptionCard,
  TradeType,
  ButtonDelete,
} from "./styles";

interface Trade {
  id: string;
  userId: string;
  createdAt: string;
  user: {
    name: string;
  };
  tradeCards: {
    id: string;
    cardId: string;
    tradeId: string;
    type: string;
    card: {
      id: string;
      name: string;
      description: string;
      imageUrl: string;
      createdAt: string;
    };
  }[];
}

const TradeList: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>("");

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await axios.get(
          "https://cards-marketplace-api.onrender.com/trades?rpp=10&page=1"
        );
        setTrades(response.data.list);
      } catch (error) {
        console.error("Error fetching trades:", error);
      }
    };
    fetchTrades();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          throw new Error("JWT token not found in localStorage");
        }
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          "https://cards-marketplace-api.onrender.com/me",
          { headers }
        );
        setCurrentUserId(response.data.id);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleDeleteTrade = async (tradeId: string) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token || token.trim() === "") {
        throw new Error("JWT token not found or empty in localStorage");
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const tradeToDelete = trades.find((trade) => trade.id === tradeId);
      if (!tradeToDelete) {
        throw new Error("Trade not found");
      }
      if (tradeToDelete.userId !== currentUserId) {
        throw new Error("You are not authorized to delete this trade.");
      }

      await axios.delete(
        `https://cards-marketplace-api.onrender.com/trades/${tradeId}`,
        { headers }
      );

      console.log("Trade deleted successfully");
      setTrades((prevTrades) =>
        prevTrades.filter((trade) => trade.id !== tradeId)
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("HTTP Error deleting trade:", error.response?.status);
      } else {
        console.error("Error deleting trade:", error);
      }
    }
  };

  console.log(trades);

  return (
    <ContainerTradeList>
      <TitleTradeList>Trade List</TitleTradeList>
      <SectionTradeList>
        {trades.map((trade) => (
          <SectionCard key={trade.id}>
            <SectionUserOption>
              <User>User: {trade.user.name}</User>
              {trade.userId === currentUserId && (
                <ButtonDelete onClick={() => handleDeleteTrade(trade.id)}>
                  Delete
                </ButtonDelete>
              )}
            </SectionUserOption>
            <SectionTradeCards>
              {trade.tradeCards.map((tradeCard) => (
                <Card key={tradeCard.id}>
                  <ImageCard
                    src={tradeCard.card.imageUrl}
                    alt={tradeCard.card.name}
                  />
                  <NameCard>{tradeCard.card.name}</NameCard>
                  <DescriptionCard>
                    {tradeCard.card.description}
                  </DescriptionCard>
                  <TradeType>Type: {tradeCard.type}</TradeType>
                </Card>
              ))}
            </SectionTradeCards>
          </SectionCard>
        ))}
      </SectionTradeList>
    </ContainerTradeList>
  );
};

export default TradeList;
