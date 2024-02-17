import React, { useState, useEffect } from "react";
import axios from "../../AxiosConfig";

interface Card {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const CardList: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get("/cards");
        setCards(response.data.list);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
    fetchCards();
  }, []);

  return (
    <div>
      <h2>Card List</h2>
      <div>
        {cards.map((card) => (
          <div key={card.id}>
            <img src={card.imageUrl} alt={card.name} />
            <h3>{card.name}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
