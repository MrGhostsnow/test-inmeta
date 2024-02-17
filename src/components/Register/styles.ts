import styled from 'styled-components'

export const ContainerRegister = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 40px;
`;

export const SectionFormRegister = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 500px;
    width: 500px;
    border-radius: 4px;
    background-color:#efedf0;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

export const TitleRegister = styled.h2`
    font-family: 'Roboto', sans-serif;
`;

export const ContainerForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

export const FormRegister = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 25px;
`;

export const InputRegister = styled.input`
    width: 250px;
    height: 30px;
    padding-left: 10px;
    border-radius: 4px;
    border: 1px solid;
    background-color: #efedf0;
`;

export const ButtonRegister = styled.button`
    width: 100px;
    height: 20px;
    border-radius: 4px;
    border: 1px solid;
    cursor: pointer;
`;