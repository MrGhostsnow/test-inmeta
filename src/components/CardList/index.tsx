import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination";
import {
  ContainerCards,
  TitleCards,
  SectionCards,
  Card,
  ImageCard,
  NameCard,
  DescriptionCard,
  SelectCheckbox, // Adicionando um checkbox para seleção
  FinishButton, // Adicionando um botão para finalizar a escolha
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const navigate = useNavigate(); // Obtenha a função de navegação

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 15) + 1;
    console.log(randomNumber); // Exibe o número aleatório gerado
    fetchData(randomNumber); // Chama a função fetchData com o número aleatório gerado
  }, []);

  useEffect(() => {
    fetchData(currentPage); // Chama a função fetchData sempre que a página atual mudar
  }, [currentPage]);

  const fetchData = async (pageNumber: number) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://cards-marketplace-api.onrender.com/cards?rpp=10&page=${pageNumber}`
      );
      setCards(response.data.list);
      setTotalPages(Math.ceil(response.data.total / 10));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cards:", error);
      setError("Failed to fetch cards");
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <SectionCards>
            {cards.map((card) => (
              <Card key={card.id}>
                <ImageCard src={card.imageUrl} alt={card.name} />
                <NameCard>{card.name}</NameCard>
                <DescriptionCard>{card.description}</DescriptionCard>
                <SelectCheckbox
                  type="checkbox"
                  checked={selectedCards.includes(card.id)}
                  onChange={() => handleCardSelect(card.id)}
                />
              </Card>
            ))}
          </SectionCards>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
          <FinishButton onClick={handleFinishSelection}>
            Finish Selection
          </FinishButton>
        </>
      )}
    </ContainerCards>
  );
};

export default CardList;
