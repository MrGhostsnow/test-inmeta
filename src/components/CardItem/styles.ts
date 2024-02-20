import styled from 'styled-components'

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

export const SelectCheckbox = styled.input`
`;