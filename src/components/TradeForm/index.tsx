import React, { useState, useEffect } from "react";
import axios from "../../AxiosConfig";

interface Card {
  id: string;
  name: string;
}

const TradeForm: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [offeringCard, setOfferingCard] = useState<string>("");
  const [receivingCard, setReceivingCard] = useState<string>("");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get("/me");
        setCards(response.data.cards);
      } catch (error) {
        console.error("Error fetching user cards:", error);
      }
    };
    fetchCards();
  }, []);

  const handleTradeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/trades", {
        cards: [
          { cardId: offeringCard, type: "OFFERING" },
          { cardId: receivingCard, type: "RECEIVING" },
        ],
      });
      const tradeId = response.data.tradeId;
      console.log("Trade created successfully, tradeId:", tradeId);
    } catch (error) {
      console.error("Error creating trade:", error);
    }
  };

  return (
    <div>
      <h2>Create Trade</h2>
      <form onSubmit={handleTradeSubmit}>
        <label>
          Offering Card:
          <select
            value={offeringCard}
            onChange={(e) => setOfferingCard(e.target.value)}
          >
            <option value="">Select a card</option>
            {cards.map((card) => (
              <option key={card.id} value={card.id}>
                {card.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Receiving Card:
          <select
            value={receivingCard}
            onChange={(e) => setReceivingCard(e.target.value)}
          >
            <option value="">Select a card</option>
            {cards.map((card) => (
              <option key={card.id} value={card.id}>
                {card.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Create Trade</button>
      </form>
    </div>
  );
};

export default TradeForm;
