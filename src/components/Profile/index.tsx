import React, { useState, useEffect } from "react";
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
import { fetchUserProfile } from "../../api/userProfile";
import User from "../../interface/User";

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetchUserProfile();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUser();
  }, []);

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
          {user.cards.length > 0 ? (
            <ContainerCards>
              <Swiper
                className="mySwiper"
                modules={[Pagination, Navigation, Autoplay]}
                navigation={true}
              >
                <SectionCards>
                  {user.cards.map((card) => (
                    <SwiperSlide key={card.id}>
                      <Card>
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
                Your deck is empty <br />
                Click the button below to add cards
              </LabelEmptyDeck>
              <ButtonAddCards onClick={() => navigate("/cards")}>
                Add Cards
              </ButtonAddCards>
            </SectionEmptyDeck>
          )}
        </SectionProfile>
      )}
    </ContainerProfile>
  );
};

export default Profile;
