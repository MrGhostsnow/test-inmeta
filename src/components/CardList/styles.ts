import styled from 'styled-components';

interface SelectButtonProps {
    selected: boolean;
  }

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

export const SectionChooseCards = styled.section`
    display: flex;
    width: 750px;
    border: 1px solid black;
    padding: 1rem;
    background-color: #efedf0;
    border-radius: 4px;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 425px) {
        width: 300px;
    }
`;

export const LabelSection = styled.p`
    font-family: 'Roboto', sans-serif;
    font-size: 18px;

`;

export const SectionCards = styled.section`
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

export const FinishButton = styled.button`
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 15px;
    height: 40px;
    border-radius: 4px;
    border: 1px solid black;
    width: 100px;
    cursor: pointer;
`;


