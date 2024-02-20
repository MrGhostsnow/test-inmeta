import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CardItem from "../CardItem";
import Card from "../../interface/Card";
import { fetchCards, saveSelectedCards } from "../../api/cardsApi";
import {
  ContainerCards,
  TitleCards,
  SectionChooseCards,
  LabelSection,
  SectionCards,
  FinishButton,
} from "./styles";

const CardList: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(
    Math.floor(Math.random() * 15) + 1
  );
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const cards = await fetchCards(currentPage);
      setCards(cards);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cards:", error);
      setError("Failed to fetch cards");
      setLoading(false);
    }
  };

  const handleCardSelect = (id: string) => {
    setSelectedCards((prevSelectedCards) =>
      prevSelectedCards.includes(id)
        ? prevSelectedCards.filter((cardId) => cardId !== id)
        : prevSelectedCards.length < 10
        ? [...prevSelectedCards, id]
        : prevSelectedCards
    );
  };

  const handleFinishSelection = async () => {
    try {
      await saveSelectedCards(selectedCards);
      navigate("/profile");
    } catch (error) {
      console.error("Failed to save selected cards:", error);
    }
  };

  return (
    <ContainerCards>
      <TitleCards>Card List</TitleCards>
      <SectionChooseCards>
        <LabelSection>Choose up to 10 cards to start your deck</LabelSection>
        <FinishButton
          disabled={selectedCards.length < 1}
          onClick={handleFinishSelection}
        >
          Finish
        </FinishButton>
      </SectionChooseCards>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <SectionCards>
          <Swiper
            className="mySwiper"
            modules={[Pagination, Navigation, Autoplay]}
            navigation={true}
          >
            {cards.map((card) => (
              <SwiperSlide key={card.id}>
                <CardItem
                  card={card}
                  selected={selectedCards.includes(card.id)}
                  onSelect={handleCardSelect}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </SectionCards>
      )}
    </ContainerCards>
  );
};

export default CardList;
