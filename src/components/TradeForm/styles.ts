import styled from 'styled-components';

export const ContainerTrade = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;

`;

export const SectionChooseTrade = styled.section`
    display: flex;
    height: auto;
    gap: 30px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const TitleContainerTrade = styled.h1`
    font-family: 'Roboto', sans-serif;
    font-size: 30px;
    
`;

export const ContainerTradeCards = styled.div`
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

export const TitleSection = styled.h2`
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
`;

export const ButtonCreateTrade = styled.button`
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 15px;
    height: 40px;
    border-radius: 4px;
    border: 1px solid black;
    width: 100px;
    cursor: pointer;
`;


export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    border-radius: 4px;
    width: 350px;
    max-height: 550px;
    padding: 20px;
    gap: 10px;
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


export const SectionWarning = styled.section`
    display: flex;
    flex-direction: column;
    width: 750px;
    border: 1px solid black;
    padding: 1rem;
    background-color: #efedf0;
    border-radius: 4px;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
        width: 500px;
    }

    @media (max-width: 425px) {
        width: 300px;
    }
`;

export const WarningText = styled.p`
    font-family: 'Roboto', sans-serif;
    font-size: 18px;

    @media (max-width: 768px) {
        text-align: center;
    }
`;