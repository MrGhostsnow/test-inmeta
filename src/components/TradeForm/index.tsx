import React, { useState, useEffect } from "react";
import axios from "axios";

interface Card {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const TradeForm: React.FC = () => {
  const [cardsUser, setCardsUser] = useState<Card[]>([]);
  const [cardsGame, setCardsGame] = useState<Card[]>([]);
  const [offeringCard, setOfferingCard] = useState<string>("");
  const [receivingCard, setReceivingCard] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchUserCards = async () => {
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
        setCardsUser(response.data.cards);
      } catch (error) {
        console.error("Error fetching user cards:", error);
      }
    };
    fetchUserCards();
  }, []);

  useEffect(() => {
    setCurrentPage(Math.floor(Math.random() * 15) + 1);
  }, [cardsUser]);

  useEffect(() => {
    const fetchGameCards = async (pageNumber: number) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://cards-marketplace-api.onrender.com/cards?rpp=10&page=${pageNumber}`
        );
        setCardsGame(response.data.list);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cards:", error);
        setError("Failed to fetch cards");
        setLoading(false);
      }
    };
    fetchGameCards(currentPage);
  }, [currentPage]);

  const handleOfferingCardChange = (cardId: string) => {
    setOfferingCard(cardId);
  };

  const handleReceivingCardChange = (cardId: string) => {
    setReceivingCard(cardId);
  };

  const handleTradeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post("/trades", {
        offeringCard,
        receivingCard,
      });
      const tradeId = response.data.tradeId;
      console.log("Trade created successfully, tradeId:", tradeId);
    } catch (error) {
      console.error("Error creating trade:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    offeringCard !== "" && receivingCard !== "" && !isSubmitting && !loading;

  return (
    <div>
      <h2>Create Trade</h2>
      <form onSubmit={handleTradeSubmit}>
        <div>
          <h3>Offering Card:</h3>
          {cardsUser.map((card) => (
            <div key={card.id}>
              <label>
                <input
                  type="checkbox"
                  checked={offeringCard === card.id}
                  onChange={() => handleOfferingCardChange(card.id)}
                />
                <img src={card.imageUrl} alt={card.name} />
                <div>{card.name}</div>
                <div>{card.description}</div>
              </label>
            </div>
          ))}
        </div>
        <div>
          <h3>Receiving Card:</h3>
          {cardsGame.map((card) => (
            <div key={card.id}>
              <label>
                <input
                  type="checkbox"
                  checked={receivingCard === card.id}
                  onChange={() => handleReceivingCardChange(card.id)}
                />
                <img src={card.imageUrl} alt={card.name} />
                <div>{card.name}</div>
                <div>{card.description}</div>
              </label>
            </div>
          ))}
        </div>
        <button type="submit" disabled={!isFormValid}>
          Create Trade
        </button>
      </form>
    </div>
  );
};

export default TradeForm;
