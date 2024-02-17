import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../Pagination"; // Importando o componente de paginação
import {
  ContainerCards,
  TitleCards,
  SectionCards,
  Card,
  ImageCard,
  NameCard,
  DescriptionCard,
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

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://cards-marketplace-api.onrender.com/cards?rpp=10&page=${currentPage}`
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
    fetchCards();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
              </Card>
            ))}
          </SectionCards>
          <Pagination
            totalPages={5}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />{" "}
          {/* Adicionando o componente de paginação */}
        </>
      )}
    </ContainerCards>
  );
};

export default CardList;
