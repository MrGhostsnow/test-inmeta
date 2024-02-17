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
    box-shadow: rgba(50, 50, 93, 0.25)
     0px 50px 100px -20px, rgba(0, 0, 0, 0.3)
      0px 30px 60px -30px, rgba(10, 37, 64, 0.35)
       0px -2px 6px 0px inset;
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
    
`;

export const ButtonRegister = styled.button`
    width: 100px;
    height: 20px;
    border-radius: 4px;
    border: 1px solid;
    cursor: pointer;
`;