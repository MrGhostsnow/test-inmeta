import styled from 'styled-components';

export const ContainerTrade = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`;

export const TitleContainerTrade = styled.h1`
    font-family: 'Roboto', sans-serif;
    font-size: 30px;
    
`;

export const ContainerTradeCards = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
`;

export const TitleSection = styled.h2`
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    margin-bottom: 10px;
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
`;

export const WarningText = styled.p`
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
`;