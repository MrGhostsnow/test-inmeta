import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  ContainerTrade,
  TitleContainerTrade,
  ContainerTradeCards,
  SectionChooseTrade,
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

  const navigate = useNavigate();

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
      navigate(`/`);
      console.log("Trade created successfully, tradeId:", tradeId);
    } catch (error) {
      console.error("Error creating trade:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    offeringCard !== "" && receivingCard !== "" && !isSubmitting && !loading;

  function reduceDescription(description: string) {
    const limit = 500;
    if (description.length <= limit) {
      return description;
    } else {
      const ReduceDescription = description.substring(0, limit) + "...";
      return ReduceDescription;
    }
  }

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
            Choose 1 card from your deck to exchange with 1 card from the
            offered deck.
          </WarningText>
          <ButtonCreateTrade type="submit" disabled={!isFormValid}>
            Trocar
          </ButtonCreateTrade>
        </SectionWarning>
        <SectionChooseTrade>
          <ContainerTradeCards>
            <TitleSection>Seu deck</TitleSection>
            <Swiper
              className="mySwiper"
              modules={[Pagination, Navigation, Autoplay]}
              navigation={true}
            >
              {cardsUser.map((card) => (
                <SwiperSlide key={card.id}>
                  <Card key={card.id}>
                    <input
                      type="checkbox"
                      checked={offeringCard === card.id}
                      onChange={() => handleOfferingCardChange(card.id)}
                    />
                    <ImageCard src={card.imageUrl} alt={card.name} />
                    <NameCard>{card.name}</NameCard>
                    <DescriptionCard>
                      {" "}
                      {reduceDescription(card.description)}
                    </DescriptionCard>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </ContainerTradeCards>
          <ContainerTradeCards>
            <TitleSection>Deck do jogo</TitleSection>
            <Swiper
              className="mySwiper"
              modules={[Pagination, Navigation, Autoplay]}
              navigation={true}
            >
              {cardsGame.map((card) => (
                <SwiperSlide key={card.id}>
                  <Card key={card.id}>
                    <input
                      type="checkbox"
                      checked={receivingCard === card.id}
                      onChange={() => handleReceivingCardChange(card.id)}
                    />
                    <ImageCard src={card.imageUrl} alt={card.name} />
                    <NameCard>{card.name}</NameCard>
                    <DescriptionCard>
                      {reduceDescription(card.description)}
                    </DescriptionCard>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </ContainerTradeCards>
        </SectionChooseTrade>
      </form>
    </ContainerTrade>
  );
};

export default TradeForm;
