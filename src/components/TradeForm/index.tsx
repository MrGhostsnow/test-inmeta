import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ContainerTrade,
  TitleContainerTrade,
  ContainerTradeCards,
  TitleSection,
  Card,
  ImageCard,
  NameCard,
  DescriptionCard,
  ButtonCreateTrade,
  SectionWarning,
  WarningText,
} from "./styles";

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
            cardId: offeringCard,
            type: "OFFERING",
          },
          {
            cardId: receivingCard,
            type: "RECEIVING",
          },
        ],
      };

      const response = await axios.post(
        "https://cards-marketplace-api.onrender.com/trades",
        requestBody,
        { headers }
      );

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
    <ContainerTrade>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        onSubmit={handleTradeSubmit}
      >
        <TitleContainerTrade>Create Trade</TitleContainerTrade>
        <SectionWarning>
          <WarningText>
            Escolha apenas uma carta do seu deck para trocar com apenas uma
            carta do deck oferecido.
          </WarningText>
          <ButtonCreateTrade type="submit" disabled={!isFormValid}>
            Trocar
          </ButtonCreateTrade>
        </SectionWarning>

        <TitleSection>Seu deck:</TitleSection>
        <ContainerTradeCards>
          {cardsUser.map((card) => (
            <Card key={card.id}>
              <input
                type="checkbox"
                checked={offeringCard === card.id}
                onChange={() => handleOfferingCardChange(card.id)}
              />
              <ImageCard src={card.imageUrl} alt={card.name} />
              <NameCard>{card.name}</NameCard>
              <DescriptionCard>{card.description}</DescriptionCard>
            </Card>
          ))}
        </ContainerTradeCards>
        <TitleSection>Deck do jogo:</TitleSection>
        <ContainerTradeCards>
          {cardsGame.map((card) => (
            <Card key={card.id}>
              <input
                type="checkbox"
                checked={receivingCard === card.id}
                onChange={() => handleReceivingCardChange(card.id)}
              />
              <ImageCard src={card.imageUrl} alt={card.name} />
              <NameCard>{card.name}</NameCard>
              <DescriptionCard>{card.description}</DescriptionCard>
            </Card>
          ))}
        </ContainerTradeCards>
      </form>
    </ContainerTrade>
  );
};

export default TradeForm;
