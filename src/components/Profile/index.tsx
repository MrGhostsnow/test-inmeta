import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
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
  const [cards, setCards] = useState<any[]>([]); // Adicione o estado para os cartões do usuário
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Obtenha o token JWT do localStorage
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          throw new Error("JWT token not found in localStorage");
        }

        // Configure o cabeçalho de autorização com o token JWT
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Faça a solicitação GET para a rota /me com o cabeçalho de autorização
        const response = await axios.get(
          "https://cards-marketplace-api.onrender.com/me",
          { headers }
        );
        setUser(response.data);

        // Defina os cartões do usuário no estado
        setCards(response.data.cards);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  console.log("user", user);

  return (
    <div>
      <h2>Profile</h2>
      {user && (
        <div>
          <h3>Name: {user.name}</h3>
          <p>Email: {user.email}</p>
          <h4>Owned Cards:</h4>
          {cards.length > 0 ? (
            <ContainerCards>
              <SectionCards>
                {cards.map((card) => (
                  <Card key={card.id}>
                    <ImageCard src={card.imageUrl} alt={card.name} />
                    <NameCard>{card.name}</NameCard>
                    <DescriptionCard>{card.description}</DescriptionCard>
                  </Card>
                ))}
              </SectionCards>
            </ContainerCards>
          ) : (
            <>
              <p>
                Seu deck está vazio <br />
                Clique no botão abaixo para adicionar cartas
              </p>
              <button onClick={() => navigate("/cards")}>
                Adicionar Cartas
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
