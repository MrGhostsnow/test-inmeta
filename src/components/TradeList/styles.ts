import styled from 'styled-components';

export const ContainerTradeList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const TitleTradeList = styled.h1`
    font-family: 'Roboto', sans-serif;
    font-size: 40px;
`;

export const SectionTradeList = styled.section`
    display: flex;
    flex-direction: column;
    gap: 3rem;
`;

export const SectionTradeCards = styled.section`
    display: flex;
    gap: 2rem;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const SectionCard = styled.section`
    display: flex;
    flex-direction: column;
`;

export const User = styled.p`
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 700;
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

export const TradeType = styled.p`
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 700;
`;

export const ButtonDelete = styled.button`
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 15px;
    height: 30px;
    border-radius: 4px;
    border: 1px solid black;
    cursor: pointer;
`;

export const SectionUserOption = styled.section`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 1rem;
    background-color: #efedf0;
    border-radius: 4px;
    border: 1px solid black;
`;