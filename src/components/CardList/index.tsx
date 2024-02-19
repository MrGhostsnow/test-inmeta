import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  ContainerCards,
  TitleCards,
  SectionChooseCards,
  LabelSection,
  SectionCards,
  Card,
  ImageCard,
  NameCard,
  DescriptionCard,
  SelectCheckbox,
  FinishButton,
} from "./styles";

interface Card {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const CardList: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(
    Math.floor(Math.random() * 15) + 1
  );
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const navigate = useNavigate(); // Obtenha a função de navegação

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://cards-marketplace-api.onrender.com/cards?rpp=10&page=${currentPage}`
      );
      setCards(response.data.list);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cards:", error);
      setError("Failed to fetch cards");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleCardSelect = (id: string) => {
    if (selectedCards.includes(id)) {
      setSelectedCards(selectedCards.filter((cardId) => cardId !== id));
    } else {
      if (selectedCards.length < 10) {
        setSelectedCards([...selectedCards, id]);
      }
    }
  };

  const handleFinishSelection = async () => {
    const queryParams = new URLSearchParams();
    selectedCards.forEach((cardId) => {
      queryParams.append("cardIds", cardId);
    });
    const url = `https://cards-marketplace-api.onrender.com/me/cards`;

    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("JWT token not found in localStorage");
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        url,
        { cardIds: selectedCards },
        { headers }
      );
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
          Finalizar
        </FinishButton>
      </SectionChooseCards>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <SectionCards>
            <Swiper
              className="mySwiper"
              modules={[Pagination, Navigation, Autoplay]}
              navigation={true}
            >
              {cards.map((card) => (
                <SwiperSlide key={card.id}>
                  <Card key={card.id}>
                    <SelectCheckbox
                      type="checkbox"
                      checked={selectedCards.includes(card.id)}
                      onChange={() => handleCardSelect(card.id)}
                    />
                    <ImageCard src={card.imageUrl} alt={card.name} />
                    <NameCard>{card.name}</NameCard>
                    <DescriptionCard>{card.description}</DescriptionCard>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </SectionCards>
        </>
      )}
    </ContainerCards>
  );
};

export default CardList;
