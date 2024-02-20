import styled from "styled-components";


export const ContainerProfile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

export const SectionProfile = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
`;

export const SectionInfos = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 550px;
    border: 1px solid black;
    padding: 1rem;
    background-color: #efedf0;
    border-radius: 4px;

    @media (max-width: 425px) {
        width: 300px;
    }
`;

export const TitleProfilePage = styled.h1`
    font-family: 'Roboto', sans-serif;
`;

export const UserName = styled.p`
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 20px;
`;

export const UserEmail = styled.p`
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 20px;
`;

export const DeckTitle = styled.h2`
    font-family: 'Roboto', sans-serif;
`;

export const SectionEmptyDeck = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    border-radius: 4px;
    padding: 1rem;
    background-color: #efedf0;
    gap: 1rem;
`;

export const LabelEmptyDeck = styled.p`
    font-family: 'Roboto', sans-serif;
    text-align: center;
    font-size: 20px;
`;

export const ButtonAddCards = styled.button`
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 20px;
    border: 1px solid black;
    border-radius: 4px;
    padding: 1rem;
    cursor: pointer;
`;


export const ContainerCards = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
    
    .mySwiper {
        width: 510px;
        @media (max-width: 425px) {
            width: 400px;
        }
    }

    .swiper-slide {
        display: flex;
        justify-content: center;
    }
`;

export const TitleCards = styled.h2`
    font-family: 'Roboto', sans-serif;
`;

export const SectionCards = styled.section`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    border-radius: 4px;
    width: 350px;
    padding: 20px;
`;

export const ImageCard = styled.img`
    width: 200px;
`;

export const NameCard = styled.h3`
    text-align: center;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
`;

export const DescriptionCard = styled.p`
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
`;