import React, { useState, useEffect } from "react";
import axios from "axios";

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

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await axios.get(
          "https://cards-marketplace-api.onrender.com/trades?rpp=10&page=1"
        );
        setTrades(response.data.list);
        console.log(response.data.list);
      } catch (error) {
        console.error("Error fetching trades:", error);
      }
    };
    fetchTrades();
  }, []);

  return (
    <div>
      <h2>Trade List</h2>
      <div>
        {trades.map((trade) => (
          <div key={trade.id}>
            <h3>User: {trade.user.name}</h3>
            <p>Created At: {trade.createdAt}</p>
            <div>
              {trade.tradeCards.map((tradeCard) => (
                <div key={tradeCard.id}>
                  <img
                    src={tradeCard.card.imageUrl}
                    alt={tradeCard.card.name}
                  />
                  <h4>{tradeCard.card.name}</h4>
                  <p>{tradeCard.card.description}</p>
                  <p>Type: {tradeCard.type}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradeList;
