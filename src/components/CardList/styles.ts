import styled from 'styled-components';

export const ContainerCards = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
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
