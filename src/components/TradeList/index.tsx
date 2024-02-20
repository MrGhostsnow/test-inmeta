import React, { useState, useEffect } from "react";
import { fetchTrades, deleteTrade } from "../../api/cardsApi";
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
import Trade from "../../interface/Trade";

const TradeList: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tradeList = await fetchTrades();
        setTrades(tradeList);
      } catch (error) {
        console.error("Error fetching trades:", error);
      }
    };
    fetchData();
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

      await deleteTrade(tradeId, token);
      console.log("Trade deleted successfully");
      setTrades((prevTrades) =>
        prevTrades.filter((trade) => trade.id !== tradeId)
      );
    } catch (error) {
      console.error("Error deleting trade:", error);
    }
  };

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
