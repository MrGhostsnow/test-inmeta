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
  ButtonCreateTrade,
  SectionWarning,
  WarningText,
} from "./styles";
import CardItem from "../CardItem";
import { createTrade } from "../../api/tradeApi";
import { fetchUserCards } from "../../api/userCards";
import Card from "../../interface/Card";

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
    const fetchData = async () => {
      try {
        const userCards = await fetchUserCards();
        setCardsUser(userCards);
      } catch (error) {
        console.error("Error fetching user cards:", error);
      }
    };

    fetchData();
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
      const tradeId = await createTrade(offeringCard, receivingCard);
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
                  <CardItem
                    card={card}
                    selected={offeringCard === card.id}
                    onSelect={() => handleOfferingCardChange(card.id)}
                  />
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
                  <CardItem
                    card={card}
                    selected={receivingCard === card.id}
                    onSelect={() => handleReceivingCardChange(card.id)}
                  />
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
