import styled from 'styled-components';


export const ContainerNav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

export const SectionLogo = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 30px;

    a {
        text-decoration: none;
        color: black;
        font-weight: bold;
        font-size: 20px;
        font-family: 'Roboto', sans-serif;
    }
`;

export const SectionRegister = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 30px;
    gap: 25px;
`;

export const ButtonLogin = styled.button`
color: #000;
border: 1px solid ;
padding: 10px 20px;
border-radius: 4px;
display: inline-block;
font-size: 14px;
letter-spacing: 1px;
cursor: pointer;
box-shadow: inset 0 0 0 0 ;
-webkit-transition: ease-out 0.4s;
-moz-transition: ease-out 0.4s;
transition: ease-out 0.4s;
font-size: 15px;

`;

export const ButtonRegister = styled.button`
color: #000;
border: 1px solid ;
padding: 10px 20px;
border-radius: 4px;
display: inline-block;
font-size: 14px;
letter-spacing: 1px;
cursor: pointer;
box-shadow: inset 0 0 0 0 ;
-webkit-transition: ease-out 0.4s;
-moz-transition: ease-out 0.4s;
transition: ease-out 0.4s;
font-size: 15px;


`;

