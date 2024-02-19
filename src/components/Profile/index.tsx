import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  ContainerProfile,
  SectionProfile,
  TitleProfilePage,
  SectionInfos,
  UserName,
  UserEmail,
  DeckTitle,
  SectionEmptyDeck,
  LabelEmptyDeck,
  ButtonAddCards,
  ContainerCards,
  TitleCards,
  SectionCards,
  Card,
  ImageCard,
  NameCard,
  DescriptionCard,
} from "./styles";

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [cards, setCards] = useState<any[]>([]);
  const navigate = useNavigate();

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
        setUser(response.data);

        setCards(response.data.cards);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  console.log("user", user);

  return (
    <ContainerProfile>
      <TitleProfilePage>Profile</TitleProfilePage>
      {user && (
        <SectionProfile>
          <SectionInfos>
            <UserName>Name: {user.name}</UserName>
            <UserEmail>Email: {user.email}</UserEmail>
          </SectionInfos>
          <DeckTitle>Owned Cards</DeckTitle>
          {cards.length > 0 ? (
            <ContainerCards>
              <Swiper
                className="mySwiper"
                modules={[Pagination, Navigation, Autoplay]}
                navigation={true}
              >
                <SectionCards>
                  {cards.map((card) => (
                    <SwiperSlide>
                      <Card key={card.id}>
                        <ImageCard src={card.imageUrl} alt={card.name} />
                        <NameCard>{card.name}</NameCard>
                        <DescriptionCard>{card.description}</DescriptionCard>
                      </Card>
                    </SwiperSlide>
                  ))}
                </SectionCards>
              </Swiper>
            </ContainerCards>
          ) : (
            <SectionEmptyDeck>
              <LabelEmptyDeck>
                Seu deck está vazio <br />
                Clique no botão abaixo para adicionar cartas
              </LabelEmptyDeck>
              <ButtonAddCards onClick={() => navigate("/cards")}>
                Adicionar Cartas
              </ButtonAddCards>
            </SectionEmptyDeck>
          )}
        </SectionProfile>
      )}
    </ContainerProfile>
  );
};

export default Profile;
